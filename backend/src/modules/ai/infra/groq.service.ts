import Groq from "groq-sdk";

import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/app-error";

export interface AIAnalysisResult {
  score: number;
  resumo: string;
  habilidades: string[];
  experiencias: any[];
  projetos: any[];
  palavrasChaveEncontradas: string[];
  palavrasChaveAusentes: string[];
}

export class GroqService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: env.GROQ_API_KEY
    });
  }

  async analyzeJobMatch(
    systemPrompt: string,
    userPrompt: string,
    model = "llama3-70b-8192"
  ): Promise<AIAnalysisResult> {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        model: model,
        temperature: 0.2,
        max_tokens: 4096,
        response_format: { type: "json_object" }
      });

      const responseContent = completion.choices[0]?.message?.content;

      if (!responseContent) {
        throw new AppError("Empty response from AI", 500);
      }

      const parsedResponse = JSON.parse(responseContent) as AIAnalysisResult;

      return parsedResponse;
    } catch (error: any) {
      console.error("Error analyzing job match with Groq:", error);
      throw new AppError(error.message || "Failed to analyze job match", 500);
    }
  }
}
