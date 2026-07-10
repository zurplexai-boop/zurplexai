import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Badge, Card, PageHeader, StatCard } from "@/components/app/ui";
import { customers, fmt } from "@/lib/mock-data";

export const Route = createFileRoute("/app/customers")({
  head: () => ({ meta: [{ title: "Clientes — ZurplexAI" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Base de clientes y comportamiento."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover">
            <Plus className="h-3.5 w-3.5" /> Nuevo cliente
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total" value="124" />
        <StatCard label="Nuevos este mes" value="14" tone="positive" />
        <StatCard label="Recurrentes" value="47" />
        <StatCard label="Inactivos" value="8" tone="warning" />
      </section>

      <div className="mt-6">
        <Card title="Todos los clientes">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Nombre</th>
                  <th className="py-2 pr-3 font-medium">Teléfono</th>
                  <th className="py-2 pr-3 font-medium">Email</th>
                  <th className="py-2 pr-3 font-medium">Última compra</th>
                  <th className="py-2 pr-3 font-medium">Total</th>
                  <th className="py-2 pr-3 font-medium">Canal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/50">
                    <td className="py-2.5 pr-3 font-medium">{c.name}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{c.phone}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{c.email}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{c.lastPurchase}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs">{fmt(c.total)}</td>
                    <td className="py-2.5 pr-3"><Badge tone="info">{c.channel}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
