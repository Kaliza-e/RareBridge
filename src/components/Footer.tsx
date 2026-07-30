"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-white border-t border-taupe/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold font-heading tracking-tight text-primary flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-sapphire" />
                Rare<span className="text-sapphire font-normal">Bridge</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-sapphire/80 max-w-sm">
              Bridging the gap between rare diseases and understanding. Helping patients, caregivers, and clinicians connect, learn, and discover clinical solutions together.
            </p>
          </div>

          {/* Directory Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Directory</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/diseases" className="text-sm text-sapphire hover:text-primary transition-colors">
                  Rare Diseases List
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-sm text-sapphire hover:text-primary transition-colors">
                  Research Simplifier
                </Link>
              </li>
              <li>
                <Link href="/specialists" className="text-sm text-sapphire hover:text-primary transition-colors">
                  Find Specialists
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-sapphire hover:text-primary transition-colors">
                  Support Communities
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-sapphire hover:text-primary transition-colors">
                  About RareBridge
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-sapphire hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-sapphire hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-sm text-sapphire hover:text-primary transition-colors">
                  Member Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Stay Informed</h3>
            <p className="text-sm text-sapphire/80 leading-relaxed">
              Get clinical trial updates and summaries of breaking rare disease research in your inbox monthly.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[14px]">
                <p className="text-xs font-medium text-emerald-800">
                  Thank you! You have successfully subscribed to the RareBridge newsletter.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-ivory border border-taupe/40 focus:border-sapphire text-sm text-primary rounded-full px-5 py-3 pr-12 outline-none transition-all placeholder:text-sapphire/50"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 bg-primary hover:bg-primary-light text-white rounded-full transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 lg:mt-24 pt-8 border-t border-taupe/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-sapphire/60">
            &copy; {new Date().getFullYear()} RareBridge. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-sapphire/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
