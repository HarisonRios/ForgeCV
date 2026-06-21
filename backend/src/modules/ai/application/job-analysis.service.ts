import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/prisma/prisma";
import { GroqService } from "../infra/groq.service";

interface AnalyzeJobInput {
  userId: string;
  jobDescription: string;
  title?: string;
  company?: string;
}

export class JobAnalysisService {
  private groqService: GroqService;

  constructor() {
    this.groqService = new GroqService();
  }

  async analyzeJobMatch(data: AnalyzeJobInput) {
    const baseResume = await prisma.baseResume.findUnique({
      where: { userId: data.userId },
      include: {
        skills: true,
        experiences: true,
        projects: true,
        education: true,
        certifications: true,
        courses: true,
        languages: true
      }
    });

    if (!baseResume) {
      throw new AppError("Base resume not found. Please create one first.", 404);
    }

    // Create a pending job analysis
    const jobAnalysis = await prisma.jobAnalysis.create({
      data: {
        userId: data.userId,
        title: data.title,
        company: data.company,
        jobDescription: data.jobDescription,
        status: "PENDING"
      }
    });

    try {
      // Build the JSON representation of the resume to send to AI
      const resumeContext = {
        title: baseResume.title,
        summary: baseResume.professionalSummary,
        skills: baseResume.skills.map((s) => ({ id: s.id, name: s.name, level: s.level })),
        experiences: baseResume.experiences.map((e) => ({
          id: e.id,
          company: e.company,
          position: e.position,
          description: e.description,
          achievements: e.achievements,
          technologies: e.technologies
        })),
        projects: baseResume.projects.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          role: p.role,
          technologies: p.technologies,
          highlights: p.highlights
        }))
      };

      const systemPrompt = `
Você é um Arquiteto de Software e Recrutador Especialista (IA da plataforma ForgeCV).
Seu objetivo é analisar uma VAGA DE EMPREGO e comparar com o CURRÍCULO BASE de um candidato.
Você atua como uma 'forja', moldando os 'materiais' do usuário para criar o melhor currículo possível para aquela vaga.

REGRAS ESTritas:
1. NUNCA invente informações, habilidades, projetos ou experiências que não estejam no currículo base do candidato.
2. Identifique os itens do currículo que têm maior sinergia com a vaga.
3. Você deve retornar um objeto JSON estritamente neste formato:
{
  "score": <number 0-100 representando a compatibilidade>,
  "resumo": "<string com um resumo profissional otimizado focado na vaga, reescrito usando as informações reais do candidato>",
  "habilidades": ["<nome das habilidades selecionadas>"],
  "experiencias": ["<apenas os IDs das experiências relevantes encontradas>"],
  "projetos": ["<apenas os IDs dos projetos relevantes encontrados>"],
  "palavrasChaveEncontradas": ["<palavras da vaga presentes no currículo>"],
  "palavrasChaveAusentes": ["<palavras da vaga que o candidato não possui>"]
}

Baseie-se puramente nos dados fornecidos abaixo:
Currículo Base:
${JSON.stringify(resumeContext, null, 2)}
`;

      const userPrompt = `
Vaga de Emprego (Descrição):
${data.jobDescription}

${data.title ? `Título: ${data.title}` : ""}
${data.company ? `Empresa: ${data.company}` : ""}

Analise a vaga, compare com meu currículo base e retorne o JSON solicitado.
`;

      const aiResult = await this.groqService.analyzeJobMatch(systemPrompt, userPrompt);

      // Update the job analysis with the results
      const updatedAnalysis = await prisma.jobAnalysis.update({
        where: { id: jobAnalysis.id },
        data: {
          status: "COMPLETED",
          score: aiResult.score,
          summary: aiResult.resumo,
          foundKeywords: aiResult.palavrasChaveEncontradas,
          missingKeywords: aiResult.palavrasChaveAusentes,
          rawAiResponse: aiResult as any
        }
      });

      return updatedAnalysis;
    } catch (error: any) {
      await prisma.jobAnalysis.update({
        where: { id: jobAnalysis.id },
        data: {
          status: "FAILED",
          errorMessage: error.message
        }
      });

      throw new AppError("Failed to analyze job match: " + error.message, 500);
    }
  }

  async getAnalysis(userId: string, analysisId: string) {
    const analysis = await prisma.jobAnalysis.findUnique({
      where: { id: analysisId }
    });

    if (!analysis) {
      throw new AppError("Job analysis not found", 404);
    }

    if (analysis.userId !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    return analysis;
  }
}
