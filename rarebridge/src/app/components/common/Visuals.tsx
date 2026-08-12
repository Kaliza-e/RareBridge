import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot, Star,
  AlertCircle, Stethoscope, ClipboardList, Syringe, Users as UsersIcon, Microscope as MicroscopeIcon,
  Thermometer, HeartPulse, Pill, Users, FlaskConical, UserCircle, BookOpen, Sparkles, Zap, Trophy, Target,
  Flame, Award, CheckCircle, XCircle, Lock
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

export function ZebraWithButterfly({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      {/* Zebra body */}
      <ellipse cx="60" cy="75" rx="35" ry="25" fill="var(--secondary)" />
      {/* Zebra head */}
      <ellipse cx="60" cy="50" rx="22" ry="28" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="2" />
      {/* Zebra stripes */}
      <path d="M45 35 Q52 32 58 33 Q62 32 68 35" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M42 45 Q52 42 60 43 Q68 42 78 45" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Zebra eyes */}
      <circle cx="50" cy="42" r="4" fill="var(--primary)" />
      <circle cx="70" cy="42" r="4" fill="var(--primary)" />
      <circle cx="51" cy="41" r="1.5" fill="white" />
      <circle cx="71" cy="41" r="1.5" fill="white" />
      {/* Zebra ears */}
      <ellipse cx="42" cy="28" rx="6" ry="8" fill="var(--secondary)" transform="rotate(-20 42 28)" />
      <ellipse cx="78" cy="28" rx="6" ry="8" fill="var(--secondary)" transform="rotate(20 78 28)" />
      {/* Zebra legs */}
      <rect x="40" y="90" width="8" height="20" rx="4" fill="var(--secondary)" />
      <rect x="55" y="90" width="8" height="20" rx="4" fill="var(--secondary)" />
      <rect x="70" y="90" width="8" height="20" rx="4" fill="var(--secondary)" />
      
      {/* Butterfly */}
      <g className="animate-float" style={{ animationDelay: '0.5s' }}>
        {/* Left wing */}
        <ellipse cx="95" cy="35" rx="12" ry="8" fill="var(--primary)" opacity="0.8" transform="rotate(-30 95 35)" />
        <ellipse cx="92" cy="42" rx="8" ry="6" fill="var(--accent)" opacity="0.7" transform="rotate(-20 92 42)" />
        {/* Right wing */}
        <ellipse cx="105" cy="35" rx="12" ry="8" fill="var(--primary)" opacity="0.8" transform="rotate(30 105 35)" />
        <ellipse cx="108" cy="42" rx="8" ry="6" fill="var(--accent)" opacity="0.7" transform="rotate(20 108 42)" />
        {/* Butterfly body */}
        <ellipse cx="100" cy="38" rx="2" ry="6" fill="var(--switch-background)" />
        {/* Butterfly antennae */}
        <path d="M98 33 Q95 30 96 28" stroke="var(--switch-background)" strokeWidth="1" fill="none" />
        <path d="M102 33 Q105 30 104 28" stroke="var(--switch-background)" strokeWidth="1" fill="none" />
      </g>
      
      {/* Sparkles around butterfly */}
      <circle cx="88" cy="28" r="2" fill="var(--secondary)" className="animate-sparkle" />
      <circle cx="112" cy="30" r="1.5" fill="var(--primary)" className="animate-sparkle" style={{ animationDelay: '0.3s' }} />
      <circle cx="100" cy="25" r="1" fill="var(--accent)" className="animate-sparkle" style={{ animationDelay: '0.6s' }} />
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

export function EdelweissFlower({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      {/* Stem */}
      <path d="M50 70 Q52 80 50 95" stroke="var(--switch-background)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M50 75 Q35 70 30 60 Q40 65 50 72" fill="var(--secondary)" opacity="0.7" />
      <path d="M50 78 Q65 73 70 63 Q60 68 50 75" fill="var(--secondary)" opacity="0.7" />
      {/* Petals - star-shaped edelweiss */}
      <g className="animate-sparkle">
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(45 50 50)" />
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(90 50 50)" />
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(135 50 50)" />
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(180 50 50)" />
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(225 50 50)" />
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(270 50 50)" />
        <ellipse cx="50" cy="35" rx="8" ry="20" fill="var(--background)" stroke="var(--switch-background)" strokeWidth="1.5" transform="rotate(315 50 50)" />
      </g>
      {/* Center */}
      <circle cx="50" cy="50" r="12" fill="var(--primary)" opacity="0.9" />
      <circle cx="50" cy="50" r="8" fill="var(--accent)" opacity="0.8" />
      {/* Fuzzy texture dots */}
      <circle cx="50" cy="45" r="1.5" fill="var(--secondary)" opacity="0.6" />
      <circle cx="46" cy="50" r="1.5" fill="var(--secondary)" opacity="0.6" />
      <circle cx="54" cy="50" r="1.5" fill="var(--secondary)" opacity="0.6" />
      <circle cx="50" cy="55" r="1.5" fill="var(--secondary)" opacity="0.6" />
    </svg>
  );
}

export function ButterflyDoodle({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={`${className} animate-float`} fill="none" aria-hidden="true">
      {/* Left wings */}
      <ellipse cx="25" cy="30" rx="15" ry="12" fill="var(--primary)" opacity="0.8" transform="rotate(-25 25 30)" />
      <ellipse cx="22" cy="42" rx="10" ry="8" fill="var(--accent)" opacity="0.7" transform="rotate(-15 22 42)" />
      {/* Right wings */}
      <ellipse cx="55" cy="30" rx="15" ry="12" fill="var(--primary)" opacity="0.8" transform="rotate(25 55 30)" />
      <ellipse cx="58" cy="42" rx="10" ry="8" fill="var(--accent)" opacity="0.7" transform="rotate(15 58 42)" />
      {/* Body */}
      <ellipse cx="40" cy="38" rx="3" ry="10" fill="var(--switch-background)" />
      {/* Antennae */}
      <path d="M38 30 Q35 25 36 22" stroke="var(--switch-background)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 30 Q45 25 44 22" stroke="var(--switch-background)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Wing patterns */}
      <circle cx="20" cy="28" r="3" fill="var(--secondary)" opacity="0.5" />
      <circle cx="60" cy="28" r="3" fill="var(--secondary)" opacity="0.5" />
      <circle cx="25" cy="40" r="2" fill="var(--primary)" opacity="0.4" />
      <circle cx="55" cy="40" r="2" fill="var(--primary)" opacity="0.4" />
    </svg>
  );
}

export function usePopSound() {
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
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (error) {
      console.warn("Pop sound failed to play", error);
    }
  }, []);
}

