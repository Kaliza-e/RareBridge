"use client";

import { useEffect, useState } from "react";
import { Sparkles, FileText, Upload, ArrowRight, BookOpen, Brain, ListCheck, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getResearch, ResearchStatic } from "@/lib/data";

interface SimplifiedResult {
  laymanSummary: string;
  keyFindings: string[];
  vocabulary: { term: string; definition: string }[];
  doctorQuestions: string[];
}

export default function ResearchPage() {
  const [researchList, setResearchList] = useState<ResearchStatic[]>([]);
  const [inputText, setInputText] = useState("");
  const [fileName, setFileName] = useState("");
  const [simplifying, setSimplifying] = useState(false);
  const [step, setStep] = useState("");
  const [result, setResult] = useState<SimplifiedResult | null>(null);

  useEffect(() => {
    setResearchList(getResearch());
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setInputText(`[Parsed Content from Uploaded Document "${file.name}"]: This clinical paper details the novel gene therapeutic strategy using helper-dependent adenoviral vectors expressing the CFTR cDNA sequence for direct transduction of bronchiolar secretory cells in CFTR-deficient porcine models. The primary endpoint evaluated is the restoration of cAMP-mediated chloride transport across the apical membrane, measured via transepithelial bioelectric potential difference.`);
    }
  };

  const handleSimplify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setSimplifying(true);
    setResult(null);

    // Simulation steps
    const steps = [
      "Analyzing document structure and headers...",
      "Extracting scientific objectives and methodology...",
      "Simplifying complex clinical vocabulary...",
      "Formatting patient-facing takeaways and physician questions..."
    ];

    let currentStep = 0;
    setStep(steps[currentStep]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setSimplifying(false);

        // Generate response based on terms matched in the input text
        const text = inputText.toLowerCase();
        let name = "this clinical study";
        let disease = "the targeted disorder";
        let findings = [
          "The treatment was tolerated well in laboratory models with no major safety red flags.",
          "It successfully delivered healthy instructions directly to the diseased cells.",
          "Tests showed a notable improvement in how cells manage salt and moisture levels."
        ];
        let vocab = [
          { term: "Transduction", definition: "The process of introducing foreign genetic material (DNA/RNA) into a cell using a virus carrier." },
          { term: "Porcine Models", definition: "Pigs used in scientific research because their organ structures and biological behaviors closely match humans." }
        ];
        let questions = [
          "Does this research apply to my specific genetic variant/mutation?",
          "Are there any active clinical trials recruiting human patients for this vector therapy?",
          "What standard treatments would I need to stop if I joined a trial like this?"
        ];

        if (text.includes("huntington") || text.includes("htt") || text.includes("chorea")) {
          name = "Huntington's Disease Gene Suppressor Paper";
          disease = "Huntington's Disease";
          findings = [
            "The antisense oligonucleotide molecule successfully reduced levels of toxic Huntingtin proteins in brain tissue.",
            "Functional testing on movement and balance showed a stabilization over the treatment period.",
            "Lower levels of neurodegenerative biomarkers suggest that cell damage was slowed down."
          ];
          vocab = [
            { term: "Antisense Oligonucleotide (ASO)", definition: "A synthetic string of genetic material designed to bind to a cell's message molecules and turn off the production of a faulty or toxic protein." },
            { term: "Biomarker", definition: "A measurable indicator (like a protein level in blood or spinal fluid) that shows the state or severity of a disease." }
          ];
          questions = [
            "How does this ASO drug compare to other huntingtin-lowering candidates currently in clinical phases?",
            "Are there side effects associated with regular spinal infusions required by this treatment?",
            "At what stage of my symptoms would this therapy be most effective?"
          ];
        } else if (text.includes("cystic") || text.includes("cftr") || text.includes("fibrosis")) {
          name = "CFTR Gene Vector Inhalation Paper";
          disease = "Cystic Fibrosis";
          findings = [
            "Inhaling the specialized virus containing the healthy gene restored normal salt-gate functions in lung linings.",
            "Mucus viscosity decreased, making it easier for lung cilia to clear the respiratory tract.",
            "No severe immune response or inflammatory reactions were triggered by the viral vector."
          ];
          vocab = [
            { term: "CFTR Channel", definition: "A protein channel that acts as a gatekeeper, letting salt and water in and out of cells. Broken channels lead to sticky mucus build-up." },
            { term: "Viral Vector", definition: "A modified, harmless virus stripped of its disease-causing elements, used purely as a delivery vehicle to carry healthy genes into cells." }
          ];
          questions = [
            "How long do the effects of a single inhaled vector treatment last before the cells shed?",
            "Would my immune system build up antibodies against this virus, preventing future doses?",
            "Is this inhalation therapy compatible with my current CFTR modulators (like Trikafta)?"
          ];
        }

        setResult({
          laymanSummary: `This paper details a scientific effort investigating a new treatment for ${disease}. Instead of just addressing symptoms, this research attempts to fix the underlying cellular instruction problem. Scientists packaged healthy molecular instructions inside specialized delivery particles, ensuring they safely reached cells to restore normal function. Tests demonstrate promising results in cell models, showing improved resilience and cellular function.`,
          keyFindings: findings,
          vocabulary: vocab,
          doctorQuestions: questions
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sapphire">Medical Research Portal</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
            AI Research Simplifier
          </h1>
          <p className="text-sm md:text-base text-sapphire/80 leading-relaxed font-light">
            We bridge the gap between highly technical clinical studies and patient understanding. Use the tool below to simplify any academic abstract or upload clinical documents.
          </p>
        </div>

        {/* AI Simplifier Form Panel */}
        <div className="bg-white border border-taupe/20 p-8 md:p-12 rounded-card shadow-premium mb-16">
          <form onSubmit={handleSimplify} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="abstract" className="text-xs uppercase font-extrabold tracking-wider text-primary">
                Paste Research Abstract or Clinical Text
              </label>
              <textarea
                id="abstract"
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste paragraph containing complex medical descriptions, clinical trial summaries, or chemical pathways..."
                className="w-full bg-background border border-taupe/40 focus:border-sapphire text-sm text-primary rounded-[18px] p-5 focus:outline-none transition-all placeholder:text-sapphire/40"
              />
            </div>

            {/* File Upload & Submit Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              {/* File Upload Selector */}
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sapphire hover:text-primary transition-colors border border-taupe/40 bg-background px-5 py-3 rounded-full"
                >
                  <Upload className="w-4 h-4" />
                  {fileName ? `Uploaded: ${fileName.slice(0, 15)}...` : "Upload Clinical Document (PDF/DOCX)"}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={simplifying || !inputText.trim()}
                className="bg-primary hover:bg-primary-light text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-premium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {simplifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Simplifying...
                  </>
                ) : (
                  <>
                    Simplify Research
                    <Sparkles className="w-4 h-4 text-champagne" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* SIMULATOR STEPS */}
          {simplifying && (
            <div className="mt-8 p-6 bg-background rounded-card border border-sapphire/10 flex items-center gap-4 animate-pulse">
              <Brain className="w-6 h-6 text-sapphire animate-bounce shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary">RareBridge Engine Processing</p>
                <p className="text-xs text-sapphire/80">{step}</p>
              </div>
            </div>
          )}

          {/* SIMULATED RESULT CARD */}
          {result && (
            <div className="mt-10 p-8 bg-ivory rounded-card border border-sapphire/20 shadow-sm space-y-8 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-taupe/20 pb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold font-heading text-primary">Patient-Ready Literature Summary</h3>
              </div>

              {/* Layperson summary */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-sapphire flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sapphire/75" />
                  Layperson Translation
                </h4>
                <p className="text-sm md:text-base leading-relaxed text-primary/90 font-light bg-white p-5 rounded-[18px] border border-taupe/15">
                  {result.laymanSummary}
                </p>
              </div>

              {/* Key findings */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-sapphire flex items-center gap-1.5">
                  <ListCheck className="w-3.5 h-3.5 text-sapphire/75" />
                  Key Clinical Discoveries
                </h4>
                <ul className="space-y-2 bg-white p-5 rounded-[18px] border border-taupe/15 text-xs text-sapphire/90">
                  {result.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vocabulary definitions */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-sapphire flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sapphire/75" />
                  Medical Terms Decoded
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.vocabulary.map((vocab, idx) => (
                    <div key={idx} className="bg-white p-4.5 rounded-[18px] border border-taupe/15 space-y-1">
                      <span className="text-xs font-bold text-primary font-heading block">{vocab.term}</span>
                      <p className="text-[11px] leading-relaxed text-sapphire/80">{vocab.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Questions check-list */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-sapphire flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-sapphire/75" />
                  Suggested Questions For Your Doctor
                </h4>
                <div className="bg-white p-5 rounded-[18px] border border-taupe/15 space-y-2.5 text-xs text-sapphire/90">
                  {result.doctorQuestions.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`q-${idx}`}
                        className="rounded border-taupe/50 text-primary focus:ring-sapphire w-3.5 h-3.5 cursor-pointer"
                      />
                      <label htmlFor={`q-${idx}`} className="cursor-pointer">
                        {q}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RECENTLY INDEXED RESEARCH ARTICLES */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-primary">Recently Indexed Publications</h2>
          <div className="grid grid-cols-1 gap-6">
            {researchList.map((res) => (
              <div
                key={res.id}
                className="bg-white p-6 md:p-8 rounded-card border border-taupe/20 shadow-premium flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary font-heading">{res.title}</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-taupe/20">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-sapphire/60 tracking-wider">Layperson Explanation</span>
                      <p className="text-xs leading-relaxed text-sapphire/80">{res.summary}</p>
                    </div>
                    <div className="space-y-1 lg:border-l border-taupe/20 lg:pl-6">
                      <span className="text-[10px] uppercase font-bold text-sapphire/60 tracking-wider">Clinical Abstract</span>
                      <p className="text-xs leading-relaxed text-sapphire/70 italic">{res.scientificDetail}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-taupe/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-sapphire/50">
                  <span>
                    Published: {res.publishedAt ? new Date(res.publishedAt).toLocaleDateString() : "Recently"} &bull; Journal: {res.journal} &bull; Author: {res.author}
                  </span>
                  {res.link && (
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary font-semibold hover:underline flex items-center gap-0.5 shrink-0"
                    >
                      View Original Publication
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
