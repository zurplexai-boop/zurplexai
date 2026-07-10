import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AppLang = "es" | "pt";

type Dict = {
  nav: Record<
    | "dashboard" | "sales" | "products" | "customers" | "costs" | "finance"
    | "automations" | "alerts" | "support" | "settings",
    string
  >;
  common: {
    signIn: string;
    signUp: string;
    forgot: string;
    email: string;
    password: string;
    tagline: string;
    createPanel: string;
    logout: string;
    notifications: string;
    search: string;
    new: string;
    save: string;
    cancel: string;
    filter: string;
    date: string;
    amount: string;
    status: string;
    actions: string;
  };
};

const es: Dict = {
  nav: {
    dashboard: "Panel",
    sales: "Ventas",
    products: "Productos",
    customers: "Clientes",
    costs: "Costos y gastos",
    finance: "Finanzas",
    automations: "Automatizaciones",
    alerts: "Alertas",
    support: "Soporte",
    settings: "Configuración",
  },
  common: {
    signIn: "Entrar",
    signUp: "Crear cuenta",
    forgot: "Olvidé mi contraseña",
    email: "Email",
    password: "Contraseña",
    tagline: "La estructura de tu crecimiento.",
    createPanel: "Crear mi panel",
    logout: "Cerrar sesión",
    notifications: "Notificaciones",
    search: "Buscar",
    new: "Nuevo",
    save: "Guardar",
    cancel: "Cancelar",
    filter: "Filtrar",
    date: "Fecha",
    amount: "Valor",
    status: "Estado",
    actions: "Acciones",
  },
};

const pt: Dict = {
  nav: {
    dashboard: "Painel",
    sales: "Vendas",
    products: "Produtos",
    customers: "Clientes",
    costs: "Custos e despesas",
    finance: "Finanças",
    automations: "Automações",
    alerts: "Alertas",
    support: "Suporte",
    settings: "Configurações",
  },
  common: {
    signIn: "Entrar",
    signUp: "Criar conta",
    forgot: "Esqueci minha senha",
    email: "Email",
    password: "Senha",
    tagline: "A estrutura do seu crescimento.",
    createPanel: "Criar meu painel",
    logout: "Sair",
    notifications: "Notificações",
    search: "Buscar",
    new: "Novo",
    save: "Salvar",
    cancel: "Cancelar",
    filter: "Filtrar",
    date: "Data",
    amount: "Valor",
    status: "Status",
    actions: "Ações",
  },
};

const dicts: Record<AppLang, Dict> = { es, pt };

type Ctx = { lang: AppLang; setLang: (l: AppLang) => void; t: Dict };
const AppI18nContext = createContext<Ctx | null>(null);

export function AppI18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<AppLang>("es");
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (window.localStorage.getItem("zurplex-app-lang") as AppLang | null)
        : null;
    if (stored === "es" || stored === "pt") setLangState(stored);
  }, []);
  const setLang = (l: AppLang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("zurplex-app-lang", l);
    }
  };
  return (
    <AppI18nContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </AppI18nContext.Provider>
  );
}

export function useAppI18n() {
  const ctx = useContext(AppI18nContext);
  if (!ctx) throw new Error("useAppI18n must be used within AppI18nProvider");
  return ctx;
}
