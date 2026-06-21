"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, user } = response.data;
      signIn(accessToken, user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao realizar login");
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/forge.gif" alt="ForgeCV Logo" width={64} height={64} className="rounded-md mb-4" />
          <h2 className="text-2xl font-bold">Acesso à Forja</h2>
          <p className="text-[var(--text-muted)] text-sm">Insira suas credenciais para continuar</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-[var(--text-muted)] mt-6">
          Ainda não tem conta?{" "}
          <Link href="/register" className="text-[var(--orange-forge)] hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
