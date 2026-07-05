import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es" | "pt";

type Dict = {
  nav: { platform: string; product: string; enterprise: string; docs: string; customers: string; signIn: string; contactSales: string };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    liveUrl: string;
    live: string;
    workspace: string;
    workflows: string;
    models: string;
    pipelines: string;
    observability: string;
    governance: string;
    pipelineTitle: string;
    lastRun: string;
    healthy: string;
    steps: { ingest: string; enrich: string; decide: string; deliver: string };
    stepSubs: { ingest: string; enrich: string; decide: string; deliver: string };
    metrics: { latency: string; throughput: string; accuracy: string };
  };
  logos: { trusted: string };
  platform: {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: { title: string; body: string }[];
  };
  product: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bullets: string[];
  };
  metrics: { items: { v: string; l: string }[] };
  enterprise: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    quote: string;
    author: string;
    role: string;
    badges: string[];
  };
  cta: {
    title1: string;
    title2: string;
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
    security: string;
    status: string;
  };
  langLabel: string;
};

const en: Dict = {
  nav: { platform: "Platform", product: "Product", enterprise: "Enterprise", docs: "Docs", customers: "Customers", signIn: "Sign in", contactSales: "Contact sales" },
  hero: {
    badge: "Introducing ZurplexAI Platform 2.0",
    title1: "Intelligent infrastructure",
    title2: "for modern enterprises.",
    subtitle: "ZurplexAI is the platform enterprises use to design, deploy and scale AI systems, automations and internal software — with the reliability of infrastructure and the ergonomics of modern product.",
    ctaPrimary: "Start building",
    ctaSecondary: "Talk to an engineer",
    liveUrl: "app.zurplex.ai / workflows / customer-intelligence",
    live: "live",
    workspace: "Workspace",
    workflows: "Workflows",
    models: "Models",
    pipelines: "Pipelines",
    observability: "Observability",
    governance: "Governance",
    pipelineTitle: "Customer intelligence pipeline",
    lastRun: "Last run · 2m ago · 12,483 events processed",
    healthy: "Healthy",
    steps: { ingest: "Ingest", enrich: "Enrich", decide: "Decide", deliver: "Deliver" },
    stepSubs: { ingest: "Kafka · Snowflake", enrich: "ZurplexAI Model v4", decide: "Policy engine", deliver: "CRM · API · Slack" },
    metrics: { latency: "Latency p95", throughput: "Throughput", accuracy: "Accuracy" },
  },
  logos: { trusted: "Trusted by engineering teams at" },
  platform: {
    eyebrow: "The platform",
    title: "One platform. Every layer of your intelligent stack.",
    subtitle: "ZurplexAI replaces a fragmented toolchain with a single, coherent foundation — from data ingestion to production inference.",
    features: [
      { title: "Model layer", body: "Bring your own models or use ZurplexAI's tuned foundation models. Unified inference, evaluation and routing across every provider." },
      { title: "Workflow engine", body: "Deterministic, versioned workflows for the messy real world. Retries, guardrails, human-in-the-loop and full replay by default." },
      { title: "Data integrations", body: "First-class connectors for Snowflake, Postgres, Salesforce, SAP and any HTTP surface. Governed, cached and observable." },
      { title: "Observability", body: "Traces, metrics and evals for every request. Understand what your systems decided, why, and where they can be trusted." },
      { title: "Governance", body: "Role-based access, audit trails, private networking and residency. Built for security and compliance teams from day one." },
      { title: "Runtime", body: "A managed runtime engineered for low-latency, high-throughput workloads. Global by default, single-tenant when required." },
    ],
  },
  product: {
    eyebrow: "Built for engineers",
    title: "A primitive, not a plugin.",
    subtitle: "ZurplexAI is designed to feel like infrastructure — typed SDKs, declarative configuration, first-class local development and production parity. Ship intelligent systems the same way you ship software.",
    bullets: [
      "Typed SDKs for TypeScript, Python and Go",
      "Deterministic replay of every production run",
      "Preview environments for every pull request",
      "SOC 2 Type II, ISO 27001 and private VPC deployment",
    ],
  },
  metrics: {
    items: [
      { v: "99.99%", l: "Platform uptime, trailing 12 months" },
      { v: "180ms", l: "Median inference latency at p95" },
      { v: "40+", l: "Enterprise integrations, ready to deploy" },
      { v: "10x", l: "Faster iteration versus custom stacks" },
    ],
  },
  enterprise: {
    eyebrow: "Enterprise-grade",
    title: "Engineered for the companies shaping the next decade.",
    subtitle: "Financial institutions, insurers and industrial operators run mission-critical workloads on ZurplexAI — with the controls, residency and support their teams require.",
    ctaPrimary: "Request a briefing",
    ctaSecondary: "Read the security overview",
    quote: "“ZurplexAI became the substrate for how we ship intelligent systems. It is the closest thing we have to an engineering team that never sleeps — and it is invisible when it should be.”",
    author: "Camila Herrera",
    role: "VP Engineering, Meridian Financial",
    badges: ["SOC 2 Type II", "ISO 27001", "GDPR & LATAM residency"],
  },
  cta: {
    title1: "Build the intelligent",
    title2: "layer of your company.",
    subtitle: "Talk to our engineering team about your architecture, workloads and timeline. Deployments typically go live in under 30 days.",
    primary: "Contact sales",
    secondary: "Explore documentation",
  },
  footer: {
    tagline: "Intelligent infrastructure for modern enterprises. Built in Latin America. Deployed globally.",
    cols: [
      { title: "Platform", links: ["Overview", "Models", "Workflows", "Observability", "Governance"] },
      { title: "Company", links: ["About", "Customers", "Careers", "Newsroom", "Contact"] },
      { title: "Resources", links: ["Documentation", "Changelog", "Security", "Status", "Trust center"] },
    ],
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    security: "Security",
    status: "All systems operational",
  },
  langLabel: "Language",
};

