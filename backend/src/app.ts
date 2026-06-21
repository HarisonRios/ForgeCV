import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { authRouter } from "./modules/auth/http/auth.routes";
import { resumeBaseRouter } from "./modules/resume-base/http/resume-base.routes";
import { resumePdfRouter } from "./modules/uploads/http/resume-pdf.routes";
import { aiRouter } from "./modules/ai/http/ai.routes";
import { forgedResumeRouter } from "./modules/forged-resume/http/forged-resume.routes";
import { dashboardRouter } from "./modules/dashboard/http/dashboard.routes";
import { errorHandler } from "./shared/http/middlewares/error-handler";
import { notFoundHandler } from "./shared/http/middlewares/not-found-handler";
import { healthRouter } from "./shared/http/routes/health.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  if (env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  app.use(`${env.API_PREFIX}/health`, healthRouter);
  app.use(`${env.API_PREFIX}/auth`, authRouter);
  app.use(`${env.API_PREFIX}/resume-base`, resumeBaseRouter);
  app.use(`${env.API_PREFIX}/uploads`, resumePdfRouter);
  app.use(`${env.API_PREFIX}/ai`, aiRouter);
  app.use(`${env.API_PREFIX}/forged-resumes`, forgedResumeRouter);
  app.use(`${env.API_PREFIX}/dashboard`, dashboardRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
