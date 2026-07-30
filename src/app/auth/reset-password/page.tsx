"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
          Create New Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-card shadow-premium border border-taupe/20 space-y-6">
          {success ? (
            <div className="p-6 text-center space-y-3 max-w-sm mx-auto">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-primary font-heading">Password Updated</h3>
              <p className="text-xs text-sapphire/80 leading-relaxed">
                Your password has been successfully updated. Redirecting you to sign in...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm text-primary">
              {error && <div className="text-xs text-red-700 font-semibold">{error}</div>}

              <div className="space-y-1.5">
                <label htmlFor="pass" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  New Password
                </label>
                <input
                  id="pass"
                  type="password"
                  required
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-full shadow-premium flex items-center justify-center gap-2 transition-all duration-200"
              >
                Reset Password
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
