"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  Dna,
  BookOpen,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Stethoscope
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDiseases, getClinicalTrials, getSpecialists, DiseaseStatic, ClinicalTrialStatic, SpecialistStatic } from "@/lib/data";

export default function Home() {
  const [diseases, setDiseases] = useState<DiseaseStatic[]>([]);
  const [trials, setTrials] = useState<ClinicalTrialStatic[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistStatic[]>([]);
  
  // Interactive AI Simulator states
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const allD = getDiseases();
    const allT = getClinicalTrials();
    const allS = getSpecialists();
    setDiseases(allD.slice(0, 3));
    setTrials(allT.slice(0, 3));
    setSpecialists(allS.slice(0, 3));
  }, []);

  const aiPresets = [
    {
      q: "Explain Huntington's disease to an 8-year-old.",
      a: "Imagine the brain has a tiny computer inside that sends messages to your muscles. Huntington's is like a tiny glitch in the computer's code. Over time, it gets harder for the computer to send clean signals, which makes it tricky to stay steady, think clearly, or control movements. Scientists are studying this glitch closely to find a way to patch it!"
    },
    {
      q: "Simplify Trikafta's mechanism for Cystic Fibrosis.",
      a: "Cystic Fibrosis is caused by a gatekeeper protein in cells that is folded wrong and cannot open to let salt out. Trikafta is a combination of three helper molecules. Two helpers act like folders, folding the gatekeeper protein correctly so it reaches the surface. The third helper acts like a key, holding the gate open so salt and water can flow normally."
    },
    {
      q: "What is neurofilament light chain (NfL) in ALS trials?",
      a: "NfL is like a tiny fiber that escapes when nerve cells get damaged. In ALS trials, doctors measure NfL in blood. If NfL levels drop during a drug trial, it suggests the drug is successfully protecting nerve cells from breaking down, acting as a crucial indicator that the therapy is working."
    }
  ];

  const handleAiSimulate = (q: string, a: string) => {
    setAiQuestion(q);
    setIsTyping(true);
    setAiAnswer("");
    let charIndex = 0;
    
    const interval = setInterval(() => {
      if (charIndex < a.length) {
        setAiAnswer((prev) => prev + a.charAt(charIndex));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
          {/* DNA Graphic Backdrop */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] pointer-events-none opacity-20 lg:opacity-100 flex items-center justify-center">
            <svg
              className="w-full h-full max-w-[450px]"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#112250" />
                  <stop offset="100%" stopColor="#3B507D" />
                </linearGradient>
              </defs>
              <g stroke="url(#dnaGrad)" strokeWidth="2.5">
                {Array.from({ length: 15 }).map((_, i) => {
                  const y = 50 + i * 22;
                  const x1 = 120 + Math.sin(i * 0.7) * 60;
                  const x2 = 280 - Math.sin(i * 0.7) * 60;
                  return (
                    <g key={i}>
                      <line x1={x1} y1={y} x2={x2} y2={y} strokeDasharray="3 3" opacity="0.6" />
                      <circle cx={x1} cy={y} r="5" fill="#3B507D" />
                      <circle cx={x2} cy={y} r="5" fill="#112250" />
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="max-w-3xl space-y-8">
              {/* Badge Callout */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-taupe/35 shadow-premium text-xs font-semibold text-primary"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Medical Information Simplified For Families
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold font-heading text-primary leading-[1.08] tracking-tight"
              >
                Bridging the Gap Between Rare Diseases and Understanding
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-sapphire leading-relaxed max-w-2xl font-light"
              >
                Helping families discover trusted clinical knowledge, simplify complex scientific publications, connect with global specialists, and join supportive communities.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Link
                  href="/diseases"
                  className="bg-primary hover:bg-primary-light text-white text-base font-semibold px-8 py-4 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 flex items-center gap-2 group"
                >
                  Explore Diseases
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/community"
                  className="bg-white border border-taupe text-primary text-base font-semibold px-8 py-4 rounded-full hover:bg-white/80 transition-all duration-300"
                >
                  Join Community
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="bg-white border-y border-taupe/20 py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center md:text-left space-y-2">
                <p className="text-4xl md:text-5xl font-extrabold font-heading text-primary">7,000+</p>
                <p className="text-xs uppercase tracking-wider text-sapphire font-semibold">Known Rare Diseases</p>
              </div>
              <div className="text-center md:text-left space-y-2">
                <p className="text-4xl md:text-5xl font-extrabold font-heading text-primary">300M+</p>
                <p className="text-xs uppercase tracking-wider text-sapphire font-semibold">Patients Globally</p>
              </div>
              <div className="text-center md:text-left space-y-2">
                <p className="text-4xl md:text-5xl font-extrabold font-heading text-primary">95%</p>
                <p className="text-xs uppercase tracking-wider text-sapphire font-semibold">Lack FDA Approved Cures</p>
              </div>
              <div className="text-center md:text-left space-y-2">
                <p className="text-4xl md:text-5xl font-extrabold font-heading text-primary">6 Yrs</p>
                <p className="text-xs uppercase tracking-wider text-sapphire font-semibold">Average Diagnosis Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sapphire">How RareBridge Works</h2>
            <p className="text-3xl md:text-4xl font-bold font-heading text-primary">A gentle entry point into complex clinical worlds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-card shadow-premium space-y-6 hover:shadow-premium-hover transition-all duration-300 border border-taupe/20">
              <div className="w-12 h-12 rounded-full bg-champagne/40 flex items-center justify-center text-primary">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-primary">1. Search & Browse</h3>
              <p className="text-sm leading-relaxed text-sapphire/80">
                Explore a beautifully organized list of rare disorders. Toggle between professional medical insights and parent-friendly explanations in one click.
              </p>
            </div>

            <div className="bg-white p-8 rounded-card shadow-premium space-y-6 hover:shadow-premium-hover transition-all duration-300 border border-taupe/20">
              <div className="w-12 h-12 rounded-full bg-champagne/40 flex items-center justify-center text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-primary">2. Simplify Research</h3>
              <p className="text-sm leading-relaxed text-sapphire/80">
                Our AI engine parses clinical reports and drug trials, generating simple, patient-ready bullet points while explaining complex terminology.
              </p>
            </div>

            <div className="bg-white p-8 rounded-card shadow-premium space-y-6 hover:shadow-premium-hover transition-all duration-300 border border-taupe/20">
              <div className="w-12 h-12 rounded-full bg-champagne/40 flex items-center justify-center text-primary">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-primary">3. Find Specialists & Groups</h3>
              <p className="text-sm leading-relaxed text-sapphire/80">
                Connect directly with principal clinical investigators and discover support networks, Facebook communities, and active patient foundations.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED DISEASES */}
        <section className="bg-white border-y border-taupe/20 py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-sapphire">Featured Knowledge Bases</h2>
                <p className="text-3xl md:text-4xl font-bold font-heading text-primary">Vetted medical guidelines written simply.</p>
              </div>
              <Link
                href="/diseases"
                className="text-sm font-semibold text-sapphire hover:text-primary transition-colors flex items-center gap-1.5 group"
              >
                Browse All Diseases
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {diseases.map((d) => (
                <div
                  key={d.id}
                  className="bg-background rounded-card overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col h-full border border-taupe/20"
                >
                  <div className="h-48 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.images}
                      alt={d.name}
                      className="w-full h-full object-cover filter saturate-75 hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-primary shadow-sm">
                      {d.category}
                    </span>
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-primary font-heading">{d.name}</h3>
                      <p className="text-sm line-clamp-3 text-sapphire/80 leading-relaxed">
                        {d.overview}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-taupe/20 mt-6">
                      <Link
                        href={`/diseases/${d.slug}`}
                        className="w-full inline-flex justify-center items-center bg-white border border-taupe/60 text-xs font-semibold py-3 rounded-full text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                      >
                        Read Deep Dive
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI ASSISTANT SIMULATION */}
        <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Context info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sapphire px-3 py-1 rounded-full bg-champagne/40">
                <Sparkles className="w-3.5 h-3.5" />
                Preview AI Helper
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary leading-tight">
                Instantly understand complex medical jargon.
              </h2>
              <p className="text-sm leading-relaxed text-sapphire/85">
                Our AI Assistant is designed to extract key therapeutic details and rewrite complex research abstracts into plain, understandable English.
              </p>
              <div className="space-y-3 pt-2">
                <p className="text-xs uppercase font-bold tracking-wider text-sapphire/60">Choose a preview topic:</p>
                <div className="flex flex-col gap-2.5">
                  {aiPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAiSimulate(preset.q, preset.a)}
                      className="text-left text-xs font-medium px-4 py-3 rounded-[14px] bg-white border border-taupe/30 text-primary hover:border-sapphire hover:bg-ivory transition-all shadow-sm"
                    >
                      {preset.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated chat widget */}
            <div className="lg:col-span-7 bg-white rounded-card shadow-premium border border-taupe/30 overflow-hidden flex flex-col h-[400px]">
              <div className="bg-primary py-4 px-6 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide uppercase">RareBridge AI Simplifier</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium">Simulator</span>
              </div>

              <div className="flex-grow p-6 overflow-y-auto space-y-4 font-sans text-sm">
                {aiQuestion ? (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-ivory border border-taupe/30 text-primary px-4 py-2.5 rounded-[18px] max-w-[80%] text-xs font-medium shadow-sm">
                        {aiQuestion}
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-primary/5 border border-primary/10 text-primary p-4 rounded-[18px] max-w-[85%] text-xs leading-relaxed space-y-2">
                        <p className="font-bold text-[10px] text-sapphire uppercase tracking-wider">Layperson Explanation</p>
                        <p>{aiAnswer}</p>
                        {isTyping && (
                          <span className="inline-block w-1.5 h-3 bg-primary ml-0.5 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-sapphire/60">
                    <Sparkles className="w-8 h-8 text-taupe animate-pulse" />
                    <p className="text-xs font-medium max-w-xs">
                      Select one of the preview questions on the left to see the AI Simplifier rewrite complex findings.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CLINICAL TRIALS & RECENT CLINICIANS */}
        <section className="bg-white border-t border-taupe/20 py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Clinical Trials Column */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-sapphire">Active Clinical Studies</span>
                  <h3 className="text-2xl font-bold text-primary font-heading">Recent Clinical Trials</h3>
                </div>

                <div className="space-y-4">
                  {trials.map((t) => (
                    <div
                      key={t.id}
                      className="p-6 bg-background rounded-card border border-taupe/20 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-champagne text-primary rounded-full">
                            {t.phase}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            {t.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-primary">{t.name}</h4>
                        <p className="text-xs text-sapphire/80 line-clamp-2 leading-relaxed">
                          {t.description}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-taupe/20 mt-4 flex items-center justify-between">
                        <span className="text-[10px] text-sapphire/60">ID: {t.identifier}</span>
                        <a
                          href={t.officialLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-sapphire hover:text-primary flex items-center gap-1"
                        >
                          Official Link
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialists Column */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-sapphire">Specialist Network</span>
                  <h3 className="text-2xl font-bold text-primary font-heading">Listed Specialists</h3>
                </div>

                <div className="space-y-4">
                  {specialists.map((s) => (
                    <div
                      key={s.id}
                      className="p-6 bg-background rounded-card border border-taupe/20 shadow-sm flex gap-4 items-start"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-16 h-16 rounded-full object-cover filter saturate-75"
                      />
                      <div className="space-y-1.5 flex-grow">
                        <h4 className="text-base font-bold text-primary">{s.name}</h4>
                        <p className="text-xs font-semibold text-sapphire">{s.profession} — {s.specialization}</p>
                        <p className="text-xs text-sapphire/70">{s.organization} &bull; {s.location}</p>
                        <Link
                          href="/specialists"
                          className="inline-flex items-center gap-0.5 text-xs font-bold text-primary hover:text-primary-light pt-2"
                        >
                          View Bio
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / ACCESSIBILITY STATEMENT */}
        <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 bg-ivory">
          <div className="bg-primary text-white rounded-card p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-premium">
            <div className="space-y-4 relative z-10 max-w-xl">
              <span className="text-[10px] tracking-widest font-extrabold uppercase text-champagne">Trust & Integrity</span>
              <h3 className="text-3xl font-bold font-heading leading-tight">Patient Safety First.</h3>
              <p className="text-sm leading-relaxed text-white/80">
                RareBridge is not a medical provider. Every piece of literature, clinical definition, and translation is designed for educational purposes, helping you prepare for active consultations with certified healthcare professionals.
              </p>
            </div>
            <div className="relative z-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-champagne font-semibold text-sm px-8 py-4 rounded-full transition-colors shadow-md"
              >
                Learn About Our Standards
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* decorative circle background element */}
            <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-white/5 translate-x-20 translate-y-20 pointer-events-none" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
