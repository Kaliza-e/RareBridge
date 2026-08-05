import React, { useState } from "react";

export default function SignInPage({ onNav }: { onNav: (v: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // placeholder demo behavior
    alert(`Signed in (demo): ${email}`);
    onNav("home");
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-secondary-20">
        <h1 className="font-black text-2xl text-primary mb-4">Sign in to RareBridge</h1>
        <p className="text-sm text-accent mb-6">Use your account to access saved resources and community features.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-accent font-medium">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-secondary px-3 py-2 outline-none" />
          </div>
          <div>
            <label className="text-xs text-accent font-medium">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-secondary px-3 py-2 outline-none" />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="px-5 py-2 rounded-xl bg-primary text-ivory font-semibold">Sign in</button>
            <button type="button" onClick={() => onNav("signup")} className="px-4 py-2 rounded-xl border border-taupe text-primary">Create account</button>
            <button type="button" onClick={() => onNav("home")} className="ml-auto text-sm text-accent">Back</button>
          </div>
        </form>
      </div>
    </section>
  );
}
