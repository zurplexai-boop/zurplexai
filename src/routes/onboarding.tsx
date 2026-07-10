import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — ZurplexAI" }] }),
  component: OnboardingPage,
});

const bizTypes = ["Alimentación", "Comercio", "Servicios", "Belleza", "Ropa", "Salud", "Educación", "Otro"];
const channels = ["WhatsApp", "Instagram", "Tienda física", "Sitio web", "Marketplace", "Otro"];

function OnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState<"BR" | "AR">("BR");
  const [type, setType] = useState("Alimentación");
  const [selChannels, setSelChannels] = useState<string[]>(["WhatsApp", "Instagram"]);

  const toggleChannel = (c: string) =>
    setSelChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <div className="mb-8">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Paso 1 de 1</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Configuremos tu negocio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Necesitamos algunos datos para armar tu panel.
          </p>
        </div>

        <form
          className="space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-7"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/app/dashboard" });
          }}
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground">Nombre del negocio</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Doceria da Ana"
              className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">País</label>
              <div className="mt-1 flex gap-2">
                {(["BR", "AR"] as const).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCountry(c)}
                    className={cn(
                      "h-10 flex-1 rounded-md border text-sm",
                      country === c
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {c === "BR" ? "Brasil" : "Argentina"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Moneda</label>
              <div className="mt-1 h-10 rounded-md border border-border bg-surface px-3 text-sm leading-10 text-muted-foreground">
                {country === "BR" ? "BRL (R$)" : "ARS ($)"}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Tipo de negocio</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {bizTypes.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setType(b)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs",
                    type === b
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Canales de venta</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {channels.map((c) => {
                const on = selChannels.includes(c);
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => toggleChannel(c)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs",
                      on
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Crear mi panel
          </button>
        </form>
      </div>
    </div>
  );
}
