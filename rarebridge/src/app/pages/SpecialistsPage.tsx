import React, { useEffect, useState } from "react";
import {
  Stethoscope,
  MapPin,
  Building2,
  Phone,
  BookOpen,
  FlaskConical,
  Loader2,
} from "lucide-react";
import { apiService } from "../services/api.service";
import type { Specialist } from "../services/api.service";
import { ZebraMascot, ZebraDoodle } from "../components/common/Visuals";

// Specialist as it comes from the API, plus which disease it was found under
interface SpecialistWithDisease extends Specialist {
  disease: string;
}

function SpecialistCard({ s }: { s: SpecialistWithDisease }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-secondary bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Decorative blur blob */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-10 blur-2xl" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
            <Stethoscope className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-bold text-primary leading-snug">{s.name}</h3>
            {s.profession && (
              <p className="text-xs text-accent mt-0.5 font-medium">{s.profession}</p>
            )}
          </div>
        </div>

        {/* Specialization */}
        {s.specialization && (
          <div className="flex items-start gap-2 text-sm text-accent">
            <FlaskConical className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
            <span>{s.specialization}</span>
          </div>
        )}

        {/* Organization */}
        {s.organization && (
          <div className="flex items-start gap-2 text-sm text-accent">
            <Building2 className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
            <span>{s.organization}</span>
          </div>
        )}

        {/* Location */}
        {s.location && (
          <div className="flex items-start gap-2 text-sm text-accent">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
            <span>{s.location}</span>
          </div>
        )}

        {/* Contact */}
        {s.contact && (
          <div className="flex items-start gap-2 text-sm text-accent">
            <Phone className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
            <span>{s.contact}</span>
          </div>
        )}

        {/* Publications */}
        {s.publications && (
          <div className="flex items-start gap-2 text-sm text-accent">
            <BookOpen className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
            <span className="line-clamp-2">{s.publications}</span>
          </div>
        )}

        {/* Disease tag */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-3 py-1.5 text-xs font-semibold text-primary">
            <Stethoscope className="h-3 w-3" />
            {s.disease}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SpecialistsPage() {
  const [specialists, setSpecialists] = useState<SpecialistWithDisease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(false);
        const diseases = await apiService.getDiseases();

        // Flatten specialists from all diseases, tag with disease name,
        // deduplicate by specialist name (keep first occurrence)
        const seen = new Set<string>();
        const all: SpecialistWithDisease[] = [];

        for (const disease of diseases) {
          if (!disease.specialists?.length) continue;
          for (const s of disease.specialists) {
            const key = s.name.trim().toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              all.push({ ...s, disease: disease.name });
            }
          }
        }

        setSpecialists(all);
      } catch (err) {
        console.error("Failed to load specialists:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Left curvy lines */}
      <svg className="fixed left-0 top-0 h-full w-32 pointer-events-none opacity-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d="M20 0 Q50 100 20 200 T20 400 T20 600 T20 800 T20 1000" stroke="var(--primary)" strokeWidth="3" fill="none" />
        <path d="M40 0 Q70 150 40 300 T40 600 T40 900 T40 1000" stroke="var(--purple)" strokeWidth="2" fill="none" />
        <path d="M60 0 Q90 200 60 400 T60 800 T60 1000" stroke="var(--green)" strokeWidth="2" fill="none" />
      </svg>
      {/* Right curvy lines */}
      <svg className="fixed right-0 top-0 h-full w-32 pointer-events-none opacity-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d="M80 0 Q50 100 80 200 T80 400 T80 600 T80 800 T80 1000" stroke="var(--primary)" strokeWidth="3" fill="none" />
        <path d="M60 0 Q30 150 60 300 T60 600 T60 900 T60 1000" stroke="var(--purple)" strokeWidth="2" fill="none" />
        <path d="M40 0 Q10 200 40 400 T40 800 T40 1000" stroke="var(--green)" strokeWidth="2" fill="none" />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero banner */}
        <div className="relative overflow-hidden rounded-3xl bg-ivory p-10 mb-10 border border-secondary">
          <div className="absolute left-6 top-6 opacity-10 pointer-events-none">
            <ZebraMascot size={120} />
          </div>
          <div className="absolute right-6 bottom-6 opacity-20 pointer-events-none">
            <ZebraDoodle className="w-48 h-32" />
          </div>
          <div className="relative text-center">
            <h1 className="font-black text-3xl text-primary mb-4">Find Specialists</h1>
            <p className="text-accent max-w-2xl mx-auto">
              Connect with experts who understand rare disease diagnosis, treatment, and family support.
            </p>
            {!loading && specialists.length > 0 && (
              <p className="mt-3 text-sm font-semibold text-primary/60">
                {specialists.length} specialist{specialists.length !== 1 ? "s" : ""} across our disease directory
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex items-center gap-3 text-accent">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-sm font-medium">Loading specialists...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl border border-secondary bg-white p-8 text-center text-accent shadow-sm">
            <p className="font-semibold text-primary mb-1">Could not load specialists</p>
            <p className="text-sm">Please check your connection and try again.</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && specialists.length === 0 && (
          <div className="rounded-3xl border border-secondary bg-white p-8 text-center text-accent shadow-sm">
            <p className="font-semibold text-primary mb-1">No specialists found yet</p>
            <p className="text-sm">Please check back for more listings.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && specialists.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {specialists.map((s, i) => (
              <SpecialistCard key={`${s.name}-${i}`} s={s} />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="rounded-3xl bg-primary p-10 text-secondary text-center">
          <h2 className="font-black text-2xl mb-4">Specialist care starts with a trusted referral.</h2>
          <p className="text-sm leading-relaxed max-w-3xl mx-auto">
            RareBridge helps families find the right specialist teams — from neurologists and geneticists
            to metabolic care providers and allied health professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
