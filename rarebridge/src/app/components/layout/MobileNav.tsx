import React from "react";
import { Home, BookOpen, Users, Stethoscope, Microscope } from "lucide-react";

export default function MobileNav({ onNav, activeView }: { onNav: (v: string) => void; activeView: string }) {
  const tabs = [
    { label: "Home", icon: Home, view: "home" },
    { label: "Diseases", icon: BookOpen, view: "directory" },
    { label: "Research", icon: Microscope, view: "research" },
    { label: "Specialists", icon: Stethoscope, view: "specialists" },
    { label: "Community", icon: Users, view: "community" },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-ivory border-t border-taupe-40 z-50">
      <div className="flex">
        {tabs.map(t => (
          <button
            key={t.label}
            onClick={() => onNav(t.view)}
            className={`flex-1 flex flex-col items-center py-2 transition-colors ${activeView === t.view ? "text-primary" : "text-taupe hover:text-primary"}`}
          >
            <t.icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
