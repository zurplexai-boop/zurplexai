import { createFileRoute } from "@tanstack/react-router";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Badge, Card, PageHeader, StatCard } from "@/components/app/ui";
import { channelSales, fmt, sales } from "@/lib/mock-data";

export const Route = createFileRoute("/app/sales")({
  head: () => ({ meta: [{ title: "Ventas — ZurplexAI" }] }),
  component: SalesPage,
});

function SalesPage() {
  const [open, setOpen] = useState(false);
  const total = sales.reduce((sum, s) => sum + s.qty * s.price, 0);
  const avg = total / sales.length;
  const topChannel = [...channelSales].sort((a, b) => b.value - a.value)[0].channel;

  return (
    <>
      <PageHeader
        title="Ventas"
        subtitle="Registro completo de tus ventas."
        actions={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> Nueva venta
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total vendido" value={fmt(total)} tone="positive" />
        <StatCard label="Cantidad de ventas" value={String(sales.length)} />
        <StatCard label="Ticket promedio" value={fmt(avg)} />
        <StatCard label="Canal top" value={topChannel} />
      </section>

      <div className="mt-6">
        <Card
          title="Historial"
          actions={
            <button className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
              <Filter className="h-3 w-3" /> Filtrar
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Fecha</th>
                  <th className="py-2 pr-3 font-medium">Producto</th>
                  <th className="py-2 pr-3 font-medium">Cant.</th>
                  <th className="py-2 pr-3 font-medium">Cliente</th>
                  <th className="py-2 pr-3 font-medium">Canal</th>
                  <th className="py-2 pr-3 font-medium">Pago</th>
                  <th className="py-2 pr-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sales.map((s) => (
                  <tr key={s.id} className="hover:bg-surface/50">
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.date}</td>
                    <td className="py-2.5 pr-3 font-medium">{s.product}</td>
                    <td className="py-2.5 pr-3">{s.qty}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.customer}</td>
                    <td className="py-2.5 pr-3">
                      <Badge tone="info">{s.channel}</Badge>
                    </td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.method}</td>
                    <td className="py-2.5 pr-3 text-right font-mono text-xs">{fmt(s.qty * s.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {open && <NewSaleModal onClose={() => setOpen(false)} />}
    </>
  );
}

function NewSaleModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl border border-border bg-card p-5 sm:rounded-2xl sm:p-6"
      >
        <h2 className="text-lg font-semibold">Nueva venta</h2>
        <p className="mt-1 text-xs text-muted-foreground">Registrá una venta rápida.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="mt-4 grid grid-cols-2 gap-3"
        >
          <Field label="Fecha" type="date" />
          <Field label="Cantidad" type="number" placeholder="1" />
          <Field label="Producto" placeholder="Brownie recheado" className="col-span-2" />
          <Field label="Precio unitario" placeholder="R$ 12,00" />
          <Field label="Cliente" placeholder="Ana Souza" />
          <Select label="Canal" options={["WhatsApp", "Instagram", "Tienda física", "Sitio web", "Marketplace"]} />
          <Select label="Forma de pago" options={["Pix", "Crédito", "Débito", "Efectivo", "Transferencia"]} />
          <Field label="Observación" placeholder="—" className="col-span-2" />
          <div className="col-span-2 mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="h-9 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card">
              Cancelar
            </button>
            <button type="submit" className="h-9 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary-hover">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, className = "", ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </label>
  );
}

function Select({ label, options, className = "" }: { label: string; options: string[]; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      <select className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
