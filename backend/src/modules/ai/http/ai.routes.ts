import { Router } from "express";

import { authGuard } from "../../../shared/http/middlewares/auth-guard";
import { AIController } from "./ai.controller";

export const aiRouter = Router();
const aiController = new AIController();

aiRouter.use(authGuard);

aiRouter.post("/analyze-job", aiController.analyzeJob);
aiRouter.get("/analysis/:id", aiController.getAnalysis);
