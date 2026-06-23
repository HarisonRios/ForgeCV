import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
      <div className="glass-card w-full max-w-md animate-enter flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[var(--orange-forge)] blur-[30px] opacity-20 rounded-full animate-pulse"></div>
          <Flame size={80} className="text-[var(--orange-forge)] relative z-10" />
        </div>
        
        <h1 className="text-6xl font-black text-white mb-2 tracking-tighter">404</h1>
        <h2 className="text-xl font-bold mb-4 text-[var(--orange-forge)] uppercase tracking-widest text-sm">Fogo Apagado</h2>
        
        <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed">
          Parece que você se afastou muito da fornalha. O minério ou a página que você procura não existe ou foi derretido completamente.
        </p>
        
        <Link 
          href="/"
          className="w-full bg-[var(--orange-forge)] hover:bg-[var(--orange-highlight)] text-white hover:shadow-[0_0_15px_rgba(255,107,0,0.5)] transition-all py-3 rounded-full font-bold text-sm uppercase tracking-wide flex items-center justify-center"
        >
          Voltar para o calor da Forja
        </Link>
      </div>
    </main>
  );
}
