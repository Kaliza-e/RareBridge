import {
  Brain, Dna, Heart, Activity, Zap, Users, Bot, Shield,
  BookOpen, Stethoscope, Microscope, Footprints, Star,
  FlaskConical, Baby, ClipboardList, Syringe, MessageCircle,AlertCircle, HandHeart, MapPin, Phone, Globe
} from "lucide-react";

export const NAV_LINKS = ["Home", "About","Explore Diseases", "Research", "Specialists", "Community" ];

export const SUGGESTED_SEARCHES = ["Krabbe Disease", "Rett Syndrome", "Batten Disease", "Duchenne Muscular Dystrophy"];

export const DISEASES = [
  {
    id: "krabbe",
    name: "Krabbe Disease",
    category: "Genetic · Neurological",
    categoryBadges: ["Genetic", "Neurological"],
    icon: Brain,
    color: "navy",
    shortDesc: "A rare inherited disorder that destroys the protective coating of nerve cells in the brain and nervous system.",
    researchStatus: "Active Research",
    inheritance: "Autosomal Recessive",
    ageAppearance: "Early Infancy (0–6 months)",
    severity: "Severe",
    symptoms: ["Muscle weakness", "Developmental delays", "Vision problems", "Hearing loss", "Seizures", "High fever", "Vomiting", "Feeding difficulties"],
    overview: {
      simple: "Krabbe disease is a serious condition where the body cannot make a substance called galactocerebrosidase. This enzyme is needed to protect the nerves. Without it, the fatty covering around the nerves (called myelin) breaks down. This damages the brain and nervous system.",
      medical: "Krabbe disease (globoid cell leukodystrophy) is caused by deficient activity of galactocerebrosidase (GALC), resulting in accumulation of psychosine, a cytotoxic lipid that causes apoptosis of oligodendrocytes, progressive demyelination, and gliosis throughout the central and peripheral nervous systems."
    },
    causes: {
      genetic: "Mutations in the GALC gene on chromosome 14q31 lead to deficient galactocerebrosidase enzyme. Both copies of the gene must carry mutations (autosomal recessive). Over 70 different GALC mutations have been identified.",
      environmental: "No environmental triggers are known. Krabbe disease is entirely caused by inherited genetic mutations.",
      unknown: "The exact relationship between genotype and phenotype is not fully understood. Some mutations cause early-onset, others late-onset disease."
    },
    types: [
      { stage: "Birth", type: "Infantile (most common)", symptoms: ["Extreme irritability", "High muscle tone", "Feeding difficulties"], severity: "Severe" },
      { stage: "Childhood", type: "Late-Infantile", symptoms: ["Developmental regression", "Seizures", "Vision loss"], severity: "Severe" },
      { stage: "Adolescence", type: "Juvenile", symptoms: ["Progressive weakness", "Loss of coordination", "Cognitive decline"], severity: "Moderate–Severe" },
      { stage: "Adulthood", type: "Adult-Onset", symptoms: ["Leg weakness", "Vision problems", "Memory issues"], severity: "Variable" }
    ],
    diagnosis: [
      { name: "Enzyme Activity Test (GALC)", what: "A blood or skin cell test measuring galactocerebrosidase enzyme levels.", how: "A small blood sample or skin biopsy is collected. Lab technicians measure the enzyme's activity level.", result: "Enzyme activity below 0–5% of normal is diagnostic for Krabbe disease." },
      { name: "Genetic (DNA) Testing", what: "A test that looks directly at the GALC gene for mutations.", how: "Blood is drawn and DNA is extracted. The GALC gene is sequenced to find mutations.", result: "Finding two pathogenic GALC mutations confirms the diagnosis." }
    ],
    lifestyle: {
      therapies: [
        { name: "Physical Therapy", desc: "Helps maintain muscle strength, prevent contractures, and support mobility as long as possible.", icon: Activity },
        { name: "Occupational Therapy", desc: "Supports daily activities, fine motor skills, and positioning for comfort and function.", icon: Heart },
        { name: "Speech Therapy", desc: "Addresses swallowing difficulties and communication needs as the disease progresses.", icon: MessageCircle }
      ],
      nutrition: "Many children need specialized nutritional support due to swallowing difficulties. Gastrostomy tube (G-tube) feeding often becomes necessary to ensure adequate nutrition and reduce aspiration risk.",
      devices: ["Wheelchair or stroller systems", "Custom seating for positioning", "AAC communication devices", "Suction machines", "Feeding tubes (G-tube)", "Pulse oximetry monitors"],
      caregiverTips: ["Keep a daily symptom journal to share with your care team", "Join the Krabbe Disease Family Network for peer support", "Ask about palliative care early — it helps alongside treatments", "Coordinate with a rare disease specialist center", "Apply for disability support services and financial assistance"]
    },
    research: [
      { name: "Forge Biologics", focus: "Gene therapy for Krabbe disease using AAV vectors", why: "Leading gene therapy company with active IND for Krabbe treatment", logo: "FB" },
      { name: "Hunter's Hope Foundation", focus: "Research funding and newborn screening advocacy", why: "Jim Kelly's foundation dedicated entirely to Krabbe disease", logo: "HH" }
    ],
    faqs: [
      { q: "What causes Krabbe disease?", a: "Krabbe disease is caused by mutations in the GALC gene, which provides instructions for making the galactocerebrosidase enzyme. Without this enzyme, toxic substances build up and destroy the myelin sheath protecting nerve cells." }
    ],
    myths: [
      { myth: "Rare diseases only affect children.", fact: "Many rare diseases appear during adulthood. Late-onset forms of Krabbe disease can manifest in adolescence or adult years." }
    ],
    specialists: [
      { name: "Dr. Maria Santos", role: "Pediatric Neurologist", org: "Boston Children's Hospital", location: "Boston, MA", specialization: "Leukodystrophies & Metabolic Brain Disorders", publications: 47 }
    ]
  },
  { id: "gaucher", name: "Gaucher Disease", category: "Genetic · Metabolic", categoryBadges: ["Genetic", "Metabolic"], icon: Dna, color: "sapphire", shortDesc: "The most common lysosomal storage disorder, caused by a deficiency of the enzyme glucocerebrosidase.", researchStatus: "Approved Treatment", inheritance: "Autosomal Recessive", ageAppearance: "Childhood to Adulthood", severity: "Moderate", symptoms: ["Enlarged spleen", "Bone pain", "Fatigue", "Easy bruising", "Low platelet count"] },
  { id: "pompe", name: "Pompe Disease", category: "Genetic · Metabolic", categoryBadges: ["Genetic", "Metabolic"], icon: Heart, color: "taupe", shortDesc: "A rare inherited disorder caused by a buildup of glycogen in cells, affecting muscle and nerve function.", researchStatus: "Approved Treatment", inheritance: "Autosomal Recessive", ageAppearance: "Any Age", severity: "Severe", symptoms: ["Muscle weakness", "Breathing difficulties", "Heart problems", "Feeding difficulties"] },
  { id: "rett", name: "Rett Syndrome", category: "Genetic · Neurological", categoryBadges: ["Genetic", "Neurological"], icon: Brain, color: "navy", shortDesc: "A rare neurodevelopmental disorder affecting girls, caused by mutations in the MECP2 gene.", researchStatus: "Active Research", inheritance: "X-Linked", ageAppearance: "6–18 months", severity: "Severe", symptoms: ["Loss of purposeful hand use", "Breathing irregularities", "Seizures", "Communication difficulties"] },
  { id: "batten", name: "Batten Disease", category: "Genetic · Neurological", categoryBadges: ["Genetic", "Neurological"], icon: Zap, color: "sapphire", shortDesc: "A fatal nervous system disorder that begins in childhood, causing vision loss, seizures, and progressive loss of motor and cognitive skills.", researchStatus: "Active Research", inheritance: "Autosomal Recessive", ageAppearance: "5–10 years", severity: "Severe", symptoms: ["Vision loss", "Seizures", "Cognitive decline", "Motor deterioration", "Behavioral changes"] },
  { id: "dmd", name: "Duchenne Muscular Dystrophy", category: "Genetic · Neurological", categoryBadges: ["Genetic", "Neurological"], icon: Activity, color: "taupe", shortDesc: "A severe form of muscular dystrophy caused by mutations in the DMD gene, affecting muscle fiber maintenance.", researchStatus: "Approved Treatment", inheritance: "X-Linked Recessive", ageAppearance: "2–5 years", severity: "Severe", symptoms: ["Progressive muscle weakness", "Difficulty walking", "Calf enlargement", "Cardiomyopathy", "Breathing difficulties"] }
];

