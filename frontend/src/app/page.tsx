"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  FileText, 
  Bot, 
  FileDown, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Cpu, 
  Layers, 
  Shield, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Globe, 
  Search, 
  Briefcase, 
  ArrowUpRight, 
  Lock
} from "lucide-react";

// Simulador interativo data
const SIMULATOR_DATA = {
  software: {
    id: "software",
    role: "Engenheiro de Software",
    score: 97,
    keywords: ["Next.js", "REST APIs", "MySQL", "Clean Code", "Docker", "TDD"],
    original: "Fiz sites com React e cuidei do banco de dados MySQL.",
    forged: "Desenvolvimento de aplicações web escaláveis em Next.js e otimização de queries MySQL, reduzindo em 30% a latência das requisições principais.",
    changes: [
      { from: "Fiz sites", to: "Desenvolvimento de aplicações web escaláveis em Next.js" },
      { from: "cuidei do banco", to: "otimização de queries MySQL (redução de 30% na latência)" }
    ]
  },
  pm: {
    id: "pm",
    role: "Gerente de Produto (Product Manager)",
    score: 94,
    keywords: ["Roadmap", "Scrum/Agile", "KPIs", "UX Research", "Analytics", "Stakeholders"],
    original: "Falei com clientes para decidir o que colocar no site e organizei as tarefas do time.",
    forged: "Definição de roadmap estratégico de produto orientado por dados de UX Research e liderança de ritos ágeis (Scrum), resultando em aumento de 15% no engajamento semanal.",
    changes: [
      { from: "Falei com clientes", to: "Definição de roadmap estratégico baseado em UX Research" },
      { from: "organizei as tarefas", to: "liderança de ritos ágeis (Scrum) focados no engajamento do usuário" }
    ]
  },
  data: {
    id: "data",
    role: "Analista de Dados (Data Analyst)",
    score: 96,
    keywords: ["Python", "Pandas", "PowerBI", "ETL", "A/B Testing", "SQL Server"],
    original: "Fazia relatórios de vendas e olhava planilhas de Excel para ajudar a diretoria.",
    forged: "Modelagem de dashboards interativos em PowerBI e desenvolvimento de pipelines ETL automatizados via Python, otimizando o tempo de relatório executivo em 4 horas semanais.",
    changes: [
      { from: "Fazia relatórios", to: "Modelagem de dashboards interativos em PowerBI" },
      { from: "olhava planilhas", to: "pipelines ETL automatizados via Python para suporte executivo" }
    ]
  }
};

