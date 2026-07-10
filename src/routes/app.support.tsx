import { createFileRoute } from "@tanstack/react-router";
import { Paperclip } from "lucide-react";
import { Card, PageHeader } from "@/components/app/ui";

export const Route = createFileRoute("/app/support")({
  head: () => ({ meta: [{ title: "Soporte — ZurplexAI" }] }),
  component: SupportPage,
});

const shortcuts = [
  { title: "Abrir solicitud", desc: "Contactá al equipo de soporte." },
  { title: "Mis solicitudes", desc: "Estado de tus tickets." },
  { title: "Enviar documento", desc: "Facturas, planillas o comprobantes." },
  { title: "Pedir consultoría", desc: "Sesión con nuestro equipo." },
  { title: "Pedir automatización", desc: "WhatsApp, reportes, integraciones." },
  { title: "Pedir página web", desc: "Landing o sitio para tu negocio." },
];

function SupportPage() {
  return (
    <>
      <PageHeader title="Soporte" subtitle="Estamos con vos todos los días." />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map((s) => (
          <button key={s.title} className="rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50">
            <h3 className="text-sm font-semibold">{s.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Card title="Nueva solicitud">
          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-3">
            <label className="col-span-2 block">
              <span className="text-[11px] font-medium text-muted-foreground">Asunto</span>
              <input className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-medium text-muted-foreground">Tipo</span>
              <select className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                {["Soporte técnico", "Duda financiera", "Importación de planilla", "Error en dashboard", "Consultoría", "Automatización", "Página web", "Plan y cobranza"].map(
                  (o) => (
                    <option key={o}>{o}</option>
                  ),
                )}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-medium text-muted-foreground">Prioridad</span>
              <select className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </label>
            <label className="col-span-2 block">
              <span className="text-[11px] font-medium text-muted-foreground">Mensaje</span>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </label>
            <div className="col-span-2 flex flex-wrap items-center justify-between gap-2">
              <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                <Paperclip className="h-3.5 w-3.5" /> Adjuntar archivo
              </button>
              <button type="submit" className="h-9 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary-hover">
                Enviar solicitud
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
