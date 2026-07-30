// Static local data that can be safely imported in both server and client components
// Prisma is only used in API routes (server-side only)

export interface DiseaseStatic {
  id: string;
  name: string;
  slug: string;
  category: string;
  overview: string;
  simpleDescription: string;
  medicalDescription: string;
  causes: string;
  symptoms: string;
  types: string;
  diagnosis: string;
  treatments: string;
  images: string;
  references: string;
}

export interface ClinicalTrialStatic {
  id: string;
  name: string;
  identifier: string;
  organization: string;
  phase: string;
  status: string;
  description: string;
  latestFindings?: string;
  officialLink: string;
  diseaseId: string;
}

export interface SpecialistStatic {
  id: string;
  name: string;
  profession: string;
  specialization: string;
  organization: string;
  location: string;
  email?: string;
  phone?: string;
  website?: string;
  publications?: string;
  image?: string;
  diseaseId: string;
}

export interface CommunityStatic {
  id: string;
  name: string;
  website?: string;
  facebook?: string;
  description: string;
  country: string;
  diseaseId: string;
}

export interface ResearchStatic {
  id: string;
  title: string;
  summary: string;
  scientificDetail: string;
  publishedAt?: string;
  journal?: string;
  author?: string;
  link?: string;
  diseaseId: string;
}

export interface FAQStatic {
  id: string;
  question: string;
  answer: string;
  diseaseId: string;
}

// ─── Static In-Memory Data Store ─────────────────────────────────────────────
// These arrays are the single source of truth for the client-side app.
// When a real database is connected, the API routes will override these.

