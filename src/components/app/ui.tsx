import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

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

export function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl border border-border bg-card p-5 sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  className = "",
  ...props
}: { label: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </label>
  );
}

export function Select({
  label,
  options,
  className = "",
  ...props
}: {
  label: string;
  options: string[];
  className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      <select
        {...props}
        className="mt-1 h-9 w-full rounded-md border border-border bg-surface px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ModalActions({ onCancel, submitLabel = "Guardar" }: { onCancel: () => void; submitLabel?: string }) {
  return (
    <div className="col-span-2 mt-2 flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="h-9 rounded-md border border-border bg-surface px-3 text-xs font-medium hover:bg-card"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="h-9 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
      >
        {submitLabel}
      </button>
    </div>
  );
}
