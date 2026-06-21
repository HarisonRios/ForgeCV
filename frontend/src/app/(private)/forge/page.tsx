"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Anvil, AlertCircle } from "lucide-react";
import { api } from "@/services/api";

export default function ForgePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError(err.response?.data?.message || "Ocorreu um erro durante a Forja. Verifique se você já possui um Currículo Base.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 border-b border-[var(--border-color)] pb-4 flex items-center gap-3">
        <Anvil size={32} className="text-[var(--orange-forge)]" />
        <div>
          <h1 className="text-3xl font-bold">A Forja</h1>
          <p className="text-[var(--text-muted)]">Insira os dados da vaga e deixe a IA moldar seu currículo perfeito.</p>
        </div>
      </header>

      <div className="card">
        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded mb-6">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleForge} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Cargo / Título da Vaga</label>
              <input
                type="text"
                required
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Desenvolvedor Front-end Sênior"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Empresa</label>
              <input
                type="text"
                required
                className="input-field"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Tech Corp"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Descrição Completa da Vaga</label>
            <textarea
              required
              rows={10}
              className="input-field resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Cole aqui toda a descrição da vaga (requisitos, diferenciais, etc)..."
            />
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className={`btn-primary flex items-center gap-2 text-lg px-8 py-3 ${loading ? "animate-pulse" : ""}`}
            >
              <Anvil size={24} />
              {loading ? "Fogo aceso! Forjando..." : "Bater o Martelo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
