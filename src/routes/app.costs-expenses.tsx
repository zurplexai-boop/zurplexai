import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Badge, Card, PageHeader, StatCard } from "@/components/app/ui";
import { expenses, fmt } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/costs-expenses")({
  head: () => ({ meta: [{ title: "Costos y gastos — ZurplexAI" }] }),
  component: CostsPage,
});

const tabs = ["Costos", "Gastos", "Proveedores", "Categorías"] as const;

function CostsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Costos");
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
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
