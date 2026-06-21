import type { RequestHandler } from "express";
import { z } from "zod";

import { AppError } from "../../../shared/errors/app-error";
import { JobAnalysisService } from "../application/job-analysis.service";

const jobAnalysisService = new JobAnalysisService();

const analyzeJobSchema = z.object({
  jobDescription: z.string().min(10, "Job description is too short"),
  title: z.string().optional(),
  company: z.string().optional()
});

export class AIController {
  analyzeJob: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      const parsedBody = analyzeJobSchema.parse(request.body);

      const result = await jobAnalysisService.analyzeJobMatch({
        userId,
        jobDescription: parsedBody.jobDescription,
        title: parsedBody.title,
        company: parsedBody.company
      });

      return response.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new AppError("Validation error", 400));
      }
      return next(error);
    }
  };

  getAnalysis: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;
      const { id } = request.params;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }
      
      if (!id) {
        throw new AppError("Analysis ID is required", 400);
      }

      const analysis = await jobAnalysisService.getAnalysis(userId, id);

      return response.status(200).json(analysis);
    } catch (error) {
      return next(error);
    }
  };
}
