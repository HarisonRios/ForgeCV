"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { name, email, password });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao realizar cadastro");
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/forge.gif" alt="ForgeCV Logo" width={64} height={64} className="rounded-md mb-4" />
          <h2 className="text-2xl font-bold">Nova Forja</h2>
          <p className="text-[var(--text-muted)] text-sm">Crie sua conta para começar</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nome Completo</label>
            <input
              type="text"
              required
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mestre Ferreiro"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Senha</label>
            <input
              type="password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary mt-2">
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center text-[var(--text-muted)] mt-6">
          Já possui conta?{" "}
          <Link href="/login" className="text-[var(--orange-forge)] hover:underline">
            Entre aqui
          </Link>
        </p>
      </div>
    </main>
  );
}
