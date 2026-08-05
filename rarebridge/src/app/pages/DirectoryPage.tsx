import React, { useState } from "react";
import { Search } from "lucide-react";
import { DISEASES, CATEGORY_FILTERS, STATUS_FILTERS } from "../data";
import { ZebraEmptyState, DiseaseCard } from "../components/common/Visuals";

export default function DirectoryPage({ onDisease }: { onDisease: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [status, setStatus] = useState("All Status");

  const filtered = DISEASES.filter(d => {
    const q = query.toLowerCase();
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
    const matchC = cat === "All" || d.categoryBadges?.includes(cat);
    const matchS = status === "All Status" || (d as any).researchStatus === status;
    return matchQ && matchC && matchS;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-black text-4xl text-primary mb-2">Disease Directory</h1>
        <p className="text-taupe font-medium">Browse our comprehensive library of rare diseases</p>
      </div>

      <div className="bg-white rounded-3xl border border-taupe-40 p-6 mb-8 shadow-sm">
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
          <input className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-secondary focus:border-accent focus:outline-none bg-ivory text-primary placeholder:text-taupe transition-colors" placeholder="Search diseases..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-5">
          <div>
            <p className="text-xs text-taupe mb-2 font-bold uppercase tracking-wider">Category</p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_FILTERS.map(f => (
                <button key={f} onClick={() => setCat(f)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${cat === f ? "bg-primary text-ivory" : "bg-secondary text-accent hover:bg-taupe-20"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-taupe mb-2 font-bold uppercase tracking-wider">Research Status</p>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map(f => (
                <button key={f} onClick={() => setStatus(f)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${status === f ? "bg-primary text-ivory" : "bg-secondary text-accent hover:bg-taupe-20"}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-taupe mb-6 font-medium">{filtered.length} disease{filtered.length !== 1 ? "s" : ""} found</p>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(d => <DiseaseCard key={d.id} disease={d} onClick={() => onDisease(d.id)} />)}</div>
      ) : (
        <ZebraEmptyState message="No diseases found" sub="Try adjusting your filters or search terms" />
      )}
    </div>
  );
}
