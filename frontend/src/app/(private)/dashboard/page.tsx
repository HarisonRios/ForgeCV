"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Briefcase, Activity, ExternalLink } from "lucide-react";
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

  if (loading) return <div className="text-center py-20 animate-pulse text-[var(--orange-forge)]">Carregando a Forja...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8 border-b border-[var(--border-color)] pb-4">
        <h1 className="text-3xl font-bold">Bem-vindo, {user?.name}</h1>
        <p className="text-[var(--text-muted)]">Veja o resumo do seu arsenal.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card flex items-center gap-4">
          <div className="p-4 bg-[var(--background)] rounded-full">
            <FileText className="text-[var(--orange-forge)]" size={32} />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">Currículos Forjados</p>
            <p className="text-3xl font-bold">{metrics?.totalForgedResumes || 0}</p>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <div className="p-4 bg-[var(--background)] rounded-full">
            <Briefcase className="text-[var(--orange-highlight)]" size={32} />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">Vagas Analisadas</p>
            <p className="text-3xl font-bold">{metrics?.totalAnalyses || 0}</p>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <div className="p-4 bg-[var(--background)] rounded-full">
            <Activity className="text-green-500" size={32} />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">Compatibilidade Média</p>
            <p className="text-3xl font-bold">{metrics?.averageCompatibility || 0}%</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Últimas Forjas
        </h2>
        {metrics?.recentForges && metrics.recentForges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.recentForges.map((forge: any) => (
              <div key={forge.id} className="card hover-glow flex justify-between items-center group">
                <div>
                  <h3 className="font-semibold text-lg">{forge.jobAnalysis?.title || forge.title}</h3>
                  <p className="text-sm text-[var(--orange-highlight)]">{forge.jobAnalysis?.company}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    Score: <span className="font-bold text-white">{forge.score}/100</span>
                  </p>
                </div>
                <Link href={`/forged/${forge.id}`} className="p-2 text-[var(--text-muted)] group-hover:text-[var(--orange-forge)] forge-transition">
                  <ExternalLink size={24} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12 text-[var(--text-muted)]">
            Nenhum currículo forjado ainda. Vá para "A Forja" e derreta suas experiências!
          </div>
        )}
      </div>
    </div>
  );
}
