import React, { useState, useEffect } from "react";
import {
  ChevronDown, Bot, Upload, Send, AlertCircle, Dna, FlaskConical,
  Baby, Activity, Shield, BookOpen, Globe, MapPin, Star, ExternalLink,
  CheckCircle, XCircle, Stethoscope, Pill, Heart, Users, FileText, Link2
} from "lucide-react";
import { ZebraEmptyState, Accordion, ZebraMascot } from "../components/common/Visuals";
import { apiService } from "../services/api.service";
import type { Disease, DiagnosticStep, ResearchOrg, Specialist, Source } from "../services/api.service";

// Define the causes structure type
interface Causes {
  genetic?: string;
  environmental?: string;
  unknown?: string;
}

// ─── Section helpers ──────────────────────────────────────────────────────────

/** Symptom pill chip */
function SymptomPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/20 text-primary text-sm font-medium border border-secondary/40">
      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      {text}
    </span>
  );
}

/** Section card wrapper */
function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-3xl border border-taupe-40 p-8 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

/** Section header row */
function SectionHeader({
  icon: Icon,
  title,
  iconBg = "bg-primary",
  iconColor = "text-secondary",
}: {
  icon: any;
  title: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <h2 className="font-black text-lg text-primary">{title}</h2>
    </div>
  );
}

/** Clickable external link button */
function LinkButton({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/8 text-primary text-xs font-semibold
        hover:bg-primary hover:text-ivory transition-all duration-200 border border-primary/20 hover:border-primary"
    >
      <ExternalLink className="w-3 h-3 shrink-0" />
      {label}
    </a>
  );
}

/** Fact/Myth badge */
function FactMythBadge({ isFact }: { isFact: boolean }) {
  return isFact ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-ivory text-xs font-bold shadow-sm">
      <CheckCircle className="w-3.5 h-3.5" /> FACT
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-ivory text-xs font-bold shadow-sm">
      <XCircle className="w-3.5 h-3.5" /> MYTH
    </span>
  );
}

// ─── Rich section renderers ───────────────────────────────────────────────────

function SymptomsSection({ symptoms }: { symptoms: string[] }) {
  if (!symptoms || symptoms.length === 0) return <ZebraEmptyState message="No symptoms listed yet" sub="Content is being reviewed and updated." />;
  
  // Group symptoms by length/complexity for better organization
  const shortSymptoms = symptoms.filter(s => s.length < 50);
  const longSymptoms = symptoms.filter(s => s.length >= 50);
  
  return (
    <SectionCard>
      <SectionHeader icon={Activity} title="Signs & Symptoms" iconBg="bg-accent" iconColor="text-secondary" />
      
      {longSymptoms.length > 0 && (
        <div className="mb-6 space-y-3">
          {longSymptoms.map((symptom, i) => (
            <div key={i} className="bg-primary/5 rounded-xl p-4 border border-primary/20">
              <p className="text-accent text-sm leading-relaxed">{symptom}</p>
            </div>
          ))}
        </div>
      )}
      
      {shortSymptoms.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-2">
            {shortSymptoms.map((s, i) => <SymptomPill key={i} text={s} />)}
          </div>
        </div>
      )}
    </SectionCard>
  );
}

function DiagnosisSection({ steps }: { steps: DiagnosticStep[] }) {
  if (!steps || steps.length === 0) return <ZebraEmptyState message="Diagnosis info coming soon" sub="Content is being reviewed." />;
  return (
    <div>
      <div className="bg-secondary rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-primary font-medium">
          These diagnostic methods are used by specialists. Always consult a qualified healthcare professional for diagnosis.
        </p>
      </div>
      <Accordion
        items={steps.map((step) => ({
          title: step.name,
          content: (
            <div className="space-y-4">
              {step.what && (
                <div>
                  <p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">What it is</p>
                  <p className="text-primary leading-relaxed">{step.what}</p>
                </div>
              )}
              {step.how && (
                <div>
                  <p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">How it works</p>
                  <p className="text-primary leading-relaxed">{step.how}</p>
                </div>
              )}
              {step.result && (
                <div>
                  <p className="text-xs font-bold text-taupe uppercase tracking-wider mb-1">What the result means</p>
                  <p className="text-primary bg-secondary rounded-xl p-3 leading-relaxed">{step.result}</p>
                </div>
              )}
            </div>
          ),
        }))}
      />
    </div>
  );
}

