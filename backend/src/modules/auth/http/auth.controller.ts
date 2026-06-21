import type { RequestHandler } from "express";

import { AuthService } from "../application/auth.service";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from "../application/auth.validation";

const authService = new AuthService();

export class AuthController {
  register: RequestHandler = async (request, response, next) => {
    try {
      const input = registerSchema.parse(request.body);
      const result = await authService.register(input);

      return response.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  login: RequestHandler = async (request, response, next) => {
    try {
      const input = loginSchema.parse(request.body);
      const result = await authService.login(input);

      return response.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  logout: RequestHandler = (_request, response) => {
    return response.status(200).json({
      message: "Logged out successfully"
    });
  };

  me: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;

      if (!userId) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      const user = await authService.getSession(userId);

      return response.status(200).json({ user });
    } catch (error) {
      return next(error);
    }
  };

  forgotPassword: RequestHandler = async (request, response, next) => {
    try {
      const input = forgotPasswordSchema.parse(request.body);
      const result = await authService.forgotPassword(input);

      return response.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  resetPassword: RequestHandler = async (request, response, next) => {
    try {
      const input = resetPasswordSchema.parse(request.body);
      const result = await authService.resetPassword(input);

      return response.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
