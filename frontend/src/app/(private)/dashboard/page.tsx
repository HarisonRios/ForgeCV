"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Briefcase, Activity, ExternalLink, Flame, Sparkles, Plus, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const response = await api.get("/dashboard/metrics");
        setMetrics(response.data);
      } catch (err) {
        console.error("Erro ao carregar métricas", err);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-10 h-10 border-4 border-[var(--orange-forge)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-[var(--orange-forge)] animate-pulse uppercase tracking-wider">Derretendo Minério... Carregando Forja</p>
      </div>
    );
  }

  // Helper to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400 bg-green-500/10 border-green-500/20";
    if (score >= 75) return "text-[var(--orange-highlight)] bg-[var(--orange-forge)]/10 border-[var(--orange-forge)]/20";
    return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[var(--orange-forge)]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* 1. WELCOME GREETING BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2D2D2D]/60 to-[#1E1E1E]/40 border border-[#4A4A4A]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl backdrop-blur-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[var(--orange-forge)]/10 border border-[var(--orange-forge)]/20 rounded-full px-3 py-1 text-[10px] text-[var(--orange-highlight)] font-mono font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Status: Ferreiro Mestre
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Bem-vindo à sua Oficina, {user?.name}</h1>
          <p className="text-sm text-[var(--text-muted)] max-w-xl">
            Seu arsenal está pronto. Comece a moldar currículos sob medida para as vagas do mercado e aumente sua taxa de aprovação em triagens.
          </p>
        </div>

        <Link href="/forge" className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap shadow-[0_4px_15px_rgba(255,107,0,0.3)]">
          <Plus size={16} />
          Forjar Novo Currículo
        </Link>
      </div>

      {/* 2. METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="card hover-glow flex items-center justify-between p-6 bg-[#2D2D2D]/30 border border-[#4A4A4A]/30 rounded-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Currículos Forjados</p>
            <p className="text-4xl font-extrabold font-mono text-white">{metrics?.totalForgedResumes || 0}</p>
          </div>
          <div className="p-3.5 bg-[#1E1E1E] border border-[#4A4A4A]/40 rounded-xl text-[var(--orange-forge)] shadow-md">
            <FileText size={24} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card hover-glow flex items-center justify-between p-6 bg-[#2D2D2D]/30 border border-[#4A4A4A]/30 rounded-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Vagas Analisadas</p>
            <p className="text-4xl font-extrabold font-mono text-white">{metrics?.totalAnalyses || 0}</p>
          </div>
          <div className="p-3.5 bg-[#1E1E1E] border border-[#4A4A4A]/40 rounded-xl text-[var(--orange-highlight)] shadow-md">
            <Briefcase size={24} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card hover-glow flex items-center justify-between p-6 bg-[#2D2D2D]/30 border border-[#4A4A4A]/30 rounded-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Compatibilidade Média</p>
            <p className="text-4xl font-extrabold font-mono text-white">{metrics?.averageCompatibility || 0}%</p>
          </div>
          <div className="p-3.5 bg-[#1E1E1E] border border-[#4A4A4A]/40 rounded-xl text-green-400 shadow-md">
            <Activity size={24} />
          </div>
        </div>

      </div>

      {/* 3. RECENT FORGES LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Flame size={18} className="text-[var(--orange-forge)]" />
          Últimas Armas Forjadas
        </h2>

        {metrics?.recentForges && metrics.recentForges.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {metrics.recentForges.map((forge: any) => {
              const score = forge.score || 0;
              const title = forge.jobAnalysis?.title || forge.title;
              const company = forge.jobAnalysis?.company || forge.company;
              return (
                <div 
                  key={forge.id} 
                  className="card hover-glow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#2D2D2D]/20 border border-[#4A4A4A]/30 rounded-xl p-5 hover:bg-[#2D2D2D]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#1E1E1E] border border-[#4A4A4A]/40 rounded-lg text-[var(--orange-forge)]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-[var(--orange-forge)] transition-colors">{title}</h3>
                      <p className="text-xs text-[var(--text-muted)]">{company}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-[#2D2D2D] sm:border-0 pt-3 sm:pt-0">
                    <div className={`px-3 py-1 rounded-full border text-xs font-mono font-bold ${getScoreColor(score)}`}>
                      Score: {score}%
                    </div>
                    <Link 
                      href={`/forged/${forge.id}`} 
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-white transition-colors bg-[#2D2D2D]/50 hover:bg-[#2D2D2D] px-3.5 py-2 rounded-full border border-[#4A4A4A]/40"
                    >
                      Acessar PDF
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card border border-dashed border-[#4A4A4A]/60 bg-[#2D2D2D]/10 rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <AlertCircle size={40} className="text-[var(--text-muted)] mb-3" />
            <h3 className="font-bold text-white mb-1">Nenhum currículo forjado</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mb-6">
              Você ainda não gerou nenhuma versão. Vá para a página &quot;A Forja&quot;, informe os detalhes da vaga e crie sua primeira arma profissional!
            </p>
            <Link href="/forge" className="btn-primary text-sm flex items-center gap-2 rounded-full">
              Forjar Meu Primeiro Currículo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
