"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/error-handler";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, user } = response.data;
      signIn(accessToken, user);
      toast.success("Login realizado com sucesso!");
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-6 bg-[#1E1E1E] overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[var(--orange-forge)]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-[var(--orange-highlight)]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating Home Link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-white transition-colors bg-[#2D2D2D]/60 border border-[#4A4A4A]/50 rounded-full px-4.5 py-2 backdrop-blur-sm shadow-md"
      >
        <ArrowLeft size={14} />
        Voltar ao início
      </Link>

      <motion.div 
        key="login-card"
        initial={{ opacity: 0, y: 15, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-md flex flex-col items-center border border-[#4A4A4A]/40 p-8 shadow-2xl relative z-10"
      >
        <img src="/forge.gif" alt="ForgeCV Logo" width={72} height={72} className="mb-4" />
        <h2 className="text-2xl font-bold text-white mb-1">Acesse a Forja</h2>
        <p className="text-xs text-[var(--text-muted)] mb-8 text-center">Entre para moldar suas conquistas profissionais</p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 mb-6">
          <div className="flex flex-col gap-1.5 relative w-full">
            <label className="text-xs text-[var(--text-muted)] px-1 font-semibold">Seu e-mail</label>
            <div className="relative">
              <span className="absolute left-4 top-0 bottom-0 flex items-center text-[var(--text-muted)] pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                className="input-field !rounded-xl !pl-11 pr-5 py-2.5 text-sm bg-[#1E1E1E]/80 border border-[#4A4A4A] focus:border-[var(--orange-forge)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ferreiro@forja.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative w-full">
            <label className="text-xs text-[var(--text-muted)] px-1 font-semibold">Sua senha</label>
            <div className="relative">
              <span className="absolute left-4 top-0 bottom-0 flex items-center text-[var(--text-muted)] pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="input-field !rounded-xl !pl-11 !pr-12 py-2.5 text-sm bg-[#1E1E1E]/80 border border-[#4A4A4A] focus:border-[var(--orange-forge)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-0 bottom-0 flex items-center text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[var(--orange-forge)] hover:bg-[var(--orange-highlight)] text-white hover:shadow-[0_0_15px_rgba(255,107,0,0.45)] transition-all py-3 rounded-full font-bold mt-2 text-sm uppercase tracking-wider active:scale-[0.98]"
          >
            Entrar na Forja
          </button>
        </form>

        <div className="w-full flex items-center gap-4 mb-6 text-[var(--text-muted)] text-sm">
          <div className="flex-1 h-px bg-[#2D2D2D]"></div>
          <span className="uppercase text-[10px] tracking-widest font-bold text-[#4A4A4A]">ou</span>
          <div className="flex-1 h-px bg-[#2D2D2D]"></div>
        </div>

        <div className="w-full flex flex-col gap-3 mb-6">
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#4A4A4A] hover:border-[var(--orange-forge)] transition-all py-2.5 rounded-full font-medium text-sm text-[var(--text-muted)] hover:text-white active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44-3.95 0-7.14-3.18-7.14-7.12s3.19-7.12 7.14-7.12c1.81 0 3.32.65 4.5 1.71l2.06-2.06C17.06 2.91 14.86 2 12.18 2 6.64 2 2.18 6.46 2.18 12s4.46 10 10 10c5.77 0 9.6-4.06 9.6-9.77 0-.83-.11-1.45-.43-2.13z"/>
            </svg>
            Continuar com Google
          </button>
        </div>

        <p className="text-[var(--text-muted)] text-sm">
          Ainda não tem conta?{" "}
          <Link href="/register" className="text-white hover:text-[var(--orange-forge)] underline transition-colors font-semibold">
            Cadastre-se
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