const es: Dict = {
  nav: { platform: "Plataforma", product: "Producto", enterprise: "Empresa", docs: "Docs", customers: "Clientes", signIn: "Iniciar sesión", contactSales: "Contactar ventas" },
  hero: {
    badge: "Presentamos ZurplexAI Platform 2.0",
    title1: "Infraestructura inteligente",
    title2: "para empresas modernas.",
    subtitle: "ZurplexAI es la plataforma que las empresas utilizan para diseñar, desplegar y escalar sistemas de IA, automatizaciones y software interno — con la fiabilidad de la infraestructura y la ergonomía del producto moderno.",
    ctaPrimary: "Empezar a construir",
    ctaSecondary: "Hablar con un ingeniero",
    liveUrl: "app.zurplex.ai / flujos / inteligencia-de-clientes",
    live: "en vivo",
    workspace: "Espacio de trabajo",
    workflows: "Flujos",
    models: "Modelos",
    pipelines: "Pipelines",
    observability: "Observabilidad",
    governance: "Gobernanza",
    pipelineTitle: "Pipeline de inteligencia de clientes",
    lastRun: "Última ejecución · hace 2m · 12.483 eventos procesados",
    healthy: "Saludable",
    steps: { ingest: "Ingestar", enrich: "Enriquecer", decide: "Decidir", deliver: "Entregar" },
    stepSubs: { ingest: "Kafka · Snowflake", enrich: "ZurplexAI Modelo v4", decide: "Motor de políticas", deliver: "CRM · API · Slack" },
    metrics: { latency: "Latencia p95", throughput: "Rendimiento", accuracy: "Precisión" },
  },
  logos: { trusted: "La confían equipos de ingeniería en" },
  platform: {
    eyebrow: "La plataforma",
    title: "Una plataforma. Cada capa de tu stack inteligente.",
    subtitle: "ZurplexAI reemplaza una cadena de herramientas fragmentada por una base única y coherente — desde la ingesta de datos hasta la inferencia en producción.",
    features: [
      { title: "Capa de modelos", body: "Utiliza tus propios modelos o los modelos base ajustados por ZurplexAI. Inferencia, evaluación y ruteo unificados en cada proveedor." },
      { title: "Motor de flujos", body: "Flujos deterministas y versionados para el mundo real. Reintentos, guardrails, humano en el ciclo y replay completo por defecto." },
      { title: "Integraciones de datos", body: "Conectores nativos para Snowflake, Postgres, Salesforce, SAP y cualquier superficie HTTP. Gobernados, cacheados y observables." },
      { title: "Observabilidad", body: "Trazas, métricas y evaluaciones para cada solicitud. Entiende qué decidieron tus sistemas, por qué y dónde son confiables." },
      { title: "Gobernanza", body: "Acceso por roles, auditoría, red privada y residencia de datos. Construido para equipos de seguridad y cumplimiento desde el día uno." },
      { title: "Runtime", body: "Un runtime gestionado para cargas de baja latencia y alto rendimiento. Global por defecto, single-tenant cuando se requiere." },
    ],
  },
  product: {
    eyebrow: "Hecho para ingenieros",
    title: "Un primitivo, no un plugin.",
    subtitle: "ZurplexAI está diseñado para sentirse como infraestructura — SDKs tipados, configuración declarativa, desarrollo local de primera y paridad con producción. Envía sistemas inteligentes como envías software.",
    bullets: [
      "SDKs tipados para TypeScript, Python y Go",
      "Replay determinista de cada ejecución en producción",
      "Entornos de preview para cada pull request",
      "SOC 2 Type II, ISO 27001 y despliegue en VPC privada",
    ],
  },
  metrics: {
    items: [
      { v: "99,99%", l: "Uptime de la plataforma en los últimos 12 meses" },
      { v: "180ms", l: "Latencia mediana de inferencia en p95" },
      { v: "40+", l: "Integraciones enterprise listas para desplegar" },
      { v: "10x", l: "Iteración más rápida que stacks a medida" },
    ],
  },
  enterprise: {
    eyebrow: "Nivel enterprise",
    title: "Diseñado para las empresas que moldearán la próxima década.",
    subtitle: "Instituciones financieras, aseguradoras y operadores industriales ejecutan cargas críticas en ZurplexAI — con los controles, la residencia y el soporte que sus equipos requieren.",
    ctaPrimary: "Solicitar una reunión",
    ctaSecondary: "Leer el resumen de seguridad",
    quote: "“ZurplexAI se convirtió en el sustrato con el que enviamos sistemas inteligentes. Es lo más parecido a tener un equipo de ingeniería que nunca duerme — e invisible cuando debe serlo.”",
    author: "Camila Herrera",
    role: "VP de Ingeniería, Meridian Financial",
    badges: ["SOC 2 Type II", "ISO 27001", "RGPD y residencia LATAM"],
  },
  cta: {
    title1: "Construye la capa inteligente",
    title2: "de tu empresa.",
    subtitle: "Habla con nuestro equipo de ingeniería sobre tu arquitectura, cargas y plazos. Los despliegues suelen entrar en producción en menos de 30 días.",
    primary: "Contactar ventas",
    secondary: "Explorar la documentación",
  },
  footer: {
    tagline: "Infraestructura inteligente para empresas modernas. Construido en Latinoamérica. Desplegado globalmente.",
    cols: [
      { title: "Plataforma", links: ["Resumen", "Modelos", "Flujos", "Observabilidad", "Gobernanza"] },
      { title: "Empresa", links: ["Acerca de", "Clientes", "Carreras", "Prensa", "Contacto"] },
      { title: "Recursos", links: ["Documentación", "Changelog", "Seguridad", "Estado", "Centro de confianza"] },
    ],
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
    security: "Seguridad",
    status: "Todos los sistemas operativos",
  },
  langLabel: "Idioma",
};

