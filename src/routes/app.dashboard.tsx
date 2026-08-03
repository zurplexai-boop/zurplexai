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
import { useAppI18n } from "@/lib/app-i18n";
import { useMockStore } from "@/lib/mock-store";

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
  const { dataMode, totals, products, sales, customers } = useMockStore();
  const isEmptyMode = dataMode === "empty";
  const productSales = sales.reduce<Record<string, number>>((byProduct, sale) => {
    byProduct[sale.product] = (byProduct[sale.product] ?? 0) + sale.qty;
    return byProduct;
  }, {});
  const rankedProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]);
  const rankedMargins = [...products].sort((a, b) => b.margin - a.margin);
  const s = isEmptyMode
    ? {
        income: totals.income,
        expenses: totals.expensesTotal,
        costs: totals.costs,
        profit: totals.profit,
        margin: totals.margin,
        customers: customers.length,
        topProduct: rankedProducts[0]?.[0] ?? "—",
        worstProduct: rankedProducts.at(-1)?.[0] ?? "—",
        mostProfitable: rankedMargins[0]?.name ?? "—",
        activeAlerts: 0,
      }
    : dashboardStats;
  const dashboardMonthlySeries = isEmptyMode ? [] : monthlySeries;
  const dashboardChannelSales = isEmptyMode
    ? Object.entries(sales.reduce<Record<string, number>>((byChannel, sale) => {
        byChannel[sale.channel] = (byChannel[sale.channel] ?? 0) + sale.qty * sale.price;
        return byChannel;
      }, {})).map(([channel, value]) => ({ channel, value }))
    : channelSales;
  const dashboardTopProducts = isEmptyMode
    ? rankedProducts.slice(0, 5).map(([name, value]) => ({ name, value }))
    : topProducts;
  const dashboardCustomersGrowth = isEmptyMode && customers.length
    ? [{ m: new Date().toLocaleString("default", { month: "short" }), customers: customers.length }]
    : isEmptyMode ? [] : customersGrowth;
  const dashboardAlerts = isEmptyMode ? [] : alerts;
  const { t } = useAppI18n();
  const d = t.dashboard;
  return (
    <>
      <PageHeader
        title={`${d.hello}, ${businessName}`}
        subtitle={d.subtitle}
        actions={
          <>
            <Link
              to="/app/sales"
              className="hidden h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover sm:inline-flex"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {d.registerSale}
            </Link>
            <Link
              to="/app/costs-expenses"
              className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card sm:inline-flex"
            >
              <Receipt className="h-3.5 w-3.5" />
              {d.addExpense}
            </Link>
            <Link
              to="/app/products"
              className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card md:inline-flex"
            >
              <PackageIcon className="h-3.5 w-3.5" />
              {d.newProduct}
            </Link>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label={d.income} value={fmt(s.income)} delta={isEmptyMode ? undefined : `+14% ${t.common.vsPrevMonth}`} tone="positive" />
        <StatCard label={d.expenses} value={fmt(s.expenses)} delta={isEmptyMode ? undefined : `+8% ${t.common.vsPrevMonth}`} tone="warning" />
        <StatCard label={d.costs} value={fmt(s.costs)} delta={isEmptyMode ? undefined : `+18% ${t.common.vsPrevMonth}`} tone="negative" />
        <StatCard label={d.profit} value={fmt(s.profit)} delta={`${d.marginLabel} ${s.margin}%`} tone="positive" />
        <StatCard label={d.customers} value={String(s.customers)} delta={isEmptyMode ? undefined : d.newCustomersMonth} tone="positive" />
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={d.topProduct} value={s.topProduct} tone="default" />
        <StatCard label={d.worstProduct} value={s.worstProduct} tone="default" />
        <StatCard label={d.mostProfitable} value={s.mostProfitable} tone="default" />
        <StatCard label={d.activeAlerts} value={String(s.activeAlerts)} tone="warning" />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title={d.incomeVsExpenses}>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={dashboardMonthlySeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="income" name={t.finance.income} fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name={t.finance.expenses} fill="var(--warning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={d.salesByChannel}>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={dashboardChannelSales} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" {...chartAxis} />
                <YAxis type="category" dataKey="channel" {...chartAxis} width={90} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name={t.finance.income} fill="var(--accent-sky)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={d.top5}>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={dashboardTopProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" {...chartAxis} tick={{ fontSize: 10 }} />
                <YAxis {...chartAxis} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name={d.sales} fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={d.customersEvolution}>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={dashboardCustomersGrowth}>
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
          title={d.quickAlerts}
          actions={
            <Link to="/app/alerts" className="inline-flex items-center gap-1 text-xs text-accent-sky hover:underline">
              {d.seeAll} <ArrowUpRight className="h-3 w-3" />
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {dashboardAlerts.length === 0 && (
              <li className="py-6 text-center text-sm text-muted-foreground">{t.common.noData}</li>
            )}
            {dashboardAlerts.slice(0, 3).map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-warning/10 text-warning ring-1 ring-warning/30">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{a.title}</span>
                    <Badge tone={a.severity === "high" ? "danger" : a.severity === "medium" ? "warning" : "default"}>
                      {a.severity === "high" ? t.common.high : a.severity === "medium" ? t.common.medium : t.common.low}
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
          <Plus className="h-3.5 w-3.5" /> {d.shortSale}
        </Link>
        <Link to="/app/costs-expenses" className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium">
          <Plus className="h-3.5 w-3.5" /> {d.shortExpense}
        </Link>
        <Link to="/app/products" className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium">
          <Plus className="h-3.5 w-3.5" /> {d.shortProduct}
        </Link>
      </section>
    </>
  );
}
