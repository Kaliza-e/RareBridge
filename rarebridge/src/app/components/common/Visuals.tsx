import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot, Star,
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
      <p className="font-bold text-primary text-lg">{message}</p>
      {sub && <p className="text-sm text-taupe mt-1 max-w-xs">{sub}</p>}
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
      <div className="absolute -top-20 left-8 w-72 h-72 rounded-full bg-secondary-20 blur-3xl animate-float-slow" />
      <div className="absolute top-24 right-10 w-64 h-64 rounded-full bg-primary-10 blur-3xl animate-float-slow animation-delay-[2000ms]" />
      <div className="absolute bottom-24 left-10 w-56 h-56 rounded-full bg-accent-10 blur-3xl animate-float-slow animation-delay-[4000ms]" />
      <span className="particle-dot left-[12%] top-[16%]" style={{ transform: `translate(var(--p-x,0), var(--p-y,0))` }} />
      <span className="particle-dot left-[70%] top-[14%] animate-twinkle" style={{ transform: `translate(var(--p-x2,0), var(--p-y2,0))` }} />
      <span className="particle-dot left-[84%] top-[72%]" style={{ transform: `translate(var(--p-x3,0), var(--p-y3,0))` }} />
      <span className="particle-dot left-[20%] top-[68%]" style={{ transform: `translate(var(--p-x4,0), var(--p-y4,0))` }} />
      <span className="particle-dot left-[54%] top-[36%] animate-twinkle" style={{ transform: `translate(var(--p-x5,0), var(--p-y5,0))` }} />
    </div>
  );
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your RareBridge AI guide. Ask me anything about rare diseases, symptoms, research, or how to use the platform." }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const QUICK = ["What is Krabbe disease?", "How do I find a specialist?", "What are common rare disease symptoms?"];

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "I can help with that! For detailed information on this topic, try searching the disease directory or browsing our specialist listings.";
      if (lower.includes("krabbe")) reply = "Krabbe disease is a rare inherited disorder that destroys the myelin sheath protecting nerve cells. It's caused by mutations in the GALC gene and most often appears in early infancy.";
      else if (lower.includes("specialist")) reply = "You can find specialists by clicking 'Specialists' in the navigation. You can filter by disease type, location, and expertise.";
      else if (lower.includes("symptom")) reply = "Common signs that may indicate a rare disease include developmental delays, unexplained muscle weakness, vision or hearing changes, and unusual lab results. Always consult a physician for evaluation.";
      else if (lower.includes("research")) reply = "Head to the Research section for the latest gene therapy breakthroughs, clinical trials, and pharmaceutical pipeline news for rare diseases.";
      setMessages(m => [...m, { role: "ai", text: reply }]);
    }, 800);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="ai-assistant-control fixed right-5 bottom-24 md:bottom-8 z-50 flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-ivory shadow-xl hover:bg-accent transition-all duration-200 hover:-translate-y-0.5 group"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline">Ask AI</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
        </span>
      </button>

      {/* Popup panel */}
      {open && (
        <div className="fixed right-5 bottom-36 md:bottom-24 z-50 w-[340px] sm:w-[380px] rounded-3xl bg-white border border-taupe-40 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-5 py-4">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-black text-ivory text-sm leading-none">RareBridge AI</p>
              <p className="text-taupe text-xs mt-0.5">Ask anything about rare diseases</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-taupe hover:text-ivory transition-colors p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-64 scrollbar-none">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user"
                  ? "bg-primary text-ivory rounded-br-sm"
                  : "bg-secondary text-primary rounded-bl-sm"
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
            {QUICK.map(q => (
              <button key={q} onClick={() => send(q)} className="shrink-0 px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-semibold hover:bg-primary hover:text-ivory transition-colors whitespace-nowrap">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2">
            <div className="flex items-center gap-2 bg-ivory rounded-xl border border-taupe-40 px-3 py-2 focus-within:border-primary transition-colors">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Ask a question…"
                className="flex-1 bg-transparent text-sm text-primary placeholder-taupe outline-none font-medium"
              />
              <button onClick={() => send(input)} className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center hover:bg-accent transition-colors shrink-0">
                <svg className="w-3.5 h-3.5 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-gradient-to-br from-secondary to-taupe-30 blur-3xl" />
      </div>
      <svg viewBox="0 0 340 260" className="relative w-full max-w-md" fill="none">
        <circle cx="60" cy="40" r="3" fill="var(--switch-background)" opacity="0.5" />
        <circle cx="170" cy="20" r="4" fill="var(--secondary)" opacity="0.7" />
        <path d="M10 195 Q170 135 330 195" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-accent text-xs font-bold mb-4">
            <MicroscopeIcon className="w-3 h-3" /> Patient Journey
          </div>
          <h2 className="font-black text-3xl md:text-4xl text-primary mb-4">What Families Typically Experience</h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-secondary" />
          <div className="absolute inset-x-0 top-1/2 h-1 bg-secondary" />

          <div className="relative grid gap-10 md:grid-cols-3">
            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon as any;
              const isTop = i % 2 === 0;
              return (
                <button key={step.label} onClick={() => setActiveStep(i)} className="relative flex flex-col items-center text-center md:text-left">
                  <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 ${activeStep === i ? "border-primary bg-primary text-secondary shadow-lg" : "border-secondary bg-white text-primary"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`mt-6 rounded-[2rem] border border-secondary bg-white p-6 shadow-sm transition-transform duration-200 ${activeStep === i ? "scale-105 shadow-xl" : "hover:-translate-y-1"}`}>
                    <h3 className="font-bold text-primary mb-2">{step.label}</h3>
                    <p className="text-sm text-accent leading-relaxed">{step.desc}</p>
                  </div>
                  <span className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-white border border-secondary ${isTop ? "-translate-y-1/2" : "translate-y-1/2"}`} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-12 rounded-3xl bg-primary p-8 md:p-10 text-white shadow-2xl">
          <div className="text-taupe text-xs font-bold uppercase tracking-widest mb-1">Step {activeStep + 1} of {JOURNEY_STEPS.length}</div>
          <h3 className="font-black text-3xl mb-3">{JOURNEY_STEPS[activeStep].label}</h3>
          <p className="text-secondary text-lg leading-relaxed max-w-3xl">{JOURNEY_STEPS[activeStep].desc}</p>
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
        <div key={i} className="border border-taupe-40 rounded-2xl overflow-hidden bg-white">
          <button className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-primary hover:bg-ivory transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.title}</span>
            {open === i ? <svg className="w-4 h-4" /> : <svg className="w-4 h-4" />}
          </button>
          {open === i && <div className="px-5 pb-5 text-accent leading-relaxed text-sm border-t border-secondary"><div className="pt-3">{item.content}</div></div>}
        </div>
      ))}
    </div>
  );
}

export function DiseaseCard({ disease, onClick }: { disease: Disease; onClick: () => void }) {
  const COLOR_MAP: any = {
    navy: { iconBg: "bg-primary" }, sapphire: { iconBg: "bg-accent" }, taupe: { iconBg: "bg-taupe" }
  };
  const c = COLOR_MAP[disease.color] ?? COLOR_MAP.navy;
  const Icon = disease.icon as any;
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-taupe-30 bg-white shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40 cursor-pointer" onClick={onClick}>
      <div className="absolute inset-x-6 top-0 h-40 rounded-[1.75rem] bg-gradient-to-br from-secondary/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className={`relative px-6 pt-6 pb-4`}>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-2xl ${c.iconBg} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            <Icon className="w-6 h-6 text-ivory" />
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-10 text-accent`}>{(disease as any).researchStatus || 'Research'}</span>
        </div>
        <h3 className="font-black text-primary text-lg leading-tight">{disease.name}</h3>
        <p className="text-xs text-taupe mt-0.5 font-medium">{disease.category}</p>
      </div>
      <div className="px-6 pb-6 pt-4">
        <p className="text-sm text-accent leading-relaxed mb-4">{disease.shortDesc}</p>
        <button className="flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">View Disease</button>
      </div>
    </div>
  );
}
