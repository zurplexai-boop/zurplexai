import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Linkedin,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>

      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <SystemSection />
        <HowItWorks />
        <Stats />
        <ForWho />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}


/* ---------- LANGUAGE SWITCHER ---------- */

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const first = listRef.current?.querySelector<HTMLButtonElement>('[role="option"]');
      first?.focus();
    }
  }, [open]);

  function handleListKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [],
    );
    const idx = items.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border/80 bg-surface/60 px-2.5 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.a11y.languageSwitcher}. ${t.a11y.currentLanguage}: ${current.label}`}
      >
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">{current.short}</span>
      </button>
      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-label={t.a11y.selectLanguage}
          onKeyDown={handleListKey}
          className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-md border border-border/80 bg-surface shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
        >
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                lang={l.code}
                onClick={() => {
                  setLang(l.code as Lang);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13px] transition-colors focus-visible:bg-card focus-visible:text-foreground ${
                  active
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground" aria-hidden="true">
                    {l.short}
                  </span>
                  {l.label}
                </span>
                {active && <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />}
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
    { label: t.nav.product, href: "#product" },
    { label: t.nav.howItWorks, href: "#how" },
    { label: t.nav.forWho, href: "#for-who" },
    { label: t.nav.team, href: "#team" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <LogoMark />
          <span className="truncate text-[15px] font-semibold tracking-tight">ZurplexAI</span>
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
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            {t.nav.signIn}
          </Link>
          <Link
            to="/onboarding"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover sm:px-3.5"
          >
            <span className="hidden sm:inline">{t.nav.contactSales}</span>
            <span className="sm:hidden">{t.nav.contactSales.split(" ")[0]}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-14 md:pb-28 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-[12px] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-sky" />
            {t.hero.badge}
            <ArrowUpRight className="h-3 w-3" />
          </span>
          <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[17px] leading-relaxed text-muted-foreground">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              to="/onboarding"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-transparent px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <HeroCanvas />
      </div>
    </section>
  );
}

function HeroCanvas() {
  const { t } = useI18n();
  return (
    <div className="relative mx-auto mt-12 max-w-5xl md:mt-20">
      <div className="rounded-xl border border-border/80 bg-surface/70 p-2 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_30px_80px_-30px_rgba(37,99,235,0.25)] backdrop-blur">
        <div className="overflow-hidden rounded-lg border border-border/70 bg-background">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5 sm:px-4">
            <div className="flex shrink-0 items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <div className="mx-auto hidden min-w-0 max-w-[60%] truncate rounded-md border border-border/60 bg-surface px-2.5 py-1 text-[11px] text-muted-foreground sm:block">
              {t.hero.url}
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-1.5 rounded-md border border-border/60 bg-surface px-2 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {t.hero.live}
            </div>
          </div>


          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {/* WhatsApp panel */}
            <div className="border-b border-border/60 p-5 md:border-b-0 md:border-r">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.02 0C5.4 0 .06 5.34.06 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.24-1.63a11.9 11.9 0 0 0 5.78 1.47h.01c6.62 0 11.96-5.34 11.96-11.96 0-3.2-1.24-6.2-3.47-8.4Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[12.5px] font-medium">{t.hero.chatHeader}</div>
                    <div className="text-[11px] text-muted-foreground">online</div>
                  </div>
                </div>
                <span className="rounded-full border border-border/60 bg-surface px-2 py-0.5 text-[11px] text-muted-foreground">
                  ZurplexAI
                </span>
              </div>

              <div className="space-y-2.5">
                <ChatBubble side="left">{t.hero.c1}</ChatBubble>
                <ChatBubble side="right" brand>{t.hero.b1}</ChatBubble>
                <ChatBubble side="left">{t.hero.c2}</ChatBubble>
                <ChatBubble side="right" brand>{t.hero.b2}</ChatBubble>
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[11.5px] font-medium text-primary-foreground">
                    {t.hero.payBtn}
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] text-success">
                <Check className="h-3 w-3" />
                {t.hero.registered}
              </div>
            </div>

            {/* Finance dashboard panel */}
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[12.5px] font-medium">{t.hero.dashTitle}</div>
                  <div className="text-[11px] text-muted-foreground">Nov · 2025</div>
                </div>
                <span className="flex items-center gap-1.5 rounded-md border border-border/60 bg-surface px-2 py-1 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {t.hero.live}
                </span>
              </div>

              <div className="space-y-3">
                <MetricCard label={t.hero.income} value="$1.284.500" delta="+18%" tone="success" pct={82} />
                <MetricCard label={t.hero.expenses} value="$412.300" delta="−4%" tone="danger" pct={34} />
                <MetricCard label={t.hero.margin} value="$872.200" delta="68%" tone="foreground" pct={68} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({
  side,
  brand,
  children,
}: {
  side: "left" | "right";
  brand?: boolean;
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-[12px] leading-snug ${
          isRight
            ? brand
              ? "bg-primary/15 text-foreground border border-primary/25"
              : "bg-surface text-foreground border border-border/70"
            : "bg-card text-foreground border border-border/60"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  delta,
  tone,
  pct,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "success" | "danger" | "foreground";
  pct: number;
}) {
  const color =
    tone === "success" ? "text-success" : tone === "danger" ? "text-[color:oklch(0.72_0.16_25)]" : "text-foreground";
  const bar =
    tone === "success" ? "bg-success" : tone === "danger" ? "bg-[color:oklch(0.72_0.16_25)]" : "bg-primary";
  return (
    <div className="rounded-md border border-border/70 bg-surface/70 p-3">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className={`text-[11px] font-medium ${color}`}>{delta}</div>
      </div>
      <div className={`mt-1 font-mono text-[15px] tracking-tight ${color}`}>{value}</div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border/60">
        <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---------- SYSTEM (Section 2) ---------- */

function SystemSection() {
  const { t } = useI18n();
  return (
    <section id="product" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-28">
        <div className="max-w-2xl">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            {t.system.kicker}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t.system.title}
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            {t.system.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-3">
          {t.system.cards.map((c, i) => (
            <div key={c.title} className="bg-background p-8 transition-colors hover:bg-surface/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-surface font-mono text-[12px] text-accent-sky">
                0{i + 1}
              </div>
              <h3 className="mt-6 text-[16px] font-medium tracking-tight">{c.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS (Section 3) ---------- */

function HowItWorks() {
  const { t } = useI18n();
  return (
    <section id="how" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-28">
        <div className="max-w-2xl">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            {t.how.kicker}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t.how.title}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-4">
          {t.how.steps.map((step, i) => (
            <div key={i} className="relative rounded-xl border border-border/70 bg-surface/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background font-mono text-[12px] text-accent-sky">
                  {i + 1}
                </div>
                {i < 3 && (
                  <ArrowRight className="hidden h-4 w-4 text-muted-foreground/60 md:block" />
                )}
              </div>
              <p className="mt-6 text-[14px] leading-relaxed text-foreground/90">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */

function Stats() {
  const { t } = useI18n();
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-4">
          {t.stats.items.map((s) => (
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

/* ---------- FOR WHO ---------- */

function ForWho() {
  const { t } = useI18n();
  return (
    <section id="for-who" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-28">
        <div className="max-w-3xl">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            {t.who.kicker}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t.who.title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
            {t.who.body}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2.5">
          {t.who.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-4 py-2 text-[13px] text-foreground/90 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-sky" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TEAM ---------- */

function Team() {
  const { t } = useI18n();
  return (
    <section id="team" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-28">
        <div className="max-w-2xl">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            {t.team.kicker}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t.team.title}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {t.team.members.map((m) => (
            <div
              key={m.name}
              className="group flex items-center gap-4 rounded-xl border border-border/70 bg-surface/50 p-5 transition-colors hover:border-border"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-card to-background">
                <User className="h-8 w-8 text-muted-foreground/60" strokeWidth={1.4} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-medium tracking-tight">{m.name}</div>
                <div className="mt-0.5 text-[12.5px] text-muted-foreground">{m.role}</div>
              </div>
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn — ${m.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          ))}
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
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-14 md:py-20 md:py-32 text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
          {t.cta.subtitle}
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            to="/onboarding"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {t.cta.primary}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
          >
            {t.cta.secondary}
          </Link>
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
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
