import React, { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "../../data";
import { ZebraMascot } from "../common/Visuals";

const NAV_MAP: Record<string, string> = {
  Home: "home",
  "Explore Diseases": "directory",
  Research: "research",
  Specialists: "specialists",
  Community: "community",
  About: "about",
};

export default function Navbar({ onNav, activeView }: { onNav: (v: string) => void; activeView: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on view change
  useEffect(() => { setMenuOpen(false); }, [activeView]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/98 shadow-[0_1px_24px_0_rgba(0,0,0,0.07)]"
          : "bg-ivory/90"
        } backdrop-blur-xl border-b border-taupe-40/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* ── Logo ── */}
          <button
            onClick={() => onNav("home")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-primary shadow-md
              group-hover:shadow-lg group-hover:scale-[1.07] transition-all duration-200">
              <ZebraMascot size={23} />
            </div>
            <span className="font-black text-[1.15rem] text-primary tracking-tight leading-none select-none">
              Rare<span className="text-accent">Bridge</span>
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const v = NAV_MAP[link] ?? "home";
              const isActive = activeView === v;
              return (
                <button
                  key={link}
                  onClick={() => onNav(v)}
                  className={`relative px-3.5 py-2 text-sm transition-all duration-200 rounded-lg
                    ${isActive
                      ? "text-primary font-semibold"
                      : "text-accent font-medium hover:text-primary hover:bg-secondary/60"
                    }`}
                >
                  {link}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Desktop actions ── */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => onNav("signin")}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-primary
                hover:bg-secondary/70 transition-all duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => onNav("signup")}
              className="px-4 py-2 rounded-xl bg-primary text-ivory text-sm font-bold
                hover:bg-accent transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Get Started
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 rounded-xl text-accent hover:bg-secondary/70 transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-taupe-40/40 bg-white/98 backdrop-blur-xl px-4 py-3 space-y-0.5 shadow-lg">
          {NAV_LINKS.map(link => {
            const v = NAV_MAP[link] ?? "home";
            const isActive = activeView === v;
            return (
              <button
                key={link}
                onClick={() => { onNav(v); setMenuOpen(false); }}
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "bg-primary/8 text-primary font-semibold border-l-2 border-primary pl-3.5"
                    : "text-accent hover:bg-secondary/60 hover:text-primary"
                  }`}
              >
                {link}
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
          <div className="flex gap-2.5 pt-3 pb-1 border-t border-taupe-40/40 mt-2">
            <button
              onClick={() => { onNav("signin"); setMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-xl border border-taupe-40 text-sm font-semibold text-primary hover:bg-secondary/70 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => { onNav("signup"); setMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-xl bg-primary text-ivory text-sm font-bold hover:bg-accent transition-colors shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}