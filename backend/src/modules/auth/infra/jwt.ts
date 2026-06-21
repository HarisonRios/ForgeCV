import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/app-error";

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export function signAccessToken(payload: AccessTokenPayload) {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    ...options
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
}