function LifestyleSection({ lifestyle }: { lifestyle: any }) {
  if (!lifestyle) return <ZebraEmptyState message="Lifestyle info coming soon" sub="Content is being reviewed." />;

  const subSections = [
    {
      key: "therapies",
      label: "Therapies",
      icon: Stethoscope,
      data: lifestyle.therapies || [],
      type: "list",
    },
    {
      key: "nutrition",
      label: "Nutrition & Diet",
      icon: Heart,
      data: lifestyle.nutrition || "",
      type: "text",
    },
    {
      key: "devices",
      label: "Devices & Equipment",
      icon: Pill,
      data: lifestyle.devices || [],
      type: "list",
    },
    {
      key: "caregiverTips",
      label: "Caregiver Tips",
      icon: Users,
      data: lifestyle.caregiverTips || [],
      type: "list",
    },
    {
      key: "community",
      label: "Community & Support",
      icon: Globe,
      data: lifestyle.community || "",
      type: "text",
    },
  ].filter((s) => {
    if (s.type === "list") return Array.isArray(s.data) && s.data.length > 0;
    return typeof s.data === "string" && s.data.trim().length > 0;
  });

  if (subSections.length === 0) {
    // Fallback: show raw text if no structured data
    const raw = lifestyle.raw || lifestyle.nutrition || "";
    return (
      <SectionCard>
        <SectionHeader icon={Shield} title="Lifestyle & Daily Support" iconBg="bg-secondary" iconColor="text-primary" />
        {raw ? <p className="text-accent leading-relaxed">{raw}</p> : <ZebraEmptyState message="Lifestyle info coming soon" sub="Content is being reviewed." />}
      </SectionCard>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {subSections.map((section) => {
        const Icon = section.icon;
        return (
          <SectionCard key={section.key}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <h3 className="font-bold text-base text-primary">{section.label}</h3>
            </div>
            {section.type === "list" ? (
              <ul className="space-y-1.5">
                {(section.data as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-accent leading-relaxed">{section.data as string}</p>
            )}
          </SectionCard>
        );
      })}
    </div>
  );
}

function ResearchSection({ orgs }: { orgs: ResearchOrg[] }) {
  if (!orgs || orgs.length === 0) return <ZebraEmptyState message="Research directory coming soon" sub="Content is being reviewed." />;
  return (
    <SectionCard>
      <SectionHeader icon={Star} title="Research & Pharma Directory" iconBg="bg-primary" iconColor="text-secondary" />
      <div className="space-y-4">
        {orgs.map((org, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border border-taupe-40 rounded-2xl p-4 hover:border-primary/40 hover:bg-secondary/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-bold text-primary text-sm mb-0.5">{org.name}</h3>
                <p className="text-xs text-accent leading-relaxed">{org.focus}</p>
              </div>
              {org.url && <LinkButton url={org.url} label="Visit" />}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function FaqsSection({ faqs }: { faqs: any[] }) {
  if (!faqs || faqs.length === 0) return <ZebraEmptyState message="FAQs coming soon" sub="Content is being reviewed." />;
  return (
    <SectionCard>
      <SectionHeader icon={BookOpen} title="Frequently Asked Questions" iconBg="bg-accent" iconColor="text-secondary" />
      <Accordion
        items={faqs.map((faq: any) => ({
          title: faq.question || faq.q,
          content: <p className="text-accent leading-relaxed">{faq.answer || faq.a}</p>,
        }))}
      />
    </SectionCard>
  );
}

function FactsMythsSection({ items }: { items: any[] }) {
  if (!items || items.length === 0) return <ZebraEmptyState message="Facts & myths coming soon" sub="Content is being reviewed." />;

  const myths = items.filter((m) => !m.isFact);
  const facts = items.filter((m) => m.isFact);

  return (
    <SectionCard>
      <SectionHeader icon={AlertCircle} title="Facts vs Myths" iconBg="bg-primary" iconColor="text-secondary" />
      <div className="space-y-3">
        {[...myths, ...facts].map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 border-2 transition-all duration-200 hover:shadow-md ${
              item.isFact
                ? "border-primary/20 bg-primary/5 hover:border-primary/40"
                : "border-accent/20 bg-accent/5 hover:border-accent/40"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <FactMythBadge isFact={item.isFact} />
              </div>
              <div>
                <p className="font-bold text-primary text-sm mb-1 leading-snug">
                  {item.statement || item.myth}
                </p>
                {item.explanation && item.explanation !== item.statement && (
                  <p className="text-xs text-accent leading-relaxed">{item.explanation || item.fact}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SpecialistsSection({ specialists }: { specialists: Specialist[] }) {
  if (!specialists || specialists.length === 0) return <ZebraEmptyState message="Specialist directory coming soon" sub="Content is being reviewed." />;
  return (
    <SectionCard>
      <SectionHeader icon={Globe} title="Specialist Directory" iconBg="bg-secondary" iconColor="text-primary" />
      <div className="space-y-4">
        {specialists.map((spec, i) => {
          const initials = spec.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
          return (
            <div
              key={i}
              className="border border-taupe-40 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-ivory font-black text-sm shrink-0">
                  {initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-primary text-base leading-tight">{spec.name}</h3>
                      {spec.organization && (
                        <p className="text-sm text-accent font-medium">{spec.organization}</p>
                      )}
                    </div>
                    {spec.contact && (
                      <LinkButton url={spec.contact} label="Contact" />
                    )}
                  </div>
                  
                  {spec.focus && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/30 text-primary text-xs font-semibold">
                        {spec.focus}
                      </span>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {spec.location && (
                      <div className="flex items-center gap-2 text-xs text-taupe">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{spec.location}</span>
                      </div>
                    )}
                    {spec.why && spec.why !== spec.name && (
                      <p className="text-xs text-accent leading-relaxed mt-2 italic">
                        {spec.why.length > 150 ? spec.why.substring(0, 150) + '...' : spec.why}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function SourcesSection({ sources }: { sources: Source[] }) {
  if (!sources || sources.length === 0) return <ZebraEmptyState message="Sources coming soon" sub="References being compiled." />;

  const typeColors: Record<string, string> = {
    "Research Paper": "bg-blue-50 text-blue-700 border-blue-200",
    "Clinical Trial": "bg-purple-50 text-purple-700 border-purple-200",
    "Medical Authority": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Patient Organization": "bg-amber-50 text-amber-700 border-amber-200",
    "Reference": "bg-taupe/10 text-accent border-taupe-40",
  };

  return (
    <SectionCard>
      <SectionHeader icon={FileText} title="Sources & References" iconBg="bg-accent" iconColor="text-secondary" />
      <div className="space-y-3">
        {sources.map((source, i) => (
          <div
            key={i}
            className="flex items-start gap-3 border border-taupe-40 rounded-xl p-3 hover:border-primary/30 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
              <Link2 className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="font-semibold text-primary text-sm leading-tight truncate">{source.title}</p>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    typeColors[source.type] || typeColors["Reference"]
                  }`}
                >
                  {source.type}
                </span>
              </div>
              {source.description && source.description !== source.title && (
                <p className="text-xs text-accent line-clamp-2">{source.description}</p>
              )}
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline mt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Source
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

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
        const d = await apiService.getDiseaseById(diseaseId);
        setDisease(d);
        setAiMessages([
          {
            role: "ai",
            text: `Hello! I'm RareBridge AI. I can help you understand research papers and complex medical information about ${d.name}. Ask me anything, or upload a research paper to get started.`,
          },
        ]);
      } catch (error) {
        console.error("Failed to load disease:", error);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
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
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-primary text-ivory rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  function sendAI() {
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiInput("");
    setAiMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      {
        role: "ai",
        text: `Here is a simplified explanation: Research on ${disease!.name} suggests that the genetic mutations involved affect critical enzyme function.`,
      },
    ]);
  }

  const categoryBadges = disease.category
    ? disease.category.split(/[·,]/).map((c) => c.trim()).filter(Boolean)
    : ["Rare Disease"];

  const shortDesc = disease.overview
    ? disease.overview.length > 180
      ? disease.overview.substring(0, 180) + "..."
      : disease.overview
    : "Comprehensive rare disease details and support resources.";

  const quickInfoCards = [
    { label: "Category", value: categoryBadges.join(" · "), icon: Dna },
    { label: "Inheritance", value: "Genetic", icon: FlaskConical },
    { label: "Age of Onset", value: "Variable", icon: Baby },
    { label: "Severity", value: "Severe", icon: Activity },
  ];

  const hasSources = disease.sources && disease.sources.length > 0;
  const sections = [
    "Overview", "Causes", "Symptoms", "Diagnosis",
    "Lifestyle", "Research", "FAQ", "Facts & Myths", "Specialists",
    ...(hasSources ? ["Sources"] : []),
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Left side curvy lines */}
      <svg className="fixed left-0 top-0 h-full w-32 pointer-events-none opacity-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d="M20 0 Q50 100 20 200 T20 400 T20 600 T20 800 T20 1000" stroke="var(--primary)" strokeWidth="3" fill="none" />
        <path d="M40 0 Q70 150 40 300 T40 600 T40 900 T40 1000" stroke="var(--purple)" strokeWidth="2" fill="none" />
        <path d="M60 0 Q90 200 60 400 T60 800 T60 1000" stroke="var(--green)" strokeWidth="2" fill="none" />
      </svg>
      {/* Right side curvy lines */}
      <svg className="fixed right-0 top-0 h-full w-32 pointer-events-none opacity-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d="M80 0 Q50 100 80 200 T80 400 T80 600 T80 800 T80 1000" stroke="var(--primary)" strokeWidth="3" fill="none" />
        <path d="M60 0 Q30 150 60 300 T60 600 T60 900 T60 1000" stroke="var(--purple)" strokeWidth="2" fill="none" />
        <path d="M40 0 Q10 200 40 400 T40 800 T40 1000" stroke="var(--green)" strokeWidth="2" fill="none" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary mb-4 group transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-90 group-hover:-translate-x-0.5 transition-transform" />
          Back to Directory
        </button>

        {/* Hero banner */}
        <div className="bg-primary rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-md">
                <Dna className="w-5 h-5 text-secondary" />
              </div>
              {categoryBadges.map((b) => (
                <span key={b} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-secondary">
                  {b}
                </span>
              ))}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-secondary">
                Active Research
              </span>
            </div>
            <h1 className="font-black text-2xl md:text-3xl text-ivory mb-2">{disease.name}</h1>
            <p className="text-taupe text-sm max-w-2xl">{shortDesc}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {quickInfoCards.map((card) => (
                <div key={card.label} className="bg-primary-dark rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <card.icon className="w-3.5 h-3.5 text-taupe" />
                    <span className="text-xs text-taupe font-medium">{card.label}</span>
                  </div>
                  <div className="font-bold text-secondary text-xs sm:text-sm">{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveSection(i)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                activeSection === i
                  ? "bg-primary text-ivory shadow-md"
                  : "bg-white text-accent border border-taupe-40 hover:border-accent/40 hover:text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ── Section content ── */}

        {/* 0: Overview */}
        {activeSection === 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <SectionCard>
              <SectionHeader icon={BookOpen} title="Simple Explanation" iconBg="bg-secondary" iconColor="text-primary" />
              <p className="text-accent leading-relaxed">{disease.overview}</p>
            </SectionCard>
            <SectionCard>
              <SectionHeader icon={FlaskConical} title="Medical Description" iconBg="bg-primary" iconColor="text-secondary" />
              <p className="text-accent leading-relaxed text-sm">{disease.overview}</p>
            </SectionCard>
          </div>
        )}

        {/* 1: Causes */}
        {activeSection === 1 && (
          <SectionCard>
            <SectionHeader icon={FlaskConical} title="Causes" iconBg="bg-primary" iconColor="text-secondary" />
            {typeof disease.causes === 'object' && disease.causes !== null ? (
              <div className="space-y-4">
                {(disease.causes as Causes).genetic && (
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Dna className="w-4 h-4 text-primary" />
                      <h4 className="font-bold text-primary text-sm">Genetic Factors</h4>
                    </div>
                    <p className="text-accent text-sm leading-relaxed">{(disease.causes as Causes).genetic}</p>
                  </div>
                )}
                {(disease.causes as Causes).environmental && (disease.causes as Causes).environmental !== "Unknown" && (
                  <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="w-4 h-4 text-primary" />
                      <h4 className="font-bold text-primary text-sm">Environmental Factors</h4>
                    </div>
                    <p className="text-accent text-sm leading-relaxed">{(disease.causes as Causes).environmental}</p>
                  </div>
                )}
                {(disease.causes as Causes).unknown && (disease.causes as Causes).unknown !== "Unknown" && (
                  <div className="bg-taupe-10 rounded-xl p-4 border border-taupe-40">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-accent" />
                      <h4 className="font-bold text-primary text-sm">Additional Factors</h4>
                    </div>
                    <p className="text-accent text-sm leading-relaxed">{(disease.causes as Causes).unknown}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-accent leading-relaxed">{disease.causes}</p>
            )}
          </SectionCard>
        )}

        {/* 2: Symptoms */}
        {activeSection === 2 && (
          <SymptomsSection symptoms={disease.typesAndSymptoms} />
        )}

        {/* 3: Diagnosis */}
        {activeSection === 3 && (
          <DiagnosisSection steps={disease.diagnosis} />
        )}

        {/* 4: Lifestyle */}
        {activeSection === 4 && (
          <LifestyleSection lifestyle={disease.lifestyleAndDailySupport} />
        )}

        {/* 5: Research */}
        {activeSection === 5 && (
          <ResearchSection orgs={disease.treatmentsAndPharma} />
        )}

        {/* 6: FAQ */}
        {activeSection === 6 && (
          <FaqsSection faqs={disease.faqs || []} />
        )}

        {/* 7: Facts & Myths */}
        {activeSection === 7 && (
          <FactsMythsSection items={disease.factsMyths || []} />
        )}

        {/* 8: Specialists */}
        {activeSection === 8 && (
          <SpecialistsSection specialists={disease.specialists || []} />
        )}

        {/* 9: Sources (conditional) */}
        {activeSection === 9 && hasSources && (
          <SourcesSection sources={disease.sources || []} />
        )}
      </div>

      {/* AI Chat button */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 rounded-2xl bg-primary text-secondary shadow-xl shadow-primary-20 flex items-center justify-center hover:bg-primary-dark hover:scale-105 transition-all z-40"
        title="RareBridge AI"
      >
        <Bot className="w-6 h-6" />
      </button>

      {aiOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="font-black text-ivory text-sm">RareBridge AI</div>
                  <div className="text-taupe text-xs">Simplifying rare disease research</div>
                </div>
              </div>
              <button onClick={() => setAiOpen(false)} className="p-1.5 rounded-xl hover:bg-accent transition-colors">
                <ChevronDown className="w-5 h-5 text-taupe" />
              </button>
            </div>

            <div className="h-72 overflow-y-auto p-5 space-y-3 bg-ivory">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mr-2 mt-0.5 shrink-0">
                      <Bot className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-secondary rounded-br-sm"
                        : "bg-white text-accent rounded-bl-sm shadow-sm border border-secondary"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-secondary p-4 space-y-2 bg-white">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-taupe text-accent text-sm font-semibold hover:bg-ivory transition-colors">
                <Upload className="w-4 h-4" /> Upload a Research Paper (PDF)
              </button>
              <div className="flex gap-2">
                <input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendAI()}
                  placeholder="Ask me anything about this disease..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-ivory border-2 border-secondary focus:border-accent focus:outline-none text-sm text-primary placeholder:text-taupe"
                />
                <button
                  onClick={sendAI}
                  className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center hover:bg-primary-dark transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