export function useChimeSound() {
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
      
      // Create a very soft, gentle chime
      const frequencies = [523.25, 659.25]; // C5, E5 (softer chord)
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      });
    } catch (error) {
      console.warn("Chime sound failed to play", error);
    }
  }, []);
}

export function useSparkleSound() {
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
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (error) {
      console.warn("Sparkle sound failed to play", error);
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

export function FlyingZebra() {
  const [position, setPosition] = useState({ x: -150, y: 100 });
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [direction, setDirection] = useState(1);


  useEffect(() => {
    let animationFrame: number;
    let lastTime = Date.now();
    let x = -150;
    let y = 100;
    let targetY = 100;
    let dir = 1;

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Move horizontally
      x += dir * 80 * delta;

      // Smooth vertical movement with some randomness
      if (Math.random() < 0.02) {
        targetY = 50 + Math.random() * 200;
      }
      y += (targetY - y) * 2 * delta;

      // Bounce off edges
      if (x > window.innerWidth + 150) {
        x = -150;
        dir = 1;
        setDirection(1);
      } else if (x < -150) {
        x = window.innerWidth + 150;
        dir = -1;
        setDirection(-1);
      }

      setPosition({ x, y });
      setDirection(dir);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-50 transition-transform duration-100"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'
      }}
    >
      <div className="relative">
        <ZebraWithButterfly size={80} />
      </div>
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
        <span className="hidden sm:inline">RareBridge</span>
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
  { icon: Thermometer, label: "Meet the Disease", desc: "Unusual signs appear — unexplained delays, weakness, or changes in behavior.", color: "bg-red-100 text-red-600", pinColor: "#EF4444" },
  { icon: Stethoscope, label: "What Happens?", desc: "Your family doctor refers you to a specialist for further evaluation.", color: "bg-blue-100 text-blue-600", pinColor: "#3B82F6" },
  { icon: ClipboardList, label: "Diagnosis", desc: "Genetic tests, enzyme panels, or imaging confirm the rare disease.", color: "bg-purple-100 text-purple-600", pinColor: "#8B5CF6" },
  { icon: Pill, label: "Treatment", desc: "A care team creates a personalized management and therapy plan.", color: "bg-green-100 text-green-600", pinColor: "#10B981" },
  { icon: Users, label: "Living & Support", desc: "Connect with families and organizations who share your experience.", color: "bg-yellow-100 text-yellow-600", pinColor: "#F59E0B" },
];

export function PatientJourney() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl md:text-5xl text-ivory mb-4" style={{ fontFamily: "'Comic Neue', cursive, sans-serif" }}>BEST JOURNEY ROUTE</h2>
          <p className="text-secondary text-lg">Your adventure through understanding rare diseases</p>
        </div>

        <div className="relative mb-16">
          {/* Winding Road SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            {/* Road shadow */}
            <path 
              d="M 100 550 Q 250 450 300 350 T 500 250 T 700 150 T 900 50" 
              stroke="rgba(0,0,0,0.3)" 
              strokeWidth="60" 
              fill="none" 
              strokeLinecap="round"
            />
            {/* Road */}
            <path 
              d="M 100 550 Q 250 450 300 350 T 500 250 T 700 150 T 900 50" 
              stroke="#1E3A5F" 
              strokeWidth="50" 
              fill="none" 
              strokeLinecap="round"
            />
            {/* Road border */}
            <path 
              d="M 100 550 Q 250 450 300 350 T 500 250 T 700 150 T 900 50" 
              stroke="white" 
              strokeWidth="54" 
              fill="none" 
              strokeLinecap="round"
            />
            <path 
              d="M 100 550 Q 250 450 300 350 T 500 250 T 700 150 T 900 50" 
              stroke="#1E3A5F" 
              strokeWidth="50" 
              fill="none" 
              strokeLinecap="round"
            />
            {/* Dashed center line */}
            <path 
              d="M 100 550 Q 250 450 300 350 T 500 250 T 700 150 T 900 50" 
              stroke="white" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="20 20"
              strokeLinecap="round"
            />
          </svg>

          {/* Step Bubbles */}
          <div className="relative h-[600px]">
            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon as any;
              const isActive = activeStep === i;
              const positions = [
                { x: 15, y: 80 },
                { x: 35, y: 55 },
                { x: 55, y: 35 },
                { x: 75, y: 20 },
                { x: 90, y: 8 },
              ];
              const pos = positions[i];
              const isLeft = i % 2 === 0;
              
              return (
                <button
                  key={step.label}
                  onClick={() => setActiveStep(i)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isActive ? 'scale-110' : 'hover:scale-105'} sound-effect-pop`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  {/* Location Pin */}
                  <div className="relative">
                    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
                      <path 
                        d="M30 0 C13.4 0 0 13.4 0 30 C0 52.5 30 80 30 80 C30 80 60 52.5 60 30 C60 13.4 46.6 0 30 0 Z" 
                        fill={step.pinColor}
                      />
                      <circle cx="30" cy="30" r="15" fill="white" />
                    </svg>
                    {/* Icon inside pin */}
                    <div className="absolute inset-0 flex items-center justify-center pt-2">
                      <Icon className="w-6 h-6" style={{ color: step.pinColor }} />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-black text-sm shadow-md" style={{ color: step.pinColor }}>
                      {i + 1}
                    </div>
                  </div>
                  
                  {/* Step bubble */}
                  <div className={`absolute ${isLeft ? 'right-16' : 'left-16'} top-1/2 -translate-y-1/2 w-48 p-4 rounded-2xl shadow-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white scale-105 border-4 border-accent' 
                      : 'bg-white/90 hover:bg-white border-2 border-white'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5" style={{ color: step.pinColor }} />
                      <h3 className="font-black text-primary text-sm" style={{ fontFamily: "'Comic Neue', cursive, sans-serif" }}>{step.label}</h3>
                    </div>
                    <p className="text-xs text-accent leading-relaxed">{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Card */}
        <div className="rounded-3xl bg-white p-8 md:p-10 shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="animate-bounce" style={{ animationDelay: '0s' }}>
              <ZebraMascot size={32} />
            </div>
            <div className="text-primary text-sm font-bold uppercase tracking-widest">Step {activeStep + 1} of {JOURNEY_STEPS.length}</div>
            <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
              <ZebraMascot size={32} className="scale-x-[-1]" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            {(() => {
              const Icon = JOURNEY_STEPS[activeStep].icon as any;
              return <Icon className="w-12 h-12" style={{ color: JOURNEY_STEPS[activeStep].pinColor }} />;
            })()}
            <h3 className="font-black text-3xl md:text-4xl text-center text-primary" style={{ fontFamily: "'Comic Neue', cursive, sans-serif" }}>{JOURNEY_STEPS[activeStep].label}</h3>
          </div>
          <p className="text-accent text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-center">{JOURNEY_STEPS[activeStep].desc}</p>
          <div className="flex justify-center gap-3 mt-6">
            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon as any;
              const isActive = i === activeStep;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive 
                      ? "scale-125 shadow-lg" 
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: isActive ? step.pinColor : `${step.pinColor}30` }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </button>
              );
            })}
          </div>
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
    <div className="group relative overflow-hidden rounded-3xl border-2 border-taupe-30 bg-white shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-accent/60 hover:scale-105 cursor-pointer sound-effect-pop" onClick={onClick}>
      <div className={`relative px-6 pt-6 pb-4`}>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-2xl ${c.iconBg} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
            <Icon className="w-6 h-6 text-ivory" />
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-10 text-accent`}>{(disease as any).researchStatus || 'Research'}</span>
        </div>
        <h3 className="font-black text-primary text-lg leading-tight" style={{ fontFamily: "'Comic Neue', cursive, sans-serif" }}>{disease.name}</h3>
        <p className="text-xs text-taupe mt-0.5 font-medium">{disease.category}</p>
      </div>
      <div className="px-6 pb-6 pt-4">
        <p className="text-sm text-accent leading-relaxed mb-4">{disease.shortDesc}</p>
        <button className="flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">
          View Disease 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}
