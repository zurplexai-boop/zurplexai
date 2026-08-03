import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/ui";
import { alerts } from "@/lib/mock-data";
import { useAppI18n } from "@/lib/app-i18n";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({ meta: [{ title: "Alertas — ZurplexAI" }] }),
  component: AlertsPage,
});

function AlertsPage() {
  const { t } = useAppI18n();
  return (
    <>
      <PageHeader title={t.alerts.title} subtitle={t.alerts.subtitle} />
      <Card>
        <ul className="divide-y divide-border">
          {alerts.map((a) => {
            const tone = a.severity === "high" ? "danger" : a.severity === "medium" ? "warning" : "default";
            const ringColor =
              a.severity === "high" ? "bg-destructive/10 text-destructive ring-destructive/30"
              : a.severity === "medium" ? "bg-warning/10 text-warning ring-warning/30"
              : "bg-surface text-muted-foreground ring-border";
            return (
              <li key={a.id} className="flex items-start gap-3 py-4">
                <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ${ringColor}`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-sm font-semibold ${!a.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {a.title}
                    </span>
                    <Badge tone={tone}>
                      {a.severity === "high" ? t.common.high : a.severity === "medium" ? t.common.medium : t.common.low}
                    </Badge>
                    {!a.read && <span className="h-1.5 w-1.5 rounded-full bg-accent-sky" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">{a.date}</p>
                </div>
                <button className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground">
                  {t.alerts.view} <ArrowRight className="h-3 w-3" />
                </button>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