type SimulatorKey = keyof typeof SIMULATOR_DATA;

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<SimulatorKey>("software");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroScore, setHeroScore] = useState(38);
  const [isScanned, setIsScanned] = useState(false);

  // Hero section scanning simulation on load
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsScanned(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      setHeroScore(96);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col selection:bg-[var(--orange-forge)] selection:text-white">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#2D2D2D]/60 bg-[#1E1E1E]/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <img src="/forge.gif" alt="ForgeCV Logo" width={44} height={44} className="group-hover:scale-105 transition-transform duration-300" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-[#D6D6D6] bg-clip-text text-transparent">
              Forge<span className="text-[var(--orange-forge)]">CV</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-muted)]">
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#simulador" className="hover:text-white transition-colors">Simulador</a>
            <a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-[var(--orange-forge)] transition-colors px-4 py-2">
              Entrar
            </Link>
            <Link href="/register" className="btn-primary flex items-center gap-2 text-sm rounded-full px-5 py-2.5 shadow-[0_4px_12px_rgba(255,107,0,0.2)]">
              Forjar Agora
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 flex flex-col items-center">
        {/* Glow Effects in Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--orange-forge)]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-10 right-[10%] w-[300px] h-[300px] bg-[var(--orange-highlight)]/5 rounded-full blur-[90px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 bg-[#2D2D2D] border border-[#4A4A4A] rounded-full px-3.5 py-1.5 w-fit mb-6 text-xs text-[var(--text-muted)] font-medium">
              <Sparkles size={14} className="text-[var(--orange-highlight)] animate-pulse" />
              <span>Inteligência Artificial Otimizada para ATS</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Forje o Currículo Perfeito para o <span className="text-[var(--orange-highlight)] bg-gradient-to-r from-[var(--orange-forge)] to-[var(--orange-highlight)] bg-clip-text text-transparent">Próximo Nível</span>
            </h1>
            
            <p className="text-base md:text-lg text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed">
              Não envie o mesmo currículo para vagas diferentes. O ForgeCV extrai as experiências do seu perfil base e molda um currículo perfeitamente alinhado a cada descrição de vaga em segundos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-primary text-base px-8 py-3.5 rounded-full flex items-center justify-center gap-2 group">
                Criar Conta Grátis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#simulador" className="btn-secondary text-base px-8 py-3.5 rounded-full flex items-center justify-center gap-2">
                Ver na Prática
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#2D2D2D] pt-8 max-w-md">
              <div>
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-xs text-[var(--text-muted)]">Aprovação em Triagens</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">15s</p>
                <p className="text-xs text-[var(--text-muted)]">Para Adaptar Currículo</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-[var(--text-muted)]">Foco em Privacidade</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-6 flex flex-col justify-center relative">
            <div className="relative w-full max-w-xl mx-auto bg-[#2D2D2D]/40 border border-[#4A4A4A]/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
              
              {/* Top Bar Decoration */}
              <div className="flex items-center justify-between pb-4 border-b border-[#2D2D2D] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="text-xs text-[var(--text-muted)] bg-[#1E1E1E] px-3 py-1 rounded-md border border-[#2D2D2D] font-mono">
                  cv_engine_v1.0.sh
                </div>
              </div>

              {/* Grid content inside preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Column Left: Raw experiences */}
                <div className="flex flex-col bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#2D2D2D]">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-xs font-mono text-[var(--text-muted)]">MINÉRIO BRUTO</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#2D2D2D]/50 p-2.5 rounded-lg border border-[#2D2D2D] text-xs leading-relaxed text-[var(--text-muted)]">
                      <p className="font-semibold text-white mb-1">Cargo anterior:</p>
                      &quot;Eu mexia com banco de dados MySQL e fazia sites em React pro cliente.&quot;
                    </div>
                    <div className="h-[2px] bg-[#2D2D2D] my-1" />
                    <div className="bg-[#2D2D2D]/30 p-2.5 rounded-lg border border-[#2D2D2D]/40 text-[10px] space-y-1.5">
                      <div className="h-2 bg-[#4A4A4A] rounded w-3/4" />
                      <div className="h-2 bg-[#4A4A4A] rounded w-full" />
                      <div className="h-2 bg-[#4A4A4A] rounded w-1/2" />
                    </div>
                  </div>
                </div>

                {/* Column Right: Forged optimized block */}
                <div className="flex flex-col bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-4 relative overflow-hidden">
                  {/* Scanning beam line */}
                  <AnimatePresence>
                    {!isScanned && (
                      <motion.div 
                        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--orange-forge)] to-transparent shadow-[0_0_8px_rgba(255,107,0,0.8)] z-10"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2D2D2D]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--orange-forge)] animate-ping" />
                      <span className="text-xs font-mono text-[var(--orange-forge)] font-semibold">MOLDAGEM IA</span>
                    </div>
                    <div className="text-[10px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20 font-mono">
                      ATS APTO
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[var(--orange-forge)]/5 border border-[var(--orange-forge)]/20 p-2.5 rounded-lg text-xs leading-relaxed">
                      <p className="font-semibold text-white mb-1">Resultado Forjado:</p>
                      &quot;Desenvolvimento de aplicações web escaláveis e otimização de MySQL, reduzindo em 30% a latência.&quot;
                    </div>
                    <div className="h-[2px] bg-[#2D2D2D] my-1" />
                    <div className="flex justify-between items-center bg-[#2D2D2D]/30 p-2 rounded-lg border border-[#2D2D2D]">
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">Pontuação ATS:</span>
                      <motion.span 
                        className="text-xs font-mono font-bold text-[var(--orange-highlight)]"
                      >
                        {heroScore}%
                      </motion.span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Lower info bubble inside preview */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-[var(--text-muted)] bg-[#1E1E1E] p-3 rounded-lg border border-[#2D2D2D]">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-[var(--orange-forge)]" />
                  <span>Destaque das palavras-chave mais relevantes da vaga</span>
                </div>
                <Check size={14} className="text-green-500 font-bold" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE BENEFITS (RECURSOS) */}
      <section id="recursos" className="py-24 bg-[#1E1E1E] border-t border-[#2D2D2D] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-semibold text-[var(--orange-forge)] uppercase tracking-widest mb-3">Engenharia por Trás</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">O que torna o ForgeCV único?</h3>
            <p className="text-[var(--text-muted)] mt-4 leading-relaxed">
              Desenvolvemos uma solução focada na conversão de vagas. Sem formatações extravagantes ou linguagens genéricas geradas por bots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Import once */}
            <div className="card hover-glow flex flex-col group relative transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center mb-6 text-[var(--orange-forge)] group-hover:bg-[var(--orange-forge)] group-hover:text-white transition-colors duration-300">
                <Layers size={22} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Importação Unificada</h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Cadastre seus projetos, habilidades, cargos e certificações uma única vez. Elas formam seu arsenal bruto estruturado.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--orange-forge)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Saber mais</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 2: AI Engine adaptation */}
            <div className="card hover-glow flex flex-col group relative transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center mb-6 text-[var(--orange-forge)] group-hover:bg-[var(--orange-forge)] group-hover:text-white transition-colors duration-300">
                <Bot size={22} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Moldagem Contextual</h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Para cada link ou texto de vaga que você fornece, nossa IA seleciona e reescreve suas realizações para combinar exatamente com as exigências.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--orange-forge)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Saber mais</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 3: ATS Approval */}
            <div className="card hover-glow flex flex-col group relative transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center mb-6 text-[var(--orange-forge)] group-hover:bg-[var(--orange-forge)] group-hover:text-white transition-colors duration-300">
                <Shield size={22} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Estruturas Anti-Filtro (ATS)</h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Nossos modelos são desenhados para passarem sem erros pelos leitores automáticos (Taleo, Gupy, Workday), mantendo layout impecável e limpo.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--orange-forge)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Saber mais</span>
                <ArrowRight size={14} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (COMO FUNCIONA) */}
      <section id="como-funciona" className="py-24 bg-[#2D2D2D]/20 border-t border-[#2D2D2D] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-semibold text-[var(--orange-forge)] uppercase tracking-widest mb-3">Fluxo do Sucesso</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Quatro passos até a entrevista</h3>
            <p className="text-[var(--text-muted)] mt-4 leading-relaxed">
              O processo de preparação de um currículo estratégico simplificado ao extremo para otimizar seu tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-start relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center text-sm font-bold text-[var(--orange-forge)]">
                  01
                </div>
                <div className="h-[1px] bg-gradient-to-r from-[#4A4A4A] to-transparent flex-1 hidden md:block w-24 absolute left-12 top-5" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Forneça o Histórico</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Insira todas as suas realizações e projetos anteriores. Não se preocupe com o formato ainda: nós guardamos a base sólida.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center text-sm font-bold text-[var(--orange-forge)]">
                  02
                </div>
                <div className="h-[1px] bg-gradient-to-r from-[#4A4A4A] to-transparent flex-1 hidden md:block w-24 absolute left-12 top-5" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Insira o Link da Vaga</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Cole a URL ou a descrição de requisitos da vaga corporativa para a qual deseja se candidatar agora.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center text-sm font-bold text-[var(--orange-forge)]">
                  03
                </div>
                <div className="h-[1px] bg-gradient-to-r from-[#4A4A4A] to-transparent flex-1 hidden md:block w-24 absolute left-12 top-5" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Ajuste da IA (A Forja)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Nossa IA inteligente mapeia os requisitos, cruza com suas habilidades e reescreve tópicos gerando compatibilidade máxima.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-start relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--orange-forge)] border border-[var(--orange-forge)] flex items-center justify-center text-sm font-bold text-white">
                  04
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Exportação ATS</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Baixe seu arquivo pronto em PDF otimizado de alta performance. Envie à vaga e se prepare para os contatos.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SCORE SIMULATOR (SIMULADOR) */}
      <section id="simulador" className="py-24 bg-[#1E1E1E] border-t border-[#2D2D2D] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[var(--orange-forge)] uppercase tracking-widest mb-3">Teste Agora</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Simule o poder da IA do ForgeCV</h3>
            <p className="text-[var(--text-muted)] mt-4 leading-relaxed">
              Selecione cargos diferentes abaixo para simular como uma única experiência é lapidada em tempo real para as diferentes vagas.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Simulator Tabs */}
            <div className="flex justify-center border-b border-[#2D2D2D] mb-8 gap-4 overflow-x-auto pb-2">
              {(Object.keys(SIMULATOR_DATA) as Array<SimulatorKey>).map((key) => {
                const item = SIMULATOR_DATA[key];
                const isActive = activeRole === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveRole(key)}
                    className={`py-3 px-5 text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                      isActive 
                        ? "border-[var(--orange-forge)] text-white bg-[#2D2D2D]/30" 
                        : "border-transparent text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    {item.role}
                  </button>
                );
              })}
            </div>

            {/* Display Simulator Area */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Simulator Left Box: Data status */}
              <div className="md:col-span-4 bg-[#2D2D2D]/30 border border-[#4A4A4A]/50 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Métricas do Perfil</h4>
                  
                  {/* Circular Dial representation */}
                  <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#2D2D2D" strokeWidth="8" fill="transparent" />
                      <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="var(--orange-forge)" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * SIMULATOR_DATA[activeRole].score) / 100 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-extrabold font-mono text-white">{SIMULATOR_DATA[activeRole].score}%</span>
                      <span className="text-[9px] uppercase tracking-wider text-green-400 font-bold font-mono">COMPATÍVEL</span>
                    </div>
                  </div>

                  <h5 className="text-xs font-semibold text-white mb-2">Palavras-chave Relevantes:</h5>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {SIMULATOR_DATA[activeRole].keywords.map((kw, i) => (
                      <span key={i} className="text-[10px] bg-[var(--orange-forge)]/10 text-[var(--orange-highlight)] border border-[var(--orange-forge)]/20 px-2 py-0.5 rounded-full font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1E1E1E] p-3 rounded-lg border border-[#2D2D2D]">
                  <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                    A adequação de palavras-chave é a métrica principal analisada por algoritmos de recrutamento.
                  </p>
                </div>
              </div>

              {/* Simulator Right Box: Text Transformation */}
              <div className="md:col-span-8 flex flex-col justify-between gap-6">
                
                {/* Before Box */}
                <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-5 relative">
                  <span className="absolute top-4 right-4 text-[9px] font-mono bg-[#2D2D2D] px-2 py-0.5 rounded text-[var(--text-muted)]">
                    ORIGINAL
                  </span>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Tópico Inicial Informado:</h4>
                  <p className="text-sm italic text-[var(--text-muted)] leading-relaxed bg-[#2D2D2D]/20 p-3 rounded-lg">
                    &quot;{SIMULATOR_DATA[activeRole].original}&quot;
                  </p>
                </div>

                {/* Transition symbol */}
                <div className="flex justify-center -my-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--orange-forge)] flex items-center justify-center shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                    <Flame className="text-white animate-pulse" size={16} />
                  </div>
                </div>

                {/* After Box */}
                <div className="bg-[#2D2D2D]/50 border border-[var(--orange-forge)]/30 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-mono bg-[var(--orange-forge)]/10 border border-[var(--orange-forge)]/20 px-2 py-0.5 rounded text-[var(--orange-highlight)] font-bold">
                    <Sparkles size={10} />
                    <span>FORJADO COM IA</span>
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Bullet Point Otimizado ATS:</h4>
                  <p className="text-sm font-semibold text-white leading-relaxed bg-[#1E1E1E] p-3 rounded-lg border border-[#2D2D2D]">
                    &quot;{SIMULATOR_DATA[activeRole].forged}&quot;
                  </p>

                  <div className="mt-4 border-t border-[#2D2D2D] pt-3">
                    <h5 className="text-[11px] font-bold text-[var(--orange-highlight)] uppercase tracking-wider mb-2">Alterações de Impacto:</h5>
                    <ul className="space-y-1">
                      {SIMULATOR_DATA[activeRole].changes.map((ch, idx) => (
                        <li key={idx} className="text-[11px] text-[var(--text-muted)] flex items-start gap-1">
                          <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>
                            Alterou <strong className="text-white font-normal">&quot;{ch.from}&quot;</strong> para <strong className="text-white">&quot;{ch.to}&quot;</strong>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL VALIDATION / TESTIMONIALS */}
      <section className="py-24 bg-[#2D2D2D]/20 border-t border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-semibold text-[var(--orange-forge)] uppercase tracking-widest mb-3">Reconhecimento</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Forjado por profissionais de ponta</h3>
            <p className="text-[var(--text-muted)] mt-4 leading-relaxed">
              Leia o relato de quem usou o ForgeCV para reestruturar o currículo e conquistar vagas em empresas de relevância no mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div className="card flex flex-col justify-between bg-[#1E1E1E] border border-[#2D2D2D]">
              <div>
                <div className="flex gap-1 mb-4 text-[var(--orange-highlight)]">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed italic mb-6">
                  &quot;O ForgeCV me ajudou a sair de dezenas de envios sem resposta para 3 entrevistas em duas semanas. A capacidade de ajustar termos chave para vagas de dev de acordo com os requisitos foi o divisor de águas.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center font-bold text-sm text-[var(--orange-forge)]">
                  LH
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Lucas Henrique</h5>
                  <p className="text-[10px] text-[var(--text-muted)] font-mono">Software Engineer (ex-Consultoria)</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="card flex flex-col justify-between bg-[#1E1E1E] border border-[#2D2D2D]">
              <div>
                <div className="flex gap-1 mb-4 text-[var(--orange-highlight)]">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed italic mb-6">
                  &quot;Como PM, é difícil condensar resultados de negócios sem parecer prolixa. A IA conseguiu focar exatamente nos termos de impacto como roadmaps e metodologias, gerando um layout limpo que passou na triagem do ATS.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center font-bold text-sm text-[var(--orange-forge)]">
                  MD
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Mariana Dias</h5>
                  <p className="text-[10px] text-[var(--text-muted)] font-mono">Product Manager @ Fintech</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="card flex flex-col justify-between bg-[#1E1E1E] border border-[#2D2D2D]">
              <div>
                <div className="flex gap-1 mb-4 text-[var(--orange-highlight)]">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed italic mb-6">
                  &quot;Estava cansado de geradores de currículo com IA que inventavam conquistas. O ForgeCV respeita meus dados e apenas melhora a redação profissional com foco no que a vaga pede. Excelente usabilidade.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] border border-[#4A4A4A] flex items-center justify-center font-bold text-sm text-[var(--orange-forge)]">
                  RC
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Rodrigo Campos</h5>
                  <p className="text-[10px] text-[var(--text-muted)] font-mono">Analista de Dados Pleno</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-24 bg-[#1E1E1E] border-t border-[#2D2D2D]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold text-[var(--orange-forge)] uppercase tracking-widest mb-3">Tire Suas Dúvidas</h2>
            <h3 className="text-3xl font-bold tracking-tight">Perguntas Frequentes</h3>
          </div>

          <div className="space-y-4">
            
            {[
              {
                q: "Como o ForgeCV garante que meu currículo passará no ATS?",
                a: "Os leitores automáticos (ATS) buscam por palavras-chave relevantes, cargos idênticos e formatação limpa de coluna única sem elementos gráficos complexos (como barras de progresso ou caixas de texto flutuantes). O ForgeCV reescreve seus bullet points para incluir estes termos específicos e exporta o arquivo PDF em um layout 100% legível para essas máquinas de triagem."
              },
              {
                q: "A Inteligência Artificial inventa dados ou mentiras?",
                a: "Não. A inteligência do ForgeCV funciona como um moldador estratégico: ela lê as conquistas reais que você inseriu no seu perfil base e apenas reformula e destaca os dados para coincidir com o que a vaga exige. Ela não criará experiências ou diplomas que você não cadastrou."
              },
              {
                q: "Meus dados de carreira estão seguros?",
                a: "Segurança e privacidade são prioridades. Seus dados profissionais cadastrados são armazenados de forma criptografada e não são compartilhados com terceiros nem utilizados para treinar modelos públicos de IA de forma não autorizada."
              },
              {
                q: "Posso criar currículos ilimitados para vagas diferentes?",
                a: "Sim. O conceito principal do ForgeCV é a adaptabilidade. Você pode cadastrar uma vaga nova, forjar o currículo sob medida, fazer o download do PDF e repetir o processo quantas vezes precisar, mantendo o histórico de currículos organizados no painel."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-[#2D2D2D] bg-[#2D2D2D]/20 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-white hover:bg-[#2D2D2D]/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="text-[var(--orange-forge)]" size={18} /> : <ChevronDown className="text-[var(--text-muted)]" size={18} />}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[#2D2D2D] pt-4 bg-[#1E1E1E]/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION (CTA) */}
      <section className="py-24 bg-[#1E1E1E] border-t border-[#2D2D2D] relative overflow-hidden flex flex-col items-center">
        {/* Glow behind container */}
        <div className="absolute inset-0 bg-radial-gradient from-[var(--orange-forge)]/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex mb-8">
            <img src="/forge.gif" alt="ForgeCV Logo" width={64} height={64} className="animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Pronto para transformar sua taxa de retorno de currículos?
          </h2>
          
          <p className="text-base md:text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
            Crie sua base de currículo gratuitamente hoje e comece a forjar versões personalizadas e vencedoras para cada oportunidade.
          </p>

          <Link href="/register" className="btn-primary text-base px-10 py-4 rounded-full inline-flex items-center gap-2 group hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(255,107,0,0.35)]">
            Forjar Currículo Grátis
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#1E1E1E] border-t border-[#2D2D2D] py-16 text-sm text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo and brief */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/forge.gif" alt="ForgeCV Logo" width={32} height={32} />
              <span className="font-bold text-white text-lg">ForgeCV</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              Mapeamento de competências corporativas e inteligência artificial customizada para geração de currículos ATS-compatíveis de alto impacto.
            </p>
          </div>

          {/* Links: Produto */}
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Produto</h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#recursos" className="hover:text-white transition-colors">Recursos Únicos</a></li>
              <li><a href="#simulador" className="hover:text-white transition-colors">Simulador Online</a></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Criar Cadastro</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Acessar Login</Link></li>
            </ul>
          </div>

          {/* Links: Termos */}
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Políticas</h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Uso de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Segurança de Dados</a></li>
            </ul>
          </div>

          {/* Contact / Socials */}
          <div className="space-y-4">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Contato</h5>
            <p className="text-xs">suporte@forgecv.com</p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" aria-label="E-mail" className="p-2 rounded-lg bg-[#2D2D2D] hover:bg-[var(--orange-forge)] hover:text-white transition-all">
                <Mail size={16} />
              </a>
              <a href="#" aria-label="Website" className="p-2 rounded-lg bg-[#2D2D2D] hover:bg-[var(--orange-forge)] hover:text-white transition-all">
                <Globe size={16} />
              </a>
              <a href="https://github.com/HarisonRios" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-lg bg-[#2D2D2D] hover:bg-[var(--orange-forge)] hover:text-white transition-all flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-[#2D2D2D] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} ForgeCV. Todos os direitos reservados.</span>
            <span className="text-[#4A4A4A] hidden sm:inline">|</span>
            <span>
              Desenvolvido por{" "}
              <a 
                href="https://github.com/HarisonRios" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[var(--orange-forge)] font-semibold transition-colors inline-flex items-center gap-1 underline underline-offset-2"
              >
                @harison_rioos
                <ArrowUpRight size={12} />
              </a>
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <Lock size={12} className="text-[var(--orange-forge)]" />
            Desenvolvido sob infraestrutura segura.
          </span>
        </div>
      </footer>

    </div>
  );
}
