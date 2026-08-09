import React, { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import MobileNav from "./components/layout/MobileNav";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import DirectoryPage from "./pages/DirectoryPage";
import DiseasePage from "./pages/DiseasePage";
import AboutPage from "./pages/AboutPage";
import ResearchPage from "./pages/ResearchPage";
import SpecialistsPage from "./pages/SpecialistsPage";
import CommunityPage from "./pages/CommunityPage";
import { BackgroundParticles, useHoofSound, AIAssistant } from "./components/common/Visuals";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { DISEASES, type Disease } from "./data";

export default function App() {
  const [view, setView] = useState<"home" | "directory" | "disease" | "about" | "research" | "specialists" | "community" | "signin" | "signup">("home");
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const playHoofSound = useHoofSound();

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(".hoof-sound-control")) return;
      playHoofSound();
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [playHoofSound]);

  function handleNav(v: string) {
    const allowed = new Set(["home", "directory", "about", "research", "specialists", "community", "signin", "signup"]);
    if (allowed.has(v)) setView(v as any);
    else setView("home");
  }

  function handleDisease(id: string) {
    const d = DISEASES.find(x => x.id === id);
    if (d) { setSelectedDisease(d); setView("disease"); }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-ivory" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes ribbon { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-ribbon { animation: ribbon 28s linear infinite; }
        .animate-ribbon:hover { animation-play-state: paused; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.25s ease-out both; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::selection { background: var(--secondary); color: var(--primary); }
      `}</style>

      <BackgroundParticles />
      {view !== "signin" && view !== "signup" && (
        <Navbar onNav={handleNav} activeView={view} />
      )}

      <main className="pb-20 md:pb-0">
        {view === "home" && <HomePage onNav={handleNav} onDisease={handleDisease} />}
        {view === "signin" && <SignInPage onNav={handleNav} />}
        {view === "signup" && <SignUpPage onNav={handleNav} />}
        {view === "directory" && <DirectoryPage onDisease={handleDisease} />}
        {view === "about" && <AboutPage />}
        {view === "research" && <ResearchPage />}
        {view === "specialists" && <SpecialistsPage />}
        {view === "community" && <CommunityPage />}
        {view === "disease" && selectedDisease && (
          <DiseasePage disease={selectedDisease} onBack={() => setView("directory")} />
        )}
      </main>

      <AIAssistant />
      {view !== "signin" && view !== "signup" && (
        <>
          <MobileNav onNav={handleNav} activeView={view} />
          <Footer />
        </>
      )}
    </div>
  );
}
