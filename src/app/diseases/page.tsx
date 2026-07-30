"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowUpDown, ChevronRight, Dna } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDiseases, DiseaseStatic } from "@/lib/data";

export default function DiseasesPage() {
  const [diseases, setDiseases] = useState<DiseaseStatic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc">("name-asc");

  useEffect(() => {
    setDiseases(getDiseases());
  }, []);

  const categories = ["All", "Genetic", "Neurological", "Metabolic", "Immunological"];
  const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  // Filtering Logic
  const filteredDiseases = diseases
    .filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.symptoms.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || d.category === selectedCategory;
      
      const matchesLetter =
        selectedLetter === "All" || d.name.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesCategory && matchesLetter;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sapphire">Rare Disease Library</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
            Browse Verified Rare Disorders
          </h1>
          <p className="text-sm md:text-base text-sapphire/80 leading-relaxed font-light">
            Search our curated medical index. Each disease has a layman-translated tab designed for families and a clinical medical tab designed for caregivers and researchers.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="space-y-6 mb-10 bg-white p-6 md:p-8 rounded-card shadow-premium border border-taupe/20">
          {/* Row 1: Search & Sort */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sapphire/50" />
              <input
                type="text"
                placeholder="Search diseases, symptoms, or genes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background text-sm text-primary rounded-full pl-12 pr-6 py-3.5 border border-taupe/40 focus:border-sapphire focus:outline-none transition-all placeholder:text-sapphire/40"
              />
            </div>
            
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              <ArrowUpDown className="w-4 h-4 text-sapphire/60 hidden md:block" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full md:w-auto bg-background text-xs font-semibold text-primary px-4 py-3.5 rounded-full border border-taupe/40 focus:outline-none"
              >
                <option value="name-asc">Alphabetical (A-Z)</option>
                <option value="name-desc">Alphabetical (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Filter Chips */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sapphire/60 shrink-0" />
            <span className="text-xs font-bold text-sapphire/60 shrink-0">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-white"
                    : "bg-background border-taupe/30 text-sapphire hover:border-sapphire/65"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Row 3: A-Z Alphabet toolbar */}
          <div className="border-t border-taupe/20 pt-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              <span className="text-xs font-bold text-sapphire/60 mr-2 shrink-0">Index:</span>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-7 h-7 text-xs font-bold rounded-full shrink-0 flex items-center justify-center transition-all ${
                    selectedLetter === letter
                      ? "bg-sapphire text-white shadow-sm"
                      : "text-sapphire hover:bg-taupe/15"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-xs font-medium text-sapphire/70 px-2">
          <p>Showing {filteredDiseases.length} matching diseases</p>
          {(selectedCategory !== "All" || selectedLetter !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedLetter("All");
                setSearchQuery("");
              }}
              className="text-primary hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Disease Cards Grid */}
        {filteredDiseases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDiseases.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-card overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col h-full border border-taupe/20"
              >
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-champagne text-primary px-3 py-1 rounded-full">
                        {d.category}
                      </span>
                      <Dna className="w-4 h-4 text-taupe/60" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-primary leading-snug">{d.name}</h2>
                    <p className="text-sm text-sapphire/85 line-clamp-3 leading-relaxed">
                      {d.overview}
                    </p>

                    {/* Symptoms Preview */}
                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold text-sapphire/50 block mb-1">Key Symptoms</span>
                      <p className="text-xs text-sapphire/80 line-clamp-2 leading-relaxed">
                        {d.symptoms}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-taupe/20 mt-6 flex items-center justify-between">
                    <span className="text-[10px] text-sapphire/50">Last updated: Recently</span>
                    <Link
                      href={`/diseases/${d.slug}`}
                      className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1 group"
                    >
                      Read full guide
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-card p-12 text-center border border-taupe/20 shadow-premium max-w-lg mx-auto mt-12 space-y-4">
            <h3 className="text-lg font-bold text-primary">No Rare Diseases Found</h3>
            <p className="text-sm text-sapphire/80 leading-relaxed">
              We couldn&apos;t find any records matching your active filters. Try refining your spelling, choosing a different category, or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedLetter("All");
                setSearchQuery("");
              }}
              className="inline-flex bg-primary hover:bg-primary-light text-white text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
