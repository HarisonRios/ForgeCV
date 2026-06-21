import { z } from "zod";

const optionalDateSchema = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return value;
}, z.coerce.date().optional());

const stringArraySchema = z.array(z.string().trim().min(1)).default([]);

export const updateProfileSchema = z.object({
  headline: z.string().trim().max(160).optional().nullable(),
  phone: z.string().trim().max(40).optional().nullable(),
  city: z.string().trim().max(80).optional().nullable(),
  state: z.string().trim().max(80).optional().nullable(),
  country: z.string().trim().max(80).optional().nullable(),
  summary: z.string().trim().max(3000).optional().nullable()
});

export const updateBaseResumeSchema = z.object({
  title: z.string().trim().min(2).max(120).optional(),
  professionalSummary: z.string().trim().max(4000).optional().nullable()
});

export const educationSchema = z.object({
  institution: z.string().trim().min(2).max(180),
  degree: z.string().trim().min(2).max(180),
  fieldOfStudy: z.string().trim().max(180).optional().nullable(),
  startDate: optionalDateSchema,
  endDate: optionalDateSchema,
  isCurrent: z.boolean().default(false),
  description: z.string().trim().max(3000).optional().nullable(),
  order: z.number().int().min(0).default(0)
});

export const workExperienceSchema = z.object({
  company: z.string().trim().min(2).max(180),
  position: z.string().trim().min(2).max(180),
  location: z.string().trim().max(180).optional().nullable(),
  startDate: optionalDateSchema,
  endDate: optionalDateSchema,
  isCurrent: z.boolean().default(false),
  description: z.string().trim().max(5000).optional().nullable(),
  achievements: stringArraySchema,
  technologies: stringArraySchema,
  order: z.number().int().min(0).default(0)
});

export const projectSchema = z.object({
  name: z.string().trim().min(2).max(180),
  description: z.string().trim().max(5000).optional().nullable(),
  role: z.string().trim().max(180).optional().nullable(),
  url: z.string().trim().url().max(500).optional().nullable(),
  repositoryUrl: z.string().trim().url().max(500).optional().nullable(),
  technologies: stringArraySchema,
  highlights: stringArraySchema,
  startDate: optionalDateSchema,
  endDate: optionalDateSchema,
  order: z.number().int().min(0).default(0)
});

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(120),
  category: z.string().trim().max(120).optional().nullable(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]).optional().nullable(),
  yearsOfExperience: z.number().int().min(0).max(80).optional().nullable(),
  order: z.number().int().min(0).default(0)
});

export const certificationSchema = z.object({
  name: z.string().trim().min(2).max(180),
  issuer: z.string().trim().min(2).max(180),
  credentialId: z.string().trim().max(180).optional().nullable(),
  credentialUrl: z.string().trim().url().max(500).optional().nullable(),
  issuedAt: optionalDateSchema,
  expiresAt: optionalDateSchema,
  doesNotExpire: z.boolean().default(false),
  order: z.number().int().min(0).default(0)
});

export const courseSchema = z.object({
  name: z.string().trim().min(2).max(180),
  provider: z.string().trim().max(180).optional().nullable(),
  workloadHours: z.number().int().min(1).max(10000).optional().nullable(),
  completedAt: optionalDateSchema,
  certificateUrl: z.string().trim().url().max(500).optional().nullable(),
  order: z.number().int().min(0).default(0)
});

export const languageSchema = z.object({
  name: z.string().trim().min(2).max(80),
  level: z.enum(["BASIC", "INTERMEDIATE", "ADVANCED", "FLUENT", "NATIVE"]),
  certification: z.string().trim().max(180).optional().nullable(),
  order: z.number().int().min(0).default(0)
});

export const professionalLinkSchema = z.object({
  type: z.enum(["LINKEDIN", "GITHUB", "PORTFOLIO", "WEBSITE", "OTHER"]),
  label: z.string().trim().max(120).optional().nullable(),
  url: z.string().trim().url().max(500),
  order: z.number().int().min(0).default(0)
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateBaseResumeInput = z.infer<typeof updateBaseResumeSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type WorkExperienceInput = z.infer<typeof workExperienceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type LanguageInput = z.infer<typeof languageSchema>;
export type ProfessionalLinkInput = z.infer<typeof professionalLinkSchema>;
