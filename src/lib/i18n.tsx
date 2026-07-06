import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "pt";

type Dict = {
  nav: {
    product: string;
    howItWorks: string;
    forWho: string;
    team: string;
    signIn: string;
    contactSales: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    url: string;
    live: string;
    chatHeader: string;
    c1: string;
    b1: string;
    c2: string;
    b2: string;
    payBtn: string;
    registered: string;
    dashTitle: string;
    income: string;
    expenses: string;
    margin: string;
  };
  system: {
    kicker: string;
    title: string;
    subtitle: string;
    cards: { title: string; body: string }[];
  };
  how: {
    kicker: string;
    title: string;
    steps: string[];
  };
  stats: { items: { v: string; l: string }[] };
  who: {
    kicker: string;
    title: string;
    body: string;
    tags: string[];
  };
  team: {
    kicker: string;
    title: string;
    members: { name: string; role: string; linkedin?: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tagline: string;
    cols: { title: string; links: string[] }[];
    rights: string;
    privacy: string;
    terms: string;
    status: string;
  };
};

const linkedins = [
  "https://www.linkedin.com/in/agustinmarteau/",
  "https://www.linkedin.com/in/mariano-budeguer-4a8017212/",
  undefined,
];

const es: Dict = {
  nav: {
    product: "Producto",
    howItWorks: "Cómo funciona",
    forWho: "Para quién",
    team: "Equipo",
    signIn: "Iniciar sesión",
    contactSales: "Empezar ahora",
  },
  hero: {
    badge: "Para negocios que venden por WhatsApp e Instagram",
    title: "La estructura de tu crecimiento.",
    subtitle:
      "ZurplexAI automatiza tus procesos, organiza tus finanzas y construye tu presencia digital — para que puedas enfocarte en crecer, no en apagar incendios.",
    ctaPrimary: "Empezar ahora",
    ctaSecondary: "Hablar con el equipo",
    url: "app.zurplexai.com/mi-negocio",
    live: "Live",
    chatHeader: "WhatsApp Business",
    c1: "Hola, ¿tienen la remera negra talle M?",
    b1: "¡Hola! Sí, tenemos stock ✓. Precio: $8.500. ¿Te la reservo?",
    c2: "Sí, dale",
    b2: "¡Perfecto! Te mando el link de pago 👇",
    payBtn: "Pagar ahora",
    registered: "Venta registrada automáticamente",
    dashTitle: "Resumen del mes",
    income: "Ingresos",
    expenses: "Gastos",
    margin: "Margen neto",
  },
  system: {
    kicker: "Para emprendedores y comerciantes",
    title: "Un solo sistema. Todo lo que tu negocio necesita.",
    subtitle:
      "ZurplexAI reemplaza las tareas manuales, la planilla de Excel y el caos operativo por un ecosistema inteligente que trabaja solo.",
    cards: [
      {
        title: "Automatización de procesos",
        body: "Tu equipo registra la información una sola vez. El sistema verifica, notifica y reporta errores antes de que ocurran. Menos retrabajo, más capacidad.",
      },
      {
        title: "Control financiero inteligente",
        body: "Sabé exactamente cuánto ganás, en qué gastás y dónde recortar. Lectura automática de facturas, informes mensuales y control de stock en tiempo real.",
      },
      {
        title: "Presencia digital y marketing",
        body: "Sitio web con IA integrada, chatbot que atiende y vende 24 horas, y automatizaciones de marketing para atraer y convertir clientes.",
      },
    ],
  },
  how: {
    kicker: "Así funciona",
    title: "De la primera consulta al pago — sin intervención manual.",
    steps: [
      "El cliente escribe por WhatsApp o Instagram",
      "ZurplexAI responde, asesora y cierra la venta",
      "El pago se procesa y el pedido queda registrado",
      "Ves tus números en tiempo real",
    ],
  },
  stats: {
    items: [
      { v: "−80%", l: "tiempo en tareas manuales" },
      { v: "+40%", l: "capacidad de atención sin sumar personal" },
      { v: "Día 1", l: "con datos financieros reales" },
      { v: "30 días", l: "para estar operativo" },
    ],
  },
  who: {
    kicker: "Para quién es",
    title: "Construido para emprendedores y comerciantes que quieren crecer con estructura.",
    body: "Si vendés por WhatsApp, Instagram o en tu local físico y querés dejar de perder tiempo y plata en procesos manuales — ZurplexAI es para vos.",
    tags: [
      "Social Commerce",
      "Moda e indumentaria",
      "Estética y belleza",
      "Perfumería",
      "Tecnología",
      "Importadores",
      "Emprendedores",
    ],
  },
  team: {
    kicker: "Las personas detrás del proyecto",
    title: "Construido por personas reales, para negocios reales.",
    members: [
      { name: "Agustín Marteau", role: "Co-Fundador · Tecnología", linkedin: linkedins[0] },
      { name: "Mariano Budeguer", role: "Co-Fundador · Operaciones", linkedin: linkedins[1] },
      { name: "Cauã Sabino", role: "Co-Fundador · Finanzas y Brasil" },
    ],
  },
  cta: {
    title: "Tu negocio merece trabajar en automático.",
    subtitle:
      "Hablá con nuestro equipo sobre tu operación. En 30 días podés estar funcionando.",
    primary: "Empezar ahora",
    secondary: "Ver documentación",
  },
  footer: {
    tagline:
      "ZurplexAI — Intelligent infrastructure for entrepreneurs. Built in Latin America. Deployed globally.",
    cols: [
      { title: "Producto", links: ["Resumen", "Automatizaciones", "Finanzas", "Presencia digital"] },
      { title: "Empresa", links: ["Sobre nosotros", "Equipo", "Contacto"] },
      { title: "Recursos", links: ["Documentación", "Guías", "Soporte"] },
    ],
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
    status: "Todos los sistemas operativos",
  },
};

const pt: Dict = {
  nav: {
    product: "Produto",
    howItWorks: "Como funciona",
    forWho: "Para quem",
    team: "Equipe",
    signIn: "Entrar",
    contactSales: "Começar agora",
  },
  hero: {
    badge: "Para negócios que vendem pelo WhatsApp e Instagram",
    title: "A estrutura do seu crescimento.",
    subtitle:
      "ZurplexAI automatiza seus processos, organiza suas finanças e constrói sua presença digital — para que você foque em crescer, não em apagar incêndios.",
    ctaPrimary: "Começar agora",
    ctaSecondary: "Falar com a equipe",
    url: "app.zurplexai.com/mi-negocio",
    live: "Live",
    chatHeader: "WhatsApp Business",
    c1: "Oi, vocês têm a camiseta preta tamanho M?",
    b1: "Oi! Sim, temos em estoque ✓. Preço: R$ 89. Posso reservar pra você?",
    c2: "Sim, pode",
    b2: "Perfeito! Te mando o link de pagamento 👇",
    payBtn: "Pagar agora",
    registered: "Venda registrada automaticamente",
    dashTitle: "Resumo do mês",
    income: "Receitas",
    expenses: "Despesas",
    margin: "Margem líquida",
  },
  system: {
    kicker: "Para empreendedores e comerciantes",
    title: "Um só sistema. Tudo o que seu negócio precisa.",
    subtitle:
      "ZurplexAI substitui as tarefas manuais, a planilha de Excel e o caos operacional por um ecossistema inteligente que trabalha sozinho.",
    cards: [
      {
        title: "Automação de processos",
        body: "Sua equipe registra a informação uma única vez. O sistema verifica, notifica e reporta erros antes que aconteçam. Menos retrabalho, mais capacidade.",
      },
      {
        title: "Controle financeiro inteligente",
        body: "Saiba exatamente quanto você ganha, onde gasta e onde cortar. Leitura automática de notas, relatórios mensais e controle de estoque em tempo real.",
      },
      {
        title: "Presença digital e marketing",
        body: "Site com IA integrada, chatbot que atende e vende 24 horas, e automações de marketing para atrair e converter clientes.",
      },
    ],
  },
  how: {
    kicker: "Como funciona",
    title: "Da primeira mensagem ao pagamento — sem intervenção manual.",
    steps: [
      "O cliente manda mensagem pelo WhatsApp ou Instagram",
      "ZurplexAI responde, orienta e fecha a venda",
      "O pagamento é processado e o pedido fica registrado",
      "Você vê seus números em tempo real",
    ],
  },
  stats: {
    items: [
      { v: "−80%", l: "tempo em tarefas manuais" },
      { v: "+40%", l: "capacidade de atendimento sem contratar" },
      { v: "Dia 1", l: "com dados financeiros reais" },
      { v: "30 dias", l: "para estar operacional" },
    ],
  },
  who: {
    kicker: "Para quem é",
    title: "Construído para empreendedores e comerciantes que querem crescer com estrutura.",
    body: "Se você vende pelo WhatsApp, Instagram ou na sua loja física e quer parar de perder tempo e dinheiro em processos manuais — ZurplexAI é para você.",
    tags: [
      "Social Commerce",
      "Moda",
      "Estética e Beleza",
      "Perfumaria",
      "Tecnologia",
      "Importadores",
      "Empreendedores",
    ],
  },
  team: {
    kicker: "As pessoas por trás do projeto",
    title: "Construído por pessoas reais, para negócios reais.",
    members: [
      { name: "Agustín Marteau", role: "Co-Fundador · Tecnologia", linkedin: linkedins[0] },
      { name: "Mariano Budeguer", role: "Co-Fundador · Operações", linkedin: linkedins[1] },
      { name: "Cauã Sabino", role: "Co-Fundador · Finanças e Brasil" },
    ],
  },
  cta: {
    title: "Seu negócio merece trabalhar no automático.",
    subtitle:
      "Fale com nossa equipe sobre sua operação. Em 30 dias você pode estar funcionando.",
    primary: "Começar agora",
    secondary: "Ver documentação",
  },
  footer: {
    tagline:
      "ZurplexAI — Intelligent infrastructure for entrepreneurs. Built in Latin America. Deployed globally.",
    cols: [
      { title: "Produto", links: ["Visão geral", "Automações", "Finanças", "Presença digital"] },
      { title: "Empresa", links: ["Sobre nós", "Equipe", "Contato"] },
      { title: "Recursos", links: ["Documentação", "Guias", "Suporte"] },
    ],
    rights: "Todos os direitos reservados.",
    privacy: "Privacidade",
    terms: "Termos",
    status: "Todos os sistemas operacionais",
  },
};

const dicts: Record<Lang, Dict> = { es, pt };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (window.localStorage.getItem("zurplex-lang") as Lang | null)
        : null;
    if (stored === "es" || stored === "pt") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("zurplex-lang", l);
      document.documentElement.lang = l;
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português (BR)", short: "PT" },
];
