"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Sparkles, UserCheck, Star, Bookmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-sapphire" />,
      title: "Vetted Information",
      desc: "Every clinical trial identifier, specialist profile, and disease overview is carefully cross-referenced with scientific journals and registries."
    },
    {
      icon: <Heart className="w-5 h-5 text-sapphire" />,
      title: "Patient Empathy First",
      desc: "Medical terminology should not block patients from choosing a path. We simplify guidelines without dumbing down the science."
    },
    {
      icon: <UserCheck className="w-5 h-5 text-sapphire" />,
      title: "Open Accessibility",
      desc: "Designed using WCAG guidelines. Clear typography, simple layouts, and contrast settings ensure access for users of all abilities."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-20">
        {/* Editorial Hero */}
        <section className="max-w-3xl space-y-6 pt-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sapphire">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-primary tracking-tight leading-[1.1]">
            Bridging the gap between rare diseases and clinical understanding.
          </h1>
          <p className="text-base md:text-lg text-sapphire/85 leading-relaxed font-light">
            Rare diseases affect more than 300 million people worldwide, yet patients and their families wait an average of six years to get a correct diagnosis. Much of this delay is driven by the complex, disjointed nature of clinical literature. RareBridge is a support and research translation framework built to simplify entry into complex health pathways.
          </p>
        </section>

        {/* Core Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-taupe/20">
          {values.map((v, idx) => (
            <div key={idx} className="bg-white p-8 rounded-card border border-taupe/20 shadow-premium space-y-5">
              <div className="w-10 h-10 rounded-full bg-champagne/45 flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-primary">{v.title}</h3>
              <p className="text-xs leading-relaxed text-sapphire/80">{v.desc}</p>
            </div>
          ))}
        </section>

        {/* Our Approach (Notion style split pane) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-8 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sapphire px-3 py-1 rounded-full bg-champagne/45">
              <Sparkles className="w-3.5 h-3.5" />
              Human + AI Collaboration
            </span>
            <h2 className="text-3xl font-bold font-heading text-primary leading-tight">
              Translating scientific data for real-world families.
            </h2>
            <p className="text-sm leading-relaxed text-sapphire/85">
              We leverage safe parsing models to break down heavy peer-reviewed journals into laying statements. At the same time, we catalog specialist databases and official support networks, organizing them into a clean, modern folder structure that doesn&apos;t look like a standard hospital dashboard.
            </p>
            <blockquote className="border-l-2 border-primary pl-4 text-xs italic text-primary/75 leading-relaxed">
              &quot;By giving patients simple vocabulary definitions and suggested consultation questions, we prepare families to have more constructive, confident conversations with clinical experts.&quot;
            </blockquote>
          </div>

          <div className="bg-white p-8 rounded-card border border-taupe/20 shadow-premium space-y-6 relative overflow-hidden">
            <h3 className="text-base font-bold text-primary">Core Pillars of Trust</h3>
            <div className="space-y-4 text-xs text-sapphire/90">
              <div className="flex gap-3">
                <span className="font-bold text-primary">01.</span>
                <p>We do not offer medical advice. Every guideline is paired with an external clinical trial ID or scientific publication link.</p>
              </div>
              <div className="flex gap-3 pt-3 border-t border-taupe/15">
                <span className="font-bold text-primary">02.</span>
                <p>We never sell user profiles or health query history. Patient search logs are transient and private.</p>
              </div>
              <div className="flex gap-3 pt-3 border-t border-taupe/15">
                <span className="font-bold text-primary">03.</span>
                <p>Community guidelines are moderated weekly. Listed patient foundations must be registered non-profits.</p>
              </div>
            </div>
            {/* Background design */}
            <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-champagne/15 translate-x-12 translate-y-12 pointer-events-none" />
          </div>
        </section>

        {/* Editorial Advisory Box */}
        <section className="bg-primary text-white p-8 md:p-16 rounded-card relative overflow-hidden shadow-premium">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-champagne">Scientific Integrity</span>
            <h3 className="text-3xl font-bold font-heading">Our Information Standard</h3>
            <p className="text-sm leading-relaxed text-white/85">
              All clinical records on RareBridge are compiled from trusted databases including ClinicalTrials.gov, PubMed, and Orphanet. Our team, along with qualified clinician volunteers, reviews laying translations to ensure scientific validity is preserved during simplification.
            </p>
          </div>
          {/* backdrop styling */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