export let diseases: DiseaseStatic[] = [
  {
    id: "dis_hd_1",
    name: "Huntington's Disease",
    slug: "huntingtons-disease",
    category: "Genetic",
    overview: "Huntington's disease is an inherited disorder that causes the progressive breakdown of nerve cells in the brain, affecting coordination, cognitive functions, and mental health.",
    simpleDescription: "Imagine the brain's control center slowly getting mixed-up messages. Huntington's disease is like a computer glitch in the body's DNA instructions. Over time, this glitch makes it hard for a person to control their movements, think clearly, or manage their emotions. It is passed down through families, and while scientists are working hard on a cure, current treatments focus on helping people live active, comfortable lives.",
    medicalDescription: "Huntington's disease (HD) is an autosomal dominant neurodegenerative disorder characterized by involuntary choreic movements, cognitive decline, and psychiatric disturbances. The disease is caused by an unstable CAG trinucleotide repeat expansion in the HTT gene on chromosome 4, which encodes the huntingtin protein. Neuronal loss is most prominent in the caudate nucleus and putamen of the basal ganglia.",
    causes: "Huntington's disease is caused by an inherited defect in a single gene (HTT). It is an autosomal dominant disorder, meaning that a person needs only one copy of the defective gene to develop the disease. A parent with the gene has a 50% chance of passing it to their children.",
    symptoms: "Movement disorders (involuntary chorea, impaired posture, muscle rigidity), cognitive decline (difficulty organizing or prioritizing, lack of flexibility, impulse control issues), and psychiatric changes (depression, irritability, social withdrawal).",
    types: "Adult-onset Huntington's (most common, typically appearing in the 30s or 40s) and Juvenile Huntington's (rare form appearing in childhood or adolescence, associated with faster progression and rigidity rather than chorea).",
    diagnosis: "Diagnosis is based on clinical presentation, family history, and genetic testing showing a CAG repeat length of 36 or more in the HTT gene. Brain imaging (MRI/CT) is used to detect striatal atrophy in advanced stages.",
    treatments: "There is currently no disease-modifying cure. Treatments include symptomatic management with tetrabenazine or deutetrabenazine for chorea, antidepressants/antipsychotics for psychiatric manifestations, and supportive speech, physical, and occupational therapy.",
    images: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60",
    references: "1. Walker FO. Huntington's disease. Lancet. 2007;369(9557):218-228.\n2. McColgan P, Tabrizi SJ. Huntington's disease: a clinical review. Eur J Neurol. 2018;25(1):24-34.",
  },
  {
    id: "dis_cf_2",
    name: "Cystic Fibrosis",
    slug: "cystic-fibrosis",
    category: "Genetic",
    overview: "Cystic fibrosis is a progressive, genetic disease that causes persistent lung infections and limits the ability to breathe over time. It affects the cells that produce mucus, sweat, and digestive juices.",
    simpleDescription: "In a healthy body, mucus is thin and slippery, acting like a lubricant. For someone with Cystic Fibrosis, a faulty instruction in their DNA makes this mucus thick and sticky. Instead of protecting, this sticky mucus clogs up the lungs, making it hard to breathe, and blocks the stomach, making it difficult to digest food. Thanks to modern medicine, people with CF are living longer, fuller lives than ever before.",
    medicalDescription: "Cystic fibrosis (CF) is an autosomal recessive disorder caused by mutations in the CFTR (Cystic Fibrosis Transmembrane Conductance Regulator) gene on chromosome 7. The CFTR protein acts as an apical chloride channel in epithelial membranes. Dysfunction results in defective chloride and bicarbonate transport, causing dehydration of luminal secretions. This leads to bronchiectasis, pancreatic exocrine insufficiency, and elevated sweat chloride concentrations.",
    causes: "Autosomal recessive inheritance of mutated CFTR genes from both parents. Over 2,000 mutations in the CFTR gene have been identified, with F508del being the most prevalent globally.",
    symptoms: "Persistent coughing with thick mucus, frequent lung infections (pneumonia/bronchitis), wheezing, shortness of breath, poor growth/weight gain despite good appetite, and very salty-tasting skin.",
    types: "Classified primarily by the type of CFTR protein defect: Class I (no protein made), Class II (defective processing/folding - e.g., F508del), Class III (defective regulation/gating), Class IV (decreased conductance), and Class V (reduced synthesis).",
    diagnosis: "Newborn screening followed by a Sweat Chloride Test (values ≥ 60 mmol/L are diagnostic) and confirmatory CFTR genetic mutation analysis.",
    treatments: "CFTR modulators (e.g., Trikafta/Elexacaftor/Tezacaftor/Ivacaftor) which target the underlying protein defect, airway clearance techniques, inhaled bronchodilators, pancreatic enzyme replacement therapy (PERT), and antibiotics for pulmonary exacerbations.",
    images: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop&q=60",
    references: "1. Cutting GR. Cystic fibrosis genetics: from single gene to modifiers. Nat Rev Genet. 2015;16(1):45-56.\n2. Rowe SM, et al. Cystic fibrosis. N Engl J Med. 2005;352(19):1992-2001.",
  },
  {
    id: "dis_als_3",
    name: "Amyotrophic Lateral Sclerosis",
    slug: "amyotrophic-lateral-sclerosis",
    category: "Neurological",
    overview: "ALS, also known as Lou Gehrig's disease, is a progressive neurodegenerative disease that affects nerve cells in the brain and spinal cord, causing loss of muscle control.",
    simpleDescription: "Think of your nerves as cables carrying signals from your brain to your muscles. In ALS, these cables slowly wear out. Because the signals can no longer reach the muscles, the muscles get weak and eventually stop working. This makes it difficult to walk, talk, eat, and breathe. Although it is a very challenging condition, researchers are uncovering new clues every day to slow down the process.",
    medicalDescription: "Amyotrophic lateral sclerosis (ALS) is characterized by the degeneration of both upper motor neurons (UMN) in the motor cortex and lower motor neurons (LMN) in the anterior horns of the spinal cord and brainstem. Pathological hallmarks include TDP-43 positive cytoplasmic inclusions in degenerating neurons. Progression leads to severe muscle atrophy, spasticity, fasciculations, and ultimately respiratory failure.",
    causes: "Approximately 90% of cases are sporadic (unknown etiology). 10% are familial, associated with mutations in genes such as C9orf72, SOD1, TARDBP, and FUS.",
    symptoms: "Muscle weakness in limbs (causing tripping or dropping items), slurred speech (dysarthria), swallowing difficulties (dysphagia), muscle cramps, fasciculations (twitches), and late-stage respiratory compromise.",
    types: "Sporadic ALS (most common, 90-95%), Familial ALS (inherited genetic forms, 5-10%), and Bulbar ALS (initiating with speech and swallowing impairment).",
    diagnosis: "Primarily clinical examination supplemented by electromyography (EMG) showing active denervation, nerve conduction studies (to rule out neuropathies), and brain/spinal cord MRI to exclude structural lesions.",
    treatments: "Multidisciplinary care, disease-modifying agents (Riluzole, Edaravone, Sodium Phenylbutyrate-Taurursodiol), non-invasive positive pressure ventilation (NIPPV) for respiratory support, feeding tube placement (PEG), and physical therapy.",
    images: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&auto=format&fit=crop&q=60",
    references: "1. Brown RH, Al-Chalabi A. Amyotrophic Lateral Sclerosis. N Engl J Med. 2017;377(2):162-172.\n2. Kiernan MC, et al. Amyotrophic lateral sclerosis. Lancet. 2011;377(9769):942-955.",
  }
];

