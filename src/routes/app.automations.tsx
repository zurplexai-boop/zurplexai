import { createFileRoute } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { Badge, PageHeader } from "@/components/app/ui";
import { automations } from "@/lib/mock-data";
import { useAppI18n } from "@/lib/app-i18n";

export const Route = createFileRoute("/app/automations")({
  head: () => ({ meta: [{ title: "Automatizaciones — ZurplexAI" }] }),
  component: AutomationsPage,
});

function AutomationsPage() {
  const { t } = useAppI18n();
  const a18 = t.automations;
  return (
    <>
      <PageHeader title={a18.title} subtitle={a18.subtitle} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {automations.map((a) => (
          <div key={a.id} className="flex flex-col rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
                <Zap className="h-4 w-4" />
              </div>
              {a.status === "active" ? (
                <Badge tone="success">{a18.active}</Badge>
              ) : a.status === "premium" ? (
                <Badge tone="info">{a18.premium}</Badge>
              ) : (
                <Badge tone="default">{a18.comingSoon}</Badge>
              )}
            </div>
            <h3 className="mt-4 text-sm font-semibold">{a.name}</h3>
            <p className="mt-1 flex-1 text-xs text-muted-foreground">{a.desc}</p>
            <button
              className={`mt-4 h-9 rounded-md text-xs font-medium transition-colors ${
                a.status === "premium"
                  ? "border border-border bg-surface hover:bg-card"
                  : "bg-primary text-primary-foreground hover:bg-primary-hover"
              }`}
            >
              {a.status === "premium" ? a18.request : a.status === "active" ? a18.configure : a18.activate}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
