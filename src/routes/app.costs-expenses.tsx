import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge, Card, Field, Modal, ModalActions, PageHeader, Select, StatCard } from "@/components/app/ui";
import { fmt } from "@/lib/mock-data";
import { useMockStore } from "@/lib/mock-store";
import { useAppI18n } from "@/lib/app-i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/costs-expenses")({
  head: () => ({ meta: [{ title: "Costos y gastos — ZurplexAI" }] }),
  component: CostsPage,
});

type TabKey = "costs" | "expenses" | "suppliers" | "categories";
const methods = ["Pix", "Crédito", "Débito", "Efectivo", "Transferencia"];
const categoriesCosto = ["Materia prima", "Embalaje", "Mercadería"];
const categoriesGasto = ["Alquiler", "Marketing", "Empleados", "Servicios", "Otros"];

function CostsPage() {
  const { expenses, addExpense, deleteExpense } = useMockStore();
  const { t } = useAppI18n();
  const c = t.costs;
  const [tab, setTab] = useState<TabKey>("costs");
  const [open, setOpen] = useState(false);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "costs", label: c.tabCosts },
    { key: "expenses", label: c.tabExpenses },
    { key: "suppliers", label: c.tabSuppliers },
    { key: "categories", label: c.tabCategories },
  ];

  const totalCostos = expenses.filter((e) => e.type === "costo").reduce((s, e) => s + e.amount, 0);
  const totalFijos = expenses.filter((e) => e.type === "gasto" && e.fixed).reduce((s, e) => s + e.amount, 0);
  const totalVar = expenses.filter((e) => e.type === "gasto" && !e.fixed).reduce((s, e) => s + e.amount, 0);
  const categoryTotals = expenses.reduce<Record<string, number>>((totals, expense) => {
    totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount;
    return totals;
  }, {});
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const filtered = expenses.filter((e) =>
    tab === "costs" ? e.type === "costo" : tab === "expenses" ? e.type === "gasto" : true,
  );

  return (
    <>
      <PageHeader
        title={c.title}
        subtitle={c.subtitle}
        actions={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> {t.common.new}
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={c.monthCosts} value={fmt(totalCostos)} tone="negative" />
        <StatCard label={c.fixedExpenses} value={fmt(totalFijos)} />
        <StatCard label={c.variableExpenses} value={fmt(totalVar)} tone="warning" />
        <StatCard label={c.topCategory} value={topCategory} hint={expenses.length ? `+0% ${t.common.vsPrevMonth}` : undefined} />
      </section>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((x) => (
          <button
            key={x.key}
            onClick={() => setTab(x.key)}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm transition-colors",
              tab === x.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <Card>
          {tab === "suppliers" || tab === "categories" ? (
            <p className="py-8 text-center text-sm text-muted-foreground">{t.common.soon}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">{t.common.date}</th>
                    <th className="py-2 pr-3 font-medium">{t.common.category}</th>
                    <th className="py-2 pr-3 font-medium">{t.common.description}</th>
                    <th className="py-2 pr-3 font-medium">{t.common.supplier}</th>
                    <th className="py-2 pr-3 font-medium">{t.common.type}</th>
                    <th className="py-2 pr-3 text-right font-medium">{t.common.amount}</th>
                    <th className="py-2 pr-3 text-right font-medium">{t.common.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} className="py-8 text-center text-sm text-muted-foreground">{t.common.noData}</td></tr>
                  )}
                  {filtered.map((e) => (
                    <tr key={e.id} className="hover:bg-surface/50">
                      <td className="py-2.5 pr-3 text-muted-foreground">{e.date}</td>
                      <td className="py-2.5 pr-3">{e.category}</td>
                      <td className="py-2.5 pr-3 font-medium">{e.description}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground">{e.supplier}</td>
                      <td className="py-2.5 pr-3">
                        <Badge tone={e.fixed ? "info" : "default"}>{e.fixed ? c.fixed : c.variable}</Badge>
                      </td>
                      <td className="py-2.5 pr-3 text-right font-mono text-xs">{fmt(e.amount)}</td>
                      <td className="py-2.5 pr-3 text-right">
                        <button
                          aria-label={t.common.delete}
                          onClick={() => {
                            if (window.confirm(`${t.common.confirmDelete} "${e.description}"?`)) deleteExpense(e.id);
                          }}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {open && (
        <ExpenseModal
          onClose={() => setOpen(false)}
          onSave={(data) => {
            addExpense(data);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function ExpenseModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (e: {
    date: string;
    type: "costo" | "gasto";
    category: string;
    description: string;
    supplier: string;
    amount: number;
    fixed: boolean;
    method: string;
  }) => void;
}) {
  const { t } = useAppI18n();
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    date: today,
    type: "costo" as "costo" | "gasto",
    category: categoriesCosto[0],
    description: "",
    supplier: "",
    amount: 0,
    fixed: false,
    method: methods[0],
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const categories = form.type === "costo" ? categoriesCosto : categoriesGasto;

  return (
    <Modal title={t.costs.newMovement} subtitle={t.costs.modalSubtitle} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="grid grid-cols-2 gap-3"
      >
        <Field label={t.common.date} type="date" required value={form.date} onChange={(e) => set("date", e.target.value)} />
        <Select
          label={t.common.type}
          options={["costo", "gasto"]}
          value={form.type}
          onChange={(e) => {
            const ty = e.target.value as "costo" | "gasto";
            setForm((f) => ({ ...f, type: ty, category: ty === "costo" ? categoriesCosto[0] : categoriesGasto[0] }));
          }}
        />
        <Select label={t.common.category} options={categories} value={form.category} onChange={(e) => set("category", e.target.value)} />
        <Field label={t.common.amount} type="number" step="0.01" min={0} required value={form.amount} onChange={(e) => set("amount", Number(e.target.value))} />
        <Field label={t.common.description} required className="col-span-2" value={form.description} onChange={(e) => set("description", e.target.value)} />
        <Field label={t.common.supplier} value={form.supplier} onChange={(e) => set("supplier", e.target.value)} />
        <Select label={t.common.method} options={methods} value={form.method} onChange={(e) => set("method", e.target.value)} />
        <label className="col-span-2 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={form.fixed}
            onChange={(e) => set("fixed", e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          {t.costs.fixedHint}
        </label>
        <ModalActions onCancel={onClose} />
      </form>
    </Modal>
  );
}
