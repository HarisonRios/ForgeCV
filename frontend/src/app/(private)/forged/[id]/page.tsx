"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { api } from "@/services/api";

export default function ForgedResumeView() {
  const params = useParams();
  const id = params.id as string;
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function fetchResume() {
      try {
        const response = await api.get(`/forged-resumes/${id}`);
        setResume(response.data);
      } catch (err) {
        console.error("Erro ao carregar currículo", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResume();
  }, [id]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await api.get(`/forged-resumes/${id}/download-pdf`, {
        responseType: "blob"
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `forgecv-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Erro no download", err);
      alert("Falha ao gerar PDF.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div className="text-center py-20 animate-pulse text-[var(--orange-forge)]">Desenhando a Forja...</div>;
  if (!resume) return <div className="text-center py-20 text-red-400">Currículo não encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/dashboard" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--orange-forge)] forge-transition mb-6 w-fit">
        <ArrowLeft size={20} />
        Voltar ao Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{resume.title}</h1>
          <p className="text-[var(--text-muted)] mt-1">
            Vaga: {resume.jobAnalysis?.title} @ {resume.jobAnalysis?.company}
          </p>
        </div>
        
        <button 
          onClick={handleDownload} 
          disabled={downloading}
          className={`btn-primary flex items-center gap-2 ${downloading ? "opacity-70 animate-pulse" : ""}`}
        >
          <Download size={20} />
          {downloading ? "Forjando PDF..." : "Exportar PDF"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card border-l-4 border-l-[var(--orange-forge)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Resumo Otimizado (IA)</h2>
            <div className="flex items-center gap-1 bg-[var(--background)] px-3 py-1 rounded-full text-[var(--orange-highlight)]">
              <Star size={16} className="fill-current" />
              <span className="font-bold">Score: {resume.score}/100</span>
            </div>
          </div>
          <p className="text-[var(--text-muted)] whitespace-pre-line leading-relaxed">
            {resume.optimizedSummary}
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 border-b border-[var(--border-color)] pb-2 text-[var(--orange-forge)]">Habilidades Selecionadas</h2>
          <div className="flex flex-wrap gap-2">
            {resume.selectedSkills.map((skill: any) => (
              <span key={skill.id} className="bg-gradient-to-r from-[var(--orange-forge)] to-[var(--orange-highlight)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {skill.name}
              </span>
            ))}
            {resume.selectedSkills.length === 0 && <span className="text-[var(--text-muted)]">Nenhuma habilidade forte encontrada para esta vaga.</span>}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 border-b border-[var(--border-color)] pb-2 text-[var(--orange-forge)]">Experiências Destacadas</h2>
          <div className="space-y-6">
            {resume.selectedExperiences.map((exp: any) => (
              <div key={exp.id} className="border-l-2 border-[var(--border-color)] pl-4">
                <h3 className="text-lg font-bold">{exp.position} <span className="text-[var(--orange-highlight)]">@ {exp.company}</span></h3>
                <p className="text-sm text-[var(--text-muted)] mb-2">
                  {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Atual'}
                </p>
                <p className="text-[var(--text-muted)]">{exp.description}</p>
              </div>
            ))}
            {resume.selectedExperiences.length === 0 && <span className="text-[var(--text-muted)]">Nenhuma experiência conectada à vaga.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
