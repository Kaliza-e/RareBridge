import React, { useState } from "react";
import { Search, SlidersHorizontal, X, BookOpen } from "lucide-react";
import { DISEASES, CATEGORY_FILTERS, STATUS_FILTERS } from "../data";
import { ZebraEmptyState, DiseaseCard } from "../components/common/Visuals";

export default function DirectoryPage({ onDisease }: { onDisease: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [status, setStatus] = useState("All Status");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = DISEASES.filter(d => {
    const q = query.toLowerCase();
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
    const matchC = cat === "All" || d.categoryBadges?.includes(cat);
    const matchS = status === "All Status" || (d as any).researchStatus === status;
    return matchQ && matchC && matchS;
  });

  const hasActiveFilters = cat !== "All" || status !== "All Status";

  function clearFilters() {
    setCat("All");
    setStatus("All Status");
  }

  return (
    <div className="min-h-screen">
      {/* ── Page header ── */}
      <div className="relative overflow-hidden bg-primary">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-secondary opacity-10 blur-[100px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent opacity-5 blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary/70">Disease Library</span>
          </div>
          <h1 className="font-black text-4xl md:text-5xl text-ivory mb-3 tracking-tight">Disease Directory</h1>
          <p className="text-taupe text-lg max-w-xl">Browse our comprehensive library of rare conditions, each with plain-language explanations and expert-reviewed details.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Search + filter bar ── */}
        <div className="bg-white rounded-3xl border border-taupe-40/60 shadow-sm overflow-hidden mb-8">
          {/* Search row */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-taupe-40/40">
            <Search className="w-5 h-5 text-taupe shrink-0" />
            <input
              className="flex-1 bg-transparent text-primary placeholder-taupe text-base font-medium outline-none"
              placeholder="Search by name, category, or symptom…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4 text-taupe" />
              </button>
            )}
            <div className="w-px h-6 bg-taupe-40/40" />
            <button
              onClick={() => setFiltersOpen(o => !o)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${filtersOpen || hasActiveFilters ? "bg-primary text-ivory" : "bg-secondary text-primary hover:bg-primary hover:text-ivory"
                }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-secondary text-primary text-[10px] font-black flex items-center justify-center">
                  {(cat !== "All" ? 1 : 0) + (status !== "All Status" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Expandable filter panel */}
          {filtersOpen && (
            <div className="px-5 py-5 bg-ivory/50 flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-taupe mb-3 font-bold uppercase tracking-widest">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setCat(f)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${cat === f
                          ? "bg-primary text-ivory shadow-sm"
                          : "bg-white border border-taupe-40 text-accent hover:border-primary hover:text-primary"
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-taupe mb-3 font-bold uppercase tracking-widest">Research Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setStatus(f)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${status === f
                          ? "bg-primary text-ivory shadow-sm"
                          : "bg-white border border-taupe-40 text-accent hover:border-primary hover:text-primary"
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-primary transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Active filter chips ── */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-taupe font-medium">Active:</span>
            {cat !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {cat}
                <button onClick={() => setCat("All")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {status !== "All Status" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {status}
                <button onClick={() => setStatus("All Status")}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-taupe font-medium">
            <span className="font-black text-primary text-base">{filtered.length}</span> disease{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(d => (
              <DiseaseCard key={d.id} disease={d} onClick={() => onDisease(d.id)} />
            ))}
          </div>
        ) : (
          <ZebraEmptyState
            message="No diseases found"
            sub="Try adjusting your filters or search terms"
          />
        )}
      </div>
    </div>
  );
}
