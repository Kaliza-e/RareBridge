import React from "react";
import { ZebraMascot, ZebraDoodle } from "../components/common/Visuals";
import { Heart, Shield, Users, Microscope, BookOpen, Star, ArrowRight } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Family First",
    desc: "Every feature is designed with the lived experience of rare disease families in mind — clear language, no jargon, real answers.",
  },
  {
    icon: Shield,
    title: "Medically Reviewed",
    desc: "All content is curated and reviewed by medical professionals and sourced from leading research institutions and journals.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "We connect families, caregivers, and advocates so no one has to face a rare disease diagnosis alone.",
  },
  {
    icon: Microscope,
    title: "Research Connected",
    desc: "We track the latest gene therapy breakthroughs, clinical trials, and pipeline news so families stay informed.",
  },
];

const TEAM = [
  { name: "Salma Ibrahim", role: "Chief Executive Officer", detail: "Experience in Research and rare diseases" },
  { name: "Idara", role: "Head of Research", detail: "Rare Disease Advocate · Former NIH Fellow" },
  { name: "Kaliza Esther", role: "Technical Lead", detail: "Lead for the technical background of rarebridge" },
  { name: "Ishema Shoulamite", role: "Technical Team", detail: "Lead for the technical background of rarebridge" },

];

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden bg-primary">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-secondary opacity-10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent opacity-5 blur-[80px]" />
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <ZebraMascot size={220} />
          </div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="w-3 h-3" /> Our Story
          </div>
          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl text-ivory tracking-tight leading-[1.1] mb-5">
            Built for families.<br />
            <span className="text-secondary">Powered by science.</span>
          </h1>
          <p className="text-taupe text-lg md:text-xl max-w-2xl leading-relaxed">
            RareBridge connects families, clinicians, and researchers with clear, medically reviewed information about rare diseases — so no one has to face a diagnosis alone.
          </p>
        </div>
      </div>

      {/* ── Mission + Vision ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="group rounded-3xl border border-taupe-40/60 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center mb-5">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-black text-xl text-primary mb-3">Our Mission</h3>
            <p className="text-accent leading-relaxed">
              To make trusted rare disease information accessible to every family worldwide and accelerate their connections to care, specialists, and research.
            </p>
          </div>
          <div className="group rounded-3xl border border-taupe-40/60 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center mb-5">
              <Star className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-black text-xl text-primary mb-3">Our Vision</h3>
            <p className="text-accent leading-relaxed">
              A world where every rare disease family finds fast answers, trusted specialists, and a welcoming community — from the moment of diagnosis onward.
            </p>
          </div>
        </div>

        {/* ── Why Zebras ── */}
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-12 mb-16">
          <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-[0.07]">
            <ZebraMascot size={180} />
          </div>
          <div className="pointer-events-none absolute -left-8 top-8 opacity-[0.05]">
            <ZebraDoodle className="w-52 h-36" />
          </div>
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-secondary text-xs font-bold uppercase tracking-widest mb-5">
              The Zebra
            </div>
            <h2 className="font-black text-3xl md:text-4xl text-ivory mb-4">Why zebras?</h2>
            <p className="text-taupe text-lg leading-relaxed mb-6">
              In medicine, students are taught: "When you hear hoofbeats, think horses — not zebras." It's a reminder that common conditions are more likely. But for the 300 million people living with rare diseases worldwide, <span className="text-secondary font-semibold">they are the zebra</span>.
            </p>
            <p className="text-taupe leading-relaxed">
              RareBridge brings that same mindset to every search, every specialist listing, and every support connection — because rare diseases deserve to be seen.
            </p>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold uppercase tracking-widest mb-3">What We Stand For</span>
            <h2 className="font-black text-3xl text-primary">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="group flex gap-5 rounded-3xl border border-taupe-40/60 bg-white p-7 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <v.icon className="w-5 h-5 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1.5">{v.title}</h4>
                  <p className="text-sm text-accent leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team ── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold uppercase tracking-widest mb-3">People</span>
            <h2 className="font-black text-3xl text-primary">The Team Behind RareBridge</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TEAM.map(t => (
              <div key={t.name} className="rounded-3xl border border-taupe-40/60 bg-white p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <span className="font-black text-primary text-xl">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h4 className="font-black text-primary mb-1">{t.name}</h4>
                <p className="text-sm font-semibold text-accent mb-1.5">{t.role}</p>
                <p className="text-xs text-taupe">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-12 text-center" style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)" }}>
          <div className="pointer-events-none absolute -bottom-4 right-10 opacity-10">
            <ZebraMascot size={130} />
          </div>
          <div className="w-14 h-14 mx-auto mb-5 bg-white/15 rounded-2xl flex items-center justify-center">
            <Heart className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="font-black text-3xl md:text-4xl text-ivory mb-3">Join the Community</h2>
          <p className="text-secondary/80 text-lg mb-8 max-w-xl mx-auto">
            Whether you're a family, clinician, or researcher — RareBridge is built for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-secondary text-primary font-bold hover:bg-white transition-all duration-200 shadow-lg">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-7 py-3 rounded-2xl border-2 border-white/30 text-ivory font-bold hover:bg-white/10 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
