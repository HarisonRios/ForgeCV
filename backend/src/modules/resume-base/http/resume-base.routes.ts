import { Router } from "express";

import { authGuard } from "../../../shared/http/middlewares/auth-guard";
import { ResumeBaseController } from "./resume-base.controller";

export const resumeBaseRouter = Router();
const controller = new ResumeBaseController();

resumeBaseRouter.use(authGuard);

resumeBaseRouter.get("/", controller.getBaseResume);
resumeBaseRouter.patch("/", controller.updateBaseResume);
resumeBaseRouter.patch("/profile", controller.updateProfile);

resumeBaseRouter.post("/education", controller.createEducation);
resumeBaseRouter.put("/education/:id", controller.updateEducation);
resumeBaseRouter.delete("/education/:id", controller.deleteEducation);

resumeBaseRouter.post("/experiences", controller.createExperience);
resumeBaseRouter.put("/experiences/:id", controller.updateExperience);
resumeBaseRouter.delete("/experiences/:id", controller.deleteExperience);

resumeBaseRouter.post("/projects", controller.createProject);
resumeBaseRouter.put("/projects/:id", controller.updateProject);
resumeBaseRouter.delete("/projects/:id", controller.deleteProject);

resumeBaseRouter.post("/skills", controller.createSkill);
resumeBaseRouter.put("/skills/:id", controller.updateSkill);
resumeBaseRouter.delete("/skills/:id", controller.deleteSkill);

resumeBaseRouter.post("/certifications", controller.createCertification);
resumeBaseRouter.put("/certifications/:id", controller.updateCertification);
resumeBaseRouter.delete("/certifications/:id", controller.deleteCertification);

resumeBaseRouter.post("/courses", controller.createCourse);
resumeBaseRouter.put("/courses/:id", controller.updateCourse);
resumeBaseRouter.delete("/courses/:id", controller.deleteCourse);

resumeBaseRouter.post("/languages", controller.createLanguage);
resumeBaseRouter.put("/languages/:id", controller.updateLanguage);
resumeBaseRouter.delete("/languages/:id", controller.deleteLanguage);

resumeBaseRouter.post("/links", controller.createProfessionalLink);
resumeBaseRouter.put("/links/:id", controller.updateProfessionalLink);
resumeBaseRouter.delete("/links/:id", controller.deleteProfessionalLink);
