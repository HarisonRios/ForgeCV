"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/services/api";

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
      setError(err.response?.data?.message || "Erro ao processar PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8 border-b border-[var(--border-color)] pb-4">
        <h1 className="text-3xl font-bold">Currículo Base</h1>
        <p className="text-[var(--text-muted)]">Faça o upload do seu currículo atual em PDF para extrairmos seus dados.</p>
      </header>

      <div className="card text-center py-12">
        {success ? (
          <div className="flex flex-col items-center animate-pulse">
            <CheckCircle size={64} className="text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Sucesso!</h2>
            <p className="text-[var(--text-muted)] mb-6">
              Seu minério foi processado e armazenado. Agora você está pronto para forjar currículos personalizados.
            </p>
            <button onClick={() => setSuccess(false)} className="btn-secondary">
              Substituir Currículo Base
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="p-6 bg-[var(--background)] rounded-full mb-6">
              <UploadCloud size={48} className="text-[var(--orange-forge)]" />
            </div>
            
            <label className="cursor-pointer">
              <span className="btn-secondary inline-block mb-4">Selecionar Arquivo PDF</span>
              <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
            </label>
            
            {file && (
              <div className="text-[var(--orange-highlight)] font-semibold mb-6">
                Arquivo selecionado: {file.name}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded mb-6">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <button 
              onClick={handleUpload} 
              disabled={!file || loading}
              className={`btn-primary w-full max-w-xs ${(!file || loading) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Derretendo PDF..." : "Processar Currículo"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
