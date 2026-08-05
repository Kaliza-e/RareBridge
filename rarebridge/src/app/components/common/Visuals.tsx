import React, { useCallback, useRef, useState } from "react";
import {
  Bot, Footprints, Star,
  AlertCircle, Stethoscope, ClipboardList, Syringe, Users as UsersIcon, Microscope as MicroscopeIcon
} from "lucide-react";
import { Disease } from "../../data";



export function ZebraMascot({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} fill="none">
      <ellipse cx="40" cy="54" rx="26" ry="20" fill="var(--secondary)" />
      <ellipse cx="40" cy="38" rx="16" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" />
      <path d="M30 22 Q36 19 40 20 Q44 19 50 22" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="33" cy="30" r="3" fill="var(--primary)" />
      <circle cx="47" cy="30" r="3" fill="var(--primary)" />
    </svg>
  );
}

export function ZebraDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none" aria-hidden="true">
      <path d="M10 25 C30 5 50 45 70 25 S110 5 130 25" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 35 C32 55 52 15 72 35 S112 55 132 35" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
      <circle cx="28" cy="80" r="10" fill="var(--secondary)" />
      <circle cx="88" cy="92" r="6" fill="var(--switch-background)" />
      <circle cx="118" cy="54" r="8" fill="var(--secondary)" />
      <path d="M20 100 Q40 85 60 100 T100 100" stroke="var(--primary)" strokeWidth="3" fill="none" opacity="0.6" />
    </svg>
  );
}

export function ZebraEmptyState({ message, sub }: { message: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ZebraMascot size={96} className="mb-4 opacity-60" />
      <p className="font-bold text-[#112250] text-lg">{message}</p>
      {sub && <p className="text-sm text-[#BEB7A7] mt-1 max-w-xs">{sub}</p>}
    </div>
  );
}

export function useHoofSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  return useCallback(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      let ctx = audioContextRef.current;
      if (!ctx) {
        ctx = new AudioContext();
        audioContextRef.current = ctx;
      }

      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(95, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.28, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);

      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.16, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      noise.connect(noiseGain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.14);
    } catch (error) {
      console.warn("Hoof sound failed to play", error);
    }
  }, []);
}

// Small helper that attaches mousemove to update particle CSS vars
if (typeof window !== "undefined") {
  try {
    let throttle = 0;
    window.addEventListener("mousemove", (e) => {
      if (Date.now() < throttle) return;
      throttle = Date.now() + 40;
      const root = document.getElementById("rb-particles");
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Spread a few offsets
      root.style.setProperty("--p-x", `${(x - rect.width * 0.2) * 0.02}px`);
      root.style.setProperty("--p-y", `${(y - rect.height * 0.3) * 0.02}px`);
      root.style.setProperty("--p-x2", `${(x - rect.width * 0.7) * 0.03}px`);
      root.style.setProperty("--p-y2", `${(y - rect.height * 0.1) * 0.03}px`);
      root.style.setProperty("--p-x3", `${(x - rect.width * 0.84) * 0.025}px`);
      root.style.setProperty("--p-y3", `${(y - rect.height * 0.72) * 0.025}px`);
      root.style.setProperty("--p-x4", `${(x - rect.width * 0.2) * 0.04}px`);
      root.style.setProperty("--p-y4", `${(y - rect.height * 0.68) * 0.04}px`);
      root.style.setProperty("--p-x5", `${(x - rect.width * 0.54) * 0.035}px`);
      root.style.setProperty("--p-y5", `${(y - rect.height * 0.36) * 0.035}px`);
    });
  } catch (e) {
    // silent
  }
}

