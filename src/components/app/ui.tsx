import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:mb-8">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function StatCard({
  label,
  value,
  delta,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  tone?: "default" | "positive" | "negative" | "warning";
}) {
  const deltaColor =
    tone === "positive"
      ? "text-success"
      : tone === "negative"
        ? "text-destructive"
        : tone === "warning"
          ? "text-warning"
          : "text-muted-foreground";
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{value}</div>
      {delta ? <div className={cn("mt-1 text-xs font-medium", deltaColor)}>{delta}</div> : null}
      {hint ? <div className="mt-2 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

export function Card({
  title,
  actions,
  children,
  className,
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 sm:p-5", className)}>
      {(title || actions) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title ? <h2 className="text-sm font-semibold">{title}</h2> : <span />}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}) {
  const map = {
    default: "bg-surface text-muted-foreground ring-border",
    success: "bg-success/10 text-success ring-success/30",
    warning: "bg-warning/10 text-warning ring-warning/30",
    danger: "bg-destructive/10 text-destructive ring-destructive/30",
    info: "bg-primary/10 text-accent-sky ring-primary/30",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1",
        map[tone],
      )}
    >
      {children}
    </span>
  );
}
