import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/prisma/prisma";
import type {
  CertificationInput,
  CourseInput,
  EducationInput,
  LanguageInput,
  ProfessionalLinkInput,
  ProjectInput,
  SkillInput,
  UpdateBaseResumeInput,
  UpdateProfileInput,
  WorkExperienceInput
} from "./resume-base.validation";

const resumeInclude = {
  user: {
    select: {
      id: true,
      name: true,
      email: true
    }
  },
  education: { orderBy: [{ order: "asc" as const }, { createdAt: "asc" as const }] },
  experiences: { orderBy: [{ order: "asc" as const }, { startDate: "desc" as const }] },
  projects: { orderBy: [{ order: "asc" as const }, { createdAt: "asc" as const }] },
  skills: { orderBy: [{ order: "asc" as const }, { name: "asc" as const }] },
  certifications: { orderBy: [{ order: "asc" as const }, { issuedAt: "desc" as const }] },
  courses: { orderBy: [{ order: "asc" as const }, { completedAt: "desc" as const }] },
  languages: { orderBy: [{ order: "asc" as const }, { name: "asc" as const }] },
  professionalLinks: { orderBy: [{ order: "asc" as const }, { createdAt: "asc" as const }] }
};

function asJsonArray(value: string[]) {
  return value.length > 0 ? value : undefined;
}

