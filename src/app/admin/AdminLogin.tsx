"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Connexion impossible.");
      window.location.reload();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Connexion impossible.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
            <LockKeyhole className="size-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">Administration GGEA</h1>
          <p className="mt-2 text-sm text-slate-400">Connectez-vous pour gérer les réservations.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-medium text-slate-300">
            E-mail
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="email" className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950 pl-10 pr-3 text-white outline-none focus:border-emerald-400" />
            </div>
          </label>
          <label className="block text-sm font-medium text-slate-300">
            Mot de passe
            <div className="relative mt-2">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required autoComplete="current-password" className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950 pl-10 pr-3 text-white outline-none focus:border-emerald-400" />
            </div>
          </label>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-60">
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
