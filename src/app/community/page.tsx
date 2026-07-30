"use client";

import { useEffect, useState } from "react";
import { Search, Globe, Users, Heart, Sparkles, MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCommunities, getDiseases, CommunityStatic, DiseaseStatic } from "@/lib/data";

export default function CommunityPage() {
  const [communities, setCommunities] = useState<CommunityStatic[]>([]);
  const [diseases, setDiseases] = useState<DiseaseStatic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("All");

  useEffect(() => {
    setCommunities(getCommunities());
    setDiseases(getDiseases());
  }, []);

  const filteredCommunities = communities.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDisease = selectedDisease === "All" || c.diseaseId === selectedDisease;

    return matchesSearch && matchesDisease;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sapphire">Support Networks</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
            Discover Patient Communities
          </h1>
          <p className="text-sm md:text-base text-sapphire/80 leading-relaxed font-light">
            You are not alone. Discover non-profit patient foundations, regional support organizations, and moderated Facebook groups.
          </p>
        </div>

        {/* Directory Controls Panel */}
        <div className="bg-white border border-taupe/20 p-6 md:p-8 rounded-card shadow-premium mb-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sapphire/50" />
              <input
                type="text"
                placeholder="Search groups, foundations, or countries..."
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
                <option value="All">Filter by Target Disease: All Communities</option>
                {diseases.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-xs text-sapphire/70 px-2">
          <p>Showing {filteredCommunities.length} support networks</p>
          {(selectedDisease !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDisease("All");
                setSearchQuery("");
              }}
              className="text-primary hover:underline font-semibold"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Community Cards Grid */}
        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-card overflow-hidden shadow-premium hover:shadow-premium-hover border border-taupe/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start gap-2">
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                      <Heart className="w-2.5 h-2.5 text-emerald-600 fill-emerald-600 animate-pulse" />
                      Vetted Support Network
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-sapphire/60">
                      <MapPin className="w-3.5 h-3.5 text-taupe shrink-0" />
                      <span>{c.country}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-bold font-heading text-primary leading-snug">{c.name}</h2>
                    <p className="text-xs leading-relaxed text-sapphire/85 min-h-[60px]">
                      {c.description}
                    </p>
                  </div>

                  {/* Actions / Links */}
                  <div className="pt-4 border-t border-taupe/20 flex flex-wrap gap-4 text-xs font-semibold text-primary">
                    {c.website && (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-primary-light transition-colors"
                      >
                        <Globe className="w-4 h-4 text-taupe shrink-0" />
                        <span>Official Foundation Site</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    {c.facebook && (
                      <a
                        href={c.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-primary-light transition-colors"
                      >
                        <svg className="w-4 h-4 text-taupe shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        <span>Support Group Page</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <div className="p-4 bg-background rounded-[18px] border border-taupe/20 text-[10px] text-sapphire/80 flex items-center gap-2">
                    <Users className="w-4 h-4 text-taupe shrink-0" />
                    <span>Open enrollment for family members & patients.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-card p-12 text-center border border-taupe/20 shadow-premium max-w-lg mx-auto mt-12 space-y-4">
            <h3 className="text-lg font-bold text-primary">No Support Communities Found</h3>
            <p className="text-sm text-sapphire/80 leading-relaxed">
              We couldn&apos;t find any active patient foundations or support channels matching your filters.
            </p>
            <button
              onClick={() => {
                setSelectedDisease("All");
                setSearchQuery("");
              }}
              className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
