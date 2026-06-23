"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, FileText, Anvil, LogOut, Flame } from "lucide-react";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for initial auth check
    const token = localStorage.getItem("forgecv.token");
    if (!token && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Avoid flicker

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/base-resume", label: "Meu Currículo Base", icon: FileText },
    { href: "/forge", label: "A Forja", icon: Anvil },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-[var(--border-color)]">
          <img src="/forge.gif" alt="ForgeCV Logo" width={32} height={32} />
          <span className="text-xl font-bold uppercase tracking-wider">ForgeCV</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg forge-transition ${
                  isActive
                    ? "bg-[var(--orange-forge)] text-white shadow-lg shadow-orange-500/20"
                    : "text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border-color)]">
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-4 py-3 text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-lg forge-transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
