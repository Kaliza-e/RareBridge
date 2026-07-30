"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  Users,
  Dna,
  ShieldCheck,
  LogOut,
  ChevronRight,
  User,
  Heart,
  Stethoscope,
  Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getDiseases,
  getResearch,
  getSpecialists,
  getCommunities,
  DiseaseStatic,
  ResearchStatic,
  SpecialistStatic,
  CommunityStatic
} from "@/lib/data";

type DashTab = "saved-diseases" | "saved-research" | "saved-specialists" | "my-community";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashTab>("saved-diseases");
  const [diseases, setDiseases] = useState<DiseaseStatic[]>([]);
  const [research, setResearch] = useState<ResearchStatic[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistStatic[]>([]);
  const [communities, setCommunities] = useState<CommunityStatic[]>([]);

  // Saved ids from localStorage
  const [savedDiseaseIds, setSavedDiseaseIds] = useState<string[]>([]);
  
  useEffect(() => {
    // Redirect if unauthenticated
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    const allD = getDiseases();
    const allR = getResearch();
    const allS = getSpecialists();
    const allC = getCommunities();

    setDiseases(allD);
    setResearch(allR);
    setSpecialists(allS);
    setCommunities(allC);

    const bookmarked = JSON.parse(localStorage.getItem("bookmarked_diseases") || "[]");
    if (bookmarked.length === 0) {
      const initial = [allD[0].id, allD[1].id];
      localStorage.setItem("bookmarked_diseases", JSON.stringify(initial));
      setSavedDiseaseIds(initial);
    } else {
      setSavedDiseaseIds(bookmarked);
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-sapphire">Validating credentials...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Get matching items
  const savedDiseases = diseases.filter((d) => savedDiseaseIds.includes(d.id));
  const savedResearch = research.filter((r) => savedDiseaseIds.includes(r.diseaseId));
  const savedSpecialists = specialists.filter((s) => savedDiseaseIds.includes(s.diseaseId));
  const savedCommunities = communities.filter((c) => savedDiseaseIds.includes(c.diseaseId));

  const removeBookmark = (id: string) => {
    const updated = savedDiseaseIds.filter((x) => x !== id);
    setSavedDiseaseIds(updated);
    localStorage.setItem("bookmarked_diseases", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 w-full">
        {/* User Welcome Banner */}
        <div className="bg-white border border-taupe/20 p-8 rounded-card shadow-premium mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-champagne/45 flex items-center justify-center text-primary border border-taupe/35">
                <User className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-sapphire">Patient Portal</span>
                <h1 className="text-2xl md:text-3xl font-bold font-heading text-primary leading-tight">
                  Welcome back, {session?.user?.name || "David Miller"}
                </h1>
                <p className="text-xs text-sapphire/85">
                  Sandbox Member Profile &bull; {session?.user?.email || "patient@rarebridge.org"}
                </p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-5 py-3 rounded-full border border-red-200 text-red-700 hover:bg-red-50 transition-colors self-start sm:self-auto"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sapphire/60 block px-4 mb-2">Saved Dossier Content</span>
            
            <button
              onClick={() => setActiveTab("saved-diseases")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center justify-between transition-all ${
                activeTab === "saved-diseases"
                  ? "bg-primary text-white shadow-sm"
                  : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Saved Diseases
              </span>
              <span className="text-xs">{savedDiseases.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("saved-research")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center justify-between transition-all ${
                activeTab === "saved-research"
                  ? "bg-primary text-white shadow-sm"
                  : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Saved Research
              </span>
              <span className="text-xs">{savedResearch.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("saved-specialists")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center justify-between transition-all ${
                activeTab === "saved-specialists"
                  ? "bg-primary text-white shadow-sm"
                  : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <span className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Saved Specialists
              </span>
              <span className="text-xs">{savedSpecialists.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("my-community")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center justify-between transition-all ${
                activeTab === "my-community"
                  ? "bg-primary text-white shadow-sm"
                  : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                My Communities
              </span>
              <span className="text-xs">{savedCommunities.length}</span>
            </button>
          </div>

          {/* Main Panel Content */}
          <div className="lg:col-span-9 bg-white border border-taupe/20 p-8 rounded-card shadow-premium min-h-[400px]">
            {/* SAVED DISEASES VIEW */}
            {activeTab === "saved-diseases" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Saved Diseases</h3>
                {savedDiseases.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedDiseases.map((d) => (
                      <div key={d.id} className="bg-background p-6 rounded-card border border-taupe/20 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] uppercase font-bold bg-champagne text-primary px-2 py-0.5 rounded">
                              {d.category}
                            </span>
                            <button
                              onClick={() => removeBookmark(d.id)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                          <h4 className="text-base font-bold text-primary">{d.name}</h4>
                          <p className="text-xs text-sapphire/80 line-clamp-2 leading-relaxed">
                            {d.overview}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-taupe/15 mt-4 flex justify-end">
                          <Link
                            href={`/diseases/${d.slug}`}
                            className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-0.5"
                          >
                            Explore Dossier
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-4 text-sapphire/60">
                    <Bookmark className="w-10 h-10 text-taupe/60 mx-auto" />
                    <p className="text-xs font-semibold">You have no bookmarked diseases yet.</p>
                    <Link href="/diseases" className="inline-block bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-full">
                      Browse Diseases
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* SAVED RESEARCH VIEW */}
            {activeTab === "saved-research" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Saved Research Updates</h3>
                {savedResearch.length > 0 ? (
                  <div className="space-y-4">
                    {savedResearch.map((res) => (
                      <div key={res.id} className="bg-background p-6 rounded-card border border-taupe/20 space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-sm font-bold text-primary leading-snug">{res.title}</h4>
                          <span className="text-[9px] uppercase font-bold text-sapphire/50 shrink-0">Journal: {res.journal}</span>
                        </div>
                        <p className="text-xs text-sapphire/80 leading-relaxed font-light">{res.summary}</p>
                        <div className="pt-3 border-t border-taupe/15 flex justify-end">
                          <Link href="/research" className="text-xs font-bold text-primary hover:underline">
                            Open AI Simplifier Tool
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-4 text-sapphire/60">
                    <BookOpen className="w-10 h-10 text-taupe/60 mx-auto" />
                    <p className="text-xs font-semibold">No associated research saved.</p>
                  </div>
                )}
              </div>
            )}

            {/* SAVED SPECIALISTS VIEW */}
            {activeTab === "saved-specialists" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Saved Specialists</h3>
                {savedSpecialists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedSpecialists.map((spec) => (
                      <div key={spec.id} className="bg-background p-6 rounded-card border border-taupe/20 flex gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={spec.image}
                          alt={spec.name}
                          className="w-12 h-12 rounded-full object-cover filter saturate-75"
                        />
                        <div className="space-y-1 text-xs">
                          <h4 className="font-bold text-primary">{spec.name}</h4>
                          <p className="text-sapphire">{spec.profession}</p>
                          <p className="text-sapphire/60">{spec.organization}</p>
                          {spec.email && <a href={`mailto:${spec.email}`} className="text-primary hover:underline block pt-1">Email Specialist</a>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-4 text-sapphire/60">
                    <Stethoscope className="w-10 h-10 text-taupe/60 mx-auto" />
                    <p className="text-xs font-semibold">No specialists in your saved roster.</p>
                  </div>
                )}
              </div>
            )}

            {/* MY COMMUNITY VIEW */}
            {activeTab === "my-community" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">My Support Communities</h3>
                {savedCommunities.length > 0 ? (
                  <div className="space-y-4">
                    {savedCommunities.map((comm) => (
                      <div key={comm.id} className="bg-background p-6 rounded-card border border-taupe/20 flex justify-between items-center">
                        <div className="space-y-1.5 text-xs text-sapphire/90">
                          <h4 className="text-sm font-bold text-primary">{comm.name}</h4>
                          <p className="line-clamp-2 leading-relaxed">{comm.description}</p>
                        </div>
                        <div className="shrink-0 pl-4">
                          {comm.website && (
                            <a
                              href={comm.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                            >
                              Visit
                              <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-4 text-sapphire/60">
                    <Users className="w-10 h-10 text-taupe/60 mx-auto" />
                    <p className="text-xs font-semibold">You haven&apos;t joined any communities yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
