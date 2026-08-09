import React from "react";
import { ZebraMascot } from "../common/Visuals";
import { Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-primary pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
                <ZebraMascot size={22} />
              </div>
              <span className="font-black text-ivory text-lg tracking-tight">RareBridge</span>
            </div>
            <p className="text-sm text-taupe leading-relaxed mb-5">Connecting families, researchers, and specialists with trusted rare disease information.</p>
            <div className="flex items-center gap-1.5 text-xs text-taupe">
              <Heart className="w-3 h-3 text-secondary" /> Made with care for rare disease families
            </div>
          </div>
          {[
            { title: "Platform", links: ["Explore Diseases", "Find Specialists", "Research", "Community"] },
            { title: "Resources", links: ["About Us", "Accessibility", "Partners", "Privacy"] },
            { title: "Support", links: ["Help Center", "Contact Us", "Terms of Use", "Cookie Policy"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-bold text-secondary text-xs uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-taupe hover:text-secondary transition-colors duration-200">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-taupe">© 2026 RareBridge. For informational purposes only. Not medical advice.</p>
          <div className="flex items-center gap-1.5 text-xs text-taupe">
            <Shield className="w-3 h-3 text-secondary" /> Medically reviewed content
          </div>
        </div>
      </div>
    </footer>
  );
}
