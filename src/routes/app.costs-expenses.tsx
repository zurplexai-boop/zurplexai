import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge, Card, Field, Modal, ModalActions, PageHeader, Select, StatCard } from "@/components/app/ui";
import { fmt } from "@/lib/mock-data";
import { useMockStore } from "@/lib/mock-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/costs-expenses")({
  head: () => ({ meta: [{ title: "Costos y gastos — ZurplexAI" }] }),
  component: CostsPage,
});

const tabs = ["Costos", "Gastos", "Proveedores", "Categorías"] as const;
const methods = ["Pix", "Crédito", "Débito", "Efectivo", "Transferencia"];
const categoriesCosto = ["Materia prima", "Embalaje", "Mercadería"];
const categoriesGasto = ["Alquiler", "Marketing", "Empleados", "Servicios", "Otros"];

function CostsPage() {
  const { expenses, addExpense, deleteExpense } = useMockStore();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Costos");
  const [open, setOpen] = useState(false);

  const totalCostos = expenses.filter((e) => e.type === "costo").reduce((s, e) => s + e.amount, 0);
  const totalFijos = expenses.filter((e) => e.type === "gasto" && e.fixed).reduce((s, e) => s + e.amount, 0);
  const totalVar = expenses.filter((e) => e.type === "gasto" && !e.fixed).reduce((s, e) => s + e.amount, 0);

  const filtered = expenses.filter((e) => (tab === "Costos" ? e.type === "costo" : tab === "Gastos" ? e.type === "gasto" : true));

  return (
    <>
      <PageHeader
        title="Costos y gastos"
        subtitle="Todo lo que sale de tu negocio."
        actions={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> Nuevo
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Costos del mes" value={fmt(totalCostos)} tone="negative" />
        <StatCard label="Gastos fijos" value={fmt(totalFijos)} />
        <StatCard label="Gastos variables" value={fmt(totalVar)} tone="warning" />
        <StatCard label="Mayor categoría" value="Alquiler" hint="+0% vs mes ant." />
      </section>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm transition-colors",
              tab === t
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <Card>
          {tab === "Proveedores" || tab === "Categorías" ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Próximamente.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Fecha</th>
                    <th className="py-2 pr-3 font-medium">Categoría</th>
                    <th className="py-2 pr-3 font-medium">Descripción</th>
                    <th className="py-2 pr-3 font-medium">Proveedor</th>
                    <th className="py-2 pr-3 font-medium">Tipo</th>
                    <th className="py-2 pr-3 text-right font-medium">Valor</th>
                    <th className="py-2 pr-3 text-right font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((e) => (
                    <tr key={e.id} className="hover:bg-surface/50">
                      <td className="py-2.5 pr-3 text-muted-foreground">{e.date}</td>
                      <td className="py-2.5 pr-3">{e.category}</td>
                      <td className="py-2.5 pr-3 font-medium">{e.description}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground">{e.supplier}</td>
                      <td className="py-2.5 pr-3">
                        <Badge tone={e.fixed ? "info" : "default"}>{e.fixed ? "Fijo" : "Variable"}</Badge>
                      </td>
                      <td className="py-2.5 pr-3 text-right font-mono text-xs">{fmt(e.amount)}</td>
                      <td className="py-2.5 pr-3 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Eliminar "${e.description}"?`)) deleteExpense(e.id);
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
    <Modal title="Nuevo movimiento" subtitle="Costo o gasto del negocio." onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="grid grid-cols-2 gap-3"
      >
        <Field label="Fecha" type="date" required value={form.date} onChange={(e) => set("date", e.target.value)} />
        <Select
          label="Tipo"
          options={["costo", "gasto"]}
          value={form.type}
          onChange={(e) => {
            const t = e.target.value as "costo" | "gasto";
            setForm((f) => ({ ...f, type: t, category: t === "costo" ? categoriesCosto[0] : categoriesGasto[0] }));
          }}
        />
        <Select label="Categoría" options={categories} value={form.category} onChange={(e) => set("category", e.target.value)} />
        <Field label="Monto" type="number" step="0.01" min={0} required value={form.amount} onChange={(e) => set("amount", Number(e.target.value))} />
        <Field label="Descripción" required className="col-span-2" value={form.description} onChange={(e) => set("description", e.target.value)} />
        <Field label="Proveedor" value={form.supplier} onChange={(e) => set("supplier", e.target.value)} />
        <Select label="Método" options={methods} value={form.method} onChange={(e) => set("method", e.target.value)} />
        <label className="col-span-2 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={form.fixed}
            onChange={(e) => set("fixed", e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          Gasto fijo (se repite todos los meses)
        </label>
        <ModalActions onCancel={onClose} />
      </form>
    </Modal>
  );
}
