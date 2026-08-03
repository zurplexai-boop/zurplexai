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
    edit: string;
    delete: string;
    close: string;
    total: string;
    all: string;
    soon: string;
    high: string;
    medium: string;
    low: string;
    name: string;
    category: string;
    price: string;
    cost: string;
    margin: string;
    channel: string;
    customer: string;
    product: string;
    quantity: string;
    payment: string;
    phone: string;
    type: string;
    description: string;
    supplier: string;
    method: string;
    vsPrevMonth: string;
    confirmDelete: string;
    noData: string;
  };
  dashboard: {
    hello: string;
    subtitle: string;
    registerSale: string;
    addExpense: string;
    newProduct: string;
    income: string;
    expenses: string;
    costs: string;
    profit: string;
    customers: string;
    marginLabel: string;
    newCustomersMonth: string;
    topProduct: string;
    worstProduct: string;
    mostProfitable: string;
    activeAlerts: string;
    incomeVsExpenses: string;
    salesByChannel: string;
    top5: string;
    customersEvolution: string;
    quickAlerts: string;
    seeAll: string;
    sales: string;
    shortSale: string;
    shortExpense: string;
    shortProduct: string;
  };
  sales: {
    title: string;
    subtitle: string;
    newSale: string;
    totalSold: string;
    count: string;
    avgTicket: string;
    topChannel: string;
    history: string;
    modalSubtitle: string;
    unitPrice: string;
    paymentMethod: string;
  };
  products: {
    title: string;
    subtitle: string;
    newProduct: string;
    editProduct: string;
    healthy: string;
    attention: string;
    lowMargin: string;
    soldMonth: string;
    needAttention: string;
    allHealthy: string;
    lowMarginHint: string;
    lowSalesHint: string;
    calculatedMargin: string;
  };
  customers: {
    title: string;
    subtitle: string;
    newCustomer: string;
    editCustomer: string;
    newThisMonth: string;
    recurring: string;
    inactive: string;
    allCustomers: string;
    lastPurchase: string;
  };
  costs: {
    title: string;
    subtitle: string;
    tabCosts: string;
    tabExpenses: string;
    tabSuppliers: string;
    tabCategories: string;
    monthCosts: string;
    fixedExpenses: string;
    variableExpenses: string;
    topCategory: string;
    fixed: string;
    variable: string;
    newMovement: string;
    modalSubtitle: string;
    fixedHint: string;
  };
  finance: {
    title: string;
    subtitle: string;
    income: string;
    costs: string;
    expenses: string;
    profit: string;
    marginLabel: string;
    dre: string;
    grossIncome: string;
    minusCosts: string;
    grossProfit: string;
    minusExpenses: string;
    estimatedProfit: string;
    netMargin: string;
    monthlyEvolution: string;
    profitSeries: string;
    monthSummary: string;
    summary1: string;
    summary2: string;
    summary3: string;
    summary4: string;
  };
  alerts: {
    title: string;
    subtitle: string;
    view: string;
  };
  automations: {
    title: string;
    subtitle: string;
    active: string;
    premium: string;
    comingSoon: string;
    request: string;
    configure: string;
    activate: string;
  };
  support: {
    title: string;
    subtitle: string;
    shortcuts: { title: string; desc: string }[];
    newRequest: string;
    subject: string;
    priority: string;
    message: string;
    attach: string;
    send: string;
    types: string[];
  };
  settings: {
    title: string;
    subtitle: string;
    business: string;
    businessNameLabel: string;
    country: string;
    currency: string;
    businessType: string;
    langAndNotif: string;
    language: string;
    emailNotif: string;
    marginAlerts: string;
    enabled: string;
    disabled: string;
    salesChannels: string;
    security: string;
    twoFA: string;
    activeSessions: string;
    changePassword: string;
    currentPlan: string;
    current: string;
    perMonth: string;
    switchTo: string;
    demoData: string;
    demoDataDescription: string;
    sampleData: string;
    emptyData: string;
    plans: { name: string; price: string; features: string[] }[];
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
    edit: "Editar",
    delete: "Eliminar",
    close: "Cerrar",
    total: "Total",
    all: "Todos",
    soon: "Próximamente.",
    high: "Alta",
    medium: "Media",
    low: "Baja",
    name: "Nombre",
    category: "Categoría",
    price: "Precio",
    cost: "Costo",
    margin: "Margen",
    channel: "Canal",
    customer: "Cliente",
    product: "Producto",
    quantity: "Cantidad",
    payment: "Pago",
    phone: "Teléfono",
    type: "Tipo",
    description: "Descripción",
    supplier: "Proveedor",
    method: "Método",
    vsPrevMonth: "vs mes ant.",
    confirmDelete: "¿Eliminar",
    noData: "Todavía no hay datos.",
  },
  dashboard: {
    hello: "Hola",
    subtitle: "Esta es la estructura de tu crecimiento.",
    registerSale: "Registrar venta",
    addExpense: "Agregar gasto",
    newProduct: "Nuevo producto",
    income: "Ingresos del mes",
    expenses: "Gastos del mes",
    costs: "Costos del mes",
    profit: "Lucro estimado",
    customers: "Clientes",
    marginLabel: "Margen",
    newCustomersMonth: "+14 este mes",
    topProduct: "Producto más vendido",
    worstProduct: "Producto menos vendido",
    mostProfitable: "Más rentable",
    activeAlerts: "Alertas activas",
    incomeVsExpenses: "Ingresos vs gastos",
    salesByChannel: "Ventas por canal",
    top5: "Top 5 productos",
    customersEvolution: "Evolución de clientes",
    quickAlerts: "Alertas rápidas",
    seeAll: "Ver todas",
    sales: "Ventas",
    shortSale: "Venta",
    shortExpense: "Gasto",
    shortProduct: "Producto",
  },
  sales: {
    title: "Ventas",
    subtitle: "Registro completo de tus ventas.",
    newSale: "Nueva venta",
    totalSold: "Total vendido",
    count: "Cantidad de ventas",
    avgTicket: "Ticket promedio",
    topChannel: "Canal top",
    history: "Historial",
    modalSubtitle: "Registrá una venta rápida.",
    unitPrice: "Precio unitario",
    paymentMethod: "Forma de pago",
  },
  products: {
    title: "Productos",
    subtitle: "Rentabilidad y rotación de tu catálogo.",
    newProduct: "Nuevo producto",
    editProduct: "Editar producto",
    healthy: "Saludable",
    attention: "Atención",
    lowMargin: "Margen baja",
    soldMonth: "Vendidos mes",
    needAttention: "Productos que merecen atención",
    allHealthy: "Todo saludable por ahora.",
    lowMarginHint: "revisá precio o costo.",
    lowSalesHint: "Vende poco este mes — considerá promoción.",
    calculatedMargin: "Margen calculado:",
  },
  customers: {
    title: "Clientes",
    subtitle: "Base de clientes y comportamiento.",
    newCustomer: "Nuevo cliente",
    editCustomer: "Editar cliente",
    newThisMonth: "Nuevos este mes",
    recurring: "Recurrentes",
    inactive: "Inactivos",
    allCustomers: "Todos los clientes",
    lastPurchase: "Última compra",
  },
  costs: {
    title: "Costos y gastos",
    subtitle: "Todo lo que sale de tu negocio.",
    tabCosts: "Costos",
    tabExpenses: "Gastos",
    tabSuppliers: "Proveedores",
    tabCategories: "Categorías",
    monthCosts: "Costos del mes",
    fixedExpenses: "Gastos fijos",
    variableExpenses: "Gastos variables",
    topCategory: "Mayor categoría",
    fixed: "Fijo",
    variable: "Variable",
    newMovement: "Nuevo movimiento",
    modalSubtitle: "Costo o gasto del negocio.",
    fixedHint: "Gasto fijo (se repite todos los meses)",
  },
  finance: {
    title: "Finanzas",
    subtitle: "Resumen financiero del mes.",
    income: "Ingresos",
    costs: "Costos",
    expenses: "Gastos",
    profit: "Lucro estimado",
    marginLabel: "Margen",
    dre: "DRE simplificado",
    grossIncome: "Ingresos brutos",
    minusCosts: "(-) Costos",
    grossProfit: "= Lucro bruto",
    minusExpenses: "(-) Gastos",
    estimatedProfit: "= Lucro estimado",
    netMargin: "Margen neta",
    monthlyEvolution: "Evolución mensual",
    profitSeries: "Lucro",
    monthSummary: "Resumen del mes",
    summary1: "Este mes tu negocio tuvo",
    summary2: "en ingresos y un lucro estimado de",
    summary3: "Tu margen neta fue de",
    summary4: "El mayor punto de atención son los costos, que aumentaron",
  },
  alerts: {
    title: "Alertas",
    subtitle: "Todo lo que tu negocio necesita mirar.",
    view: "Ver",
  },
  automations: {
    title: "Automatizaciones",
    subtitle: "Deja que ZurplexAI trabaje por vos.",
    active: "Activo",
    premium: "Premium",
    comingSoon: "Disponible pronto",
    request: "Solicitar",
    configure: "Configurar",
    activate: "Activar",
  },
  support: {
    title: "Soporte",
    subtitle: "Estamos con vos todos los días.",
    shortcuts: [
      { title: "Abrir solicitud", desc: "Contactá al equipo de soporte." },
      { title: "Mis solicitudes", desc: "Estado de tus tickets." },
      { title: "Enviar documento", desc: "Facturas, planillas o comprobantes." },
      { title: "Pedir consultoría", desc: "Sesión con nuestro equipo." },
      { title: "Pedir automatización", desc: "WhatsApp, reportes, integraciones." },
      { title: "Pedir página web", desc: "Landing o sitio para tu negocio." },
    ],
    newRequest: "Nueva solicitud",
    subject: "Asunto",
    priority: "Prioridad",
    message: "Mensaje",
    attach: "Adjuntar archivo",
    send: "Enviar solicitud",
    types: [
      "Soporte técnico",
      "Duda financiera",
      "Importación de planilla",
      "Error en dashboard",
      "Consultoría",
      "Automatización",
      "Página web",
      "Plan y cobranza",
    ],
  },
  settings: {
    title: "Configuración",
    subtitle: "Preferencias de tu cuenta y negocio.",
    business: "Datos del negocio",
    businessNameLabel: "Nombre",
    country: "País",
    currency: "Moneda",
    businessType: "Tipo",
    langAndNotif: "Idioma y notificaciones",
    language: "Idioma",
    emailNotif: "Notificaciones email",
    marginAlerts: "Alertas de margen",
    enabled: "Activadas",
    disabled: "Desactivada",
    salesChannels: "Canales de venta",
    security: "Seguridad",
    twoFA: "Autenticación 2FA",
    activeSessions: "Sesiones activas",
    changePassword: "Cambiar contraseña",
    currentPlan: "Plan actual",
    current: "Actual",
    perMonth: "/mes",
    switchTo: "Cambiar a",
    demoData: "Datos de demostración",
    demoDataDescription: "Elegí si querés explorar el panel con ejemplos o empezar desde cero. Al cambiar de modo, los datos temporales se restablecen.",
    sampleData: "Datos de ejemplo",
    emptyData: "Modo vacío",
    plans: [
      {
        name: "Básico",
        price: "R$ 79",
        features: ["Registro de ventas", "Productos", "Costos y gastos", "Dashboard simple", "Alertas básicas"],
      },
      {
        name: "Pro",
        price: "R$ 199",
        features: ["Todo del Básico", "Análisis financiero", "Margen por producto", "Reportes", "Importación de planillas"],
      },
      {
        name: "Premium",
        price: "R$ 499",
        features: ["Todo del Pro", "Consultoría", "Automatizaciones", "Soporte prioritario", "Páginas web"],
      },
    ],
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
    edit: "Editar",
    delete: "Excluir",
    close: "Fechar",
    total: "Total",
    all: "Todos",
    soon: "Em breve.",
    high: "Alta",
    medium: "Média",
    low: "Baixa",
    name: "Nome",
    category: "Categoria",
    price: "Preço",
    cost: "Custo",
    margin: "Margem",
    channel: "Canal",
    customer: "Cliente",
    product: "Produto",
    quantity: "Quantidade",
    payment: "Pagamento",
    phone: "Telefone",
    type: "Tipo",
    description: "Descrição",
    supplier: "Fornecedor",
    method: "Método",
    vsPrevMonth: "vs mês ant.",
    confirmDelete: "Excluir",
    noData: "Ainda não há dados.",
  },
  dashboard: {
    hello: "Olá",
    subtitle: "Esta é a estrutura do seu crescimento.",
    registerSale: "Registrar venda",
    addExpense: "Adicionar despesa",
    newProduct: "Novo produto",
    income: "Receitas do mês",
    expenses: "Despesas do mês",
    costs: "Custos do mês",
    profit: "Lucro estimado",
    customers: "Clientes",
    marginLabel: "Margem",
    newCustomersMonth: "+14 este mês",
    topProduct: "Produto mais vendido",
    worstProduct: "Produto menos vendido",
    mostProfitable: "Mais rentável",
    activeAlerts: "Alertas ativos",
    incomeVsExpenses: "Receitas vs despesas",
    salesByChannel: "Vendas por canal",
    top5: "Top 5 produtos",
    customersEvolution: "Evolução de clientes",
    quickAlerts: "Alertas rápidos",
    seeAll: "Ver todos",
    sales: "Vendas",
    shortSale: "Venda",
    shortExpense: "Despesa",
    shortProduct: "Produto",
  },
  sales: {
    title: "Vendas",
    subtitle: "Registro completo das suas vendas.",
    newSale: "Nova venda",
    totalSold: "Total vendido",
    count: "Quantidade de vendas",
    avgTicket: "Ticket médio",
    topChannel: "Canal top",
    history: "Histórico",
    modalSubtitle: "Registre uma venda rápida.",
    unitPrice: "Preço unitário",
    paymentMethod: "Forma de pagamento",
  },
  products: {
    title: "Produtos",
    subtitle: "Rentabilidade e giro do seu catálogo.",
    newProduct: "Novo produto",
    editProduct: "Editar produto",
    healthy: "Saudável",
    attention: "Atenção",
    lowMargin: "Margem baixa",
    soldMonth: "Vendidos no mês",
    needAttention: "Produtos que merecem atenção",
    allHealthy: "Tudo saudável por enquanto.",
    lowMarginHint: "revise preço ou custo.",
    lowSalesHint: "Vende pouco este mês — considere uma promoção.",
    calculatedMargin: "Margem calculada:",
  },
  customers: {
    title: "Clientes",
    subtitle: "Base de clientes e comportamento.",
    newCustomer: "Novo cliente",
    editCustomer: "Editar cliente",
    newThisMonth: "Novos este mês",
    recurring: "Recorrentes",
    inactive: "Inativos",
    allCustomers: "Todos os clientes",
    lastPurchase: "Última compra",
  },
  costs: {
    title: "Custos e despesas",
    subtitle: "Tudo o que sai do seu negócio.",
    tabCosts: "Custos",
    tabExpenses: "Despesas",
    tabSuppliers: "Fornecedores",
    tabCategories: "Categorias",
    monthCosts: "Custos do mês",
    fixedExpenses: "Despesas fixas",
    variableExpenses: "Despesas variáveis",
    topCategory: "Maior categoria",
    fixed: "Fixo",
    variable: "Variável",
    newMovement: "Novo lançamento",
    modalSubtitle: "Custo ou despesa do negócio.",
    fixedHint: "Despesa fixa (se repete todos os meses)",
  },
  finance: {
    title: "Finanças",
    subtitle: "Resumo financeiro do mês.",
    income: "Receitas",
    costs: "Custos",
    expenses: "Despesas",
    profit: "Lucro estimado",
    marginLabel: "Margem",
    dre: "DRE simplificado",
    grossIncome: "Receita bruta",
    minusCosts: "(-) Custos",
    grossProfit: "= Lucro bruto",
    minusExpenses: "(-) Despesas",
    estimatedProfit: "= Lucro estimado",
    netMargin: "Margem líquida",
    monthlyEvolution: "Evolução mensal",
    profitSeries: "Lucro",
    monthSummary: "Resumo do mês",
    summary1: "Este mês seu negócio teve",
    summary2: "em receitas e um lucro estimado de",
    summary3: "Sua margem líquida foi de",
    summary4: "O maior ponto de atenção são os custos, que aumentaram",
  },
  alerts: {
    title: "Alertas",
    subtitle: "Tudo o que seu negócio precisa olhar.",
    view: "Ver",
  },
  automations: {
    title: "Automações",
    subtitle: "Deixe a ZurplexAI trabalhar por você.",
    active: "Ativo",
    premium: "Premium",
    comingSoon: "Disponível em breve",
    request: "Solicitar",
    configure: "Configurar",
    activate: "Ativar",
  },
  support: {
    title: "Suporte",
    subtitle: "Estamos com você todos os dias.",
    shortcuts: [
      { title: "Abrir solicitação", desc: "Fale com a equipe de suporte." },
      { title: "Minhas solicitações", desc: "Status dos seus tickets." },
      { title: "Enviar documento", desc: "Notas, planilhas ou comprovantes." },
      { title: "Pedir consultoria", desc: "Sessão com nossa equipe." },
      { title: "Pedir automação", desc: "WhatsApp, relatórios, integrações." },
      { title: "Pedir site", desc: "Landing ou site para seu negócio." },
    ],
    newRequest: "Nova solicitação",
    subject: "Assunto",
    priority: "Prioridade",
    message: "Mensagem",
    attach: "Anexar arquivo",
    send: "Enviar solicitação",
    types: [
      "Suporte técnico",
      "Dúvida financeira",
      "Importação de planilha",
      "Erro no painel",
      "Consultoria",
      "Automação",
      "Site",
      "Plano e cobrança",
    ],
  },
  settings: {
    title: "Configurações",
    subtitle: "Preferências da sua conta e do seu negócio.",
    business: "Dados do negócio",
    businessNameLabel: "Nome",
    country: "País",
    currency: "Moeda",
    businessType: "Tipo",
    langAndNotif: "Idioma e notificações",
    language: "Idioma",
    emailNotif: "Notificações por email",
    marginAlerts: "Alertas de margem",
    enabled: "Ativadas",
    disabled: "Desativada",
    salesChannels: "Canais de venda",
    security: "Segurança",
    twoFA: "Autenticação 2FA",
    activeSessions: "Sessões ativas",
    changePassword: "Alterar senha",
    currentPlan: "Plano atual",
    current: "Atual",
    perMonth: "/mês",
    switchTo: "Mudar para",
    demoData: "Dados de demonstração",
    demoDataDescription: "Escolha se quer explorar o painel com exemplos ou começar do zero. Ao mudar de modo, os dados temporários são redefinidos.",
    sampleData: "Dados de exemplo",
    emptyData: "Modo vazio",
    plans: [
      {
        name: "Básico",
        price: "R$ 79",
        features: ["Registro de vendas", "Produtos", "Custos e despesas", "Painel simples", "Alertas básicos"],
      },
      {
        name: "Pro",
        price: "R$ 199",
        features: ["Tudo do Básico", "Análise financeira", "Margem por produto", "Relatórios", "Importação de planilhas"],
      },
      {
        name: "Premium",
        price: "R$ 499",
        features: ["Tudo do Pro", "Consultoria", "Automações", "Suporte prioritário", "Sites"],
      },
    ],
  },
};

const dicts: Record<AppLang, Dict> = { es, pt };

type Ctx = { lang: AppLang; setLang: (l: AppLang) => void; t: Dict; locale: string };
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
    <AppI18nContext.Provider
      value={{ lang, setLang, t: dicts[lang], locale: lang === "pt" ? "pt-BR" : "es" }}
    >
      {children}
    </AppI18nContext.Provider>
  );
}

export function useAppI18n() {
  const ctx = useContext(AppI18nContext);
  if (!ctx) throw new Error("useAppI18n must be used within AppI18nProvider");
  return ctx;
}
