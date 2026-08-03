import { createFileRoute } from "@tanstack/react-router";
import { Paperclip } from "lucide-react";
import { Card, PageHeader } from "@/components/app/ui";
import { useAppI18n } from "@/lib/app-i18n";

export const Route = createFileRoute("/app/support")({
  head: () => ({ meta: [{ title: "Soporte — ZurplexAI" }] }),
  component: SupportPage,
});

function SupportPage() {
  const { t } = useAppI18n();
  const s = t.support;
  return (
    <>
      <PageHeader title={s.title} subtitle={s.subtitle} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {s.shortcuts.map((x) => (
          <button key={x.title} className="rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50">
            <h3 className="text-sm font-semibold">{x.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{x.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Card title={s.newRequest}>
          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-3">
            <label className="col-span-2 block">
              <span className="text-[11px] font-medium text-muted-foreground">{s.subject}</span>
              <input className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-medium text-muted-foreground">{t.common.type}</span>
              <select className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                {s.types.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-medium text-muted-foreground">{s.priority}</span>
              <select className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                <option>{t.common.low}</option>
                <option>{t.common.medium}</option>
                <option>{t.common.high}</option>
              </select>
            </label>
            <label className="col-span-2 block">
              <span className="text-[11px] font-medium text-muted-foreground">{s.message}</span>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </label>
            <div className="col-span-2 flex flex-wrap items-center justify-between gap-2">
              <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                <Paperclip className="h-3.5 w-3.5" /> {s.attach}
              </button>
              <button type="submit" className="h-9 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary-hover">
                {s.send}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
