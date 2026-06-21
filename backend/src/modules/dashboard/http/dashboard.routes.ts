import { Router } from "express";

import { authGuard } from "../../../shared/http/middlewares/auth-guard";
import { DashboardController } from "./dashboard.controller";

export const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.use(authGuard);

dashboardRouter.get("/metrics", dashboardController.getMetrics);
