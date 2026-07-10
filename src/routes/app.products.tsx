import { createFileRoute } from "@tanstack/react-router";
import { Plus, AlertTriangle } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/ui";
import { fmt, products } from "@/lib/mock-data";

export const Route = createFileRoute("/app/products")({
  head: () => ({ meta: [{ title: "Productos — ZurplexAI" }] }),
  component: ProductsPage,
});

function statusBadge(status: string) {
  if (status === "healthy") return <Badge tone="success">Saludable</Badge>;
  if (status === "attention") return <Badge tone="warning">Atención</Badge>;
  return <Badge tone="danger">Margen baja</Badge>;
}

function ProductsPage() {
  const attention = products.filter((p) => p.status !== "healthy");
  return (
    <>
      <PageHeader
        title="Productos"
        subtitle="Rentabilidad y rotación de tu catálogo."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover">
            <Plus className="h-3.5 w-3.5" /> Nuevo producto
          </button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate font-semibold">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              {statusBadge(p.status)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Precio</div>
                <div className="font-mono">{fmt(p.price)}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Costo</div>
                <div className="font-mono text-muted-foreground">{fmt(p.cost)}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Margen</div>
                <div className="font-semibold text-accent-sky">{p.margin}%</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Vendidos mes</div>
                <div className="font-semibold">{p.soldMonth}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Card title="Productos que merecen atención">
          <ul className="divide-y divide-border">
            {attention.map((p) => (
              <li key={p.id} className="flex items-start gap-3 py-3">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-warning/10 text-warning ring-1 ring-warning/30">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{p.name}</span>
                    {statusBadge(p.status)}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {p.status === "low-margin"
                      ? `Margen ${p.margin}% — revisá precio o costo.`
                      : "Vende poco este mes — considerá promoción."}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
