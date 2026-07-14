import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, ShoppingCart, Package, Users, Receipt, LineChart,
  Zap, Bell, LifeBuoy, Settings, Menu, X, Search, LogOut,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { AppI18nProvider, useAppI18n, type AppLang } from "@/lib/app-i18n";
import { businessName } from "@/lib/mock-data";
import { MockStoreProvider } from "@/lib/mock-store";
import { cn } from "@/lib/utils";

const items = [
  { to: "/app/dashboard", key: "dashboard" as const, Icon: LayoutDashboard },
  { to: "/app/sales", key: "sales" as const, Icon: ShoppingCart },
  { to: "/app/products", key: "products" as const, Icon: Package },
  { to: "/app/customers", key: "customers" as const, Icon: Users },
  { to: "/app/costs-expenses", key: "costs" as const, Icon: Receipt },
  { to: "/app/finance", key: "finance" as const, Icon: LineChart },
  { to: "/app/automations", key: "automations" as const, Icon: Zap },
  { to: "/app/alerts", key: "alerts" as const, Icon: Bell },
  { to: "/app/support", key: "support" as const, Icon: LifeBuoy },
  { to: "/app/settings", key: "settings" as const, Icon: Settings },
];

const bottomItems = items.slice(0, 5);

function LangToggle() {
  const { lang, setLang } = useAppI18n();
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-border bg-surface text-[11px] font-medium">
      {(["es", "pt"] as AppLang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "px-2 py-1 uppercase transition-colors",
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useAppI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5 p-3">
      {items.map(({ to, key, Icon }) => {
        const active = pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary/10 text-foreground ring-1 ring-primary/30"
                : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="truncate">{t.nav[key]}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function InnerLayout({ children }: { children: ReactNode }) {
  const { t } = useAppI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur sm:px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-foreground lg:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/app/dashboard" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
            <span className="text-[11px] font-bold">Z</span>
          </div>
          <span className="hidden text-sm font-semibold sm:inline">ZurplexAI</span>
        </Link>
        <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
        <span className="hidden truncate text-sm text-muted-foreground sm:inline">{businessName}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder={t.common.search}
              className="h-8 w-56 rounded-md border border-border bg-surface pl-8 pr-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <LangToggle />
          <Link
            to="/app/alerts"
            className="relative rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label={t.common.notifications}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
          </Link>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-surface text-xs font-semibold ring-1 ring-border">
            A
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 border-r border-border bg-background lg:block">
          <SidebarNav />
          <div className="mt-auto p-3">
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              {t.common.logout}
            </Link>
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 left-0 w-72 border-r border-border bg-background"
            >
              <div className="flex items-center justify-between border-b border-border p-3">
                <span className="text-sm font-semibold">ZurplexAI</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-2 text-muted-foreground hover:bg-surface"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 pb-20 lg:pb-8">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">{children}</div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        {bottomItems.map(({ to, key, Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 text-[10px]",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate">{t.nav[key]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AppLayout() {
  return (
    <AppI18nProvider>
      <MockStoreProvider>
        <InnerLayout>
          <Outlet />
        </InnerLayout>
      </MockStoreProvider>
    </AppI18nProvider>
  );
}
