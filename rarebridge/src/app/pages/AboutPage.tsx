import React from "react";
import { ZebraMascot, ZebraDoodle } from "../components/common/Visuals";

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-sm border border-secondary">
        <div className="absolute -left-8 top-12 opacity-10 pointer-events-none"><ZebraDoodle className="w-48 h-32" /></div>
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none"><ZebraMascot size={140} /></div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-bold mb-6 border border-taupe-40">
            Zebra-led care for families with rare disease questions
          </div>
          <h1 className="font-black text-3xl text-primary mb-4">About RareBridge</h1>
          <p className="text-accent leading-relaxed mb-6">
            RareBridge connects families, clinicians, and researchers with clear information about rare diseases.
            We curate medically reviewed content, list specialists and research organizations, and support communities with practical resources.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-ivory p-6 border border-secondary">
              <h3 className="font-bold text-primary mb-2">Our Mission</h3>
              <p className="text-sm text-accent">To make trusted rare disease information accessible to families worldwide and accelerate connections to care and research.</p>
            </div>
            <div className="rounded-3xl bg-ivory p-6 border border-secondary">
              <h3 className="font-bold text-primary mb-2">Our Vision</h3>
              <p className="text-sm text-accent">A world where every rare disease family finds fast answers, trusted specialists, and a welcoming support community.</p>
            </div>
          </div>
          <div className="mt-8 rounded-3xl bg-primary p-8 text-white">
            <h2 className="font-black text-2xl mb-3">Why zebras?</h2>
            <p className="text-sm text-secondary leading-relaxed">In medicine, zebras remind us that rare conditions are possible. RareBridge brings that same mindset to every search, every specialist, and every support connection.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
