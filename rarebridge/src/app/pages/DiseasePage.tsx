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

  const c = { iconBg: "bg-[#3B507D]" };
  const Icon = disease.icon as any;
  const sections = ["Overview", "Causes", "Symptoms", "Diagnosis", "Lifestyle", "Research", "FAQ", "Myths", "Specialists"];

  const quickInfoCards = [
    { label: "Category", value: (disease as any).categoryBadges?.join(" · ") || disease.category, icon: Dna },
    { label: "Inheritance", value: (disease as any).inheritance || "Genetic", icon: FlaskConical },
    { label: "Age of Onset", value: (disease as any).ageAppearance || "Variable", icon: Baby },
    { label: "Severity", value: (disease as any).severity || "Severe", icon: Activity },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-[#3B507D] hover:text-[#112250] mb-8 group transition-colors"><ChevronDown className="w-4 h-4 rotate-90 group-hover:-translate-x-0.5 transition-transform" />Back to Directory</button>

      <div className="bg-[#112250] rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute -bottom-6 right-6 opacity-8 pointer-events-none"><ZebraMascot size={140} className="opacity-10" /></div>
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#3B507D] flex items-center justify-center shadow-md"><Icon className="w-7 h-7 text-[#E7E2CE]" /></div>
            {(disease as any).categoryBadges?.map((b: string) => (<span key={b} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3B507D] text-[#E7E2CE]">{b}</span>))}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3B507D]/30 text-[#E7E2CE]`}>{(disease as any).researchStatus}</span>
          </div>
          <h1 className="font-black text-4xl md:text-5xl text-[#F5F4F0] mb-2">{disease.name}</h1>
          <p className="text-[#BEB7A7] max-w-2xl">{disease.shortDesc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {quickInfoCards.map(card => (
              <div key={card.label} className="bg-[#1a325e] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1"><card.icon className="w-4 h-4 text-[#BEB7A7]" /><span className="text-xs text-[#BEB7A7] font-medium">{card.label}</span></div>
                <div className="font-bold text-[#E7E2CE] text-sm">{card.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {sections.map((s, i) => (<button key={s} onClick={() => setActiveSection(i)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === i ? "bg-[#112250] text-[#F5F4F0] shadow-md" : "bg-white text-[#3B507D] border border-[#BEB7A7]/40 hover:border-[#3B507D]/40 hover:text-[#112250]"}`}>{s}</button>))}
      </div>

      {activeSection === 0 && (disease as any).overview && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#BEB7A7]/30 p-8 shadow-sm"><div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-xl bg-[#E7E2CE] flex items-center justify-center"><BookOpen className="w-4 h-4 text-[#112250]" /></div><h2 className="font-black text-lg text-[#112250]">Simple Explanation</h2></div><p className="text-[#3B507D] leading-relaxed">{(disease as any).overview.simple}</p></div>
          <div className="bg-white rounded-3xl border border-[#BEB7A7]/30 p-8 shadow-sm"><div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-xl bg-[#112250] flex items-center justify-center"><FlaskConical className="w-4 h-4 text-[#E7E2CE]" /></div><h2 className="font-black text-lg text-[#112250]">Medical Description</h2></div><p className="text-[#3B507D] leading-relaxed text-sm">{(disease as any).overview.medical}</p></div>
        </div>
      )}

      {activeSection === 3 && (disease as any).diagnosis && (
        <div>
          <div className="bg-[#E7E2CE] rounded-2xl p-4 mb-6 flex items-start gap-3"><Shield className="w-5 h-5 text-[#112250] mt-0.5 shrink-0" /><p className="text-sm text-[#112250] font-medium">These diagnostic methods are used by specialists. Always consult a qualified healthcare professional for diagnosis.</p></div>
          <Accordion items={(disease as any).diagnosis.map((d: any) => ({ title: d.name, content: (<div className="space-y-4"><div><p className="text-xs font-bold text-[#BEB7A7] uppercase tracking-wider mb-1">What it is</p><p className="text-[#112250]">{d.what}</p></div><div><p className="text-xs font-bold text-[#BEB7A7] uppercase tracking-wider mb-1">How it works</p><p className="text-[#112250]">{d.how}</p></div><div><p className="text-xs font-bold text-[#BEB7A7] uppercase tracking-wider mb-1">What the result means</p><p className="text-[#112250] bg-[#E7E2CE] rounded-xl p-3">{d.result}</p></div></div>) }))} />
        </div>
      )}

      {[0,1,2,3,4,5,6,7,8].includes(activeSection) && !(disease as any)[["overview","causes","types","diagnosis","lifestyle","research","faqs","myths","specialists"][activeSection]] && (
        <ZebraEmptyState message="Content coming soon" sub="Our team is working on gathering this information for this disease." />
      )}

      <button onClick={() => setAiOpen(true)} className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 rounded-2xl bg-[#112250] text-[#E7E2CE] shadow-xl shadow-[#112250]/30 flex items-center justify-center hover:bg-[#1a325e] hover:scale-105 transition-all z-40" title="RareBridge AI"><Bot className="w-6 h-6" /></button>

      {aiOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-[#112250] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#3B507D] flex items-center justify-center"><Bot className="w-5 h-5 text-[#E7E2CE]" /></div><div><div className="font-black text-[#F5F4F0] text-sm">RareBridge AI</div><div className="text-[#BEB7A7] text-xs">Simplifying rare disease research</div></div></div>
              <button onClick={() => setAiOpen(false)} className="p-1.5 rounded-xl hover:bg-[#3B507D] transition-colors"><ChevronDown className="w-5 h-5 text-[#BEB7A7]" /></button>
            </div>

            <div className="h-72 overflow-y-auto p-5 space-y-3 bg-[#F5F4F0]">{aiMessages.map((msg, i) => (<div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>{msg.role === "ai" && (<div className="w-7 h-7 rounded-full bg-[#112250] flex items-center justify-center mr-2 mt-0.5 shrink-0"><Bot className="w-4 h-4 text-[#E7E2CE]" /></div>)}<div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-[#112250] text-[#E7E2CE] rounded-br-sm" : "bg-white text-[#3B507D] rounded-bl-sm shadow-sm border border-[#E7E2CE]"}`}>{msg.text}</div></div>))}</div>

            <div className="border-t border-[#E7E2CE] p-4 space-y-2 bg-white">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-[#BEB7A7] text-[#3B507D] text-sm font-semibold hover:bg-[#F5F4F0] transition-colors"><Upload className="w-4 h-4" /> Upload a Research Paper (PDF)</button>
              <div className="flex gap-2"><input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAI()} placeholder="Ask me anything about this disease..." className="flex-1 px-4 py-2.5 rounded-xl bg-[#F5F4F0] border-2 border-[#E7E2CE] focus:border-[#3B507D] focus:outline-none text-sm text-[#112250] placeholder:text-[#BEB7A7]" /><button onClick={sendAI} className="w-10 h-10 rounded-xl bg-[#112250] text-[#E7E2CE] flex items-center justify-center hover:bg-[#1a325e] transition-colors shrink-0"><Send className="w-4 h-4" /></button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