export const CATEGORY_FILTERS = ["All", "Genetic", "Neurological", "Metabolic", "Autoimmune"];
export const STATUS_FILTERS = ["All Status", "Active Research", "Approved Treatment", "Support Available"];

export const COLOR_MAP: Record<string, { bg: string; text: string; badge: string; ring: string; iconBg: string }> = {
  navy:    { bg: "bg-[#E7E2CE]",    text: "text-[#112250]", badge: "bg-[#112250] text-[#F5F4F0]", ring: "ring-[#BEB7A7]", iconBg: "bg-[#112250]" },
  sapphire:{ bg: "bg-[#F5F4F0]",    text: "text-[#3B507D]", badge: "bg-[#3B507D] text-[#F5F4F0]", ring: "ring-[#BEB7A7]", iconBg: "bg-[#3B507D]" },
  taupe:   { bg: "bg-[#BEB7A7]/20", text: "text-[#112250]", badge: "bg-[#BEB7A7] text-[#112250]", ring: "ring-[#BEB7A7]", iconBg: "bg-[#BEB7A7]" },
};

export const STATUS_COLOR: Record<string, string> = {
  "Active Research":    "bg-[#3B507D]/10 text-[#3B507D]",
  "Approved Treatment": "bg-emerald-100 text-emerald-700",
  "Support Available":  "bg-amber-100 text-amber-700",
};