export class ResumeBaseService {
  async getBaseResume(userId: string) {
    const [profile, baseResume] = await Promise.all([
      prisma.userProfile.upsert({
        where: { userId },
        update: {},
        create: { userId }
      }),
      prisma.baseResume.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          title: "Curriculo base"
        },
        include: resumeInclude
      })
    ]);

    return {
      profile,
      baseResume
    };
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    return prisma.userProfile.upsert({
      where: { userId },
      update: input,
      create: {
        userId,
        ...input
      }
    });
  }

  async updateBaseResume(userId: string, input: UpdateBaseResumeInput) {
    return prisma.baseResume.upsert({
      where: { userId },
      update: input,
      create: {
        userId,
        title: input.title ?? "Curriculo base",
        professionalSummary: input.professionalSummary
      },
      include: resumeInclude
    });
  }

  async createEducation(userId: string, input: EducationInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.education.create({
      data: {
        ...input,
        baseResumeId: baseResume.id
      }
    });
  }

  async updateEducation(userId: string, id: string, input: EducationInput) {
    await this.assertEducationOwner(userId, id);

    return prisma.education.update({
      where: { id },
      data: input
    });
  }

  async deleteEducation(userId: string, id: string) {
    await this.assertEducationOwner(userId, id);
    await prisma.education.delete({ where: { id } });
  }

  async createExperience(userId: string, input: WorkExperienceInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.workExperience.create({
      data: {
        ...input,
        achievements: asJsonArray(input.achievements),
        technologies: asJsonArray(input.technologies),
        baseResumeId: baseResume.id
      }
    });
  }

  async updateExperience(userId: string, id: string, input: WorkExperienceInput) {
    await this.assertExperienceOwner(userId, id);

    return prisma.workExperience.update({
      where: { id },
      data: {
        ...input,
        achievements: asJsonArray(input.achievements),
        technologies: asJsonArray(input.technologies)
      }
    });
  }

  async deleteExperience(userId: string, id: string) {
    await this.assertExperienceOwner(userId, id);
    await prisma.workExperience.delete({ where: { id } });
  }

  async createProject(userId: string, input: ProjectInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.project.create({
      data: {
        ...input,
        technologies: asJsonArray(input.technologies),
        highlights: asJsonArray(input.highlights),
        baseResumeId: baseResume.id
      }
    });
  }

  async updateProject(userId: string, id: string, input: ProjectInput) {
    await this.assertProjectOwner(userId, id);

    return prisma.project.update({
      where: { id },
      data: {
        ...input,
        technologies: asJsonArray(input.technologies),
        highlights: asJsonArray(input.highlights)
      }
    });
  }

  async deleteProject(userId: string, id: string) {
    await this.assertProjectOwner(userId, id);
    await prisma.project.delete({ where: { id } });
  }

  async createSkill(userId: string, input: SkillInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.skill.create({
      data: {
        ...input,
        baseResumeId: baseResume.id
      }
    });
  }

  async updateSkill(userId: string, id: string, input: SkillInput) {
    await this.assertSkillOwner(userId, id);

    return prisma.skill.update({
      where: { id },
      data: input
    });
  }

  async deleteSkill(userId: string, id: string) {
    await this.assertSkillOwner(userId, id);
    await prisma.skill.delete({ where: { id } });
  }

  async createCertification(userId: string, input: CertificationInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.certification.create({
      data: {
        ...input,
        baseResumeId: baseResume.id
      }
    });
  }

  async updateCertification(userId: string, id: string, input: CertificationInput) {
    await this.assertCertificationOwner(userId, id);

    return prisma.certification.update({
      where: { id },
      data: input
    });
  }

  async deleteCertification(userId: string, id: string) {
    await this.assertCertificationOwner(userId, id);
    await prisma.certification.delete({ where: { id } });
  }

  async createCourse(userId: string, input: CourseInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.course.create({
      data: {
        ...input,
        baseResumeId: baseResume.id
      }
    });
  }

  async updateCourse(userId: string, id: string, input: CourseInput) {
    await this.assertCourseOwner(userId, id);

    return prisma.course.update({
      where: { id },
      data: input
    });
  }

  async deleteCourse(userId: string, id: string) {
    await this.assertCourseOwner(userId, id);
    await prisma.course.delete({ where: { id } });
  }

  async createLanguage(userId: string, input: LanguageInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.language.create({
      data: {
        ...input,
        baseResumeId: baseResume.id
      }
    });
  }

  async updateLanguage(userId: string, id: string, input: LanguageInput) {
    await this.assertLanguageOwner(userId, id);

    return prisma.language.update({
      where: { id },
      data: input
    });
  }

  async deleteLanguage(userId: string, id: string) {
    await this.assertLanguageOwner(userId, id);
    await prisma.language.delete({ where: { id } });
  }

  async createProfessionalLink(userId: string, input: ProfessionalLinkInput) {
    const baseResume = await this.getOwnedBaseResume(userId);

    return prisma.professionalLink.create({
      data: {
        ...input,
        baseResumeId: baseResume.id
      }
    });
  }

  async updateProfessionalLink(userId: string, id: string, input: ProfessionalLinkInput) {
    await this.assertProfessionalLinkOwner(userId, id);

    return prisma.professionalLink.update({
      where: { id },
      data: input
    });
  }

  async deleteProfessionalLink(userId: string, id: string) {
    await this.assertProfessionalLinkOwner(userId, id);
    await prisma.professionalLink.delete({ where: { id } });
  }

  private async getOwnedBaseResume(userId: string) {
    return prisma.baseResume.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        title: "Curriculo base"
      }
    });
  }

  private async assertEducationOwner(userId: string, id: string) {
    const item = await prisma.education.findFirst({ where: { id, baseResume: { userId } } });
    if (!item) throw new AppError("Education item not found", 404);
  }

  private async assertExperienceOwner(userId: string, id: string) {
    const item = await prisma.workExperience.findFirst({ where: { id, baseResume: { userId } } });
    if (!item) throw new AppError("Experience item not found", 404);
  }

  private async assertProjectOwner(userId: string, id: string) {
    const item = await prisma.project.findFirst({ where: { id, baseResume: { userId } } });
    if (!item) throw new AppError("Project item not found", 404);
  }

  private async assertSkillOwner(userId: string, id: string) {
    const item = await prisma.skill.findFirst({ where: { id, baseResume: { userId } } });
    if (!item) throw new AppError("Skill item not found", 404);
  }

  private async assertCertificationOwner(userId: string, id: string) {
    const item = await prisma.certification.findFirst({ where: { id, baseResume: { userId } } });
    if (!item) throw new AppError("Certification item not found", 404);
  }

  private async assertCourseOwner(userId: string, id: string) {
    const item = await prisma.course.findFirst({ where: { id, baseResume: { userId } } });
    if (!item) throw new AppError("Course item not found", 404);
  }

  private async assertLanguageOwner(userId: string, id: string) {
    const item = await prisma.language.findFirst({ where: { id, baseResume: { userId } } });
    if (!item) throw new AppError("Language item not found", 404);
  }

  private async assertProfessionalLinkOwner(userId: string, id: string) {
    const item = await prisma.professionalLink.findFirst({
      where: { id, baseResume: { userId } }
    });
    if (!item) throw new AppError("Professional link not found", 404);
  }
}
