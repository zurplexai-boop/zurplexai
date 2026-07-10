import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — ZurplexAI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-10">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
            <span className="text-sm font-bold">Z</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">ZurplexAI</span>
        </Link>
        <div className="w-full rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-xl font-semibold tracking-tight">Bienvenido</h1>
          <p className="mt-1 text-sm text-muted-foreground">La estructura de tu crecimiento.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/onboarding";
            }}
          >
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@negocio.com"
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Entrar
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs">
            <Link to="/onboarding" className="text-accent-sky hover:underline">
              Crear cuenta
            </Link>
            <button className="text-muted-foreground hover:text-foreground">
              Olvidé mi contraseña
            </button>
          </div>
        </div>
        <Link to="/" className="mt-6 text-xs text-muted-foreground hover:text-foreground">
          ← Volver al sitio
        </Link>
      </div>
    </div>
  );
}
