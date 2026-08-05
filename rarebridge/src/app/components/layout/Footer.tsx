import React from "react";
import { ZebraMascot } from "../common/Visuals";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-[#112250] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#3B507D] flex items-center justify-center"><span className="text-[#E7E2CE] font-black text-[10px]">RB</span></div>
              <span className="font-black text-[#F5F4F0]">RareBridge</span>
            </div>
            <p className="text-xs text-[#BEB7A7] leading-relaxed mb-4">Connecting families, researchers, and specialists with trusted rare disease information.</p>
            <ZebraMascot size={48} className="opacity-30" />
          </div>
          {[
            { title: "Platform", links: ["Explore Diseases", "Find Specialists", "Research", "Community"] },
            { title: "Resources", links: ["About Us", "Accessibility", "Partners", "Privacy"] },
            { title: "Support", links: ["Help Center", "Contact Us", "Terms of Use", "Cookie Policy"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-bold text-[#E7E2CE] text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => <li key={l}><a href="#" className="text-xs text-[#BEB7A7] hover:text-[#E7E2CE] transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#3B507D] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#BEB7A7]">© 2026 RareBridge. For informational purposes only. Not medical advice.</p>
          <div className="flex items-center gap-1 text-xs text-[#BEB7A7]"><Shield className="w-3 h-3 text-[#BEB7A7]" /> Medically reviewed content</div>
        </div>
      </div>
    </footer>
  );
}