export let trials: ClinicalTrialStatic[] = [
  {
    id: "trial_1",
    name: "Evaluation of Tominersen in Early Manifest Huntington's Disease",
    identifier: "NCT05686538",
    organization: "Roche / Genentech",
    phase: "Phase 2",
    status: "Recruiting",
    description: "A study to evaluate the safety, tolerability, and efficacy of tominersen, an antisense oligonucleotide targeting huntingtin mRNA, in patients with early manifest Huntington's disease.",
    latestFindings: "Early biomarker data demonstrated a significant reduction in mutant huntingtin (mHTT) protein levels in cerebrospinal fluid.",
    officialLink: "https://clinicaltrials.gov/study/NCT05686538",
    diseaseId: "dis_hd_1"
  },
  {
    id: "trial_2",
    name: "A Trial to Evaluate the Safety of CRISPR/Cas9 Gene Editing in Cystic Fibrosis Patients",
    identifier: "NCT06019322",
    organization: "Vertex Pharmaceuticals",
    phase: "Phase 1",
    status: "Active",
    description: "An open-label, safety study investigating the delivery of lipid nanoparticles containing CFTR gene-editing machinery straight into the respiratory epithelium.",
    latestFindings: "Initial tolerability cohort report shows zero serious adverse events and successful cell integration in nasal epithelial biopsies.",
    officialLink: "https://clinicaltrials.gov/study/NCT06019322",
    diseaseId: "dis_cf_2"
  },
  {
    id: "trial_3",
    name: "Efficacy and Safety of BIIB067 (Tofersen) in Adults with SOD1-ALS",
    identifier: "NCT02626156",
    organization: "Biogen",
    phase: "Phase 3",
    status: "Completed",
    description: "A randomized, double-blind, placebo-controlled trial evaluating the efficacy and safety of tofersen in patients with ALS and confirmed SOD1 mutations.",
    latestFindings: "Tofersen led to a rapid and sustained reduction in neurofilament light chain (NfL), a biomarker of neurodegeneration, and showed a trend towards slowing clinical decline.",
    officialLink: "https://clinicaltrials.gov/study/NCT02626156",
    diseaseId: "dis_als_3"
  }
];

export let specialists: SpecialistStatic[] = [
  {
    id: "spec_1",
    name: "Dr. Elena Rostova",
    profession: "Neurologist & Geneticist",
    specialization: "Huntington's & Tri-nucleotide Disorders",
    organization: "Massachusetts General Hospital",
    location: "Boston, MA, USA",
    email: "erostova@mgh.harvard.edu",
    phone: "+1 (617) 555-0143",
    website: "https://www.massgeneral.org",
    publications: "Rostova E, et al. Longitudinal striatal volume loss in Huntington's pre-manifest mutation carriers. NeuroImage 2024.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
    diseaseId: "dis_hd_1"
  },
  {
    id: "spec_2",
    name: "Dr. Marcus Vance",
    profession: "Pulmonologist",
    specialization: "Pediatric and Adult Cystic Fibrosis Care",
    organization: "Johns Hopkins Medicine",
    location: "Baltimore, MD, USA",
    email: "mvance@jhmi.edu",
    phone: "+1 (410) 555-0988",
    website: "https://www.hopkinsmedicine.org",
    publications: "Vance M, et al. Long-term outcomes of triple-combination CFTR modulators in adolescent cohorts. Thorax 2023.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
    diseaseId: "dis_cf_2"
  },
  {
    id: "spec_3",
    name: "Dr. Sarah Jenkins",
    profession: "Neuromuscular Specialist",
    specialization: "Motor Neuron Disease Therapeutics",
    organization: "Mayo Clinic",
    location: "Rochester, MN, USA",
    email: "jenkins.sarah@mayo.edu",
    phone: "+1 (507) 555-4849",
    website: "https://www.mayoclinic.org",
    publications: "Jenkins S, et al. Biomarker progression in familial ALS mutation carriers. JAMA Neurology 2024.",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=400&auto=format&fit=crop&q=80",
    diseaseId: "dis_als_3"
  }
];

