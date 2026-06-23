"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle, AlertCircle, FileText, ArrowRight, RefreshCw } from "lucide-react";
import { api } from "@/services/api";
import Link from "next/link";

export default function BaseResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccess(false);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/uploads/original-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao processar PDF. Certifique-se de que é um PDF válido.");
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[var(--orange-forge)]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="mb-4 border-b border-[#2D2D2D] pb-5">
        <h1 className="text-3xl font-extrabold text-white">Currículo Base</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Faça o upload do seu histórico profissional original em PDF. A IA extrairá seus dados para alimentar a forja.
        </p>
      </header>

      {/* Main Container Card */}
      <div className="card bg-[#2D2D2D]/20 border border-[#4A4A4A]/40 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
        {success ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.15)] animate-pulse">
              <CheckCircle size={36} />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Minério Processado!</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-md mb-8">
              Seu currículo base foi lido com sucesso pela inteligência artificial. Seus dados estão guardados no banco de dados e prontos para moldagem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
              <Link href="/forge" className="btn-primary flex items-center justify-center gap-2 text-sm rounded-full py-3 px-6">
                Ir Para a Forja
                <ArrowRight size={16} />
              </Link>
              <button 
                onClick={() => setSuccess(false)} 
                className="btn-secondary flex items-center justify-center gap-2 text-sm rounded-full py-3 px-6"
              >
                <RefreshCw size={14} />
                Substituir PDF Base
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-stretch">
            
            {/* Custom Drag Drop Zone */}
            <label className="border-2 border-dashed border-[#4A4A4A]/70 hover:border-[var(--orange-forge)]/70 bg-[#1E1E1E]/40 hover:bg-[#1E1E1E]/60 rounded-2xl p-10 cursor-pointer flex flex-col items-center justify-center transition-all duration-300 group">
              <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
              
              <div className="p-4 bg-[#2D2D2D]/60 group-hover:bg-[var(--orange-forge)]/10 rounded-full mb-4 text-[var(--text-muted)] group-hover:text-[var(--orange-forge)] transition-colors">
                <UploadCloud size={36} />
              </div>
              
              <span className="font-bold text-white text-base mb-1">Selecionar Currículo PDF</span>
              <span className="text-xs text-[var(--text-muted)]">Arraste ou clique para buscar no seu dispositivo (Max 10MB)</span>
            </label>

            {/* Selected File Details Box */}
            {file && (
              <div className="mt-6 flex items-center justify-between p-4 bg-[#2D2D2D]/40 border border-[#4A4A4A]/40 rounded-xl animate-enter">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#1E1E1E] rounded-lg text-[var(--orange-highlight)]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white truncate max-w-xs md:max-w-md">{file.name}</p>
                    <p className="text-xs text-[var(--text-muted)] font-mono">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setFile(null)} 
                  className="text-xs text-red-400 hover:text-red-300 font-semibold px-3 py-1 rounded-full border border-red-500/10 hover:bg-red-500/10 transition-all"
                >
                  Remover
                </button>
              </div>
            )}

            {/* Error Message Box */}
            {error && (
              <div className="mt-6 flex items-start gap-2.5 text-red-400 bg-red-500/10 px-4.5 py-3 rounded-xl border border-red-500/20 text-sm">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="mt-8 flex justify-center">
              <button 
                onClick={handleUpload} 
                disabled={!file || loading}
                className={`btn-primary w-full max-w-xs flex items-center justify-center gap-2 text-base shadow-[0_4px_12px_rgba(255,107,0,0.2)] ${
                  (!file || loading) ? "opacity-50 cursor-not-allowed hover:shadow-none" : "hover:scale-[1.01]"
                } active:scale-[0.99]`}
              >
                {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {loading ? "Derretendo PDF..." : "Processar Currículo"}
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Info Tip block */}
      {!success && (
        <div className="bg-[#2D2D2D]/10 border border-[#4A4A4A]/20 rounded-xl p-4.5 text-xs text-[var(--text-muted)] leading-relaxed">
          <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
            <AlertCircle size={14} className="text-[var(--orange-highlight)]" />
            Por que um currículo base?
          </p>
          O currículo base serve como o seu banco de talentos pessoal. Sempre que você se candidatar a uma nova vaga, nossa inteligência artificial puxará as informações originais deste arquivo para reescrever seu currículo sob medida para a oportunidade em questão.
        </div>
      )}
    </div>
  );
}
