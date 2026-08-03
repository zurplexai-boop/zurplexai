import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Card, PageHeader } from "@/components/app/ui";
import { businessName } from "@/lib/mock-data";
import { useAppI18n, type AppLang } from "@/lib/app-i18n";
import { useMockStore, type DemoDataMode } from "@/lib/mock-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Configuración — ZurplexAI" }] }),
  component: SettingsPage,
});

const langOptions: { code: AppLang; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "pt", label: "Português (BR)" },
];

function SettingsPage() {
  const { t, lang, setLang } = useAppI18n();
  const { dataMode, setDataMode } = useMockStore();
  const s = t.settings;
  const dataModeOptions: { mode: DemoDataMode; label: string }[] = [
    { mode: "sample", label: s.sampleData },
    { mode: "empty", label: s.emptyData },
  ];

  return (
    <>
      <PageHeader title={s.title} subtitle={s.subtitle} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title={s.business}>
          <div className="space-y-3 text-sm">
            <Row label={s.businessNameLabel} value={businessName} />
            <Row label={s.country} value="Brasil" />
            <Row label={s.currency} value="BRL (R$)" />
            <Row label={s.businessType} value="Alimentación" />
          </div>
        </Card>

        <Card title={s.langAndNotif}>
          <div className="space-y-3 text-sm">
            <div className="border-b border-border/60 pb-3">
              <span className="text-muted-foreground">{s.language}</span>
              <div
                role="group"
                aria-label={s.language}
                className="mt-2 inline-flex overflow-hidden rounded-md border border-border bg-surface text-xs font-medium"
              >
                {langOptions.map((o) => (
                  <button
                    key={o.code}
                    type="button"
                    aria-pressed={lang === o.code}
                    onClick={() => setLang(o.code)}
                    className={cn(
                      "px-3 py-1.5 transition-colors",
                      lang === o.code
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <Row label={s.emailNotif} value={s.enabled} />
            <Row label={s.marginAlerts} value={s.enabled} />
          </div>
        </Card>

        <Card title={s.demoData}>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.demoDataDescription}</p>
          <div
            role="group"
            aria-label={s.demoData}
            className="mt-3 inline-flex overflow-hidden rounded-md border border-border bg-surface text-xs font-medium"
          >
            {dataModeOptions.map((o) => (
              <button
                key={o.mode}
                type="button"
                aria-pressed={dataMode === o.mode}
                onClick={() => setDataMode(o.mode)}
                className={cn(
                  "px-3 py-2 transition-colors",
                  dataMode === o.mode
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Card>

        <Card title={s.salesChannels}>
          <div className="flex flex-wrap gap-2">
            {["WhatsApp", "Instagram", "Tienda física", "Sitio web"].map((c) => (
              <span key={c} className="rounded-full border border-border bg-surface px-3 py-1 text-xs">
                {c}
              </span>
            ))}
          </div>
        </Card>

        <Card title={s.security}>
          <div className="space-y-3 text-sm">
            <Row label={s.twoFA} value={s.disabled} />
            <Row label={s.activeSessions} value="1" />
            <button className="mt-2 h-9 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card">
              {s.changePassword}
            </button>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.currentPlan}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {s.plans.map((p, i) => {
            const current = i === 1;
            return (
              <div
                key={p.name}
                className={`rounded-xl border p-5 ${
                  current ? "border-primary bg-primary/5 ring-1 ring-primary/40" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  {current && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[11px] text-accent-sky">{s.current}</span>}
                </div>
                <div className="mt-2 text-2xl font-bold">
                  {p.price} <span className="text-xs font-normal text-muted-foreground">{s.perMonth}</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled={current}
                  className={`mt-5 h-9 w-full rounded-md text-xs font-medium ${
                    current
                      ? "cursor-default border border-border bg-surface text-muted-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary-hover"
                  }`}
                >
                  {current ? `${s.currentPlan}` : `${s.switchTo} ${p.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
