import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { env } from "../../../config/env";
import { AppError } from "../../errors/app-error";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation error",
      issues: error.flatten().fieldErrors
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      details: error.details
    });
  }

  console.error(error);

  return response.status(500).json({
    message: "Internal server error",
    ...(env.NODE_ENV === "development" ? { details: String(error) } : {})
  });
};
