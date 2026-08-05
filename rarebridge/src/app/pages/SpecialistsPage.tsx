import React from "react";
import { DISEASES } from "../data";
import { Stethoscope, Heart, UserCheck } from "lucide-react";
import { ZebraMascot, ZebraDoodle } from "../components/common/Visuals";

export default function SpecialistsPage() {
  const specialists = DISEASES.flatMap(d => (d as any).specialists?.map((s: any) => ({ ...s, disease: d.name })) || []);
  const uniqueSpecs = specialists.reduce((acc: any[], specialist: any) => {
    if (!acc.find(item => item.name === specialist.name)) acc.push(specialist);
    return acc;
  }, [] as any[]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-ivory p-10 mb-10 border border-secondary">
        <div className="absolute left-6 top-6 opacity-10 pointer-events-none"><ZebraMascot size={120} /></div>
        <div className="absolute right-6 bottom-6 opacity-20 pointer-events-none"><ZebraDoodle className="w-48 h-32" /></div>
        <div className="relative text-center">
          <h1 className="font-black text-3xl text-primary mb-4">Find Specialists</h1>
          <p className="text-accent max-w-2xl mx-auto">Connect with experts who understand rare disease diagnosis, treatment, and family support.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        {uniqueSpecs.length > 0 ? uniqueSpecs.map((s: any) => (
          <div key={s.name} className="relative overflow-hidden rounded-3xl border border-secondary bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-10 blur-2xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 text-accent">
                <Stethoscope className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.2em]">Expert care</span>
              </div>
              <h3 className="font-bold text-primary mb-2">{s.name}</h3>
              <p className="text-xs text-accent mb-3">{s.role} · {s.org}</p>
              <p className="text-sm text-accent leading-relaxed mb-4">{s.specialization}</p>
              <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm text-primary"><Heart className="w-4 h-4" />Works with families affected by {s.disease}</div>
            </div>
          </div>
        )) : (
          <div className="bg-white rounded-3xl border border-secondary p-8 shadow-sm text-accent">No specialists found yet. Please check back for more listings.</div>
        )}
      </div>

      <div className="rounded-3xl bg-primary p-10 text-secondary text-center">
        <h2 className="font-black text-2xl mb-4">Specialist care starts with a trusted referral.</h2>
        <p className="text-sm leading-relaxed max-w-3xl mx-auto">RareBridge helps families find the right specialist teams, from neurologists and geneticists to metabolic care providers and allied health professionals.</p>
      </div>
    </section>
  );
}