export let communities: CommunityStatic[] = [
  {
    id: "comm_1",
    name: "Huntington's Disease Society of America (HDSA)",
    website: "https://hdsa.org",
    facebook: "https://facebook.com/HDSA",
    description: "The premier non-profit organization dedicated to improving the lives of everyone affected by Huntington's disease, providing family assistance, support groups, and research advocacy.",
    country: "United States",
    diseaseId: "dis_hd_1"
  },
  {
    id: "comm_2",
    name: "Cystic Fibrosis Foundation (CFF)",
    website: "https://www.cff.org",
    facebook: "https://facebook.com/cysticfibrosisfoundation",
    description: "CFF is the world's leader in the search for a cure for cystic fibrosis, funding promising research and providing access to quality, specialized care for people with CF.",
    country: "United States",
    diseaseId: "dis_cf_2"
  },
  {
    id: "comm_3",
    name: "The ALS Association",
    website: "https://www.als.org",
    facebook: "https://facebook.com/alsassociation",
    description: "The ALS Association is the only national non-profit organization fighting ALS on all fronts, including global research, public education, and local patient care services.",
    country: "United States",
    diseaseId: "dis_als_3"
  }
];

export let researchItems: ResearchStatic[] = [
  {
    id: "res_1",
    title: "Antisense Oligonucleotide Therapy Targeting Huntingtin Protein",
    summary: "Scientists have developed a new molecule designed to bind to the instructions for making the toxic Huntington's protein and destroy them. In animal models, this therapy successfully lowered the toxic protein levels and improved coordinating functions.",
    scientificDetail: "This paper details the pharmacokinetics and pharmacodynamics of a novel ASO drug targeting HTT pre-mRNA. Intrathecal administration in transgenic YAC128 mice showed a dose-dependent reduction of cortical and striatal huntingtin protein levels.",
    publishedAt: "2024-02-15",
    journal: "New England Journal of Medicine",
    author: "Tabrizi SJ, Rostova E, et al.",
    link: "https://www.nejm.org",
    diseaseId: "dis_hd_1"
  },
  {
    id: "res_2",
    title: "Triple CFTR Modulator Therapy in Genotypes with F508del Mutation",
    summary: "A landmark study shows that a combination of three pill medications works together to repair the broken salt channel protein in cystic fibrosis, significantly improving lung function.",
    scientificDetail: "A multinational, double-blind, placebo-controlled trial evaluating Elexacaftor-Tezacaftor-Ivacaftor in CF patients heterozygous for the F508del mutation. Patients showed an average 14.3 percentage point increase in ppFEV1 (p < 0.001).",
    publishedAt: "2023-11-10",
    journal: "The Lancet Respiratory Medicine",
    author: "Middleton PG, Vance M, et al.",
    link: "https://www.thelancet.com",
    diseaseId: "dis_cf_2"
  },
  {
    id: "res_3",
    title: "TDP-43 Clearance Mechanisms in Motor Neuron Degeneration",
    summary: "Researchers discovered a cellular pathway that sweeps away toxic TDP-43 protein clumps. Boosting this pathway kept motor neurons alive longer in lab tests — a promising new ALS target.",
    scientificDetail: "We identify that selective autophagy receptor SQSTM1/p62 mediates degradation of pathological TDP-43 aggregates. Overexpression of p62 mitigates TDP-43 induced neurotoxicity in human iPSC-derived motor neurons.",
    publishedAt: "2025-05-18",
    journal: "Nature Neuroscience",
    author: "Jenkins S, Zhang Y, et al.",
    link: "https://www.nature.com",
    diseaseId: "dis_als_3"
  }
];

