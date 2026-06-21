import { Router } from "express";

import { authGuard } from "../../../shared/http/middlewares/auth-guard";
import { ForgedResumeController } from "./forged-resume.controller";

export const forgedResumeRouter = Router();
const forgedResumeController = new ForgedResumeController();

forgedResumeRouter.use(authGuard);

forgedResumeRouter.post("/from-analysis/:analysisId", forgedResumeController.forgeFromAnalysis);
forgedResumeRouter.get("/", forgedResumeController.list);
forgedResumeRouter.get("/:id", forgedResumeController.getById);
forgedResumeRouter.get("/:id/download-pdf", forgedResumeController.downloadPdf);
forgedResumeRouter.delete("/:id", forgedResumeController.delete);
