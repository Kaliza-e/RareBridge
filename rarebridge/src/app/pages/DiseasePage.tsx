import React, { useState, useEffect } from "react";
import { ChevronDown, Bot, Upload, Send, CheckCircle, AlertCircle, Dna, FlaskConical, Baby, Activity, Shield, BookOpen, Globe, Phone, MapPin, FileText, Star } from "lucide-react";
import { ZebraEmptyState, Accordion, ZebraMascot } from "../components/common/Visuals";
import { apiService } from "../services/api.service";
import type { Disease } from "../data";

export default function DiseasePage({ diseaseId, onBack }: { diseaseId: string; onBack: () => void }) {
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);

  useEffect(() => {
    async function loadDisease() {
      setLoading(true);
      try {
        const apiDisease = await apiService.getDiseaseById(diseaseId);
        // Transform API disease to frontend format
        const transformedDisease: Disease = {
          id: apiDisease.id,
          name: apiDisease.name,
          category: apiDisease.category,
          categoryBadges: apiDisease.category.split(' · ').map(c => c.trim()),
          icon: Dna,
          color: "navy",
          shortDesc: apiDisease.overview.substring(0, 150) + '...',
          researchStatus: "Active Research",
          inheritance: "Genetic",
          ageAppearance: "Variable",
          severity: "Severe",
          symptoms: apiDisease.typesAndSymptoms?.split('\n').filter(s => s.trim()) || [],
          overview: {
            simple: apiDisease.overview,
            medical: apiDisease.overview
          },
          causes: {
            genetic: apiDisease.causes,
            environmental: "Unknown",
            unknown: "Unknown"
          },
          types: [],
          diagnosis: apiDisease.diagnosis ? [{
            name: "Diagnostic Process",
            what: "Clinical evaluation and testing",
            how: "Comprehensive medical assessment",
            result: apiDisease.diagnosis
          }] : [],
          lifestyle: {
            therapies: [],
            nutrition: apiDisease.lifestyleAndDailySupport,
            devices: [],
            caregiverTips: []
          },
          research: apiDisease.treatmentsAndPharma ? [{
            name: "Research & Pharma Directory",
            focus: apiDisease.treatmentsAndPharma.substring(0, 100),
            why: "Current research and treatment options",
            logo: "RX"
          }] : [],
          faqs: apiDisease.faqs?.map(faq => ({ q: faq.question, a: faq.answer })) || [],
          myths: apiDisease.factsMyths?.map(fm => ({ 
            myth: fm.statement, 
            fact: fm.isFact ? fm.explanation : "False: " + fm.explanation 
          })) || [],
          specialists: apiDisease.specialists?.map(spec => ({
            name: spec.name,
            role: spec.focus,
            org: spec.organization,
            location: spec.location,
            specialization: spec.focus,
            publications: 0
          })) || []
        };
        setDisease(transformedDisease);
        setAiMessages([{ role: "ai", text: "Hello! I'm RareBridge AI. I can help you understand research papers and complex medical information about " + transformedDisease.name + ". Ask me anything, or upload a research paper to get started." }]);
      } catch (error) {
        console.error('Failed to load disease:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDisease();
  }, [diseaseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-primary">Loading disease information...</p>
        </div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-primary">Failed to load disease information</p>
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-primary text-ivory rounded-lg">Go Back</button>
        </div>
      </div>
    );
  }

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

      {activeSection === 1 && (disease as any).causes && (
        <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-secondary" />
            </div>
            <h2 className="font-black text-lg text-primary">Causes</h2>
          </div>
          <p className="text-accent leading-relaxed">{(disease as any).causes.genetic}</p>
        </div>
      )}

      {activeSection === 2 && (disease as any).symptoms && (disease as any).symptoms.length > 0 && (
        <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <Activity className="w-4 h-4 text-secondary" />
            </div>
            <h2 className="font-black text-lg text-primary">Symptoms</h2>
          </div>
          <ul className="space-y-2">
            {(disease as any).symptoms.map((symptom: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-accent">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeSection === 3 && (disease as any).diagnosis && (disease as any).diagnosis.length > 0 && (
        <div>
          <div className="bg-secondary rounded-2xl p-4 mb-6 flex items-start gap-3"><Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" /><p className="text-sm text-primary font-medium">These diagnostic methods are used by specialists. Always consult a qualified healthcare professional for diagnosis.</p></div>
          <Accordion items={(disease as any).diagnosis.map((d: any) => ({ title: d.name, content: (<div className="space-y-4"><div><p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">What it is</p><p className="text-primary">{d.what}</p></div><div><p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">How it works</p><p className="text-primary">{d.how}</p></div><div><p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">What the result means</p><p className="text-primary bg-secondary rounded-xl p-3">{d.result}</p></div></div>) }))} />
        </div>
      )}

      {activeSection === 4 && (disease as any).lifestyle && (
        <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-black text-lg text-primary">Lifestyle & Daily Support</h2>
          </div>
          <p className="text-accent leading-relaxed">{(disease as any).lifestyle.nutrition}</p>
        </div>
      )}

      {activeSection === 5 && (disease as any).research && (disease as any).research.length > 0 && (
        <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Star className="w-4 h-4 text-secondary" />
            </div>
            <h2 className="font-black text-lg text-primary">Research & Pharma Directory</h2>
          </div>
          <div className="space-y-4">
            {(disease as any).research.map((r: any, i: number) => (
              <div key={i} className="border border-taupe-40 rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2">{r.name}</h3>
                <p className="text-sm text-accent mb-2">{r.focus}</p>
                <p className="text-xs text-taupe">{r.why}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 6 && (disease as any).faqs && (disease as any).faqs.length > 0 && (
        <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-secondary" />
            </div>
            <h2 className="font-black text-lg text-primary">FAQs</h2>
          </div>
          <Accordion items={(disease as any).faqs.map((faq: any) => ({ title: faq.q, content: <p className="text-accent leading-relaxed">{faq.a}</p> }))} />
        </div>
      )}

      {activeSection === 7 && (disease as any).myths && (disease as any).myths.length > 0 && (
        <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-secondary" />
            </div>
            <h2 className="font-black text-lg text-primary">Facts vs Myths</h2>
          </div>
          <div className="space-y-4">
            {(disease as any).myths.map((m: any, i: number) => (
              <div key={i} className="border border-taupe-40 rounded-xl p-4">
                <p className="font-bold text-primary mb-2">Myth: {m.myth}</p>
                <p className="text-sm text-accent">{m.fact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 8 && (disease as any).specialists && (disease as any).specialists.length > 0 && (
        <div className="bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-black text-lg text-primary">Specialists</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {(disease as any).specialists.map((spec: any, i: number) => (
              <div key={i} className="border border-taupe-40 rounded-xl p-4">
                <h3 className="font-bold text-primary mb-1">{spec.name}</h3>
                <p className="text-sm text-accent mb-1">{spec.role}</p>
                <p className="text-xs text-taupe mb-1">{spec.org}</p>
                <div className="flex items-center gap-1 text-xs text-taupe">
                  <MapPin className="w-3 h-3" />
                  <span>{spec.location}</span>
                </div>
              </div>
            ))}
          </div>
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
