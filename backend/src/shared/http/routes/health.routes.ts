import { Router } from "express";

import { prisma } from "../../prisma/prisma";

export const healthRouter = Router();

healthRouter.get("/", async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return response.status(200).json({
      status: "ok",
      service: "forgecv-api",
      database: "connected"
    });
  } catch (error) {
    return next(error);
  }
});
