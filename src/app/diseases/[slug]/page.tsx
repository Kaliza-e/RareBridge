"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Bookmark,
  Share2,
  Printer,
  ArrowLeft,
  Calendar,
  ExternalLink,
  ChevronRight,
  User,
  Heart,
  Globe,
  Dna,
  FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getDiseaseBySlug,
  getDiseases,
  getClinicalTrials,
  getSpecialists,
  getCommunities,
  getResearch,
  getFAQs,
  DiseaseStatic,
  ClinicalTrialStatic,
  SpecialistStatic,
  CommunityStatic,
  ResearchStatic,
  FAQStatic
} from "@/lib/data";

type TabType = "overview" | "causes" | "symptoms" | "diagnosis-treatments" | "research-trials" | "specialists-community";

export default function DiseaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const slug = params?.slug as string;

  const [disease, setDisease] = useState<DiseaseStatic | null>(null);
  const [related, setRelated] = useState<DiseaseStatic[]>([]);
  const [trials, setTrials] = useState<ClinicalTrialStatic[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistStatic[]>([]);
  const [communities, setCommunities] = useState<CommunityStatic[]>([]);
  const [research, setResearch] = useState<ResearchStatic[]>([]);
  const [faqs, setFaqs] = useState<FAQStatic[]>([]);

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const d = getDiseaseBySlug(slug);
    if (!d) return;
    setDisease(d);

    const allDiseases = getDiseases();
    setRelated(allDiseases.filter((x) => x.id !== d.id && x.category === d.category).slice(0, 3));
    setTrials(getClinicalTrials(d.id));
    setSpecialists(getSpecialists(d.id));
    setCommunities(getCommunities(d.id));
    setResearch(getResearch(d.id));
    setFaqs(getFAQs(d.id));

    const bookmarkedList = JSON.parse(localStorage.getItem("bookmarked_diseases") || "[]");
    setIsBookmarked(bookmarkedList.includes(d.id));
  }, [slug]);

  if (!disease) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-sapphire">Loading rare disease dossier...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle bookmarking
  const toggleBookmark = () => {
    const bookmarkedList = JSON.parse(localStorage.getItem("bookmarked_diseases") || "[]");
    let updatedList = [...bookmarkedList];
    if (isBookmarked) {
      updatedList = updatedList.filter((id) => id !== disease.id);
      setIsBookmarked(false);
    } else {
      updatedList.push(disease.id);
      setIsBookmarked(true);
    }
    localStorage.setItem("bookmarked_diseases", JSON.stringify(updatedList));
  };

  // Handle sharing
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background print:bg-white selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 w-full">
        {/* Back navigation */}
        <div className="mb-8 print:hidden">
          <Link
            href="/diseases"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sapphire hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rare Disease library
          </Link>
        </div>

        {/* Floating Dossier Header */}
        <div className="bg-white border border-taupe/20 p-8 md:p-12 rounded-card shadow-premium mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-champagne text-primary px-3.5 py-1.5 rounded-full">
                  {disease.category} Database Dossier
                </span>
                <Dna className="w-4 h-4 text-sapphire animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
                {disease.name}
              </h1>
              <p className="text-sm text-sapphire/85 max-w-2xl leading-relaxed">
                {disease.overview}
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-3 shrink-0 print:hidden pt-4 lg:pt-0 border-t border-taupe/25 lg:border-none">
              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-1.5 text-xs font-semibold px-4.5 py-3 rounded-full border transition-all ${
                  isBookmarked
                    ? "bg-primary border-primary text-white"
                    : "bg-background border-taupe/35 text-sapphire hover:border-sapphire/70"
                }`}
                title="Bookmark disease"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-white" : ""}`} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs font-semibold px-4.5 py-3 rounded-full border bg-background border-taupe/35 text-sapphire hover:border-sapphire/70 transition-all"
                title="Copy share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                {shareSuccess ? "Link Copied!" : "Share"}
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-semibold px-4.5 py-3 rounded-full border bg-background border-taupe/35 text-sapphire hover:border-sapphire/70 transition-all"
                title="Print dossier summary"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="border-b border-taupe/25 mb-10 overflow-x-auto no-scrollbar flex print:hidden">
          {(
            [
              { id: "overview", label: "Overview & Descriptions" },
              { id: "causes", label: "Causes & Genetics" },
              { id: "symptoms", label: "Types & Symptoms" },
              { id: "diagnosis-treatments", label: "Diagnosis & Treatments" },
              { id: "research-trials", label: `Clinical Studies (${trials.length + research.length})` },
              { id: "specialists-community", label: "Specialists & Groups" }
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-6 text-sm font-semibold tracking-wide border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-sapphire/70 hover:text-primary hover:border-taupe/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Layperson explanation (Apple aesthetic) */}
                <div className="bg-white border border-sapphire/15 p-8 md:p-10 rounded-card shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-sapphire uppercase tracking-wider">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    Simple Explanation (For Families & Patients)
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-primary/95 font-sans font-light">
                    {disease.simpleDescription}
                  </p>
                </div>

                {/* Medical description (Stripe/Notion style) */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-primary font-heading uppercase tracking-wide">
                    Clinical Medical Description
                  </h2>
                  <p className="text-sm leading-relaxed text-sapphire/90 bg-white border border-taupe/20 p-8 rounded-card">
                    {disease.medicalDescription}
                  </p>
                </div>
              </div>
            )}

            {/* CAUSES TAB */}
            {activeTab === "causes" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-primary font-heading">Etiology & Causes</h2>
                <div className="bg-white border border-taupe/20 p-8 rounded-card space-y-6">
                  <div>
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-sapphire mb-2">Genetic Causes</h3>
                    <p className="text-sm leading-relaxed text-sapphire/90">{disease.causes}</p>
                  </div>
                  <div className="pt-6 border-t border-taupe/15">
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-sapphire mb-2">Environmental Factors</h3>
                    <p className="text-sm leading-relaxed text-sapphire/70">
                      Currently, there are no proven primary environmental triggers associated directly with the onset of {disease.name}. However, management and secondary health risks are closely linked to general environmental variables.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-taupe/15">
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-sapphire mb-2">Unknown / Unspecified Causes</h3>
                    <p className="text-sm leading-relaxed text-sapphire/70">
                      Ongoing clinical trials are searching for potential genetic modifiers and epigenetics that alter the progression and severity of the disease.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SYMPTOMS TAB */}
            {activeTab === "symptoms" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-primary font-heading">Disease Types & Symptoms</h2>
                <div className="bg-white border border-taupe/20 p-8 rounded-card space-y-6">
                  <div>
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-sapphire mb-2">Primary Manifestations</h3>
                    <p className="text-sm leading-relaxed text-sapphire/90 whitespace-pre-line">{disease.symptoms}</p>
                  </div>
                  <div className="pt-6 border-t border-taupe/15">
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-sapphire mb-2">Recognized Types & Stages</h3>
                    <p className="text-sm leading-relaxed text-sapphire/80">{disease.types}</p>
                  </div>
                </div>
              </div>
            )}

            {/* DIAGNOSIS & TREATMENTS TAB */}
            {activeTab === "diagnosis-treatments" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-primary font-heading">Diagnostic Procedures</h2>
                  <div className="bg-white border border-taupe/20 p-8 rounded-card text-sm leading-relaxed text-sapphire/90">
                    {disease.diagnosis}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-primary font-heading">Management & Treatment Guidelines</h2>
                  <div className="bg-white border border-taupe/20 p-8 rounded-card text-sm leading-relaxed text-sapphire/90">
                    {disease.treatments}
                  </div>
                </div>
              </div>
            )}

            {/* RESEARCH & CLINICAL TRIALS TAB */}
            {activeTab === "research-trials" && (
              <div className="space-y-12">
                {/* Clinical Trials */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-primary font-heading">Associated Clinical Trials</h2>
                  {trials.length > 0 ? (
                    <div className="space-y-4">
                      {trials.map((trial) => (
                        <div key={trial.id} className="bg-white border border-taupe/20 p-6 rounded-card shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-champagne text-primary px-3 py-1 rounded-full">
                              {trial.phase}
                            </span>
                            <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                              {trial.status}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-primary">{trial.name}</h3>
                          <p className="text-xs text-sapphire/80 leading-relaxed">{trial.description}</p>
                          {trial.latestFindings && (
                            <div className="p-3.5 bg-background rounded-[12px] border border-taupe/15">
                              <span className="text-[9px] uppercase font-bold text-sapphire/50 block mb-1">Latest Findings</span>
                              <p className="text-xs text-primary leading-relaxed">{trial.latestFindings}</p>
                            </div>
                          )}
                          <div className="pt-3 flex items-center justify-between text-[11px] text-sapphire/60">
                            <span>Sponsor: {trial.organization} &bull; ID: {trial.identifier}</span>
                            <a
                              href={trial.officialLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary font-bold hover:underline flex items-center gap-0.5"
                            >
                              Official Link
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-sapphire/60 italic">No registered clinical trials listed for this disease.</p>
                  )}
                </div>

                {/* Research updates */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-primary font-heading">Scientific Research Publications</h2>
                  {research.length > 0 ? (
                    <div className="space-y-6">
                      {research.map((paper) => (
                        <div key={paper.id} className="bg-white border border-taupe/20 p-6 rounded-card shadow-sm space-y-4">
                          <h3 className="text-base font-bold text-primary leading-snug">{paper.title}</h3>
                          
                          {/* Simplified vs detail */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-taupe/15">
                            <div className="space-y-2">
                              <span className="text-[9px] uppercase font-extrabold text-sapphire tracking-wider block">Simplified Summary</span>
                              <p className="text-xs text-sapphire/90 leading-relaxed font-light">{paper.summary}</p>
                            </div>
                            <div className="space-y-2 border-t md:border-t-0 md:border-l border-taupe/20 pt-4 md:pt-0 md:pl-6">
                              <span className="text-[9px] uppercase font-extrabold text-sapphire tracking-wider block">Abstract Details</span>
                              <p className="text-xs text-sapphire/75 leading-relaxed italic">{paper.scientificDetail}</p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-taupe/15 flex items-center justify-between text-[11px] text-sapphire/50">
                            <span>Author: {paper.author} &bull; Journal: {paper.journal}</span>
                            {paper.link && (
                              <a
                                href={paper.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary font-bold hover:underline flex items-center gap-0.5"
                              >
                                View Paper
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-sapphire/60 italic">No publications indexed yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* SPECIALISTS & COMMUNITY TAB */}
            {activeTab === "specialists-community" && (
              <div className="space-y-12">
                {/* Specialists */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-primary font-heading">Recognized Clinical Specialists</h2>
                  {specialists.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {specialists.map((spec) => (
                        <div key={spec.id} className="bg-white border border-taupe/20 p-6 rounded-card shadow-sm flex gap-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={spec.image}
                            alt={spec.name}
                            className="w-16 h-16 rounded-full object-cover filter saturate-75"
                          />
                          <div className="space-y-1.5 text-xs text-sapphire/80">
                            <h3 className="text-sm font-bold text-primary">{spec.name}</h3>
                            <p className="font-semibold text-sapphire">{spec.profession}</p>
                            <p className="font-medium text-sapphire/70">{spec.specialization}</p>
                            <p className="text-[10px] text-sapphire/60">{spec.organization} &bull; {spec.location}</p>
                            <div className="pt-2 flex gap-3 text-[10px] font-semibold">
                              {spec.email && <a href={`mailto:${spec.email}`} className="text-primary hover:underline">Email</a>}
                              {spec.phone && <a href={`tel:${spec.phone}`} className="text-primary hover:underline">Phone</a>}
                              {spec.website && (
                                <a href={spec.website} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-0.5">
                                  Profile
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-sapphire/60 italic">No clinical specialists listed for this disorder.</p>
                  )}
                </div>

                {/* Communities */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-primary font-heading">Support Networks & Communities</h2>
                  {communities.length > 0 ? (
                    <div className="space-y-4">
                      {communities.map((comm) => (
                        <div key={comm.id} className="bg-white border border-taupe/20 p-6 rounded-card shadow-sm flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h3 className="text-base font-bold text-primary">{comm.name}</h3>
                              <span className="text-[10px] uppercase font-bold text-sapphire/60 bg-background px-2.5 py-0.5 rounded-full">
                                {comm.country}
                              </span>
                            </div>
                            <p className="text-xs text-sapphire/80 leading-relaxed">{comm.description}</p>
                          </div>
                          <div className="pt-4 border-t border-taupe/20 mt-4 flex gap-4 text-xs font-semibold text-primary">
                            {comm.website && (
                              <a href={comm.website} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5">
                                Visit Website
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {comm.facebook && (
                              <a href={comm.facebook} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5">
                                Facebook Group
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-sapphire/60 italic">No community support systems listed for this disease.</p>
                  )}
                </div>
              </div>
            )}

            {/* FAQs Accordion */}
            {faqs.length > 0 && (
              <div className="space-y-6 pt-10 border-t border-taupe/20">
                <h2 className="text-xl font-bold text-primary font-heading">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-white border border-taupe/20 p-6 rounded-[18px]">
                      <h4 className="text-sm font-bold text-primary mb-2">{faq.question}</h4>
                      <p className="text-xs text-sapphire/85 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reference section */}
            {disease.references && (
              <div className="pt-8 border-t border-taupe/20 text-[10px] text-sapphire/65 leading-relaxed whitespace-pre-line bg-white/50 p-6 rounded-[14px] border border-taupe/15">
                <span className="font-bold block uppercase tracking-wider text-sapphire/75 mb-2">Scientific Citations & Literature References</span>
                {disease.references}
              </div>
            )}
          </div>

          {/* Sidebar (Print-friendly detail pane, related items, patient warnings) */}
          <div className="lg:col-span-4 space-y-8 print:hidden">
            {/* Quick specifications */}
            <div className="bg-white border border-taupe/25 p-6 rounded-card space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary border-b border-taupe/20 pb-3">Dossier Facts</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-sapphire/50 block">Name</span>
                  <span className="font-bold text-primary">{disease.name}</span>
                </div>
                <div>
                  <span className="text-sapphire/50 block">Scientific Class</span>
                  <span className="font-bold text-primary">{disease.category} Disorder</span>
                </div>
                <div>
                  <span className="text-sapphire/50 block">Available Trials</span>
                  <span className="font-bold text-primary">{trials.length} Registered Studies</span>
                </div>
                <div>
                  <span className="text-sapphire/50 block">Specialists Listed</span>
                  <span className="font-bold text-primary">{specialists.length} Experts</span>
                </div>
              </div>
            </div>

            {/* Related Diseases */}
            {related.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary">Related Disorders</h3>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/diseases/${r.slug}`}
                      className="block bg-white p-4.5 rounded-[18px] border border-taupe/20 hover:border-sapphire/50 shadow-sm transition-all"
                    >
                      <h4 className="text-xs font-bold text-primary mb-1 flex items-center justify-between">
                        {r.name}
                        <ChevronRight className="w-3 h-3 text-taupe" />
                      </h4>
                      <p className="text-[10px] text-sapphire/70 line-clamp-2 leading-relaxed">
                        {r.overview}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
