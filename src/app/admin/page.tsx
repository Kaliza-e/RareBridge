"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Dna,
  Clock,
  Sparkles,
  Search,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  FileText,
  Activity,
  Heart,
  Users,
  Stethoscope,
  ChevronRight,
  ExternalLink,
  Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getDiseases,
  getClinicalTrials,
  getSpecialists,
  getCommunities,
  getResearch,
  createDiseaseLocal,
  deleteDiseaseLocal,
  createTrialLocal,
  deleteTrialLocal,
  createSpecialistLocal,
  deleteSpecialistLocal,
  createCommunityLocal,
  deleteCommunityLocal,
  createResearchLocal,
  deleteResearchLocal,
  DiseaseStatic,
  ClinicalTrialStatic,
  SpecialistStatic,
  CommunityStatic,
  ResearchStatic
} from "@/lib/data";

type AdminTab = "analytics" | "diseases" | "trials" | "specialists" | "research" | "communities";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");
  
  // Data States
  const [diseases, setDiseases] = useState<DiseaseStatic[]>([]);
  const [trials, setTrials] = useState<ClinicalTrialStatic[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistStatic[]>([]);
  const [communities, setCommunities] = useState<CommunityStatic[]>([]);
  const [researchList, setResearchList] = useState<ResearchStatic[]>([]);

  // Form inputs
  const [diseaseForm, setDiseaseForm] = useState({
    name: "",
    category: "Genetic",
    overview: "",
    simpleDescription: "",
    medicalDescription: "",
    causes: "",
    symptoms: "",
    types: "",
    diagnosis: "",
    treatments: "",
    images: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60",
    references: ""
  });

  const [trialForm, setTrialForm] = useState({
    name: "",
    identifier: "",
    organization: "",
    phase: "Phase 1",
    status: "Recruiting",
    description: "",
    officialLink: "",
    diseaseId: ""
  });

  const [specialistForm, setSpecialistForm] = useState({
    name: "",
    profession: "",
    specialization: "",
    organization: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    publications: "",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
    diseaseId: ""
  });

  const [communityForm, setCommunityForm] = useState({
    name: "",
    website: "",
    facebook: "",
    description: "",
    country: "United States",
    diseaseId: ""
  });

  const [researchForm, setResearchForm] = useState({
    title: "",
    summary: "",
    scientificDetail: "",
    publishedAt: "",
    journal: "",
    author: "",
    link: "",
    diseaseId: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/admin");
    }
  }, [status, router]);

  const loadAllData = () => {
    setDiseases(getDiseases());
    setTrials(getClinicalTrials());
    setSpecialists(getSpecialists());
    setCommunities(getCommunities());
    setResearchList(getResearch());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-sapphire">Validating administrative authorization...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Create handlers
  const handleAddDisease = (e: React.FormEvent) => {
    e.preventDefault();
    if (diseaseForm.name) {
      createDiseaseLocal(diseaseForm);
      setDiseaseForm({
        name: "",
        category: "Genetic",
        overview: "",
        simpleDescription: "",
        medicalDescription: "",
        causes: "",
        symptoms: "",
        types: "",
        diagnosis: "",
        treatments: "",
        images: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60",
        references: ""
      });
      loadAllData();
    }
  };

  const handleAddTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (trialForm.name && trialForm.diseaseId) {
      createTrialLocal(trialForm);
      setTrialForm({
        name: "",
        identifier: "",
        organization: "",
        phase: "Phase 1",
        status: "Recruiting",
        description: "",
        officialLink: "",
        diseaseId: ""
      });
      loadAllData();
    }
  };

  const handleAddSpecialist = (e: React.FormEvent) => {
    e.preventDefault();
    if (specialistForm.name && specialistForm.diseaseId) {
      createSpecialistLocal(specialistForm);
      setSpecialistForm({
        name: "",
        profession: "",
        specialization: "",
        organization: "",
        location: "",
        email: "",
        phone: "",
        website: "",
        publications: "",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
        diseaseId: ""
      });
      loadAllData();
    }
  };

  const handleAddCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (communityForm.name && communityForm.diseaseId) {
      createCommunityLocal(communityForm);
      setCommunityForm({
        name: "",
        website: "",
        facebook: "",
        description: "",
        country: "United States",
        diseaseId: ""
      });
      loadAllData();
    }
  };

  const handleAddResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (researchForm.title && researchForm.diseaseId) {
      createResearchLocal({
        ...researchForm,
        publishedAt: researchForm.publishedAt ? researchForm.publishedAt : undefined
      });
      setResearchForm({
        title: "",
        summary: "",
        scientificDetail: "",
        publishedAt: "",
        journal: "",
        author: "",
        link: "",
        diseaseId: ""
      });
      loadAllData();
    }
  };

  // Delete handlers
  const handleDeleteDisease = (id: string) => {
    deleteDiseaseLocal(id);
    loadAllData();
  };

  const handleDeleteTrial = (id: string) => {
    deleteTrialLocal(id);
    loadAllData();
  };

  const handleDeleteSpecialist = (id: string) => {
    deleteSpecialistLocal(id);
    loadAllData();
  };

  const handleDeleteCommunity = (id: string) => {
    deleteCommunityLocal(id);
    loadAllData();
  };

  const handleDeleteResearch = (id: string) => {
    deleteResearchLocal(id);
    loadAllData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 w-full">
        {/* Banner */}
        <div className="bg-white border border-taupe/20 p-8 rounded-card shadow-premium mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-700 border border-red-200">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-red-700 font-bold">
                  Administrative Control Panel
                </span>
                <h1 className="text-2xl md:text-3xl font-bold font-heading text-primary leading-tight">
                  Directory Management Dashboard
                </h1>
                <p className="text-xs text-sapphire/85">
                  Sandbox Authority Level: System Root Administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Menu */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sapphire/60 block px-4 mb-2">
              System Modules
            </span>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === "analytics" ? "bg-primary text-white shadow-sm" : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <Activity className="w-4 h-4" />
              System Analytics
            </button>

            <button
              onClick={() => setActiveTab("diseases")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === "diseases" ? "bg-primary text-white shadow-sm" : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <Dna className="w-4 h-4" />
              Diseases CRUD
            </button>

            <button
              onClick={() => setActiveTab("trials")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === "trials" ? "bg-primary text-white shadow-sm" : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Clinical Trials CRUD
            </button>

            <button
              onClick={() => setActiveTab("specialists")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === "specialists" ? "bg-primary text-white shadow-sm" : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Specialists CRUD
            </button>

            <button
              onClick={() => setActiveTab("research")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === "research" ? "bg-primary text-white shadow-sm" : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <FileText className="w-4 h-4" />
              Research CRUD
            </button>

            <button
              onClick={() => setActiveTab("communities")}
              className={`w-full text-left px-4 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === "communities" ? "bg-primary text-white shadow-sm" : "text-sapphire hover:bg-taupe/15"
              }`}
            >
              <Users className="w-4 h-4" />
              Communities CRUD
            </button>
          </div>

          {/* Main Area */}
          <div className="lg:col-span-9 bg-white border border-taupe/20 p-8 rounded-card shadow-premium min-h-[500px]">
            
            {/* ANALYTICS SECTION */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  System Metrics & Activity Logs
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="p-5 bg-background rounded-card border border-taupe/25 space-y-1">
                    <span className="text-[10px] text-sapphire/50 block font-bold uppercase">Diseases</span>
                    <span className="text-2xl font-bold text-primary">{diseases.length} Records</span>
                  </div>
                  <div className="p-5 bg-background rounded-card border border-taupe/25 space-y-1">
                    <span className="text-[10px] text-sapphire/50 block font-bold uppercase">Clinical Trials</span>
                    <span className="text-2xl font-bold text-primary">{trials.length} Active</span>
                  </div>
                  <div className="p-5 bg-background rounded-card border border-taupe/25 space-y-1">
                    <span className="text-[10px] text-sapphire/50 block font-bold uppercase">Specialists</span>
                    <span className="text-2xl font-bold text-primary">{specialists.length} Indexed</span>
                  </div>
                  <div className="p-5 bg-background rounded-card border border-taupe/25 space-y-1">
                    <span className="text-[10px] text-sapphire/50 block font-bold uppercase">Communities</span>
                    <span className="text-2xl font-bold text-primary">{communities.length} Groups</span>
                  </div>
                </div>

                {/* Sandbox Info */}
                <div className="p-5 bg-amber-50 border border-amber-200 text-xs text-amber-800 rounded-[14px] leading-relaxed flex gap-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0" />
                  <p>
                    <strong>Development Sandbox Info:</strong> All CRUD updates on this administrative dashboard modify local client-side states in memory. You can add new diseases, link specialist records, and delete clinical trial listings, and see updates instantly reflected in other tabs and search directories. Updates will reset upon refreshing the browser.
                  </p>
                </div>
              </div>
            )}

            {/* DISEASES CRUD */}
            {activeTab === "diseases" && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Disease Records</h3>

                {/* Listing */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 no-scrollbar">
                  {diseases.map((d) => (
                    <div key={d.id} className="p-4 bg-background border border-taupe/20 rounded-[16px] flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-primary block text-sm">{d.name}</span>
                        <span className="text-sapphire/60">Category: {d.category} &bull; Slug: {d.slug}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteDisease(d.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleAddDisease} className="space-y-5 border-t border-taupe/15 pt-6 text-xs text-primary">
                  <h4 className="text-sm font-bold font-heading">Add New Disease</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Disease Name</label>
                      <input
                        type="text"
                        required
                        value={diseaseForm.name}
                        onChange={(e) => setDiseaseForm({ ...diseaseForm, name: e.target.value })}
                        placeholder="e.g. Fibrodysplasia Ossificans Progressiva"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Category</label>
                      <select
                        value={diseaseForm.category}
                        onChange={(e) => setDiseaseForm({ ...diseaseForm, category: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      >
                        <option value="Genetic">Genetic</option>
                        <option value="Neurological">Neurological</option>
                        <option value="Metabolic">Metabolic</option>
                        <option value="Immunological">Immunological</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-sapphire/75">Layperson Overview</label>
                    <textarea
                      required
                      rows={2}
                      value={diseaseForm.overview}
                      onChange={(e) => setDiseaseForm({ ...diseaseForm, overview: e.target.value })}
                      placeholder="Brief layperson overview..."
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-sapphire/75">Layperson Explanation</label>
                    <textarea
                      required
                      rows={3}
                      value={diseaseForm.simpleDescription}
                      onChange={(e) => setDiseaseForm({ ...diseaseForm, simpleDescription: e.target.value })}
                      placeholder="Full simple translation..."
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-sapphire/75">Clinical Description</label>
                    <textarea
                      required
                      rows={3}
                      value={diseaseForm.medicalDescription}
                      onChange={(e) => setDiseaseForm({ ...diseaseForm, medicalDescription: e.target.value })}
                      placeholder="Scientific abstract definition..."
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Causes</label>
                      <textarea
                        required
                        rows={2}
                        value={diseaseForm.causes}
                        onChange={(e) => setDiseaseForm({ ...diseaseForm, causes: e.target.value })}
                        placeholder="Genetic mechanisms..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Symptoms</label>
                      <textarea
                        required
                        rows={2}
                        value={diseaseForm.symptoms}
                        onChange={(e) => setDiseaseForm({ ...diseaseForm, symptoms: e.target.value })}
                        placeholder="Primary symptoms list..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Types</label>
                      <input
                        type="text"
                        required
                        value={diseaseForm.types}
                        onChange={(e) => setDiseaseForm({ ...diseaseForm, types: e.target.value })}
                        placeholder="Known variants..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Diagnosis</label>
                      <input
                        type="text"
                        required
                        value={diseaseForm.diagnosis}
                        onChange={(e) => setDiseaseForm({ ...diseaseForm, diagnosis: e.target.value })}
                        placeholder="Diagnostics criteria..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Treatments</label>
                      <input
                        type="text"
                        required
                        value={diseaseForm.treatments}
                        onChange={(e) => setDiseaseForm({ ...diseaseForm, treatments: e.target.value })}
                        placeholder="Therapy types..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-full flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Register Disease Record
                  </button>
                </form>
              </div>
            )}

            {/* CLINICAL TRIALS CRUD */}
            {activeTab === "trials" && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Clinical Trial Studies</h3>

                {/* Listing */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 no-scrollbar">
                  {trials.map((t) => (
                    <div key={t.id} className="p-4 bg-background border border-taupe/20 rounded-[16px] flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-primary block text-sm">{t.name}</span>
                        <span className="text-sapphire/60">ID: {t.identifier} &bull; Phase: {t.phase} &bull; Status: {t.status}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteTrial(t.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleAddTrial} className="space-y-5 border-t border-taupe/15 pt-6 text-xs text-primary">
                  <h4 className="text-sm font-bold font-heading">Link New Clinical Trial</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Study Name</label>
                      <input
                        type="text"
                        required
                        value={trialForm.name}
                        onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                        placeholder="Trial title..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">NCT Identifier</label>
                      <input
                        type="text"
                        required
                        value={trialForm.identifier}
                        onChange={(e) => setTrialForm({ ...trialForm, identifier: e.target.value })}
                        placeholder="NCT01234567"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Sponsor</label>
                      <input
                        type="text"
                        required
                        value={trialForm.organization}
                        onChange={(e) => setTrialForm({ ...trialForm, organization: e.target.value })}
                        placeholder="Roche, Vertex..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Trial Phase</label>
                      <select
                        value={trialForm.phase}
                        onChange={(e) => setTrialForm({ ...trialForm, phase: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      >
                        <option value="Phase 1">Phase 1</option>
                        <option value="Phase 2">Phase 2</option>
                        <option value="Phase 3">Phase 3</option>
                        <option value="Phase 4">Phase 4</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Recruitment Status</label>
                      <select
                        value={trialForm.status}
                        onChange={(e) => setTrialForm({ ...trialForm, status: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      >
                        <option value="Recruiting">Recruiting</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Terminated">Terminated</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Disease Association</label>
                      <select
                        value={trialForm.diseaseId}
                        onChange={(e) => setTrialForm({ ...trialForm, diseaseId: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                        required
                      >
                        <option value="">Select Disease...</option>
                        {diseases.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Official Study URL</label>
                      <input
                        type="url"
                        required
                        value={trialForm.officialLink}
                        onChange={(e) => setTrialForm({ ...trialForm, officialLink: e.target.value })}
                        placeholder="https://clinicaltrials.gov/..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-sapphire/75">Study Description</label>
                    <textarea
                      required
                      rows={3}
                      value={trialForm.description}
                      onChange={(e) => setTrialForm({ ...trialForm, description: e.target.value })}
                      placeholder="Brief research description..."
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-full flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Link Study Record
                  </button>
                </form>
              </div>
            )}

            {/* SPECIALISTS CRUD */}
            {activeTab === "specialists" && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Specialist Database</h3>

                {/* Listing */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 no-scrollbar">
                  {specialists.map((s) => (
                    <div key={s.id} className="p-4 bg-background border border-taupe/20 rounded-[16px] flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-primary block text-sm">{s.name}</span>
                        <span className="text-sapphire/60">{s.profession} &bull; {s.organization} &bull; {s.location}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteSpecialist(s.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleAddSpecialist} className="space-y-5 border-t border-taupe/15 pt-6 text-xs text-primary">
                  <h4 className="text-sm font-bold font-heading">Register Specialist Clinician</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Doctor Full Name</label>
                      <input
                        type="text"
                        required
                        value={specialistForm.name}
                        onChange={(e) => setSpecialistForm({ ...specialistForm, name: e.target.value })}
                        placeholder="Dr. John Watson"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Profession / Title</label>
                      <input
                        type="text"
                        required
                        value={specialistForm.profession}
                        onChange={(e) => setSpecialistForm({ ...specialistForm, profession: e.target.value })}
                        placeholder="Neuromuscular Specialist"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Specialization Focus</label>
                      <input
                        type="text"
                        required
                        value={specialistForm.specialization}
                        onChange={(e) => setSpecialistForm({ ...specialistForm, specialization: e.target.value })}
                        placeholder="Genetic modifiers..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Associated Disease</label>
                      <select
                        value={specialistForm.diseaseId}
                        onChange={(e) => setSpecialistForm({ ...specialistForm, diseaseId: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                        required
                      >
                        <option value="">Select Disease...</option>
                        {diseases.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Hospital/Institution</label>
                      <input
                        type="text"
                        required
                        value={specialistForm.organization}
                        onChange={(e) => setSpecialistForm({ ...specialistForm, organization: e.target.value })}
                        placeholder="Mayo Clinic..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Location Address</label>
                      <input
                        type="text"
                        required
                        value={specialistForm.location}
                        onChange={(e) => setSpecialistForm({ ...specialistForm, location: e.target.value })}
                        placeholder="Rochester, MN, USA"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-full flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Register Specialist Profile
                  </button>
                </form>
              </div>
            )}

            {/* RESEARCH CRUD */}
            {activeTab === "research" && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Research Updates</h3>

                {/* Listing */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 no-scrollbar">
                  {researchList.map((r) => (
                    <div key={r.id} className="p-4 bg-background border border-taupe/20 rounded-[16px] flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-primary block text-sm">{r.title}</span>
                        <span className="text-sapphire/60">Journal: {r.journal} &bull; Author: {r.author}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteResearch(r.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleAddResearch} className="space-y-5 border-t border-taupe/15 pt-6 text-xs text-primary">
                  <h4 className="text-sm font-bold font-heading">Register Scientific Paper</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Paper Title</label>
                      <input
                        type="text"
                        required
                        value={researchForm.title}
                        onChange={(e) => setResearchForm({ ...researchForm, title: e.target.value })}
                        placeholder="Scientific paper name..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Associated Disease</label>
                      <select
                        value={researchForm.diseaseId}
                        onChange={(e) => setResearchForm({ ...researchForm, diseaseId: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                        required
                      >
                        <option value="">Select Disease...</option>
                        {diseases.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Journal Publisher</label>
                      <input
                        type="text"
                        required
                        value={researchForm.journal}
                        onChange={(e) => setResearchForm({ ...researchForm, journal: e.target.value })}
                        placeholder="Nature, JAMA..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Principal Author</label>
                      <input
                        type="text"
                        required
                        value={researchForm.author}
                        onChange={(e) => setResearchForm({ ...researchForm, author: e.target.value })}
                        placeholder="Dr. Jane Doe..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Published Date</label>
                      <input
                        type="date"
                        value={researchForm.publishedAt}
                        onChange={(e) => setResearchForm({ ...researchForm, publishedAt: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-sapphire/75">Family-Friendly Summary</label>
                    <textarea
                      required
                      rows={2}
                      value={researchForm.summary}
                      onChange={(e) => setResearchForm({ ...researchForm, summary: e.target.value })}
                      placeholder="Plain English summary..."
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-sapphire/75">Full Scientific Abstract</label>
                    <textarea
                      required
                      rows={3}
                      value={researchForm.scientificDetail}
                      onChange={(e) => setResearchForm({ ...researchForm, scientificDetail: e.target.value })}
                      placeholder="Complex clinical summary details..."
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-full flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Register Paper Record
                  </button>
                </form>
              </div>
            )}

            {/* COMMUNITIES CRUD */}
            {activeTab === "communities" && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold font-heading text-primary pb-3 border-b border-taupe/20">Support Communities</h3>

                {/* Listing */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 no-scrollbar">
                  {communities.map((c) => (
                    <div key={c.id} className="p-4 bg-background border border-taupe/20 rounded-[16px] flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-primary block text-sm">{c.name}</span>
                        <span className="text-sapphire/60">Region: {c.country}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteCommunity(c.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleAddCommunity} className="space-y-5 border-t border-taupe/15 pt-6 text-xs text-primary">
                  <h4 className="text-sm font-bold font-heading">Register Support Network</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Community / Group Name</label>
                      <input
                        type="text"
                        required
                        value={communityForm.name}
                        onChange={(e) => setCommunityForm({ ...communityForm, name: e.target.value })}
                        placeholder="e.g. ALS Support Network"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Associated Disease</label>
                      <select
                        value={communityForm.diseaseId}
                        onChange={(e) => setCommunityForm({ ...communityForm, diseaseId: e.target.value })}
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                        required
                      >
                        <option value="">Select Disease...</option>
                        {diseases.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Website URL</label>
                      <input
                        type="url"
                        value={communityForm.website}
                        onChange={(e) => setCommunityForm({ ...communityForm, website: e.target.value })}
                        placeholder="https://foundation.org"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Facebook Page URL</label>
                      <input
                        type="url"
                        value={communityForm.facebook}
                        onChange={(e) => setCommunityForm({ ...communityForm, facebook: e.target.value })}
                        placeholder="https://facebook.com/..."
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-sapphire/75">Country Region</label>
                      <input
                        type="text"
                        required
                        value={communityForm.country}
                        onChange={(e) => setCommunityForm({ ...communityForm, country: e.target.value })}
                        placeholder="United States"
                        className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-sapphire/75">Group Description</label>
                    <textarea
                      required
                      rows={3}
                      value={communityForm.description}
                      onChange={(e) => setCommunityForm({ ...communityForm, description: e.target.value })}
                      placeholder="Brief support focus details..."
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[12px] p-3 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-full flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Register Group Record
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
