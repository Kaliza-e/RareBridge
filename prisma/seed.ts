import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing tables
  await prisma.savedDisease.deleteMany({});
  await prisma.savedResearch.deleteMany({});
  await prisma.savedSpecialist.deleteMany({});
  await prisma.faq.deleteMany({});
  await prisma.research.deleteMany({});
  await prisma.community.deleteMany({});
  await prisma.specialist.deleteMany({});
  await prisma.clinicalTrial.deleteMany({});
  await prisma.disease.deleteMany({});
  await prisma.user.deleteMany({});

  // Hash passwords
  const adminPassword = await bcrypt.hash('Password123', 10);
  const patientPassword = await bcrypt.hash('Password123', 10);

  // Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Jenkins',
      email: 'admin@rarebridge.org',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const patientUser = await prisma.user.create({
    data: {
      name: 'David Miller',
      email: 'patient@rarebridge.org',
      password: patientPassword,
      role: 'PATIENT',
    },
  });

  console.log('Users created:', { adminUser: adminUser.email, patientUser: patientUser.email });

  // Disease 1: Huntington's Disease (Neurological / Genetic)
  const huntingtons = await prisma.disease.create({
    data: {
      name: "Huntington's Disease",
      slug: "huntingtons-disease",
      category: "Genetic",
      overview: "Huntington's disease is an inherited disorder that causes the progressive breakdown (degeneration) of nerve cells in the brain. It has a broad impact on a person's functional abilities and usually results in movement, cognitive, and psychiatric disorders.",
      simpleDescription: "Imagine the brain's control center slowly getting mixed-up messages. Huntington's disease is like a computer glitch in the body's DNA instructions. Over time, this glitch makes it hard for a person to control their movements, think clearly, or manage their emotions. It is passed down through families, and while scientists are working hard on a cure, current treatments focus on helping people live active, comfortable lives.",
      medicalDescription: "Huntington's disease (HD) is an autosomal dominant neurodegenerative disorder characterized by involuntary choreic movements, cognitive decline, and psychiatric disturbances. The disease is caused by an unstable CAG trinucleotide repeat expansion in the HTT gene on chromosome 4, which encodes the huntingtin protein. Neuronal loss is most prominent in the caudate nucleus and putamen of the basal ganglia, subsequently progressing to the cerebral cortex.",
      causes: "Huntington's disease is caused by an inherited defect in a single gene (HTT). It is an autosomal dominant disorder, meaning that a person needs only one copy of the defective gene to develop the disease. A parent with the gene has a 50% chance of passing it to their children.",
      symptoms: "Movement disorders (involuntary chorea, impaired posture, muscle rigidity), cognitive decline (difficulty organizing or prioritizing, lack of flexibility, impulse control issues), and psychiatric changes (depression, irritability, social withdrawal).",
      types: "Adult-onset Huntington's (most common, typically appearing in the 30s or 40s) and Juvenile Huntington's (rare form appearing in childhood or adolescence, associated with faster progression and rigidity rather than chorea).",
      diagnosis: "Diagnosis is based on clinical presentation, family history, and genetic testing showing a CAG repeat length of 36 or more in the HTT gene. Brain imaging (MRI/CT) is used to detect striatal atrophy in advanced stages.",
      treatments: "There is currently no disease-modifying cure. Treatments include symptomatic management with tetrabenazine or deutetrabenazine for chorea, antidepressants/antipsychotics for psychiatric manifestations, and supportive speech, physical, and occupational therapy.",
      images: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60",
      references: "1. Walker FO. Huntington's disease. Lancet. 2007;369(9557):218-228.\n2. McColgan P, Tabrizi SJ. Huntington's disease: a clinical review. Eur J Neurol. 2018;25(1):24-34.",
    },
  });

  // Disease 2: Cystic Fibrosis (Genetic / Metabolic)
  const cysticFibrosis = await prisma.disease.create({
    data: {
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
  });

  // Disease 3: Amyotrophic Lateral Sclerosis (ALS)
  const als = await prisma.disease.create({
    data: {
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
    },
  });

  // Clinical Trials
  await prisma.clinicalTrial.createMany({
    data: [
      {
        name: "Evaluation of Tominersen in Early Manifest Huntington's Disease",
        identifier: "NCT05686538",
        organization: "Roche / Genentech",
        phase: "Phase 2",
        status: "Recruiting",
        description: "A study to evaluate the safety, tolerability, and efficacy of tominersen, an antisense oligonucleotide targeting huntingtin mRNA, in patients with early manifest Huntington's disease.",
        latestFindings: "Early biomarker data demonstrated a significant reduction in mutant huntingtin (mHTT) protein levels in cerebrospinal fluid.",
        officialLink: "https://clinicaltrials.gov/study/NCT05686538",
        diseaseId: huntingtons.id,
      },
      {
        name: "A Trial to Evaluate the Safety of CRISPR/Cas9 Gene Editing in Cystic Fibrosis Patients",
        identifier: "NCT06019322",
        organization: "Vertex Pharmaceuticals",
        phase: "Phase 1",
        status: "Active",
        description: "An open-label, safety study investigating the delivery of lipid nanoparticles containing CFTR gene-editing machinery straight into the respiratory epithelium.",
        latestFindings: "Initial tolerability cohort report shows zero serious adverse events and successful cell integration in nasal epithelial biopsies.",
        officialLink: "https://clinicaltrials.gov/study/NCT06019322",
        diseaseId: cysticFibrosis.id,
      },
      {
        name: "Efficacy and Safety of BIIB067 (Tofersen) in Adults with SOD1-ALS",
        identifier: "NCT02626156",
        organization: "Biogen",
        phase: "Phase 3",
        status: "Completed",
        description: "A randomized, double-blind, placebo-controlled trial evaluating the efficacy and safety of tofersen in patients with ALS and confirmed SOD1 mutations.",
        latestFindings: "Tofersen led to a rapid and sustained reduction in neurofilament light chain (NfL), a biomarker of neurodegeneration, and showed a trend towards slowing clinical decline.",
        officialLink: "https://clinicaltrials.gov/study/NCT02626156",
        diseaseId: als.id,
      },
    ],
  });

  // Specialists
  await prisma.specialist.createMany({
    data: [
      {
        name: "Dr. Elena Rostova",
        profession: "Neurologist & Geneticist",
        specialization: "Huntington's & Tri-nucleotide Disorders",
        organization: "Massachusetts General Hospital",
        location: "Boston, MA, USA",
        email: "erostova@mgh.harvard.edu",
        phone: "+1 (617) 555-0143",
        website: "https://www.massgeneral.org/doctors/elena-rostova",
        publications: "Rostova E, et al. Longitudinal striatal volume loss in Huntington's pre-manifest mutation carriers. NeuroImage 2024. Huntington disease pathogenesis and emerging therapeutics, Nature Reviews Neurology 2025.",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
        diseaseId: huntingtons.id,
      },
      {
        name: "Dr. Marcus Vance",
        profession: "Pulmonologist",
        specialization: "Pediatric and Adult Cystic Fibrosis Care",
        organization: "Johns Hopkins Medicine",
        location: "Baltimore, MD, USA",
        email: "mvance@jhmi.edu",
        phone: "+1 (410) 555-0988",
        website: "https://www.hopkinsmedicine.org/profiles/marcus-vance",
        publications: "Vance M, et al. Long-term outcomes of triple-combination CFTR modulators in adolescent cohorts. Thorax 2023.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
        diseaseId: cysticFibrosis.id,
      },
      {
        name: "Dr. Sarah Jenkins",
        profession: "Neuromuscular Specialist",
        specialization: "Motor Neuron Disease Therapeutics",
        organization: "Mayo Clinic",
        location: "Rochester, MN, USA",
        email: "jenkins.sarah@mayo.edu",
        phone: "+1 (507) 555-4849",
        website: "https://www.mayoclinic.org/biographies/sarah-jenkins-md",
        publications: "Jenkins S, et al. Biomarker progression in familial ALS mutation carriers. JAMA Neurology 2024.",
        image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=400&auto=format&fit=crop&q=80",
        diseaseId: als.id,
      },
    ],
  });

  // Communities
  await prisma.community.createMany({
    data: [
      {
        name: "Huntington's Disease Society of America (HDSA)",
        website: "https://hdsa.org",
        facebook: "https://facebook.com/HDSA",
        description: "The premier non-profit organization dedicated to improving the lives of everyone affected by Huntington's disease, providing family assistance, support groups, and research advocacy.",
        country: "United States",
        diseaseId: huntingtons.id,
      },
      {
        name: "Cystic Fibrosis Foundation (CFF)",
        website: "https://www.cff.org",
        facebook: "https://facebook.com/cysticfibrosisfoundation",
        description: "CFF is the world's leader in the search for a cure for cystic fibrosis, funding promising research and providing access to quality, specialized care for people with CF.",
        country: "United States",
        diseaseId: cysticFibrosis.id,
      },
      {
        name: "The ALS Association",
        website: "https://www.als.org",
        facebook: "https://facebook.com/alsassociation",
        description: "The ALS Association is the only national non-profit organization fighting ALS on all fronts, including global research, public education, and local patient care services.",
        country: "United States",
        diseaseId: als.id,
      },
    ],
  });

  // Research Articles
  await prisma.research.createMany({
    data: [
      {
        title: "Antisense Oligonucleotide Therapy Targeting Huntingtin Protein",
        summary: "Scientists have developed a new molecule designed to bind to the instructions for making the toxic Huntington's protein and destroy them. In animal models, this therapy successfully lowered the toxic protein levels and improved coordinating functions.",
        scientificDetail: "This paper details the pharmacokinetics and pharmacodynamics of a novel ASO drug targeting HTT pre-mRNA. Intrathecal administration in transgenic YAC128 mice showed a dose-dependent reduction of cortical and striatal huntingtin protein levels, correlating with improved performance on rotarod tests.",
        publishedAt: new Date("2024-02-15"),
        journal: "New England Journal of Medicine",
        author: "Tabrizi SJ, Rostova E, et al.",
        link: "https://www.nejm.org/doi/full/10.1056/NEJMoa1900907",
        diseaseId: huntingtons.id,
      },
      {
        title: "Triple CFTR Modulator Therapy in Genotypes with F508del",
        summary: "A landmark study shows that a combination of three pill medications works together to repair the broken salt channel protein in cystic fibrosis. The treatment significantly improved how much air patient lungs could hold and lowered salt in their sweat.",
        scientificDetail: "A multinational, double-blind, placebo-controlled trial evaluating Elexacaftor-Tezacaftor-Ivacaftor in cystic fibrosis patients heterozygous for the F508del mutation. Primary end point was absolute change in percentage of predicted forced expiratory volume in 1 second (ppFEV1). Patients showed an average 14.3 percentage point increase in ppFEV1 compared to placebo (p < 0.001).",
        publishedAt: new Date("2023-11-10"),
        journal: "The Lancet Respiratory Medicine",
        author: "Middleton PG, Vance M, et al.",
        link: "https://www.thelancet.com/journals/lanres/article/PIIS2213-2600(19)30366-8/fulltext",
        diseaseId: cysticFibrosis.id,
      },
      {
        title: "TDP-43 Clearance Mechanisms in Motor Neuron Degeneration",
        summary: "Researchers discovered a pathway that the cell uses to sweep away toxic clumps of a protein called TDP-43. When they boosted this sweeping pathway, motor neurons in the lab survived longer, offering a brand new target for slowing ALS.",
        scientificDetail: "We identify that selective autophagy receptor SQSTM1/p62 mediates the degradation of pathological TDP-43 aggregates. Overexpression of p62 or pharmacological activation of the ULK1 pathway mitigates TDP-43 induced neurotoxicity in human iPSC-derived motor neurons, preserving axon length and neuromuscular junction integrity.",
        publishedAt: new Date("2025-05-18"),
        journal: "Nature Neuroscience",
        author: "Jenkins S, Zhang Y, et al.",
        link: "https://www.nature.com/articles/s41593-025-01234-x",
        diseaseId: als.id,
      },
    ],
  });

  // FAQs
  await prisma.faq.createMany({
    data: [
      {
        question: "Is Huntington's disease always passed down?",
        answer: "Yes, it is an inherited genetic condition. If a parent carries the expanded CAG repeat in their HTT gene, there is a 50% chance of passing it to each child. Rare sporadic cases (new mutations) do occur but account for less than 1% of diagnoses.",
        diseaseId: huntingtons.id,
      },
      {
        question: "What is a sweat chloride test?",
        answer: "A sweat chloride test measures the amount of salt in a person's sweat. People with Cystic Fibrosis have sweat that is much saltier than normal. It is the gold standard for diagnosing CF because a malfunctioning CFTR protein prevents salt from being reabsorbed by sweat glands.",
        diseaseId: cysticFibrosis.id,
      },
      {
        question: "Is ALS hereditary?",
        answer: "About 90% to 95% of all ALS cases are sporadic, meaning they occur at random with no clear family history. The remaining 5% to 10% are familial ALS, which is inherited from a parent carrying a mutated gene (such as C9orf72 or SOD1).",
        diseaseId: als.id,
      },
    ],
  });

  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
