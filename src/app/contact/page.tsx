"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, Sparkles, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Patient",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", role: "Patient", subject: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-champagne selection:text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sapphire">Contact Portal</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
            Connect With Our Team
          </h1>
          <p className="text-sm md:text-base text-sapphire/80 leading-relaxed font-light">
            Have questions about directory indexing, data privacy, or research partnerships? Submit a request below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-taupe/20 p-8 md:p-12 rounded-card shadow-premium">
            {submitted ? (
              <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-primary font-heading">Message Sent Successfully</h3>
                <p className="text-xs text-sapphire/80 leading-relaxed">
                  Thank you for reaching out. Our support administrators or clinical volunteers will review your submission and reply within 48 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-6 py-2.5 rounded-full"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-sm text-primary">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase font-extrabold tracking-wider text-sapphire/70">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase font-extrabold tracking-wider text-sapphire/70">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-xs uppercase font-extrabold tracking-wider text-sapphire/70">
                      I am a:
                    </label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all"
                    >
                      <option value="Patient">Patient</option>
                      <option value="Caregiver">Caregiver / Family Member</option>
                      <option value="Clinician">Clinician / Doctor</option>
                      <option value="Researcher">Scientific Researcher</option>
                      <option value="Advocate">Foundation Representative</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs uppercase font-extrabold tracking-wider text-sapphire/70">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      placeholder="e.g., Specialist registry update"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase font-extrabold tracking-wider text-sapphire/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Provide detailed information regarding your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-[18px] p-5 outline-none transition-all placeholder:text-sapphire/35"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-full shadow-premium flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-taupe/20 p-8 rounded-card shadow-premium space-y-6">
              <h3 className="text-base font-bold text-primary font-heading">Support Offices</h3>
              <p className="text-xs leading-relaxed text-sapphire/80">
                RareBridge is headquartered in coordination with medical research networks. Feel free to contact our administrative coordination team directly.
              </p>
              
              <div className="space-y-4 text-xs text-sapphire/90 border-t border-taupe/15 pt-4">
                <div className="flex gap-3.5 items-start">
                  <Mail className="w-4 h-4 text-taupe shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-sapphire/50 block font-bold">Email inquiries</span>
                    <span className="font-semibold text-primary">contact@rarebridge.org</span>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start pt-3 border-t border-taupe/10">
                  <Phone className="w-4 h-4 text-taupe shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-sapphire/50 block font-bold">Coordination line</span>
                    <span className="font-semibold text-primary">+1 (800) 555-RARE</span>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start pt-3 border-t border-taupe/10">
                  <MapPin className="w-4 h-4 text-taupe shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-sapphire/50 block font-bold">HQ Office</span>
                    <span className="font-semibold text-primary">Rare Disease Coalition Office &bull; Boston, MA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-champagne/30 rounded-card border border-taupe/35 text-xs text-primary/90 space-y-3">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sapphire" />
                Data Protection Guarantee
              </span>
              <p className="leading-relaxed">
                We take privacy seriously. Inquiries regarding genetic histories or diagnosis support channels are encrypted at rest. We never share email listings with health underwriters or marketing companies.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