const pt: Dict = {
  nav: { platform: "Plataforma", product: "Produto", enterprise: "Empresa", docs: "Docs", customers: "Clientes", signIn: "Entrar", contactSales: "Falar com vendas" },
  hero: {
    badge: "Apresentando ZurplexAI Platform 2.0",
    title1: "Infraestrutura inteligente",
    title2: "para empresas modernas.",
    subtitle: "ZurplexAI é a plataforma que empresas usam para projetar, implantar e escalar sistemas de IA, automações e software interno — com a confiabilidade da infraestrutura e a ergonomia do produto moderno.",
    ctaPrimary: "Começar a construir",
    ctaSecondary: "Falar com um engenheiro",
    liveUrl: "app.zurplex.ai / fluxos / inteligencia-de-clientes",
    live: "ao vivo",
    workspace: "Espaço de trabalho",
    workflows: "Fluxos",
    models: "Modelos",
    pipelines: "Pipelines",
    observability: "Observabilidade",
    governance: "Governança",
    pipelineTitle: "Pipeline de inteligência de clientes",
    lastRun: "Última execução · há 2m · 12.483 eventos processados",
    healthy: "Saudável",
    steps: { ingest: "Ingerir", enrich: "Enriquecer", decide: "Decidir", deliver: "Entregar" },
    stepSubs: { ingest: "Kafka · Snowflake", enrich: "ZurplexAI Modelo v4", decide: "Motor de políticas", deliver: "CRM · API · Slack" },
    metrics: { latency: "Latência p95", throughput: "Taxa de transferência", accuracy: "Precisão" },
  },
  logos: { trusted: "Confiado por times de engenharia em" },
  platform: {
    eyebrow: "A plataforma",
    title: "Uma plataforma. Cada camada do seu stack inteligente.",
    subtitle: "ZurplexAI substitui uma cadeia de ferramentas fragmentada por uma base única e coerente — da ingestão de dados à inferência em produção.",
    features: [
      { title: "Camada de modelos", body: "Use seus próprios modelos ou os modelos base ajustados pela ZurplexAI. Inferência, avaliação e roteamento unificados em todos os provedores." },
      { title: "Motor de fluxos", body: "Fluxos determinísticos e versionados para o mundo real. Retries, guardrails, humano no loop e replay completo por padrão." },
      { title: "Integrações de dados", body: "Conectores nativos para Snowflake, Postgres, Salesforce, SAP e qualquer superfície HTTP. Governados, cacheados e observáveis." },
      { title: "Observabilidade", body: "Traces, métricas e avaliações para cada requisição. Entenda o que seus sistemas decidiram, por quê e onde são confiáveis." },
      { title: "Governança", body: "Acesso por papéis, trilhas de auditoria, rede privada e residência de dados. Feito para times de segurança e compliance desde o dia um." },
      { title: "Runtime", body: "Um runtime gerenciado para cargas de baixa latência e alta vazão. Global por padrão, single-tenant quando necessário." },
    ],
  },
  product: {
    eyebrow: "Feito para engenheiros",
    title: "Uma primitiva, não um plugin.",
    subtitle: "ZurplexAI é projetado para parecer infraestrutura — SDKs tipados, configuração declarativa, desenvolvimento local de primeira classe e paridade com produção. Entregue sistemas inteligentes como você entrega software.",
    bullets: [
      "SDKs tipados para TypeScript, Python e Go",
      "Replay determinístico de cada execução em produção",
      "Ambientes de preview para cada pull request",
      "SOC 2 Type II, ISO 27001 e implantação em VPC privada",
    ],
  },
  metrics: {
    items: [
      { v: "99,99%", l: "Uptime da plataforma nos últimos 12 meses" },
      { v: "180ms", l: "Latência mediana de inferência em p95" },
      { v: "40+", l: "Integrações enterprise, prontas para implantar" },
      { v: "10x", l: "Iteração mais rápida que stacks sob medida" },
    ],
  },
  enterprise: {
    eyebrow: "Nível enterprise",
    title: "Projetado para as empresas que moldarão a próxima década.",
    subtitle: "Instituições financeiras, seguradoras e operadores industriais executam cargas críticas na ZurplexAI — com os controles, a residência e o suporte que seus times exigem.",
    ctaPrimary: "Solicitar uma reunião",
    ctaSecondary: "Ler a visão geral de segurança",
    quote: "“ZurplexAI se tornou o substrato para como enviamos sistemas inteligentes. É o mais próximo de ter um time de engenharia que nunca dorme — e invisível quando deve ser.”",
    author: "Camila Herrera",
    role: "VP de Engenharia, Meridian Financial",
    badges: ["SOC 2 Type II", "ISO 27001", "LGPD e residência LATAM"],
  },
  cta: {
    title1: "Construa a camada inteligente",
    title2: "da sua empresa.",
    subtitle: "Fale com nosso time de engenharia sobre sua arquitetura, cargas e prazos. Implantações normalmente entram em produção em menos de 30 dias.",
    primary: "Falar com vendas",
    secondary: "Explorar a documentação",
  },
  footer: {
    tagline: "Infraestrutura inteligente para empresas modernas. Construído na América Latina. Implantado globalmente.",
    cols: [
      { title: "Plataforma", links: ["Visão geral", "Modelos", "Fluxos", "Observabilidade", "Governança"] },
      { title: "Empresa", links: ["Sobre", "Clientes", "Carreiras", "Imprensa", "Contato"] },
      { title: "Recursos", links: ["Documentação", "Changelog", "Segurança", "Status", "Central de confiança"] },
    ],
    rights: "Todos os direitos reservados.",
    privacy: "Privacidade",
    terms: "Termos",
    security: "Segurança",
    status: "Todos os sistemas operacionais",
  },
  langLabel: "Idioma",
};

const dicts: Record<Lang, Dict> = { en, es, pt };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage.getItem("zurplex-lang")) as Lang | null;
    if (stored && (stored === "en" || stored === "es" || stored === "pt")) {
      setLangState(stored);
    }
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
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
];
