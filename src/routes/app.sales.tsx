import { createFileRoute } from "@tanstack/react-router";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Badge, Card, Field, Modal, ModalActions, PageHeader, Select, StatCard } from "@/components/app/ui";
import { fmt } from "@/lib/mock-data";
import { useMockStore } from "@/lib/mock-store";
import { useAppI18n } from "@/lib/app-i18n";

export const Route = createFileRoute("/app/sales")({
  head: () => ({ meta: [{ title: "Ventas — ZurplexAI" }] }),
  component: SalesPage,
});

const channels = ["WhatsApp", "Instagram", "Tienda física", "Sitio web", "Marketplace"];
const methods = ["Pix", "Crédito", "Débito", "Efectivo", "Transferencia"];

function SalesPage() {
  const { sales, addSale } = useMockStore();
  const { t } = useAppI18n();
  const s = t.sales;
  const [open, setOpen] = useState(false);
  const total = sales.reduce((sum, x) => sum + x.qty * x.price, 0);
  const avg = sales.length ? total / sales.length : 0;
  const channelTotals = sales.reduce<Record<string, number>>((totals, sale) => {
    totals[sale.channel] = (totals[sale.channel] ?? 0) + sale.qty * sale.price;
    return totals;
  }, {});
  const topChannel = Object.entries(channelTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  return (
    <>
      <PageHeader
        title={s.title}
        subtitle={s.subtitle}
        actions={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> {s.newSale}
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={s.totalSold} value={fmt(total)} tone="positive" />
        <StatCard label={s.count} value={String(sales.length)} />
        <StatCard label={s.avgTicket} value={fmt(avg)} />
        <StatCard label={s.topChannel} value={topChannel} />
      </section>

      <div className="mt-6">
        <Card
          title={s.history}
          actions={
            <button className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
              <Filter className="h-3 w-3" /> {t.common.filter}
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">{t.common.date}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.product}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.quantity}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.customer}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.channel}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.payment}</th>
                  <th className="py-2 pr-3 text-right font-medium">{t.common.total}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sales.length === 0 && (
                  <tr><td colSpan={7} className="py-8 text-center text-sm text-muted-foreground">{t.common.noData}</td></tr>
                )}
                {sales.map((x) => (
                  <tr key={x.id} className="hover:bg-surface/50">
                    <td className="py-2.5 pr-3 text-muted-foreground">{x.date}</td>
                    <td className="py-2.5 pr-3 font-medium">{x.product}</td>
                    <td className="py-2.5 pr-3">{x.qty}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{x.customer}</td>
                    <td className="py-2.5 pr-3">
                      <Badge tone="info">{x.channel}</Badge>
                    </td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{x.method}</td>
                    <td className="py-2.5 pr-3 text-right font-mono text-xs">{fmt(x.qty * x.price)}</td>
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
          onSave={(x) => {
            addSale(x);
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
  const { t } = useAppI18n();
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
    <Modal title={t.sales.newSale} subtitle={t.sales.modalSubtitle} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="grid grid-cols-2 gap-3"
      >
        <Field label={t.common.date} type="date" required value={form.date} onChange={(e) => set("date", e.target.value)} />
        <Field label={t.common.quantity} type="number" min={1} required value={form.qty} onChange={(e) => set("qty", Number(e.target.value))} />
        <Field label={t.common.product} required placeholder="Brownie recheado" className="col-span-2" value={form.product} onChange={(e) => set("product", e.target.value)} />
        <Field label={t.sales.unitPrice} type="number" step="0.01" min={0} required value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
        <Field label={t.common.customer} required placeholder="Ana Souza" value={form.customer} onChange={(e) => set("customer", e.target.value)} />
        <Select label={t.common.channel} options={channels} value={form.channel} onChange={(e) => set("channel", e.target.value)} />
        <Select label={t.sales.paymentMethod} options={methods} value={form.method} onChange={(e) => set("method", e.target.value)} />
        <ModalActions onCancel={onClose} />
      </form>
    </Modal>
  );
}
