import type { RequestHandler } from "express";

import { ResumeBaseService } from "../application/resume-base.service";
import {
  certificationSchema,
  courseSchema,
  educationSchema,
  languageSchema,
  professionalLinkSchema,
  projectSchema,
  skillSchema,
  updateBaseResumeSchema,
  updateProfileSchema,
  workExperienceSchema
} from "../application/resume-base.validation";

const resumeBaseService = new ResumeBaseService();

function getUserId(request: Parameters<RequestHandler>[0]) {
  return request.user?.id ?? "";
}

function getItemId(request: Parameters<RequestHandler>[0]) {
  return request.params.id ?? "";
}

export class ResumeBaseController {
  getBaseResume: RequestHandler = async (request, response, next) => {
    try {
      const result = await resumeBaseService.getBaseResume(getUserId(request));
      return response.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  updateProfile: RequestHandler = async (request, response, next) => {
    try {
      const input = updateProfileSchema.parse(request.body);
      const profile = await resumeBaseService.updateProfile(getUserId(request), input);
      return response.status(200).json({ profile });
    } catch (error) {
      return next(error);
    }
  };

  updateBaseResume: RequestHandler = async (request, response, next) => {
    try {
      const input = updateBaseResumeSchema.parse(request.body);
      const baseResume = await resumeBaseService.updateBaseResume(getUserId(request), input);
      return response.status(200).json({ baseResume });
    } catch (error) {
      return next(error);
    }
  };

  createEducation: RequestHandler = async (request, response, next) => {
    try {
      const input = educationSchema.parse(request.body);
      const education = await resumeBaseService.createEducation(getUserId(request), input);
      return response.status(201).json({ education });
    } catch (error) {
      return next(error);
    }
  };

  updateEducation: RequestHandler = async (request, response, next) => {
    try {
      const input = educationSchema.parse(request.body);
      const education = await resumeBaseService.updateEducation(getUserId(request), getItemId(request), input);
      return response.status(200).json({ education });
    } catch (error) {
      return next(error);
    }
  };

  deleteEducation: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteEducation(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  createExperience: RequestHandler = async (request, response, next) => {
    try {
      const input = workExperienceSchema.parse(request.body);
      const experience = await resumeBaseService.createExperience(getUserId(request), input);
      return response.status(201).json({ experience });
    } catch (error) {
      return next(error);
    }
  };

  updateExperience: RequestHandler = async (request, response, next) => {
    try {
      const input = workExperienceSchema.parse(request.body);
      const experience = await resumeBaseService.updateExperience(
        getUserId(request),
        getItemId(request),
        input
      );
      return response.status(200).json({ experience });
    } catch (error) {
      return next(error);
    }
  };

  deleteExperience: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteExperience(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  createProject: RequestHandler = async (request, response, next) => {
    try {
      const input = projectSchema.parse(request.body);
      const project = await resumeBaseService.createProject(getUserId(request), input);
      return response.status(201).json({ project });
    } catch (error) {
      return next(error);
    }
  };

  updateProject: RequestHandler = async (request, response, next) => {
    try {
      const input = projectSchema.parse(request.body);
      const project = await resumeBaseService.updateProject(getUserId(request), getItemId(request), input);
      return response.status(200).json({ project });
    } catch (error) {
      return next(error);
    }
  };

  deleteProject: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteProject(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  createSkill: RequestHandler = async (request, response, next) => {
    try {
      const input = skillSchema.parse(request.body);
      const skill = await resumeBaseService.createSkill(getUserId(request), input);
      return response.status(201).json({ skill });
    } catch (error) {
      return next(error);
    }
  };

  updateSkill: RequestHandler = async (request, response, next) => {
    try {
      const input = skillSchema.parse(request.body);
      const skill = await resumeBaseService.updateSkill(getUserId(request), getItemId(request), input);
      return response.status(200).json({ skill });
    } catch (error) {
      return next(error);
    }
  };

  deleteSkill: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteSkill(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  createCertification: RequestHandler = async (request, response, next) => {
    try {
      const input = certificationSchema.parse(request.body);
      const certification = await resumeBaseService.createCertification(getUserId(request), input);
      return response.status(201).json({ certification });
    } catch (error) {
      return next(error);
    }
  };

  updateCertification: RequestHandler = async (request, response, next) => {
    try {
      const input = certificationSchema.parse(request.body);
      const certification = await resumeBaseService.updateCertification(
        getUserId(request),
        getItemId(request),
        input
      );
      return response.status(200).json({ certification });
    } catch (error) {
      return next(error);
    }
  };

  deleteCertification: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteCertification(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  createCourse: RequestHandler = async (request, response, next) => {
    try {
      const input = courseSchema.parse(request.body);
      const course = await resumeBaseService.createCourse(getUserId(request), input);
      return response.status(201).json({ course });
    } catch (error) {
      return next(error);
    }
  };

  updateCourse: RequestHandler = async (request, response, next) => {
    try {
      const input = courseSchema.parse(request.body);
      const course = await resumeBaseService.updateCourse(getUserId(request), getItemId(request), input);
      return response.status(200).json({ course });
    } catch (error) {
      return next(error);
    }
  };

  deleteCourse: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteCourse(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  createLanguage: RequestHandler = async (request, response, next) => {
    try {
      const input = languageSchema.parse(request.body);
      const language = await resumeBaseService.createLanguage(getUserId(request), input);
      return response.status(201).json({ language });
    } catch (error) {
      return next(error);
    }
  };

  updateLanguage: RequestHandler = async (request, response, next) => {
    try {
      const input = languageSchema.parse(request.body);
      const language = await resumeBaseService.updateLanguage(getUserId(request), getItemId(request), input);
      return response.status(200).json({ language });
    } catch (error) {
      return next(error);
    }
  };

  deleteLanguage: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteLanguage(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  createProfessionalLink: RequestHandler = async (request, response, next) => {
    try {
      const input = professionalLinkSchema.parse(request.body);
      const professionalLink = await resumeBaseService.createProfessionalLink(getUserId(request), input);
      return response.status(201).json({ professionalLink });
    } catch (error) {
      return next(error);
    }
  };

  updateProfessionalLink: RequestHandler = async (request, response, next) => {
    try {
      const input = professionalLinkSchema.parse(request.body);
      const professionalLink = await resumeBaseService.updateProfessionalLink(
        getUserId(request),
        getItemId(request),
        input
      );
      return response.status(200).json({ professionalLink });
    } catch (error) {
      return next(error);
    }
  };

  deleteProfessionalLink: RequestHandler = async (request, response, next) => {
    try {
      await resumeBaseService.deleteProfessionalLink(getUserId(request), getItemId(request));
      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  };
}