export const JOURNEY_STEPS = [
  { icon: AlertCircle, label: "Symptoms", desc: "Unusual signs appear — unexplained delays, weakness, or changes in behavior." },
  { icon: Stethoscope, label: "Doctor Visit", desc: "Your family doctor refers you to a specialist for further evaluation." },
  { icon: ClipboardList, label: "Diagnosis", desc: "Genetic tests, enzyme panels, or imaging confirm the rare disease." },
  { icon: Syringe, label: "Treatment", desc: "A care team creates a personalized management and therapy plan." },
  { icon: HandHeart, label: "Lifestyle Support", desc: "Therapies, assistive devices, and daily care routines are established." },
  { icon: Users, label: "Community", desc: "Connect with families and organizations who share your experience." },
  { icon: Microscope, label: "Research", desc: "Follow the organizations working toward treatments and cures." },
];

export const STATS = [
  { label: "Rare Diseases", value: "7,000+" },
  { label: "Specialists", value: "2,400+" },
  { label: "Research Orgs", value: "850+" },
  { label: "Families Helped", value: "120K+" },
];

export const FEATURES = [
  { icon: BookOpen, title: "Disease Library", desc: "Explore 7,000+ rare diseases with plain-language explanations and comprehensive medical details." },
  { icon: Stethoscope, title: "Find Specialists", desc: "Connect with rare disease experts, metabolic specialists, and genetic counselors nationwide." },
  { icon: Microscope, title: "Research Updates", desc: "Follow the latest gene therapy breakthroughs and pharmaceutical pipeline news." },
  { icon: Users, title: "Community Support", desc: "Find support groups, family networks, and online communities who understand your journey." },
  { icon: Bot, title: "RareBridge AI", desc: "Upload research papers and ask questions in plain language — our AI simplifies complex science." },
  { icon: Shield, title: "Trusted Sources", desc: "All information is reviewed by medical professionals and sourced from leading institutions." },
];

export type Disease = typeof DISEASES[0];
