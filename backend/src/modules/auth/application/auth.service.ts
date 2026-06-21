import bcrypt from "bcryptjs";
import crypto from "node:crypto";

import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/prisma/prisma";
import { signAccessToken } from "../infra/jwt";
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput
} from "./auth.validation";

const PASSWORD_HASH_ROUNDS = 12;

function sanitizeUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export class AuthService {
  async register(input: RegisterInput) {
    const email = normalizeEmail(input.email);
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, PASSWORD_HASH_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name: input.name.trim(),
        email,
        passwordHash,
        profile: {
          create: {}
        },
        baseResume: {
          create: {
            title: "Curriculo base"
          }
        }
      }
    });

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: sanitizeUser(user),
      accessToken
    };
  }

  async login(input: LoginInput) {
    const email = normalizeEmail(input.email);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.deletedAt) {
      throw new AppError("Invalid credentials", 401);
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError("Invalid credentials", 401);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: sanitizeUser(user),
      accessToken
    };
  }

  async getSession(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return sanitizeUser(user);
  }

  async forgotPassword(input: ForgotPasswordInput) {
    const email = normalizeEmail(input.email);
    const user = await prisma.user.findFirst({
      where: {
        email,
        deletedAt: null
      }
    });

    if (!user) {
      return {
        message: "If the email exists, password reset instructions will be generated."
      };
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashResetToken(rawToken);
    const expiresAt = new Date(Date.now() + env.PASSWORD_RESET_TOKEN_TTL_MINUTES * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt
      }
    });

    return {
      message: "If the email exists, password reset instructions will be generated.",
      ...(env.NODE_ENV !== "production" ? { resetToken: rawToken } : {})
    };
  }

  async resetPassword(input: ResetPasswordInput) {
    const tokenHash = hashResetToken(input.token);

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true }
    });

    if (
      !resetToken ||
      resetToken.usedAt ||
      resetToken.expiresAt.getTime() < Date.now() ||
      resetToken.user.deletedAt
    ) {
      throw new AppError("Invalid or expired reset token", 400);
    }

    const passwordHash = await bcrypt.hash(input.password, PASSWORD_HASH_ROUNDS);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash }
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() }
      })
    ]);

    return {
      message: "Password updated successfully"
    };
  }
}
