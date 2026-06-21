import fs from "node:fs/promises";
import path from "node:path";
import handlebars from "handlebars";
import puppeteer from "puppeteer";

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/prisma/prisma";

export class PdfService {
  private async getTemplateHtml() {
    const templatePath = path.resolve(__dirname, "../templates/resume.hbs");
    try {
      const templateContent = await fs.readFile(templatePath, "utf-8");
      return templateContent;
    } catch (error) {
      throw new AppError("Failed to read PDF template", 500);
    }
  }

  async generatePdfForForgedResume(userId: string, forgedResumeId: string): Promise<Buffer> {
    const forgedResume = await prisma.forgedResume.findUnique({
      where: { id: forgedResumeId },
      include: { user: { include: { profile: true } } }
    });

    if (!forgedResume) {
      throw new AppError("Forged resume not found", 404);
    }

    if (forgedResume.userId !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    const templateHtml = await this.getTemplateHtml();
    
    // Register some Handlebars helpers
    handlebars.registerHelper('eq', (a, b) => a === b);
    handlebars.registerHelper('formatDate', (dateString) => {
      if (!dateString) return 'Present';
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });

    const template = handlebars.compile(templateHtml);
    
    // Compile data context
    const dataContext = {
      profile: forgedResume.user.profile,
      user: forgedResume.user,
      title: forgedResume.title,
      summary: forgedResume.optimizedSummary,
      experiences: forgedResume.selectedExperiences,
      projects: forgedResume.selectedProjects,
      skills: forgedResume.selectedSkills
    };

    const html = template(dataContext);

    // Launch puppeteer
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20mm", bottom: "20mm", left: "20mm", right: "20mm" }
      });

      await browser.close();

      return Buffer.from(pdfBuffer);
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      throw new AppError("Failed to generate PDF document", 500);
    }
  }
}
