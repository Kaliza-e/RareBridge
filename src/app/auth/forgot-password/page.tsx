"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSuccess(true);
    }
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
          Reset Your Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-card shadow-premium border border-taupe/20 space-y-6">
          {success ? (
            <div className="p-6 text-center space-y-4 max-w-sm mx-auto">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-primary">Reset Email Sent</h3>
              <p className="text-xs text-sapphire/80 leading-relaxed">
                If the email address exists in our database, you will receive an email with instructions to create a new password.
              </p>
              <Link
                href="/auth/signin"
                className="inline-block bg-primary hover:bg-primary-light text-white text-xs font-semibold px-6 py-2.5 rounded-full"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm text-primary">
              <p className="text-xs text-sapphire/85 leading-relaxed">
                Enter your email address and we will send you a secure link to reset your account credentials.
              </p>
              
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-full shadow-premium flex items-center justify-center gap-2 transition-all duration-200"
              >
                Send Reset Link
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link href="/auth/signin" className="inline-flex items-center gap-1.5 text-xs text-sapphire hover:text-primary font-bold">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
