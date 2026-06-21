import { prisma } from "../../../shared/prisma/prisma";

export class DashboardService {
  async getDashboardMetrics(userId: string) {
    const [
      totalAnalyses,
      totalForgedResumes,
      averageScoreResult,
      recentForges
    ] = await prisma.$transaction([
      // Quantidade de vagas analisadas
      prisma.jobAnalysis.count({
        where: { userId }
      }),

      // Quantidade de currículos forjados
      prisma.forgedResume.count({
        where: { userId }
      }),

      // Compatibilidade média
      prisma.forgedResume.aggregate({
        where: { userId },
        _avg: {
          score: true
        }
      }),

      // Últimas forjas realizadas (últimos 5 currículos)
      prisma.forgedResume.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          score: true,
          createdAt: true,
          jobAnalysis: {
            select: {
              company: true,
              title: true
            }
          }
        }
      })
    ]);

    const averageCompatibility = averageScoreResult._avg.score
      ? Math.round(averageScoreResult._avg.score)
      : 0;

    return {
      totalAnalyses,
      totalForgedResumes,
      averageCompatibility,
      recentForges
    };
  }
}
