import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Cpu,
  Gauge,
  Globe,
  Layers,
  LineChart,
  Lock,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Nav />
      <main>
        <Hero />
        <LogoCloud />
        <Platform />
        <Product />
        <Metrics />
        <Enterprise />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- LANGUAGE SWITCHER ---------- */

function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border/80 bg-surface/60 px-2.5 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{current.short}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-md border border-border/80 bg-surface shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
        >
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(l.code as Lang);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13px] transition-colors ${
                  active
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{l.short}</span>
                  {l.label}
                </span>
                {active && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- NAV ---------- */

function Nav() {
  const { t } = useI18n();
  const links = [
    { label: t.nav.platform, href: "#platform" },
    { label: t.nav.product, href: "#product" },
    { label: t.nav.enterprise, href: "#enterprise" },
    { label: t.nav.docs, href: "#" },
    { label: t.nav.customers, href: "#" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight">ZurplexAI</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#"
            className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            {t.nav.signIn}
          </a>
          <a
            href="#cta"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3.5 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {t.nav.contactSales}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-7 w-7 items-center justify-center rounded-md border border-border/80 bg-surface">
      <div className="h-2.5 w-2.5 rounded-[3px] bg-primary" />
      <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent-sky/80" />
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-radial-glow opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-[12px] text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-sky" />
            {t.hero.badge}
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <h1 className="mt-8 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {t.hero.title1}
            <br />
            <span className="text-muted-foreground">{t.hero.title2}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-muted-foreground">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="#cta"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#platform"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-transparent px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <HeroCanvas />
      </div>
    </section>
  );
}

function HeroCanvas() {
  const { t } = useI18n();
  const nav = [
    { i: Layers, l: t.hero.workflows, active: true },
    { i: Boxes, l: t.hero.models },
    { i: Workflow, l: t.hero.pipelines },
    { i: LineChart, l: t.hero.observability },
    { i: Lock, l: t.hero.governance },
  ];
  const steps = [
    { l: t.hero.steps.ingest, s: t.hero.stepSubs.ingest },
    { l: t.hero.steps.enrich, s: t.hero.stepSubs.enrich },
    { l: t.hero.steps.decide, s: t.hero.stepSubs.decide },
    { l: t.hero.steps.deliver, s: t.hero.stepSubs.deliver },
  ];
  const metrics = [
    { l: t.hero.metrics.latency, v: "184 ms" },
    { l: t.hero.metrics.throughput, v: "8.2k / s" },
    { l: t.hero.metrics.accuracy, v: "99.4%" },
  ];
  return (
    <div className="relative mx-auto mt-20 max-w-5xl">
      <div className="rounded-xl border border-border/80 bg-surface/70 p-2 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_30px_80px_-30px_rgba(37,99,235,0.25)] backdrop-blur">
        <div className="overflow-hidden rounded-lg border border-border/70 bg-background">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <div className="rounded-md border border-border/60 bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
              {t.hero.liveUrl}
            </div>
            <div className="text-[11px] text-muted-foreground">{t.hero.live}</div>
          </div>

          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-3 border-r border-border/60 p-4">
              <div className="mb-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {t.hero.workspace}
              </div>
              {nav.map(({ i: Icon, l, active }) => (
                <div
                  key={l}
                  className={`mb-1 flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12px] ${
                    active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-surface"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {l}
                  {active && <span className="ml-auto h-1 w-1 rounded-full bg-primary" />}
                </div>
              ))}
            </div>

            <div className="col-span-9 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium">{t.hero.pipelineTitle}</div>
                  <div className="text-[11px] text-muted-foreground">{t.hero.lastRun}</div>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-1.5 rounded-md border border-border/60 bg-surface px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {t.hero.healthy}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {steps.map((n, i) => (
                  <div key={n.l} className="relative rounded-md border border-border/70 bg-surface/70 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-6 w-6 items-center justify-center rounded border border-border/70 bg-background text-[10px] font-medium text-muted-foreground">
                        {i + 1}
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-sky" />
                    </div>
                    <div className="text-[12px] font-medium">{n.l}</div>
                    <div className="mt-0.5 text-[10.5px] text-muted-foreground">{n.s}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {metrics.map((m) => (
                  <div key={m.l} className="rounded-md border border-border/70 bg-surface/70 p-3">
                    <div className="text-[10.5px] uppercase tracking-wide text-muted-foreground">{m.l}</div>
                    <div className="mt-1 font-mono text-[15px] tracking-tight">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- LOGO CLOUD ---------- */

function LogoCloud() {
  const { t } = useI18n();
  const logos = ["Aurelia", "Northwind", "Vector Bank", "Kepler", "Meridian", "Halcyon"];
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-center text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          {t.logos.trusted}
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 md:grid-cols-6">
          {logos.map((l) => (
            <div key={l} className="text-center text-[15px] font-medium tracking-tight text-muted-foreground/80">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PLATFORM ---------- */

function Platform() {
  const { t } = useI18n();
  const icons = [Cpu, Workflow, Layers, LineChart, Lock, Gauge];
  return (
    <section id="platform" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent-sky" />
            {t.platform.eyebrow}
          </div>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {t.platform.title}
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            {t.platform.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-2 lg:grid-cols-3">
          {t.platform.features.map((f, idx) => {
            const Icon = icons[idx] ?? Cpu;
            return (
              <div key={f.title} className="group bg-background p-8 transition-colors hover:bg-surface/60">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-surface">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="mt-6 text-[15px] font-medium tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRODUCT ---------- */

function Product() {
  const { t } = useI18n();
  return (
    <section id="product" className="border-b border-border/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-28 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            {t.product.eyebrow}
          </div>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {t.product.title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
            {t.product.subtitle}
          </p>
          <ul className="mt-8 space-y-3.5">
            {t.product.bullets.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[14px] text-muted-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/70 bg-surface/70 p-2">
          <div className="overflow-hidden rounded-lg border border-border/60 bg-background">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
              <span className="font-mono">workflows/underwriting.ts</span>
              <span>TypeScript</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-foreground/90">
{`import { workflow, model } from "@zurplex/sdk";

export const underwrite = workflow("underwriting", {
  input: schema.application,
  steps: async (ctx, app) => {
    const risk = await model.reason({
      model: "zurplex/enterprise-v4",
      context: [app.financials, app.history],
    });

    if (risk.score > 0.82) return ctx.route("manual-review");

    return ctx.decide({
      approved: true,
      limit: risk.recommendedLimit,
      reasons: risk.explanation,
    });
  },
});`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- METRICS ---------- */

function Metrics() {
  const { t } = useI18n();
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-4">
          {t.metrics.items.map((s) => (
            <div key={s.l} className="bg-background p-8">
              <div className="font-mono text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                {s.v}
              </div>
              <div className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ENTERPRISE ---------- */

function Enterprise() {
  const { t } = useI18n();
  return (
    <section id="enterprise" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              {t.enterprise.eyebrow}
            </div>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {t.enterprise.title}
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
              {t.enterprise.subtitle}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#cta"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-[13.5px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {t.enterprise.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-[13.5px] font-medium text-foreground transition-colors hover:bg-surface"
              >
                {t.enterprise.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure className="rounded-xl border border-border/70 bg-surface/50 p-10">
              <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground md:text-[28px]">
                {t.enterprise.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-border bg-card" />
                <div>
                  <div className="text-[14px] font-medium">{t.enterprise.author}</div>
                  <div className="text-[12.5px] text-muted-foreground">{t.enterprise.role}</div>
                </div>
              </figcaption>
            </figure>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {t.enterprise.badges.map((b) => (
                <div
                  key={b}
                  className="rounded-md border border-border/70 bg-background px-4 py-3 text-center text-[12px] text-muted-foreground"
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  const { t } = useI18n();
  return (
    <section id="cta" className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <h2 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl">
          {t.cta.title1}
          <br />
          <span className="text-muted-foreground">{t.cta.title2}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
          {t.cta.subtitle}
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {t.cta.primary}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
          >
            {t.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[15px] font-semibold tracking-tight">ZurplexAI</span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>
          {t.footer.cols.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-medium tracking-tight text-foreground">{c.title}</div>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-[12px] text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} ZurplexAI, Inc. {t.footer.rights}</div>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">{t.footer.privacy}</a>
            <a href="#" className="transition-colors hover:text-foreground">{t.footer.terms}</a>
            <a href="#" className="transition-colors hover:text-foreground">{t.footer.security}</a>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {t.footer.status}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
