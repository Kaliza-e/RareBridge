"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is RareBridge?",
      a: "RareBridge is an educational and support database built for patients, caregivers, researchers, and clinical professionals. Our core goal is to translate dense scientific publications into plain English, helping families understand active clinical trials and connect with verified specialists."
    },
    {
      q: "How does the AI Research Simplifier work?",
      a: "Our AI summarization preview tool parses scientific papers or abstracts and extracts key findings, translating clinical jargon into layperson terms. It also compiles a glossary of medical vocabulary and recommends specific questions to bring to your consulting physician."
    },
    {
      q: "Does RareBridge offer medical advice?",
      a: "No. RareBridge is not a healthcare provider and does not offer medical diagnoses, treatment prescriptions, or clinical guidance. The information presented is for educational purposes only and should be reviewed with your doctor."
    },
    {
      q: "How do specialists and organizations get listed?",
      a: "Specialists can request listing by submitting their professional affiliations, research publications, and clinic details through our contact portals. Every specialist must be registered with a recognized medical licensing board and possess a clear focus on rare or orphan disorders."
    },
    {
      q: "Is RareBridge free to use?",
      a: "Yes. RareBridge is free for patients, caregivers, and families. We are supported by research grants, patient foundations, and corporate healthcare sponsorships."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 w-full">
        {/* Editorial Heading */}
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sapphire">Support Center</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-sapphire/80 leading-relaxed font-light">
            Find answers to common questions about our platform, information sourcing, data privacy, and specialist directory.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-taupe/20 rounded-card shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 hover:bg-ivory/30 transition-colors"
                >
                  <span className="text-base font-bold text-primary flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-sapphire shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sapphire shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-sapphire shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-8 md:px-8 md:pb-8 pt-0 text-sm leading-relaxed text-sapphire/85 border-t border-taupe/10">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
