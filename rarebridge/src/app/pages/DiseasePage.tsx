import React, { useState } from "react";
import { ChevronDown, Bot, Upload, Send, CheckCircle, AlertCircle, Dna, FlaskConical, Baby, Activity, Shield, BookOpen, Globe, Phone, MapPin, FileText, Star } from "lucide-react";
import { ZebraEmptyState, Accordion, ZebraMascot } from "../components/common/Visuals";
import type { Disease } from "../data";

export default function DiseasePage({ disease, onBack }: { disease: Disease; onBack: () => void }) {
  const [activeSection, setActiveSection] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm RareBridge AI. I can help you understand research papers and complex medical information about " + disease.name + ". Ask me anything, or upload a research paper to get started." }
  ]);

  function sendAI() {
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiInput("");
    setAiMessages(prev => [...prev, { role: "user", text: userMsg }, { role: "ai", text: `Here is a simplified explanation: Research on ${disease.name} suggests that the genetic mutations involved affect critical enzyme function.` }]);
  }

  const c = { iconBg: "bg-accent" };
  const Icon = disease.icon as any;
  const sections = ["Overview", "Causes", "Symptoms", "Diagnosis", "Lifestyle", "Research", "FAQ", "Myths", "Specialists"];

  const quickInfoCards = [
    { label: "Category", value: (disease as any).categoryBadges?.join(" · ") || disease.category, icon: Dna },
    { label: "Inheritance", value: (disease as any).inheritance || "Genetic", icon: FlaskConical },
    { label: "Age of Onset", value: (disease as any).ageAppearance || "Variable", icon: Baby },
    { label: "Severity", value: (disease as any).severity || "Severe", icon: Activity },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Left side curvy lines */}
      <svg className="fixed left-0 top-0 h-full w-32 pointer-events-none opacity-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d="M20 0 Q50 100 20 200 T20 400 T20 600 T20 800 T20 1000" stroke="var(--primary)" strokeWidth="3" fill="none" />
        <path d="M40 0 Q70 150 40 300 T40 600 T40 900 T40 1000" stroke="var(--purple)" strokeWidth="2" fill="none" />
        <path d="M60 0 Q90 200 60 400 T60 800 T60 1000" stroke="var(--green)" strokeWidth="2" fill="none" />
        <path d="M10 100 Q40 150 10 200 T10 300 T10 400" stroke="var(--accent)" strokeWidth="2" fill="none" />
        <path d="M80 200 Q50 250 80 300 T80 400 T80 500" stroke="var(--secondary)" strokeWidth="2" fill="none" />
      </svg>

      {/* Right side curvy lines */}
      <svg className="fixed right-0 top-0 h-full w-32 pointer-events-none opacity-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d="M80 0 Q50 100 80 200 T80 400 T80 600 T80 800 T80 1000" stroke="var(--primary)" strokeWidth="3" fill="none" />
        <path d="M60 0 Q30 150 60 300 T60 600 T60 900 T60 1000" stroke="var(--purple)" strokeWidth="2" fill="none" />
        <path d="M40 0 Q10 200 40 400 T40 800 T40 1000" stroke="var(--green)" strokeWidth="2" fill="none" />
        <path d="M90 100 Q60 150 90 200 T90 300 T90 400" stroke="var(--accent)" strokeWidth="2" fill="none" />
        <path d="M20 200 Q50 250 20 300 T20 400 T20 500" stroke="var(--secondary)" strokeWidth="2" fill="none" />
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary mb-8 group transition-colors"><ChevronDown className="w-4 h-4 rotate-90 group-hover:-translate-x-0.5 transition-transform" />Back to Directory</button>

      <div className="bg-primary rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute -bottom-6 right-6 opacity-8 pointer-events-none"><ZebraMascot size={140} className="opacity-10" /></div>
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-md"><Icon className="w-7 h-7 text-secondary" /></div>
            {(disease as any).categoryBadges?.map((b: string) => (<span key={b} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-secondary">{b}</span>))}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-10 text-secondary`}>{(disease as any).researchStatus}</span>
          </div>
          <h1 className="font-black text-4xl md:text-5xl text-ivory mb-2">{disease.name}</h1>
          <p className="text-taupe max-w-2xl">{disease.shortDesc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {quickInfoCards.map(card => (
              <div key={card.label} className="bg-primary-dark rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1"><card.icon className="w-4 h-4 text-taupe" /><span className="text-xs text-taupe font-medium">{card.label}</span></div>
                <div className="font-bold text-secondary text-sm">{card.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {sections.map((s, i) => (<button key={s} onClick={() => setActiveSection(i)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === i ? "bg-primary text-ivory shadow-md" : "bg-white text-accent border border-taupe-40 hover:border-accent/40 hover:text-primary"}`}>{s}</button>))}
      </div>

      {activeSection === 0 && (disease as any).overview && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm"><div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center"><BookOpen className="w-4 h-4 text-primary" /></div><h2 className="font-black text-lg text-primary">Simple Explanation</h2></div><p className="text-accent leading-relaxed">{(disease as any).overview.simple}</p></div>
          <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm"><div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center"><FlaskConical className="w-4 h-4 text-secondary" /></div><h2 className="font-black text-lg text-primary">Medical Description</h2></div><p className="text-accent leading-relaxed text-sm">{(disease as any).overview.medical}</p></div>
        </div>
      )}

      {activeSection === 3 && (disease as any).diagnosis && (
        <div>
          <div className="bg-secondary rounded-2xl p-4 mb-6 flex items-start gap-3"><Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" /><p className="text-sm text-primary font-medium">These diagnostic methods are used by specialists. Always consult a qualified healthcare professional for diagnosis.</p></div>
          <Accordion items={(disease as any).diagnosis.map((d: any) => ({ title: d.name, content: (<div className="space-y-4"><div><p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">What it is</p><p className="text-primary">{d.what}</p></div><div><p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">How it works</p><p className="text-primary">{d.how}</p></div><div><p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">What the result means</p><p className="text-primary bg-secondary rounded-xl p-3">{d.result}</p></div></div>) }))} />
        </div>
      )}

      {[0,1,2,3,4,5,6,7,8].includes(activeSection) && !(disease as any)[["overview","causes","types","diagnosis","lifestyle","research","faqs","myths","specialists"][activeSection]] && (
        <ZebraEmptyState message="Content coming soon" sub="Our team is working on gathering this information for this disease." />
      )}

      <button onClick={() => setAiOpen(true)} className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 rounded-2xl bg-primary text-secondary shadow-xl shadow-primary-20 flex items-center justify-center hover:bg-primary-dark hover:scale-105 transition-all z-40" title="RareBridge AI"><Bot className="w-6 h-6" /></button>

      {aiOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center"><Bot className="w-5 h-5 text-secondary" /></div><div><div className="font-black text-ivory text-sm">RareBridge AI</div><div className="text-taupe text-xs">Simplifying rare disease research</div></div></div>
              <button onClick={() => setAiOpen(false)} className="p-1.5 rounded-xl hover:bg-accent transition-colors"><ChevronDown className="w-5 h-5 text-taupe" /></button>
            </div>

            <div className="h-72 overflow-y-auto p-5 space-y-3 bg-ivory">{aiMessages.map((msg, i) => (<div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>{msg.role === "ai" && (<div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mr-2 mt-0.5 shrink-0"><Bot className="w-4 h-4 text-secondary" /></div>)}<div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-secondary rounded-br-sm" : "bg-white text-accent rounded-bl-sm shadow-sm border border-secondary"}`}>{msg.text}</div></div>))}</div>

              <div className="border-t border-secondary p-4 space-y-2 bg-white">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-taupe text-accent text-sm font-semibold hover:bg-ivory transition-colors"><Upload className="w-4 h-4" /> Upload a Research Paper (PDF)</button>
              <div className="flex gap-2"><input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAI()} placeholder="Ask me anything about this disease..." className="flex-1 px-4 py-2.5 rounded-xl bg-ivory border-2 border-secondary focus:border-accent focus:outline-none text-sm text-primary placeholder:text-taupe" /><button onClick={sendAI} className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center hover:bg-primary-dark transition-colors shrink-0"><Send className="w-4 h-4" /></button></div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
