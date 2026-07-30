"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT"
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Success simulation
    setSuccess(true);
    setTimeout(() => {
      router.push("/auth/signin");
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background selection:bg-champagne selection:text-primary py-12 px-6 sm:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-2xl font-bold font-heading tracking-tight text-primary flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-sapphire" />
            Rare<span className="text-sapphire font-normal">Bridge</span>
          </span>
        </Link>
        <h2 className="text-3xl font-bold font-heading text-primary tracking-tight">
          Create Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-card shadow-premium border border-taupe/20 space-y-6">
          {success ? (
            <div className="p-6 text-center space-y-3 max-w-sm mx-auto">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-primary">Registration Successful</h3>
              <p className="text-xs text-sapphire/80 leading-relaxed">
                Your credentials have been registered in our sandbox database. Redirecting you to the sign in page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5 text-sm text-primary">
              {error && <div className="text-xs text-red-700 font-semibold">{error}</div>}

              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  Profile Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all"
                >
                  <option value="PATIENT">Patient / Caregiver</option>
                  <option value="RESEARCHER">Clinician or Researcher</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="pass" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  required
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  type="password"
                  required
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-full shadow-premium flex items-center justify-center gap-2 transition-all duration-200"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="text-center text-xs text-sapphire/80 pt-2">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-bold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
