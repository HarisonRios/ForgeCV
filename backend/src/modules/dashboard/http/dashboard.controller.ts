import type { RequestHandler } from "express";

import { AppError } from "../../../shared/errors/app-error";
import { DashboardService } from "../application/dashboard.service";

const dashboardService = new DashboardService();

export class DashboardController {
  getMetrics: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      const metrics = await dashboardService.getDashboardMetrics(userId);

      return response.status(200).json(metrics);
    } catch (error) {
      return next(error);
    }
  };
}