export function BackgroundParticles() {
  // Adds simple mouse-follow particles using CSS variables for position
  return (
    <div id="rb-particles" className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute -top-20 left-8 w-72 h-72 rounded-full bg-[#E7E2CE]/20 blur-3xl animate-float-slow" />
      <div className="absolute top-24 right-10 w-64 h-64 rounded-full bg-[#112250]/15 blur-3xl animate-float-slow animation-delay-[2000ms]" />
      <div className="absolute bottom-24 left-10 w-56 h-56 rounded-full bg-[#3B507D]/15 blur-3xl animate-float-slow animation-delay-[4000ms]" />
      <span className="particle-dot left-[12%] top-[16%]" style={{ transform: `translate(var(--p-x,0), var(--p-y,0))` }} />
      <span className="particle-dot left-[70%] top-[14%] animate-twinkle" style={{ transform: `translate(var(--p-x2,0), var(--p-y2,0))` }} />
      <span className="particle-dot left-[84%] top-[72%]" style={{ transform: `translate(var(--p-x3,0), var(--p-y3,0))` }} />
      <span className="particle-dot left-[20%] top-[68%]" style={{ transform: `translate(var(--p-x4,0), var(--p-y4,0))` }} />
      <span className="particle-dot left-[54%] top-[36%] animate-twinkle" style={{ transform: `translate(var(--p-x5,0), var(--p-y5,0))` }} />
    </div>
  );
}

export function HoofSound() {
  const playHoofSound = useHoofSound();

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        playHoofSound();
      }}
      className="hoof-sound-control fixed right-4 bottom-24 z-50 flex items-center gap-2 rounded-3xl bg-[#112250] px-4 py-3 text-sm font-semibold text-[#F5F4F0] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d3560] zebra-button-glow md:right-8 md:bottom-8"
    >
      <Footprints className="w-4 h-4" />
      Hoof stomp
    </button>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-gradient-to-br from-[#E7E2CE] to-[#BEB7A7]/30 blur-3xl" />
      </div>
      <svg viewBox="0 0 340 260" className="relative w-full max-w-md" fill="none">
        <circle cx="60" cy="40" r="3" fill="var(--switch-background)" opacity="0.5" />
        <circle cx="170" cy="20" r="4" fill="var(--secondary)" opacity="0.7" />
        <path d="M10 195 Q170 135 330 195" stroke="#112250" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// (imports consolidated at top)

export const JOURNEY_STEPS = [
  { icon: AlertCircle, label: "Symptoms", desc: "Unusual signs appear — unexplained delays, weakness, or changes in behavior." },
  { icon: Stethoscope, label: "Doctor Visit", desc: "Your family doctor refers you to a specialist for further evaluation." },
  { icon: ClipboardList, label: "Diagnosis", desc: "Genetic tests, enzyme panels, or imaging confirm the rare disease." },
  { icon: Syringe, label: "Treatment", desc: "A care team creates a personalized management and therapy plan." },
  { icon: UsersIcon, label: "Community", desc: "Connect with families and organizations who share your experience." },
  { icon: MicroscopeIcon, label: "Research", desc: "Follow the organizations working toward treatments and cures." },
];

export function PatientJourney() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E7E2CE] text-[#3B507D] text-xs font-bold mb-4">
            <Footprints className="w-3 h-3" /> Patient Journey
          </div>
          <h2 className="font-black text-3xl md:text-4xl text-[#112250] mb-4">What Families Typically Experience</h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-[#E7E2CE]" />
          <div className="absolute inset-x-0 top-1/2 h-1 bg-[#E7E2CE]" />

          <div className="relative grid gap-10 md:grid-cols-3">
            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon as any;
              const isTop = i % 2 === 0;
              return (
                <button key={step.label} onClick={() => setActiveStep(i)} className="relative flex flex-col items-center text-center md:text-left">
                  <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 ${activeStep === i ? "border-[#112250] bg-[#112250] text-[#E7E2CE] shadow-lg" : "border-[#E7E2CE] bg-white text-[#112250]"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`mt-6 rounded-[2rem] border border-[#E7E2CE] bg-white p-6 shadow-sm transition-transform duration-200 ${activeStep === i ? "scale-105 shadow-xl" : "hover:-translate-y-1"}`}>
                    <h3 className="font-bold text-[#112250] mb-2">{step.label}</h3>
                    <p className="text-sm text-[#3B507D] leading-relaxed">{step.desc}</p>
                  </div>
                  <span className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-white border border-[#E7E2CE] ${isTop ? "-translate-y-1/2" : "translate-y-1/2"}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-[#112250] p-8 md:p-10 text-white shadow-2xl">
          <div className="text-[#BEB7A7] text-xs font-bold uppercase tracking-widest mb-1">Step {activeStep + 1} of {JOURNEY_STEPS.length}</div>
          <h3 className="font-black text-3xl mb-3">{JOURNEY_STEPS[activeStep].label}</h3>
          <p className="text-[#E7E2CE] text-lg leading-relaxed max-w-3xl">{JOURNEY_STEPS[activeStep].desc}</p>
        </div>
      </div>
    </section>
  );
}

export function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-[#BEB7A7]/40 rounded-2xl overflow-hidden bg-white">
          <button className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-[#112250] hover:bg-[#F5F4F0] transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.title}</span>
            {open === i ? <svg className="w-4 h-4" /> : <svg className="w-4 h-4" />}
          </button>
          {open === i && <div className="px-5 pb-5 text-[#3B507D] leading-relaxed text-sm border-t border-[#E7E2CE]"><div className="pt-3">{item.content}</div></div>}
        </div>
      ))}
    </div>
  );
}

export function DiseaseCard({ disease, onClick }: { disease: Disease; onClick: () => void }) {
  const COLOR_MAP: any = {
    navy: { iconBg: "bg-[#112250]" }, sapphire: { iconBg: "bg-[#3B507D]" }, taupe: { iconBg: "bg-[#BEB7A7]" }
  };
  const c = COLOR_MAP[disease.color] ?? COLOR_MAP.navy;
  const Icon = disease.icon as any;
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#BEB7A7]/30 bg-white shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:border-[#3B507D]/40 cursor-pointer" onClick={onClick}>
      <div className="absolute inset-x-6 top-0 h-40 rounded-[1.75rem] bg-gradient-to-br from-[#E7E2CE]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className={`relative px-6 pt-6 pb-4`}>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-2xl ${c.iconBg} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            <Icon className="w-6 h-6 text-[#F5F4F0]" />
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3B507D]/10 text-[#3B507D]`}>{(disease as any).researchStatus || 'Research'}</span>
        </div>
        <h3 className="font-black text-[#112250] text-lg leading-tight">{disease.name}</h3>
        <p className="text-xs text-[#BEB7A7] mt-0.5 font-medium">{disease.category}</p>
      </div>
      <div className="px-6 pb-6 pt-4">
        <p className="text-sm text-[#3B507D] leading-relaxed mb-4">{disease.shortDesc}</p>
        <button className="flex items-c