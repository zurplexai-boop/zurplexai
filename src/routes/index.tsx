import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Cpu,
  Gauge,
  Layers,
  LineChart,
  Lock,
  Sparkles,
  Workflow,
} from "lucide-react";

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

/* ---------- NAV ---------- */

function Nav() {
  const links = [
    { label: "Platform", href: "#platform" },
    { label: "Product", href: "#product" },
    { label: "Enterprise", href: "#enterprise" },
    { label: "Docs", href: "#" },
    { label: "Customers", href: "#" },
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
          <a
            href="#"
            className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3.5 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Contact sales
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
            Introducing ZurplexAI Platform 2.0
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <h1 className="mt-8 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Intelligent infrastructure
            <br />
            <span className="text-muted-foreground">for modern enterprises.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-muted-foreground">
            ZurplexAI is the platform enterprises use to design, deploy and scale AI
            systems, automations and internal software — with the reliability of
            infrastructure and the ergonomics of modern product.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="#cta"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Start building
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#platform"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-transparent px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
            >
              Talk to an engineer
            </a>
          </div>
        </div>

        <HeroCanvas />
      </div>
    </section>
  );
}

function HeroCanvas() {
  return (
    <div className="relative mx-auto mt-20 max-w-5xl">
      <div className="rounded-xl border border-border/80 bg-surface/70 p-2 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_30px_80px_-30px_rgba(37,99,235,0.25)] backdrop-blur">
        <div className="overflow-hidden rounded-lg border border-border/70 bg-background">
          {/* window chrome */}
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <div className="rounded-md border border-border/60 bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
              app.zurplex.ai / workflows / customer-intelligence
            </div>
            <div className="text-[11px] text-muted-foreground">live</div>
          </div>

          <div className="grid grid-cols-12 gap-0">
            {/* sidebar */}
            <div className="col-span-3 border-r border-border/60 p-4">
              <div className="mb-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Workspace
              </div>
              {[
                { i: Layers, l: "Workflows", active: true },
                { i: Boxes, l: "Models" },
                { i: Workflow, l: "Pipelines" },
                { i: LineChart, l: "Observability" },
                { i: Lock, l: "Governance" },
              ].map(({ i: Icon, l, active }) => (
                <div
                  key={l}
                  className={`mb-1 flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12px] ${
                    active
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-surface"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {l}
                  {active && <span className="ml-auto h-1 w-1 rounded-full bg-primary" />}
                </div>
              ))}
            </div>

            {/* main canvas */}
            <div className="col-span-9 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium">Customer intelligence pipeline</div>
                  <div className="text-[11px] text-muted-foreground">
                    Last run · 2m ago · 12,483 events processed
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-1.5 rounded-md border border-border/60 bg-surface px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Healthy
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { l: "Ingest", s: "Kafka · Snowflake" },
                  { l: "Enrich", s: "ZurplexAI Model v4" },
                  { l: "Decide", s: "Policy engine" },
                  { l: "Deliver", s: "CRM · API · Slack" },
                ].map((n, i) => (
                  <div
                    key={n.l}
                    className="relative rounded-md border border-border/70 bg-surface/70 p-3"
                  >
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
                {[
                  { l: "Latency p95", v: "184 ms" },
                  { l: "Throughput", v: "8.2k / s" },
                  { l: "Accuracy", v: "99.4%" },
                ].map((m) => (
                  <div key={m.l} className="rounded-md border border-border/70 bg-surface/70 p-3">
                    <div className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                      {m.l}
                    </div>
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
  const logos = ["Aurelia", "Northwind", "Vector Bank", "Kepler", "Meridian", "Halcyon"];
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-center text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by engineering teams at
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 md:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l}
              className="text-center text-[15px] font-medium tracking-tight text-muted-foreground/80"
            >
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
  const features = [
    {
      icon: Cpu,
      title: "Model layer",
      body: "Bring your own models or use ZurplexAI's tuned foundation models. Unified inference, evaluation and routing across every provider.",
    },
    {
      icon: Workflow,
      title: "Workflow engine",
      body: "Deterministic, versioned workflows for the messy real world. Retries, guardrails, human-in-the-loop and full replay by default.",
    },
    {
      icon: Layers,
      title: "Data integrations",
      body: "First-class connectors for Snowflake, Postgres, Salesforce, SAP and any HTTP surface. Governed, cached and observable.",
    },
    {
      icon: LineChart,
      title: "Observability",
      body: "Traces, metrics and evals for every request. Understand what your systems decided, why, and where they can be trusted.",
    },
    {
      icon: Lock,
      title: "Governance",
      body: "Role-based access, audit trails, private networking and residency. Built for security and compliance teams from day one.",
    },
    {
      icon: Gauge,
      title: "Runtime",
      body: "A managed runtime engineered for low-latency, high-throughput workloads. Global by default, single-tenant when required.",
    },
  ];

  return (
    <section id="platform" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent-sky" />
            The platform
          </div>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            One platform. Every layer of your intelligent stack.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            ZurplexAI replaces a fragmented toolchain with a single, coherent
            foundation — from data ingestion to production inference.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-background p-8 transition-colors hover:bg-surface/60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-surface">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="mt-6 text-[15px] font-medium tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRODUCT (code + explanation) ---------- */

function Product() {
  return (
    <section id="product" className="border-b border-border/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-28 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            Built for engineers
          </div>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            A primitive, not a plugin.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
            ZurplexAI is designed to feel like infrastructure — typed SDKs,
            declarative configuration, first-class local development and
            production parity. Ship intelligent systems the same way you ship
            software.
          </p>
          <ul className="mt-8 space-y-3.5">
            {[
              "Typed SDKs for TypeScript, Python and Go",
              "Deterministic replay of every production run",
              "Preview environments for every pull request",
              "SOC 2 Type II, ISO 27001 and private VPC deployment",
            ].map((f) => (
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
  const stats = [
    { v: "99.99%", l: "Platform uptime, trailing 12 months" },
    { v: "180ms", l: "Median inference latency at p95" },
    { v: "40+", l: "Enterprise integrations, ready to deploy" },
    { v: "10x", l: "Faster iteration versus custom stacks" },
  ];
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-background p-8">
              <div className="font-mono text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                {s.v}
              </div>
              <div className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ENTERPRISE / QUOTE ---------- */

function Enterprise() {
  return (
    <section id="enterprise" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              Enterprise-grade
            </div>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Engineered for the companies shaping the next decade.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
              Financial institutions, insurers and industrial operators run
              mission-critical workloads on ZurplexAI — with the controls,
              residency and support their teams require.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#cta"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-[13.5px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Request a briefing
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-[13.5px] font-medium text-foreground transition-colors hover:bg-surface"
              >
                Read the security overview
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure className="rounded-xl border border-border/70 bg-surface/50 p-10">
              <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground md:text-[28px]">
                “ZurplexAI became the substrate for how we ship intelligent
                systems. It is the closest thing we have to an engineering
                team that never sleeps — and it is invisible when it should
                be.”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-border bg-card" />
                <div>
                  <div className="text-[14px] font-medium">Camila Herrera</div>
                  <div className="text-[12.5px] text-muted-foreground">
                    VP Engineering, Meridian Financial
                  </div>
                </div>
              </figcaption>
            </figure>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {["SOC 2 Type II", "ISO 27001", "GDPR & LATAM residency"].map((b) => (
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
  return (
    <section id="cta" className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <h2 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl">
          Build the intelligent
          <br />
          <span className="text-muted-foreground">layer of your company.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
          Talk to our engineering team about your architecture, workloads and
          timeline. Deployments typically go live in under 30 days.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Contact sales
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
          >
            Explore documentation
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  const cols = [
    {
      title: "Platform",
      links: ["Overview", "Models", "Workflows", "Observability", "Governance"],
    },
    {
      title: "Company",
      links: ["About", "Customers", "Careers", "Newsroom", "Contact"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Changelog", "Security", "Status", "Trust center"],
    },
  ];
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
              Intelligent infrastructure for modern enterprises. Built in Latin
              America. Deployed globally.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-medium tracking-tight text-foreground">
                {c.title}
              </div>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-[12px] text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} ZurplexAI, Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Security</a>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
