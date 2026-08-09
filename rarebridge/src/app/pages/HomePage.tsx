import React, { useState, useEffect } from "react";
import { Search, X, Star, ArrowRight, Users, Sparkles, ChevronRight } from "lucide-react";
import { HeroIllustration, ZebraEmptyState, PatientJourney, DiseaseCard, ZebraMascot, ZebraDoodle } from "../components/common/Visuals";
import { DISEASES, SUGGESTED_SEARCHES, STATS, FEATURES, COLOR_MAP, STATUS_COLOR } from "../data";
import type { Disease } from "../data";
import { Heart } from "lucide-react";

// Word-by-word animated headline
function AnimatedHeadline() {
  const line1 = ["Understanding"];
  const line2 = ["Rare", "Diseases"];
  const line3 = ["Starts", "Here"];
  const allWords = [...line1, ...line2, ...line3];
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    allWords.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), 100 + i * 120);
    });
  }, []);

  const wordClass = (i: number) =>
    `inline-block transition-all duration-500 ease-out ${visible.includes(i) ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"
    }`;

  let idx = 0;
  return (
    <h1 className="font-black text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.12] mb-6 tracking-tight">
      <span className="block mb-1">
        {line1.map(w => <span key={w} className={wordClass(idx++)}>{w}{" "}</span>)}
      </span>
      <span className="block mb-1">
        {line2.map((w, wi) => {
          const i = idx++;
          return (
            <span key={w} className={`${wordClass(i)} mr-3`}>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{w}</span>
                {wi === 1 && <span className="absolute inset-x-0 bottom-0.5 h-3 bg-secondary -z-10 rounded-lg opacity-60" />}
              </span>
            </span>
          );
        })}
      </span>
      <span className="block">
        {line3.map(w => <span key={w} className={`${wordClass(idx++)} mr-3`}>{w}</span>)}
      </span>
    </h1>
  );
}

