import type { RequestHandler } from "express";

import { verifyAccessToken } from "../../../modules/auth/infra/jwt";
import { AppError } from "../../errors/app-error";

export const authGuard: RequestHandler = (request, _response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return next(new AppError("Authorization header is required", 401));
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Invalid authorization header", 401));
  }

  const payload = verifyAccessToken(token);

  request.user = {
    id: payload.sub,
    email: payload.email,
    role: payload.role
  };

  return next();
};
