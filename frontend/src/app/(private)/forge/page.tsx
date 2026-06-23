"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Anvil, AlertCircle, Sparkles, Send, ArrowRight, ShieldAlert } from "lucide-react";
import { api } from "@/services/api";

const FORGING_PHASES = [
  "Iniciando fole da fornalha...",
  "Derretendo minério de experiências brutas...",
  "Analisando requisitos da vaga com IA...",
  "Extraindo palavras-chave estratégicas...",
  "Customizando conquistas profissionais...",
  "Moldando layout para sistemas ATS corporativos...",
  "Resfriando o aço. O currículo perfeito está pronto!"
];

export default function ForgePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phaseIndex, setPhaseIndex] = useState(0);

  // Rotate loading phases
  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setPhaseIndex((prev) => (prev + 1) % FORGING_PHASES.length);
      }, 2000);
    } else {
      setPhaseIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleForge = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Send Job Description to AI
      const aiResponse = await api.post("/ai/analyze-job", { title, company, jobDescription });
      const analysisId = aiResponse.data.id;

      // 2. Forge the Resume
      const forgeResponse = await api.post(`/forged-resumes/from-analysis/${analysisId}`);
      const forgedResumeId = forgeResponse.data.id;

      // 3. Redirect to forged visualization
      router.push(`/forged/${forgedResumeId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocorreu um erro durante a Forja. Certifique-se de que você já cadastrou seu Currículo Base na barra lateral.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[var(--orange-forge)]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="mb-4 border-b border-[#2D2D2D] pb-5 flex items-center gap-3">
        <div className="p-3 bg-[#2D2D2D]/60 rounded-xl text-[var(--orange-forge)]">
          <Anvil size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">A Forja</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Insira os dados da vaga abaixo. Nossa Inteligência Artificial moldará o currículo perfeito sob medida.
          </p>
        </div>
      </header>

      {/* Main Container Card */}
      <div className="card bg-[#2D2D2D]/20 border border-[#4A4A4A]/40 rounded-2xl p-8 shadow-xl backdrop-blur-sm relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-enter">
            {/* Pulsing forging furnace logo */}
            <div className="relative mb-8">
              <div className="absolute inset-0 w-20 h-20 bg-[var(--orange-forge)]/20 rounded-full blur-md animate-ping" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--orange-forge)] to-[var(--orange-highlight)] p-0.5 flex items-center justify-center shadow-lg relative z-10">
                <div className="w-full h-full bg-[#1E1E1E] rounded-full flex items-center justify-center">
                  <Anvil size={32} className="text-[var(--orange-forge)] animate-bounce" />
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Moldando Currículo Executivo</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mb-6">Estamos aquecendo as suas experiências passadas para alinhar com os requisitos da vaga alvo.</p>

            {/* Rotating phase text block */}
            <div className="bg-[#1E1E1E]/60 border border-[#2D2D2D] rounded-full px-6 py-2.5 inline-flex items-center gap-3 text-sm font-mono text-[var(--orange-highlight)] min-w-[320px] justify-center">
              <div className="w-3.5 h-3.5 border-2 border-[var(--orange-forge)] border-t-transparent rounded-full animate-spin" />
              <span>{FORGING_PHASES[phaseIndex]}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleForge} className="flex flex-col gap-6">
            {error && (
              <div className="flex items-start gap-2.5 text-red-400 bg-red-500/10 px-4.5 py-3 rounded-xl border border-red-500/20 text-sm">
                <ShieldAlert size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs text-[var(--text-muted)] px-1 font-semibold">Cargo / Título da Vaga</label>
                <input
                  type="text"
                  required
                  className="input-field !rounded-xl !px-4 !py-3 text-sm bg-[#1E1E1E]/80 border border-[#4A4A4A] focus:border-[var(--orange-forge)]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Desenvolvedor Front-end Sênior"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs text-[var(--text-muted)] px-1 font-semibold">Empresa</label>
                <input
                  type="text"
                  required
                  className="input-field !rounded-xl !px-4 !py-3 text-sm bg-[#1E1E1E]/80 border border-[#4A4A4A] focus:border-[var(--orange-forge)]"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ex: Tech Corp"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs text-[var(--text-muted)] px-1 font-semibold">Descrição Completa da Vaga</label>
              <textarea
                required
                rows={10}
                className="input-field !rounded-xl !p-4 text-sm bg-[#1E1E1E]/80 border border-[#4A4A4A] focus:border-[var(--orange-forge)] resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Cole aqui todos os requisitos, responsabilidades e competências descritas na publicação da vaga (LinkedIn, Gupy, etc)..."
              />
            </div>

            <div className="flex justify-end mt-4">
              <button 
                type="submit" 
                className="btn-primary flex items-center gap-2 text-sm rounded-full py-3 px-8 shadow-[0_4px_15px_rgba(255,107,0,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all group"
              >
                <Anvil size={16} className="group-hover:rotate-12 transition-transform" />
                Forjar Currículo sob Medida
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Advice tip block */}
      {!loading && (
        <div className="bg-[#2D2D2D]/10 border border-[#4A4A4A]/20 rounded-xl p-4.5 text-xs text-[var(--text-muted)] leading-relaxed">
          <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[var(--orange-highlight)]" />
            Conselho do Mestre Armeiro
          </p>
          Quanto mais completa e detalhada for a descrição da vaga fornecida, melhor será o alinhamento de palavras-chave da IA. Tente colar a descrição completa contendo os requisitos obrigatórios e desejáveis.
        </div>
      )}
    </div>
  );
}
