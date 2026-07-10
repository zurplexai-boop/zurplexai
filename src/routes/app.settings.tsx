import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Card, PageHeader } from "@/components/app/ui";
import { businessName } from "@/lib/mock-data";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Configuración — ZurplexAI" }] }),
  component: SettingsPage,
});

const plans = [
  {
    name: "Básico",
    price: "R$ 79",
    features: ["Registro de ventas", "Productos", "Costos y gastos", "Dashboard simple", "Alertas básicas"],
    current: false,
  },
  {
    name: "Pro",
    price: "R$ 199",
    features: ["Todo del Básico", "Análisis financiero", "Margen por producto", "Reportes", "Importación de planillas"],
    current: true,
  },
  {
    name: "Premium",
    price: "R$ 499",
    features: ["Todo del Pro", "Consultoría", "Automatizaciones", "Soporte prioritario", "Páginas web"],
    current: false,
  },
];

function SettingsPage() {
  return (
    <>
      <PageHeader title="Configuración" subtitle="Preferencias de tu cuenta y negocio." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Datos del negocio">
          <div className="space-y-3 text-sm">
            <Row label="Nombre" value={businessName} />
            <Row label="País" value="Brasil" />
            <Row label="Moneda" value="BRL (R$)" />
            <Row label="Tipo" value="Alimentación" />
          </div>
        </Card>

        <Card title="Idioma y notificaciones">
          <div className="space-y-3 text-sm">
            <Row label="Idioma" value="Español · Português (BR)" />
            <Row label="Notificaciones email" value="Activadas" />
            <Row label="Alertas de margen" value="Activadas" />
          </div>
        </Card>

        <Card title="Canales de venta">
          <div className="flex flex-wrap gap-2">
            {["WhatsApp", "Instagram", "Tienda física", "Sitio web"].map((c) => (
              <span key={c} className="rounded-full border border-border bg-surface px-3 py-1 text-xs">
                {c}
              </span>
            ))}
          </div>
        </Card>

        <Card title="Seguridad">
          <div className="space-y-3 text-sm">
            <Row label="Autenticación 2FA" value="Desactivada" />
            <Row label="Sesiones activas" value="1" />
            <button className="mt-2 h-9 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card">
              Cambiar contraseña
            </button>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Plan actual</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl border p-5 ${
                p.current ? "border-primary bg-primary/5 ring-1 ring-primary/40" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.current && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[11px] text-accent-sky">Actual</span>}
              </div>
              <div className="mt-2 text-2xl font-bold">
                {p.price} <span className="text-xs font-normal text-muted-foreground">/mes</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={p.current}
                className={`mt-5 h-9 w-full rounded-md text-xs font-medium ${
                  p.current
                    ? "cursor-default border border-border bg-surface text-muted-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary-hover"
                }`}
              >
                {p.current ? "Plan actual" : `Cambiar a ${p.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
