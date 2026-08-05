import React, { useState } from "react";
import { Search, X, Star, ArrowRight, Users } from "lucide-react";
import { HeroIllustration, ZebraEmptyState, PatientJourney, DiseaseCard, ZebraMascot, ZebraDoodle } from "../components/common/Visuals";
import { DISEASES, SUGGESTED_SEARCHES, STATS, FEATURES, COLOR_MAP, STATUS_COLOR } from "../data";
import type { Disease } from "../data";
import { Heart } from "lucide-react";

export default function HomePage({ onNav, onDisease }: { onNav: (v: string) => void; onDisease: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Disease[]>([]);

  function handleSearch(q: string) {
    setQuery(q);
    setResults(q.trim().length > 1
      ? DISEASES.filter(d => d.name.toLowerCase().includes(q.toLowerCase()) || d.category.toLowerCase().includes(q.toLowerCase()))
      : []);
  }

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E7E2CE] text-[#112250] text-xs font-bold mb-6 border border-[#BEB7A7]/40">
              <Star className="w-3 h-3 fill-[#BEB7A7] text-[#BEB7A7]" /> Trusted by 120,000+ families worldwide
            </div>
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl text-[#112250] leading-[1.15] mb-6">Understanding <span className="relative whitespace-nowrap"><span className="relative z-10">Rare Diseases</span><span className="absolute inset-x-0 bottom-1 h-3 bg-[#E7E2CE] -z-10 rounded" /></span> Starts Here</h1>
            <p className="text-lg text-[#3B507D] leading-relaxed mb-8 max-w-lg">RareBridge helps families understand rare diseases, discover trusted information, connect with specialists, and find supportive communities.</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => onNav("directory")} className="px-6 py-3 rounded-2xl bg-[#112250] text-[#F5F4F0] font-bold hover:bg-[#1a325e] transition-colors shadow-lg shadow-[#112250]/20 flex items-center gap-2">Explore Diseases <ArrowRight className="w-4 h-4" /></button>
              <button onClick={() => onNav("signin")} className="px-6 py-3 rounded-2xl border-2 border-[#BEB7A7] text-[#112250] font-bold hover:bg-[#E7E2CE] transition-colors flex items-center gap-2"><Users className="w-4 h-4" /> Find Support</button>
              <button onClick={() => onNav("signup")} className="px-6 py-3 rounded-2xl bg-[#E7E2CE] text-[#112250] font-bold hover:bg-[#F5F4F0] transition-colors">Create account</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-black text-2xl text-[#112250]">{s.value}</div>
                  <div className="text-xs text-[#BEB7A7] mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-auto md:h-[34rem]">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[#E7E2CE]/40 blur-3xl" />
            <div className="relative h-full rounded-[2.25rem] border border-[#E7E2CE] bg-white p-6 shadow-2xl">
              <div className="absolute -top-6 right-6 opacity-20"><ZebraDoodle className="w-44 h-32" /></div>
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E2CE] bg-[#F5F4F0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#3B507D]">
                    Zebra signal
                  </div>
                  <div className="rounded-[2rem] bg-[#112250] p-5 text-white shadow-inner shadow-[#112250]/10">
                    <div className="flex items-center gap-4">
                      <div className="rounded-3xl bg-[#E7E2CE] p-3"><ZebraMascot size={38} /></div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#BEB7A7]">RareBridge mark</p>
                        <p className="font-bold text-lg">Built to guide rare disease families with care.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[2rem] border border-[#E7E2CE] bg-[#F5F4F0] p-5">
                    <p className="text-sm font-semibold text-[#112250]">Zebra-inspired care paths</p>
                    <p className="mt-2 text-sm text-[#3B507D]">Quick access to specialists, curated disease summaries, and supportive communities.</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[#E7E2CE] bg-[#F5F4F0] p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#3B507D]">Trusted</p>
                    <p className="mt-2 font-semibold text-[#112250]">Clinically reviewed resources.</p>
                  </div>
                  <div className="rounded-3xl border border-[#E7E2CE] bg-[#F5F4F0] p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#3B507D]">Connected</p>
                    <p className="mt-2 font-semibold text-[#112250]">Specialists, research, and family groups.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PatientJourney />

      <section className="bg-[#112250] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-black text-3xl md:text-4xl text-[#F5F4F0] mb-4">Everything You Need, In One Place</h2>
            <p className="text-[#BEB7A7] max-w-2xl mx-auto">From diagnosis support to research breakthroughs — RareBridge is your trusted companion at every step of the journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="relative overflow-hidden rounded-3xl border border-[#3B507D] bg-[#112250] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#BEB7A7]/60 hover:bg-[#1b325e] group">
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E7E2CE]/20 blur-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#3B507D] flex items-center justify-center mb-4 group-hover:bg-[#BEB7A7]/20 transition-colors"><f.icon className="w-6 h-6 text-[#E7E2CE]" /></div>
                  <h3 className="font-black text-[#F5F4F0] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#BEB7A7] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-black text-3xl text-[#112250]">Featured Diseases</h2>
            <p className="text-[#BEB7A7] mt-1 font-medium">Explore some of the rare conditions in our database</p>
          </div>
          <button onClick={() => onNav("directory")} className="hidden sm:flex items-center gap-1 text-sm font-bold text-[#3B507D] hover:text-[#112250]">View all <ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISEASES.map(d => <DiseaseCard key={d.id} disease={d} onClick={() => onDisease(d.id)} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-center justify-center gap-6 py-8 border-y border-[#E7E2CE]">
          <div className="flex-1 h-px bg-[#E7E2CE]" />
          <div className="flex items-center gap-3 text-[#BEB7A7]"><ZebraMascot size={36} /><span className="text-sm font-semibold">The zebra symbolizes rare diseases — when you hear hoofbeats, think zebras.</span><ZebraMascot size={36} className="scale-x-[-1]" /></div>
          <div className="flex-1 h-px bg-[#E7E2CE]" />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#112250] to-[#3B507D] rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-[#112250]/20 relative overflow-hidden">
          <div className="absolute -bottom-4 right-8 opacity-10"><ZebraMascot size={120} /></div>
          <div className="w-16 h-16 mx-auto mb-6 bg-[#E7E2CE]/20 rounded-2xl flex items-center justify-center"><Heart className="w-8 h-8 text-[#E7E2CE]" /></div>
          <h2 className="font-black text-3xl md:text-4xl text-[#F5F4F0] mb-4">You Are Not Alone</h2>
          <p className="text-[#BEB7A7] text-lg mb-8 max-w-xl mx-auto">Thousands of families are walking the same road. RareBridge is here to help you find answers, find specialists, and find community.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 rounded-2xl bg-[#E7E2CE] text-[#112250] font-bold hover:bg-[#F5F4F0] transition-colors shadow-lg">Get Started Free</button>
            <button className="px-8 py-3 rounded-2xl border-2 border-[#BEB7A7]/40 text-[#E7E2CE] font-bold hover:bg-white/5 transition-colors">Talk to a Specialist</button>
          </div>
        </div>
      </section>
    </div>
  );
}
