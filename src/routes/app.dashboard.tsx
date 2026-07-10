import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { AlertTriangle, ArrowUpRight, Plus, Receipt, ShoppingCart, Package as PackageIcon } from "lucide-react";
import { Badge, Card, PageHeader, StatCard } from "@/components/app/ui";
import {
  alerts, businessName, channelSales, customersGrowth,
  dashboardStats, fmt, monthlySeries, topProducts,
} from "@/lib/mock-data";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Panel — ZurplexAI" }] }),
  component: Dashboard,
});

const chartAxis = { stroke: "var(--muted-foreground)", fontSize: 11 };
const tooltipStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
};

function Dashboard() {
  const s = dashboardStats;
  return (
    <>
      <PageHeader
        title={`Hola, ${businessName}`}
        subtitle="Esta es la estructura de tu crecimiento."
        actions={
          <>
            <Link
              to="/app/sales"
              className="hidden h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover sm:inline-flex"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Registrar venta
            </Link>
            <Link
              to="/app/costs-expenses"
              className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card sm:inline-flex"
            >
              <Receipt className="h-3.5 w-3.5" />
              Agregar gasto
            </Link>
            <Link
              to="/app/products"
              className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card md:inline-flex"
            >
              <PackageIcon className="h-3.5 w-3.5" />
              Nuevo producto
            </Link>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Ingresos del mes" value={fmt(s.income)} delta="+14% vs mes ant." tone="positive" />
        <StatCard label="Gastos del mes" value={fmt(s.expenses)} delta="+8% vs mes ant." tone="warning" />
        <StatCard label="Costos del mes" value={fmt(s.costs)} delta="+18% vs mes ant." tone="negative" />
        <StatCard label="Lucro estimado" value={fmt(s.profit)} delta={`Margen ${s.margin}%`} tone="positive" />
        <StatCard label="Clientes" value={String(s.customers)} delta="+14 este mes" tone="positive" />
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Producto más vendido" value={s.topProduct} tone="default" />
        <StatCard label="Producto menos vendido" value={s.worstProduct} tone="default" />
        <StatCard label="Más rentable" value={s.mostProfitable} tone="default" />
        <StatCard label="Alertas activas" value={String(s.activeAlerts)} tone="warning" />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Ingresos vs gastos">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={monthlySeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="income" name="Ingresos" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Gastos" fill="var(--warning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Ventas por canal">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={channelSales} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" {...chartAxis} />
                <YAxis type="category" dataKey="channel" {...chartAxis} width={90} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name="Ingresos" fill="var(--accent-sky)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top 5 productos">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" {...chartAxis} tick={{ fontSize: 10 }} />
                <YAxis {...chartAxis} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name="Ventas" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Evolución de clientes">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={customersGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="var(--accent-sky)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="mt-6">
        <Card
          title="Alertas rápidas"
          actions={
            <Link to="/app/alerts" className="inline-flex items-center gap-1 text-xs text-accent-sky hover:underline">
              Ver todas <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {alerts.slice(0, 3).map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-warning/10 text-warning ring-1 ring-warning/30">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{a.title}</span>
                    <Badge tone={a.severity === "high" ? "danger" : a.severity === "medium" ? "warning" : "default"}>
                      {a.severity === "high" ? "Alta" : a.severity === "medium" ? "Media" : "Baja"}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-6 flex flex-wrap gap-2 sm:hidden">
        <Link to="/app/sales" className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground">
          <Plus className="h-3.5 w-3.5" /> Venta
        </Link>
        <Link to="/app/costs-expenses" className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium">
          <Plus className="h-3.5 w-3.5" /> Gasto
        </Link>
        <Link to="/app/products" className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium">
          <Plus className="h-3.5 w-3.5" /> Producto
        </Link>
      </section>
    </>
  );
}
