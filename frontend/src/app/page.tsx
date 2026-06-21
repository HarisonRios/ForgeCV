import Link from "next/link";
import { Flame, FileText, Bot, FileDown } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-20">
      <div className="mb-6 flex justify-center">
        <img src="/forge.gif" alt="ForgeCV Logo" width={96} height={96} className="rounded-md" />
      </div>
      <h1 className="text-5xl font-extrabold mb-4">
        Forging your <span className="text-[var(--orange-highlight)]">Future</span>
      </h1>
      <p className="text-lg text-[var(--text-muted)] max-w-2xl mb-12">
        ForgeCV utiliza Inteligência Artificial avançada para analisar vagas e derreter suas experiências e habilidades brutas, moldando um currículo perfeitamente forjado para garantir sua próxima entrevista.
      </p>

      <div className="flex gap-4 mb-20">
        <Link href="/register" className="btn-primary text-lg px-8 py-3">
          Forjar Agora
        </Link>
        <Link href="/login" className="btn-secondary text-lg px-8 py-3">
          Acessar Conta
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-left">
        <div className="card hover-glow flex flex-col items-center text-center">
          <div className="p-4 bg-[var(--background)] rounded-full mb-4">
            <FileText size={32} className="text-[var(--orange-forge)]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Base Sólida</h3>
          <p className="text-sm text-[var(--text-muted)]">
            Cadastre todas as suas experiências uma única vez. Seu minério bruto de conhecimento ficará guardado com segurança.
          </p>
        </div>

        <div className="card hover-glow flex flex-col items-center text-center">
          <div className="p-4 bg-[var(--background)] rounded-full mb-4">
            <Bot size={32} className="text-[var(--orange-forge)]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Inteligência a Fogo</h3>
          <p className="text-sm text-[var(--text-muted)]">
            Nossa IA analisa a vaga que você deseja e extrai apenas o que importa, ignorando o lixo e destacando o ouro.
          </p>
        </div>

        <div className="card hover-glow flex flex-col items-center text-center">
          <div className="p-4 bg-[var(--background)] rounded-full mb-4">
            <FileDown size={32} className="text-[var(--orange-forge)]" />
          </div>
          <h3 className="text-xl font-bold mb-2">PDF Impecável</h3>
          <p className="text-sm text-[var(--text-muted)]">
            Gere um currículo imutável exportável em um layout escuro e moderno que chama a atenção imediata dos recrutadores.
          </p>
        </div>
      </div>
    </main>
  );
}