export default function HomePage({ onNav, onDisease }: { onNav: (v: string) => void; onDisease: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Disease[]>([]);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 60); }, []);

  function handleSearch(q: string) {
    setQuery(q);
    setResults(q.trim().length > 1
      ? DISEASES.filter(d => d.name.toLowerCase().includes(q.toLowerCase()) || d.category.toLowerCase().includes(q.toLowerCase()))
      : []);
  }

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ${delay} ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-secondary opacity-30 blur-[140px]" />
          <div className="absolute top-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary opacity-[0.08] blur-[100px]" />
          <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full bg-accent opacity-[0.05] blur-[90px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 md:pt-28 md:pb-14 flex flex-col items-center text-center">

          {/* Trust badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-primary text-xs font-bold mb-8 border border-taupe-40 shadow-sm ${fadeUp("delay-0")}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Trusted by 120,000+ families worldwide
          </div>

          <AnimatedHeadline />

          <p className={`text-lg md:text-xl text-accent leading-relaxed mb-10 max-w-2xl ${fadeUp("delay-[750ms]")}`}>
            RareBridge helps families understand rare diseases, discover trusted information, connect with specialists, and find supportive communities.
          </p>

          {/* Search bar — primary CTA */}
          <div className={`w-full max-w-2xl mb-4 ${fadeUp("delay-[900ms]")}`}>
            <div className="relative flex items-center bg-white border-2 border-taupe-40 rounded-2xl shadow-lg focus-within:border-primary focus-within:shadow-xl transition-all duration-300">
              <Search className="absolute left-4 w-5 h-5 text-taupe pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search a disease, symptom, or condition…"
                className="w-full bg-transparent pl-12 pr-36 py-4 text-primary placeholder-taupe text-base font-medium outline-none rounded-2xl"
              />
              <button
                onClick={() => onNav("directory")}
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-primary text-ivory text-sm font-bold hover:bg-accent transition-all duration-200 shadow flex items-center gap-1.5"
              >
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {results.length > 0 && (
              <div className="mt-2 bg-white border border-taupe-40 rounded-2xl shadow-xl overflow-hidden text-left">
                {results.slice(0, 5).map(d => (
                  <button
                    key={d.id}
                    onClick={() => { handleSearch(""); onDisease(d.id); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors border-b border-taupe-40 last:border-0"
                  >
                    <d.icon className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm font-semibold text-primary">{d.name}</span>
                    <span className="text-xs text-taupe ml-auto">{d.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Suggested searches */}
          <div className={`flex flex-wrap justify-center gap-2 mb-10 ${fadeUp("delay-[1000ms]")}`}>
            <span className="text-xs text-taupe font-medium self-center">Try:</span>
            {SUGGESTED_SEARCHES.map(s => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="px-3 py-1.5 rounded-full bg-white border border-taupe-40 text-xs font-semibold text-accent hover:bg-primary hover:border-primary hover:text-ivory transition-all duration-200 shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className={`flex flex-wrap justify-center gap-3 mb-14 ${fadeUp("delay-[1100ms]")}`}>
            <button
              onClick={() => onNav("signin")}
              className="group px-6 py-3 rounded-2xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-ivory transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <Users className="w-4 h-4" /> Find Support
              <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>
            <button
              onClick={() => onNav("signup")}
              className="group px-7 py-3 rounded-2xl bg-primary text-ivory font-bold hover:bg-accent transition-all duration-200 flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" /> Get Started Free
              <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>
          </div>

          {/* Stats ribbon placeholder — closes section */}
        </div>
      </section>

      {/* ── Animated stats ribbon ── */}
      <div className="relative w-full overflow-hidden bg-primary py-4 select-none">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-primary to-transparent z-10" />
        {/* Scrolling track — duplicated for seamless loop */}
        <div className="flex w-max animate-ribbon gap-0">
          {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
            <div key={i} className="flex items-center gap-8 px-10">
              <div className="flex items-center gap-3">
                <span className="font-black text-2xl text-secondary tracking-tight">{s.value}</span>
                <span className="text-xs font-bold text-taupe uppercase tracking-widest whitespace-nowrap">{s.label}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
            </div>
          ))}
        </div>
      </div>

      <PatientJourney />

      <section className="bg-primary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">Platform</span>
            <h2 className="font-black text-3xl md:text-4xl text-ivory mb-4">Everything You Need, In One Place</h2>
            <p className="text-taupe max-w-xl mx-auto text-base leading-relaxed">From diagnosis support to research breakthroughs — RareBridge is your trusted companion at every step.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-secondary/40 hover:shadow-2xl group cursor-default">
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-secondary/10 blur-2xl group-hover:bg-secondary/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                    <f.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-bold text-ivory mb-2 text-base">{f.title}</h3>
                  <p className="text-sm text-taupe leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold uppercase tracking-widest mb-3">Directory</span>
            <h2 className="font-black text-3xl md:text-4xl text-primary">Featured Diseases</h2>
            <p className="text-taupe mt-1.5 font-medium">Explore conditions in our database</p>
          </div>
          <button onClick={() => onNav("directory")} className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-primary border border-taupe-40 rounded-xl px-4 py-2 hover:bg-secondary transition-all duration-200">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISEASES.map(d => <DiseaseCard key={d.id} disease={d} onClick={() => onDisease(d.id)} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-center justify-center gap-6 py-8 border-y border-secondary/30">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-secondary/40" />
          <div className="flex items-center gap-3 text-taupe">
            <ZebraMascot size={32} />
            <span className="text-sm font-semibold">The zebra symbolizes rare diseases — when you hear hoofbeats, think zebras.</span>
            <ZebraMascot size={32} className="scale-x-[-1]" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-secondary/40" />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-10 md:p-16 text-center shadow-2xl" style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)" }}>
          <div className="absolute -bottom-6 right-8 opacity-10"><ZebraMascot size={140} /></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
          <div className="w-14 h-14 mx-auto mb-6 bg-white/15 rounded-2xl flex items-center justify-center">
            <Heart className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="font-black text-3xl md:text-4xl text-ivory mb-4">You Are Not Alone</h2>
          <p className="text-secondary/80 text-lg mb-8 max-w-xl mx-auto">Thousands of families are walking the same road. RareBridge is here to help you find answers, specialists, and community.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 rounded-2xl bg-secondary text-primary font-bold hover:bg-white transition-all duration-200 shadow-lg">Get Started Free</button>
            <button className="px-8 py-3 rounded-2xl border-2 border-white/30 text-ivory font-bold hover:bg-white/10 transition-all duration-200">Talk to a Specialist</button>
          </div>
        </div>
      </section>
    </div>
  );
}