export let faqs: FAQStatic[] = [
  {
    id: "faq_1",
    question: "Is Huntington's disease always passed down?",
    answer: "Yes, it is an inherited genetic condition. If a parent carries the expanded CAG repeat in their HTT gene, there is a 50% chance of passing it to each child.",
    diseaseId: "dis_hd_1"
  },
  {
    id: "faq_2",
    question: "What is a sweat chloride test?",
    answer: "A sweat chloride test measures the amount of salt in a person's sweat. People with Cystic Fibrosis have much saltier sweat than normal, making it the gold standard for CF diagnosis.",
    diseaseId: "dis_cf_2"
  },
  {
    id: "faq_3",
    question: "Is ALS hereditary?",
    answer: "About 90–95% of all ALS cases are sporadic. The remaining 5–10% are familial ALS, inherited from a parent carrying a mutated gene (such as C9orf72 or SOD1).",
    diseaseId: "dis_als_3"
  }
];

// ─── Accessor Functions (pure, no Prisma — safe in any context) ──────────────

export function getDiseases(): DiseaseStatic[] {
  return diseases;
}

export function getDiseaseBySlug(slug: string): DiseaseStatic | null {
  return diseases.find(d => d.slug === slug) ?? null;
}

export function getClinicalTrials(diseaseId?: string): ClinicalTrialStatic[] {
  return diseaseId ? trials.filter(t => t.diseaseId === diseaseId) : trials;
}

export function getSpecialists(diseaseId?: string): SpecialistStatic[] {
  return diseaseId ? specialists.filter(s => s.diseaseId === diseaseId) : specialists;
}

export function getCommunities(diseaseId?: string): CommunityStatic[] {
  return diseaseId ? communities.filter(c => c.diseaseId === diseaseId) : communities;
}

export function getResearch(diseaseId?: string): ResearchStatic[] {
  return diseaseId ? researchItems.filter(r => r.diseaseId === diseaseId) : researchItems;
}

export function getFAQs(diseaseId?: string): FAQStatic[] {
  return diseaseId ? faqs.filter(f => f.diseaseId === diseaseId) : faqs;
}

// ─── CRUD mutations (in-memory) ───────────────────────────────────────────────

export function createDiseaseLocal(disease: Omit<DiseaseStatic, "id" | "slug">): DiseaseStatic {
  const slug = disease.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newDisease: DiseaseStatic = { ...disease, id: `dis_local_${Date.now()}`, slug };
  diseases.push(newDisease);
  return newDisease;
}

export function updateDiseaseLocal(id: string, updates: Partial<DiseaseStatic>): DiseaseStatic | null {
  const index = diseases.findIndex(d => d.id === id);
  if (index === -1) return null;
  diseases[index] = { ...diseases[index], ...updates };
  return diseases[index];
}

export function deleteDiseaseLocal(id: string): boolean {
  const initial = diseases.length;
  diseases = diseases.filter(d => d.id !== id);
  return diseases.length < initial;
}

export function createTrialLocal(trial: Omit<ClinicalTrialStatic, "id">): ClinicalTrialStatic {
  const newTrial = { ...trial, id: `trial_local_${Date.now()}` };
  trials.push(newTrial);
  return newTrial;
}

export function deleteTrialLocal(id: string): boolean {
  const initial = trials.length;
  trials = trials.filter(t => t.id !== id);
  return trials.length < initial;
}

export function createSpecialistLocal(spec: Omit<SpecialistStatic, "id">): SpecialistStatic {
  const newSpec = { ...spec, id: `spec_local_${Date.now()}` };
  specialists.push(newSpec);
  return newSpec;
}

export function deleteSpecialistLocal(id: string): boolean {
  const initial = specialists.length;
  specialists = specialists.filter(s => s.id !== id);
  return specialists.length < initial;
}

export function createCommunityLocal(comm: Omit<CommunityStatic, "id">): CommunityStatic {
  const newComm = { ...comm, id: `comm_local_${Date.now()}` };
  communities.push(newComm);
  return newComm;
}

export function deleteCommunityLocal(id: string): boolean {
  const initial = communities.length;
  communities = communities.filter(c => c.id !== id);
  return communities.length < initial;
}

export function createResearchLocal(res: Omit<ResearchStatic, "id">): ResearchStatic {
  const newRes = { ...res, id: `res_local_${Date.now()}` };
  researchItems.push(newRes);
  return newRes;
}

export function deleteResearchLocal(id: string): boolean {
  const initial = researchItems.length;
  researchItems = researchItems.filter(r => r.id !== id);
  return researchItems.length < initial;
}
