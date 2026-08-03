import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Card, PageHeader, StatCard } from "@/components/app/ui";
import { fmt, monthlySeries } from "@/lib/mock-data";
import { useMockStore } from "@/lib/mock-store";
import { useAppI18n } from "@/lib/app-i18n";

export const Route = createFileRoute("/app/finance")({
  head: () => ({ meta: [{ title: "Finanzas — ZurplexAI" }] }),
  component: FinancePage,
});

const chartAxis = { stroke: "var(--muted-foreground)", fontSize: 11 };
const tooltipStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
};

function FinancePage() {
  const { totals } = useMockStore();
  const { t } = useAppI18n();
  const f = t.finance;
  const s = {
    income: totals.income,
    costs: totals.costs,
    expenses: totals.expensesTotal,
    profit: totals.profit,
    margin: totals.margin,
  };
  const bruto = s.income - s.costs;
  return (
    <>
      <PageHeader title={f.title} subtitle={f.subtitle} />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={f.income} value={fmt(s.income)} tone="positive" />
        <StatCard label={f.costs} value={fmt(s.costs)} tone="negative" />
        <StatCard label={f.expenses} value={fmt(s.expenses)} tone="warning" />
        <StatCard label={f.profit} value={fmt(s.profit)} delta={`${f.marginLabel} ${s.margin}%`} tone="positive" />
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card title={f.dre} className="lg:col-span-1">
          <ul className="divide-y divide-border text-sm">
            <Row label={f.grossIncome} value={fmt(s.income)} />
            <Row label={f.minusCosts} value={`- ${fmt(s.costs)}`} muted />
            <Row label={f.grossProfit} value={fmt(bruto)} bold />
            <Row label={f.minusExpenses} value={`- ${fmt(s.expenses)}`} muted />
            <Row label={f.estimatedProfit} value={fmt(s.profit)} bold />
            <Row label={f.netMargin} value={`${s.margin}%`} bold accent />
          </ul>
        </Card>

        <Card title={f.monthlyEvolution} className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={monthlySeries}>
                <defs>
                  <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="income" name={f.income} stroke="var(--primary)" fill="url(#gi)" />
                <Area type="monotone" dataKey="profit" name={f.profitSeries} stroke="var(--success)" fill="url(#gp)" />
                <Area type="monotone" dataKey="expenses" name={f.expenses} stroke="var(--warning)" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card title={f.monthSummary}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {f.summary1} <span className="font-medium text-foreground">{fmt(s.income)}</span> {f.summary2}{" "}
            <span className="font-medium text-foreground">{fmt(s.profit)}</span>. {f.summary3}{" "}
            <span className="font-medium text-accent-sky">{s.margin}%</span>. {f.summary4}{" "}
            <span className="font-medium text-warning">18%</span>.
          </p>
        </Card>
      </div>
    </>
  );
}

function Row({ label, value, bold, muted, accent }: { label: string; value: string; bold?: boolean; muted?: boolean; accent?: boolean }) {
  return (
    <li className="flex items-center justify-between py-3">
      <span className={muted ? "text-muted-foreground" : ""}>{label}</span>
      <span className={`font-mono text-xs ${bold ? "font-semibold text-sm" : ""} ${accent ? "text-accent-sky" : ""}`}>
        {value}
      </span>
    </li>
  );
}
