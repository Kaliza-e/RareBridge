import React, { useState } from "react";
import { Search, X, Menu, Home, BookOpen, Users, User } from "lucide-react";
import { NAV_LINKS } from "../../data";
import { ZebraMascot } from "../common/Visuals";

export default function Navbar({ onNav, activeView }: { onNav: (v: string) => void; activeView: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-[#F5F4F0]/95 backdrop-blur-md border-b border-[#BEB7A7]/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNav("home")} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-[#112250] shadow-md">
              <ZebraMascot size={28} />
            </div>
            <div>
              <div className="font-black text-xl text-[#112250] tracking-tight">RareBridge</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#3B507D]">Zebra care network</div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const map: Record<string,string> = {
                Home: "home",
                "Explore Diseases": "directory",
                Research: "research",
                Specialists: "specialists",
                Community: "community",
                About: "about"
              };
              const view = map[link] ?? "home";
              return (
                <button
                  key={link}
                  onClick={() => onNav(view)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${activeView === view ? "text-[#112250] border-b-2 border-[#112250] pb-1" : "text-[#3B507D] hover:text-[#112250]"}`}
                >
                  {link}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#3B507D] hover:bg-[#E7E2CE] transition-colors"><Search className="w-4 h-4" /> Search</button>
            <button onClick={() => onNav("signin")} className="px-4 py-1.5 rounded-xl bg-[#112250] text-[#F5F4F0] text-sm font-semibold hover:bg-[#1a325e] transition-colors shadow-sm">Sign In</button>
            <button className="md:hidden p-2 rounded-lg text-[#3B507D] hover:bg-[#E7E2CE]" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#E7E2CE] pt-2 space-y-1">
            {NAV_LINKS.map(link => {
              const map: Record<string,string> = {
                Home: "home",
                "Explore Diseases": "directory",
                Research: "research",
                Specialists: "specialists",
                Community: "community",
                About: "about"
              };
              const view = map[link] ?? "home";
              return (
                <button key={link} onClick={() => { onNav(view); setMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-[#112250] hover:bg-[#E7E2CE] transition-colors">{link}</button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
