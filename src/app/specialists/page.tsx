"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Mail, Phone, Globe, BookOpen, ChevronRight, Stethoscope } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSpecialists, getDiseases, SpecialistStatic, DiseaseStatic } from "@/lib/data";

export default function SpecialistsPage() {
  const [specialists, setSpecialists] = useState<SpecialistStatic[]>([]);
  const [diseases, setDiseases] = useState<DiseaseStatic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    setSpecialists(getSpecialists());
    setDiseases(getDiseases());
  }, []);

  const locations = ["All", "Boston, MA, USA", "Baltimore, MD, USA", "Rochester, MN, USA"];

  const filteredSpecialists = specialists.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDisease = selectedDisease === "All" || s.diseaseId === selectedDisease;
    const matchesLocation = selectedLocation === "All" || s.location === selectedLocation;

    return matchesSearch && matchesDisease && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sapphire">Specialist Network</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
            Consult Clinical Specialists
          </h1>
          <p className="text-sm md:text-base text-sapphire/80 leading-relaxed font-light">
            Locate clinical investigators, geneticists, and specialists dedicated to studying and treating specific rare disorders.
          </p>
        </div>

        {/* Directory Controls Panel */}
        <div className="bg-white border border-taupe/20 p-6 md:p-8 rounded-card shadow-premium mb-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative col-span-1 md:col-span-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sapphire/50" />
              <input
                type="text"
                placeholder="Search by name, organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background text-sm text-primary rounded-full pl-12 pr-6 py-3.5 border border-taupe/40 focus:border-sapphire focus:outline-none transition-all placeholder:text-sapphire/40"
              />
            </div>

            {/* Disease Filter */}
            <div>
              <select
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                className="w-full bg-background text-xs font-semibold text-primary px-5 py-3.5 rounded-full border border-taupe/40 focus:outline-none"
              >
                <option value="All">Filter by Target Disease: All</option>
                {diseases.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-background text-xs font-semibold text-primary px-5 py-3.5 rounded-full border border-taupe/40 focus:outline-none"
              >
                <option value="All">Filter by Institution City: All</option>
                {locations.slice(1).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-xs text-sapphire/70 px-2">
          <p>Showing {filteredSpecialists.length} specialists in active directory</p>
          {(selectedDisease !== "All" || selectedLocation !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDisease("All");
                setSelectedLocation("All");
                setSearchQuery("");
              }}
              className="text-primary hover:underline font-semibold"
            >
              Reset directory filters
            </button>
          )}
        </div>

        {/* Directory Grid */}
        {filteredSpecialists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecialists.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-card overflow-hidden shadow-premium hover:shadow-premium-hover border border-taupe/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-8 space-y-6">
                  {/* Photo Header */}
                  <div className="flex gap-4 items-start">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-20 h-20 rounded-full object-cover filter saturate-75 border border-taupe/20 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-sapphire bg-champagne/45 px-2 py-0.5 rounded">
                        <Stethoscope className="w-2.5 h-2.5 text-sapphire" />
                        Clinical Investigator
                      </div>
                      <h2 className="text-xl font-bold font-heading text-primary leading-snug">{s.name}</h2>
                      <p className="text-xs font-semibold text-sapphire/85">{s.profession}</p>
                    </div>
                  </div>

                  {/* Core specifications */}
                  <div className="space-y-3 text-xs text-sapphire/90 border-t border-taupe/20 pt-4">
                    <div>
                      <span className="text-[10px] text-sapphire/50 block font-bold uppercase tracking-wider">Research Focus</span>
                      <span className="font-semibold text-primary">{s.specialization}</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-taupe shrink-0" />
                      <span>{s.organization} &bull; {s.location}</span>
                    </div>
                  </div>

                  {/* Contact channels */}
                  <div className="space-y-2 pt-2 border-t border-taupe/20">
                    <span className="text-[10px] text-sapphire/50 block font-bold uppercase tracking-wider">Contact Channels</span>
                    <div className="space-y-1.5 text-xs">
                      {s.email && (
                        <a href={`mailto:${s.email}`} className="flex items-center gap-2 text-sapphire hover:text-primary transition-colors">
                          <Mail className="w-3.5 h-3.5 text-taupe" />
                          <span>{s.email}</span>
                        </a>
                      )}
                      {s.phone && (
                        <a href={`tel:${s.phone}`} className="flex items-center gap-2 text-sapphire hover:text-primary transition-colors">
                          <Phone className="w-3.5 h-3.5 text-taupe" />
                          <span>{s.phone}</span>
                        </a>
                      )}
                      {s.website && (
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sapphire hover:text-primary transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5 text-taupe" />
                          <span className="truncate">Institutional Profile</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Publications */}
                  {s.publications && (
                    <div className="pt-2 border-t border-taupe/20 space-y-1.5">
                      <span className="text-[10px] text-sapphire/50 block font-bold uppercase tracking-wider flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Selected Publications
                      </span>
                      <p className="text-[11px] leading-relaxed text-sapphire/75 italic line-clamp-2">
                        {s.publications}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-8 pt-0">
                  <Link
                    href={`/diseases`}
                    className="w-full inline-flex justify-center items-center bg-background border border-taupe/40 text-xs font-semibold py-3 rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    View Associated Disease dossier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-card p-12 text-center border border-taupe/20 shadow-premium max-w-lg mx-auto mt-12 space-y-4">
            <h3 className="text-lg font-bold text-primary">No Specialists Found</h3>
            <p className="text-sm text-sapphire/80 leading-relaxed">
              We couldn&apos;t find any specialists matching your filter parameters. Try expanding your search queries or clearing selections.
            </p>
            <button
              onClick={() => {
                setSelectedDisease("All");
                setSelectedLocation("All");
                setSearchQuery("");
              }}
              className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Reset Directory
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
