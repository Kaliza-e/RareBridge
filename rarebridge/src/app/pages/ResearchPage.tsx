import React from "react";
import { DISEASES, FEATURES } from "../data";
import { BookOpen, Microscope, FlaskConical, Users } from "lucide-react";
import { ZebraMascot, ZebraDoodle } from "../components/common/Visuals";

export default function ResearchPage() {
  const organizations = DISEASES.flatMap(d => (d as any).research || [])
    .reduce((acc: any[], item: any) => acc.find(x => x.name === item.name) ? acc : [...acc, item], []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-secondary-20 p-10 mb-12">
        <div className="absolute left-6 bottom-6 opacity-10 pointer-events-none"><ZebraDoodle className="w-56 h-36" /></div>
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none"><ZebraMascot size={140} /></div>
        <div className="relative text-center">
          <h1 className="font-black text-3xl text-primary mb-4">Research & Organizations</h1>
          <p className="text-accent max-w-3xl mx-auto">Discover the latest rare disease research, breakthroughs, and organizations helping to advance diagnosis, treatment, and care.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-10">
        <div className="relative overflow-hidden rounded-3xl border border-secondary bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="pointer-events-none absolute -right-8 top-6 h-24 w-24 rounded-full bg-primary-10 blur-2xl" />
          <div className="relative">
            <h2 className="font-bold text-primary text-2xl mb-4">What we track</h2>
            <ul className="space-y-3 text-accent text-sm leading-relaxed">
              <li>• Clinical trial updates for rare disease therapies.</li>
              <li>• Gene therapy and enzyme replacement research.</li>
              <li>• New diagnostic tools and newborn screening advances.</li>
              <li>• Patient-centered research networks and advocacy groups.</li>
            </ul>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-secondary shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="pointer-events-none absolute -left-8 bottom-8 h-24 w-24 rounded-full bg-secondary-20 blur-2xl" />
          <div className="relative">
            <h2 className="font-bold text-2xl mb-4">Why research matters</h2>
            <p className="leading-relaxed text-sm">Rare disease research is the engine that turns clinical observations into treatments and support. When families share data, clinicians learn faster, and scientists can target therapies more effectively.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        {FEATURES.slice(0, 6).map(f => (
          <div key={f.title} className="relative overflow-hidden rounded-3xl border border-secondary bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary-30 blur-2xl" />
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-secondary shadow-sm">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-primary mb-3">{f.title}</h3>
              <p className="text-sm text-accent">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="font-black text-2xl text-primary mb-4">Featured research organizations</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.length > 0 ? organizations.map(org => (
            <div key={org.name} className="relative overflow-hidden rounded-3xl border border-secondary bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="pointer-events-none absolute -right-8 top-6 h-20 w-20 rounded-full bg-primary-10 blur-2xl" />
              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-taupe">
                  <Microscope className="w-4 h-4" />{org.focus}
                </div>
                <h3 className="font-bold text-primary mb-2">{org.name}</h3>
                <p className="text-sm text-accent leading-relaxed">{org.why}</p>
              </div>
            </div>
          )) : (
            <div className="bg-white rounded-3xl border border-secondary p-8 shadow-sm text-accent">No organizations found at the moment.</div>
          )}
        </div>
      </div>

      <div className="rounded-3xl bg-primary p-10 text-center text-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl mb-4">Research helps rare disease families feel less alone.</h2>
          <p className="text-sm leading-relaxed">We bring the latest science, trusted organizations, and clinical updates together so families can make informed decisions and connect with the right experts.</p>
        </div>
      </div>
    </section>
  );
}
