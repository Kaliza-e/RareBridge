"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ShieldAlert, CheckCircle, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Instant fill & login for demo purposes
  const handleQuickLogin = async (demoEmail: string) => {
    setLoading(true);
    setError("");
    setEmail(demoEmail);
    setPassword("Password123");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: demoEmail,
        password: "Password123",
        callbackUrl: demoEmail.includes("admin") ? "/admin" : "/dashboard",
      });

      if (res?.error) {
        setError("Quick login failed.");
      } else {
        router.push(demoEmail.includes("admin") ? "/admin" : "/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Quick login encountered an error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background selection:bg-champagne selection:text-primary py-12 px-6 sm:px-8">
      {/* Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-2xl font-bold font-heading tracking-tight text-primary flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-sapphire animate-pulse" />
            Rare<span className="text-sapphire font-normal">Bridge</span>
          </span>
        </Link>
        <h2 className="text-3xl font-bold font-heading text-primary tracking-tight">
          Sign In to RareBridge
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-card shadow-premium border border-taupe/20 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-[14px] flex items-start gap-2.5 text-xs text-red-800">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5 text-sm text-primary">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@rarebridge.org"
                className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-sapphire/75">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-semibold text-sapphire hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full bg-background border border-taupe/40 focus:border-sapphire rounded-full px-5 py-3 outline-none transition-all placeholder:text-sapphire/35"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-full shadow-premium flex items-center justify-center gap-2 transition-all duration-200"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo logins */}
          <div className="border-t border-taupe/20 pt-6 space-y-3">
            <span className="text-[10px] text-sapphire/50 block font-bold uppercase tracking-wider text-center">
              Quick Sandbox Logins
            </span>
            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => handleQuickLogin("patient@rarebridge.org")}
                className="text-center text-xs font-semibold px-4 py-3 rounded-full border border-taupe/35 bg-background text-primary hover:bg-white hover:border-sapphire transition-all shadow-sm"
              >
                Patient Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin@rarebridge.org")}
                className="text-center text-xs font-semibold px-4 py-3 rounded-full border border-taupe/35 bg-background text-primary hover:bg-white hover:border-sapphire transition-all shadow-sm"
              >
                Admin Account
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-sapphire/80 pt-2">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
