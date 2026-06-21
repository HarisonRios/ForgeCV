import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/prisma/prisma";

export class ForgedResumeService {
  async forgeResumeFromAnalysis(userId: string, analysisId: string) {
    const analysis = await prisma.jobAnalysis.findUnique({
      where: { id: analysisId }
    });

    if (!analysis) {
      throw new AppError("Job analysis not found", 404);
    }

    if (analysis.userId !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    if (analysis.status !== "COMPLETED") {
      throw new AppError("Job analysis is not completed yet", 400);
    }

    if (!analysis.rawAiResponse) {
      throw new AppError("AI response is missing from this analysis", 500);
    }

    // Parse the AI response
    const aiData = analysis.rawAiResponse as any;
    const selectedExperienceIds: string[] = aiData.experiencias || [];
    const selectedProjectIds: string[] = aiData.projetos || [];
    const selectedSkillNames: string[] = aiData.habilidades || [];

    // Fetch the base resume and all its parts
    const baseResume = await prisma.baseResume.findUnique({
      where: { userId },
      include: {
        experiences: true,
        projects: true,
        skills: true
      }
    });

    if (!baseResume) {
      throw new AppError("Base resume not found", 404);
    }

    // Filter to get only the selected items
    const selectedExperiences = baseResume.experiences.filter((exp) =>
      selectedExperienceIds.includes(exp.id)
    );

    const selectedProjects = baseResume.projects.filter((proj) =>
      selectedProjectIds.includes(proj.id)
    );

    // AI might return skill names instead of IDs, so let's match by name (case-insensitive)
    const selectedSkills = baseResume.skills.filter((skill) =>
      selectedSkillNames.some((name) => name.toLowerCase() === skill.name.toLowerCase())
    );

    // Create the ForgedResume
    const title = analysis.title ? `Currículo Forjado - ${analysis.title}` : "Currículo Forjado";

    const forgedResume = await prisma.forgedResume.create({
      data: {
        userId,
        jobAnalysisId: analysisId,
        title,
        status: "FORGED",
        score: analysis.score || 0,
        optimizedSummary: analysis.summary || "",
        selectedSkills: selectedSkills as any,
        selectedExperiences: selectedExperiences as any,
        selectedProjects: selectedProjects as any,
        foundKeywords: analysis.foundKeywords || [],
        missingKeywords: analysis.missingKeywords || []
      }
    });

    return forgedResume;
  }

  async getUserForgedResumes(userId: string) {
    return await prisma.forgedResume.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        score: true,
        createdAt: true,
        jobAnalysis: {
          select: {
            title: true,
            company: true
          }
        }
      }
    });
  }

  async getForgedResumeById(userId: string, id: string) {
    const resume = await prisma.forgedResume.findUnique({
      where: { id },
      include: {
        jobAnalysis: true
      }
    });

    if (!resume) {
      throw new AppError("Forged resume not found", 404);
    }

    if (resume.userId !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    return resume;
  }

  async deleteForgedResume(userId: string, id: string) {
    const resume = await prisma.forgedResume.findUnique({
      where: { id }
    });

    if (!resume) {
      throw new AppError("Forged resume not found", 404);
    }

    if (resume.userId !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    await prisma.forgedResume.delete({
      where: { id }
    });
  }
}
