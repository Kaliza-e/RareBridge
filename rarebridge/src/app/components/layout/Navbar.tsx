import React, { useState } from "react";
import { Search, X, Menu, Home, BookOpen, Users, User } from "lucide-react";
import { NAV_LINKS } from "../../data";
import { ZebraMascot } from "../common/Visuals";

export default function Navbar({ onNav, activeView }: { onNav: (v: string) => void; activeView: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-taupe-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNav("home")} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-primary shadow-md">
              <ZebraMascot size={28} />
            </div>
            <div>
              <div className="font-black text-xl text-primary tracking-tight">RareBridge</div>
      
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
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${activeView === view ? "text-primary border-b-2 border-primary pb-1" : "text-accent hover:text-primary"}`}
                >
                  {link}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-accent hover:bg-secondary transition-colors"><Search className="w-4 h-4" /> Search</button>
            <button onClick={() => onNav("signin")} className="px-4 py-1.5 rounded-xl bg-primary text-ivory text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">Sign In</button>
            <button className="md:hidden p-2 rounded-lg text-accent hover:bg-secondary" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-secondary pt-2 space-y-1">
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
                <button key={link} onClick={() => { onNav(view); setMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-secondary transition-colors">{link}</button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
