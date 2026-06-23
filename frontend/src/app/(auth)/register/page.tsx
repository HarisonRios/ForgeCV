"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/error-handler";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Por favor, preencha seu nome completo.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Por favor, preencha um e-mail válido.");
      return;
    }
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Conta criada com sucesso! Faça seu login.");
      router.push("/login");
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
        key="register-card"
        initial={{ opacity: 0, y: 15, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-md flex flex-col items-center border border-[#4A4A4A]/40 p-8 shadow-2xl relative z-10 overflow-hidden"
      >
        <img src="/forge.gif" alt="ForgeCV Logo" width={72} height={72} className="mb-4" />
        <h2 className="text-2xl font-bold text-white mb-1">Crie seu Arsenal</h2>
        <p className="text-xs text-[var(--text-muted)] mb-6 text-center">Cadastre-se para iniciar a forja do seu currículo</p>

        {/* Step Indicator */}
        <div className="w-full flex items-center justify-between mb-8 px-4">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step === 1
                ? "bg-[var(--orange-forge)] text-white shadow-[0_0_10px_rgba(255,107,0,0.4)]"
                : "bg-green-500 text-white"
              }`}>
              {step > 1 ? <Check size={14} /> : "1"}
            </div>
            <span className={`text-[9px] uppercase tracking-wider font-bold transition-colors ${step === 1 ? "text-white" : "text-[var(--text-muted)]"
              }`}>Perfil</span>
          </div>
          <div className={`h-[2px] flex-1 transition-colors duration-300 ${step > 1 ? "bg-green-500" : "bg-[#2D2D2D]"}`} />
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step === 2
                ? "bg-[var(--orange-forge)] text-white shadow-[0_0_10px_rgba(255,107,0,0.4)]"
                : "bg-[#2D2D2D] text-[var(--text-muted)] border border-[#4A4A4A]/50"
              }`}>
              2
            </div>
            <span className={`text-[9px] uppercase tracking-wider font-bold transition-colors ${step === 2 ? "text-white" : "text-[var(--text-muted)]"
              }`}>Segurança</span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="w-full min-h-[220px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step-1-fields"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex flex-col gap-1.5 relative w-full">
                  <label className="text-xs text-[var(--text-muted)] px-1 font-semibold">Nome Completo</label>
                  <div className="relative">
                    <span className="absolute left-4 top-0 bottom-0 flex items-center text-[var(--text-muted)] pointer-events-none">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      className="input-field !rounded-xl !pl-11 pr-5 py-2.5 text-sm bg-[#1E1E1E]/80 border border-[#4A4A4A] focus:border-[var(--orange-forge)]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mestre Ferreiro"
                    />
                  </div>
                </div>

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

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-[var(--orange-forge)] hover:bg-[var(--orange-highlight)] text-white hover:shadow-[0_0_15px_rgba(255,107,0,0.45)] transition-all py-3 rounded-full font-bold mt-2 text-sm uppercase tracking-wider active:scale-[0.98]"
                >
                  Avançar
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step-2-fields"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4 w-full"
              >
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

                <div className="flex flex-col gap-1.5 relative w-full">
                  <label className="text-xs text-[var(--text-muted)] px-1 font-semibold">Repetir senha</label>
                  <div className="relative">
                    <span className="absolute left-4 top-0 bottom-0 flex items-center text-[var(--text-muted)] pointer-events-none">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className="input-field !rounded-xl !pl-11 !pr-12 py-2.5 text-sm bg-[#1E1E1E]/80 border border-[#4A4A4A] focus:border-[var(--orange-forge)]"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-0 bottom-0 flex items-center text-[var(--text-muted)] hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary text-sm font-semibold active:scale-[0.98]"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-[var(--orange-forge)] hover:bg-[var(--orange-highlight)] text-white hover:shadow-[0_0_15px_rgba(255,107,0,0.45)] transition-all py-3 rounded-full font-bold text-sm uppercase tracking-wider active:scale-[0.98]"
                  >
                    Criar Conta
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="w-full flex items-center gap-4 my-6 text-[var(--text-muted)] text-sm">
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
              <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44-3.95 0-7.14-3.18-7.14-7.12s3.19-7.12 7.14-7.12c1.81 0 3.32.65 4.5 1.71l2.06-2.06C17.06 2.91 14.86 2 12.18 2 6.64 2 2.18 6.46 2.18 12s4.46 10 10 10c5.77 0 9.6-4.06 9.6-9.77 0-.83-.11-1.45-.43-2.13z" />
            </svg>
            Continuar com Google
          </button>
        </div>

        <p className="text-[var(--text-muted)] text-sm">
          Já possui conta?{" "}
          <Link href="/login" className="text-white hover:text-[var(--orange-forge)] underline transition-colors font-semibold">
            Entre aqui
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
