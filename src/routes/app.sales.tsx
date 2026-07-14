import { createFileRoute } from "@tanstack/react-router";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Badge, Card, Field, Modal, ModalActions, PageHeader, Select, StatCard } from "@/components/app/ui";
import { channelSales, fmt } from "@/lib/mock-data";
import { useMockStore } from "@/lib/mock-store";

export const Route = createFileRoute("/app/sales")({
  head: () => ({ meta: [{ title: "Ventas — ZurplexAI" }] }),
  component: SalesPage,
});

const channels = ["WhatsApp", "Instagram", "Tienda física", "Sitio web", "Marketplace"];
const methods = ["Pix", "Crédito", "Débito", "Efectivo", "Transferencia"];

function SalesPage() {
  const { sales, addSale } = useMockStore();
  const [open, setOpen] = useState(false);
  const total = sales.reduce((sum, s) => sum + s.qty * s.price, 0);
  const avg = sales.length ? total / sales.length : 0;
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

      {open && (
        <NewSaleModal
          onClose={() => setOpen(false)}
          onSave={(s) => {
            addSale(s);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function NewSaleModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (s: {
    date: string;
    product: string;
    qty: number;
    price: number;
    customer: string;
    channel: string;
    method: string;
  }) => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    date: today,
    qty: 1,
    product: "",
    price: 0,
    customer: "",
    channel: channels[0],
    method: methods[0],
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal title="Nueva venta" subtitle="Registrá una venta rápida." onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="grid grid-cols-2 gap-3"
      >
        <Field label="Fecha" type="date" required value={form.date} onChange={(e) => set("date", e.target.value)} />
        <Field label="Cantidad" type="number" min={1} required value={form.qty} onChange={(e) => set("qty", Number(e.target.value))} />
        <Field label="Producto" required placeholder="Brownie recheado" className="col-span-2" value={form.product} onChange={(e) => set("product", e.target.value)} />
        <Field label="Precio unitario" type="number" step="0.01" min={0} required value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
        <Field label="Cliente" required placeholder="Ana Souza" value={form.customer} onChange={(e) => set("customer", e.target.value)} />
        <Select label="Canal" options={channels} value={form.channel} onChange={(e) => set("channel", e.target.value)} />
        <Select label="Forma de pago" options={methods} value={form.method} onChange={(e) => set("method", e.target.value)} />
        <ModalActions onCancel={onClose} />
      </form>
    </Modal>
  );
}
