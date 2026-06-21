import type { RequestHandler } from "express";

import { AppError } from "../../../shared/errors/app-error";
import { ForgedResumeService } from "../application/forged-resume.service";
import { PdfService } from "../../pdf/application/pdf.service";

const forgedResumeService = new ForgedResumeService();
const pdfService = new PdfService();

export class ForgedResumeController {
  forgeFromAnalysis: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;
      const { analysisId } = request.params;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      if (!analysisId) {
        throw new AppError("Analysis ID is required", 400);
      }

      const result = await forgedResumeService.forgeResumeFromAnalysis(userId, analysisId);

      return response.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  list: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      const resumes = await forgedResumeService.getUserForgedResumes(userId);

      return response.status(200).json(resumes);
    } catch (error) {
      return next(error);
    }
  };

  getById: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;
      const { id } = request.params;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      if (!id) {
        throw new AppError("Forged Resume ID is required", 400);
      }

      const resume = await forgedResumeService.getForgedResumeById(userId, id);

      return response.status(200).json(resume);
    } catch (error) {
      return next(error);
    }
  };

  delete: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;
      const { id } = request.params;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      if (!id) {
        throw new AppError("Forged Resume ID is required", 400);
      }

      await forgedResumeService.deleteForgedResume(userId, id);

      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  downloadPdf: RequestHandler = async (request, response, next) => {
    try {
      const userId = request.user?.id;
      const { id } = request.params;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      if (!id) {
        throw new AppError("Forged Resume ID is required", 400);
      }

      const pdfBuffer = await pdfService.generatePdfForForgedResume(userId, id);

      response.setHeader("Content-Type", "application/pdf");
      response.setHeader("Content-Disposition", `attachment; filename=forgecv-${id}.pdf`);
      
      return response.status(200).send(pdfBuffer);
    } catch (error) {
      return next(error);
    }
  };
}
