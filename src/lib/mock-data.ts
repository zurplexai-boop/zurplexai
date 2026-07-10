export const businessName = "Doceria da Ana";

export const currency = "R$";

export const fmt = (n: number) =>
  `${currency} ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const dashboardStats = {
  income: 12850,
  expenses: 4123,
  costs: 3200,
  profit: 5527,
  margin: 43,
  customers: 124,
  topProduct: "Brownie recheado",
  worstProduct: "Bolo de pote",
  mostProfitable: "Kit festa premium",
  activeAlerts: 3,
};

export const monthlySeries = [
  { m: "Jan", income: 8200, expenses: 3100, profit: 2100 },
  { m: "Feb", income: 9100, expenses: 3400, profit: 2600 },
  { m: "Mar", income: 9800, expenses: 3600, profit: 2900 },
  { m: "Apr", income: 10500, expenses: 3800, profit: 3200 },
  { m: "May", income: 11200, expenses: 3900, profit: 3800 },
  { m: "Jun", income: 12850, expenses: 4123, profit: 5527 },
];

export const channelSales = [
  { channel: "WhatsApp", value: 5820 },
  { channel: "Instagram", value: 3940 },
  { channel: "Tienda física", value: 2100 },
  { channel: "Sitio web", value: 990 },
];

export const topProducts = [
  { name: "Brownie recheado", value: 42 },
  { name: "Brigadeiro gourmet", value: 31 },
  { name: "Kit festa premium", value: 24 },
  { name: "Torta de limão", value: 18 },
  { name: "Bolo de pote", value: 9 },
];

export const customersGrowth = [
  { m: "Jan", customers: 62 },
  { m: "Feb", customers: 74 },
  { m: "Mar", customers: 85 },
  { m: "Apr", customers: 96 },
  { m: "May", customers: 110 },
  { m: "Jun", customers: 124 },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  margin: number;
  soldMonth: number;
  status: "healthy" | "attention" | "low-margin";
};

export const products: Product[] = [
  { id: "p1", name: "Brownie recheado", category: "Doces", price: 12, cost: 4.5, margin: 62, soldMonth: 128, status: "healthy" },
  { id: "p2", name: "Bolo de pote", category: "Doces", price: 15, cost: 8, margin: 47, soldMonth: 12, status: "attention" },
  { id: "p3", name: "Brigadeiro gourmet", category: "Doces", price: 3.5, cost: 1.2, margin: 66, soldMonth: 340, status: "healthy" },
  { id: "p4", name: "Kit festa premium", category: "Kits", price: 220, cost: 90, margin: 59, soldMonth: 8, status: "healthy" },
  { id: "p5", name: "Torta de limão", category: "Doces", price: 45, cost: 32, margin: 29, soldMonth: 22, status: "low-margin" },
];

export type Sale = {
  id: string;
  date: string;
  product: string;
  qty: number;
  price: number;
  customer: string;
  channel: string;
  method: string;
};

export const sales: Sale[] = [
  { id: "s1", date: "2025-06-28", product: "Brownie recheado", qty: 6, price: 12, customer: "Ana Souza", channel: "WhatsApp", method: "Pix" },
  { id: "s2", date: "2025-06-28", product: "Kit festa premium", qty: 1, price: 220, customer: "Bruno Martins", channel: "Instagram", method: "Crédito" },
  { id: "s3", date: "2025-06-27", product: "Brigadeiro gourmet", qty: 30, price: 3.5, customer: "Carla Lima", channel: "Tienda física", method: "Débito" },
  { id: "s4", date: "2025-06-27", product: "Torta de limão", qty: 2, price: 45, customer: "Diego Pereira", channel: "WhatsApp", method: "Pix" },
  { id: "s5", date: "2025-06-26", product: "Brownie recheado", qty: 12, price: 12, customer: "Fernanda Alves", channel: "Instagram", method: "Pix" },
  { id: "s6", date: "2025-06-25", product: "Bolo de pote", qty: 3, price: 15, customer: "Ana Souza", channel: "Sitio web", method: "Crédito" },
  { id: "s7", date: "2025-06-24", product: "Brigadeiro gourmet", qty: 50, price: 3.5, customer: "Bruno Martins", channel: "WhatsApp", method: "Efectivo" },
  { id: "s8", date: "2025-06-23", product: "Kit festa premium", qty: 1, price: 220, customer: "Carla Lima", channel: "Instagram", method: "Pix" },
];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastPurchase: string;
  total: number;
  channel: string;
};

export const customers: Customer[] = [
  { id: "c1", name: "Ana Souza", phone: "+55 11 98123-4501", email: "ana@example.com", lastPurchase: "2025-06-28", total: 342, channel: "WhatsApp" },
  { id: "c2", name: "Bruno Martins", phone: "+55 11 98123-4502", email: "bruno@example.com", lastPurchase: "2025-06-28", total: 495, channel: "Instagram" },
  { id: "c3", name: "Carla Lima", phone: "+55 11 98123-4503", email: "carla@example.com", lastPurchase: "2025-06-27", total: 325, channel: "Tienda física" },
  { id: "c4", name: "Diego Pereira", phone: "+55 11 98123-4504", email: "diego@example.com", lastPurchase: "2025-06-27", total: 90, channel: "WhatsApp" },
  { id: "c5", name: "Fernanda Alves", phone: "+55 11 98123-4505", email: "fernanda@example.com", lastPurchase: "2025-06-26", total: 144, channel: "Instagram" },
];

export type Expense = {
  id: string;
  date: string;
  type: "costo" | "gasto";
  category: string;
  description: string;
  supplier: string;
  amount: number;
  fixed: boolean;
  method: string;
};

export const expenses: Expense[] = [
  { id: "e1", date: "2025-06-05", type: "costo", category: "Materia prima", description: "Chocolate belga 5kg", supplier: "Doce Ingredientes", amount: 420, fixed: false, method: "Pix" },
  { id: "e2", date: "2025-06-06", type: "costo", category: "Embalaje", description: "Cajas kraft x200", supplier: "PackLar", amount: 180, fixed: false, method: "Crédito" },
  { id: "e3", date: "2025-06-10", type: "gasto", category: "Alquiler", description: "Local mensual", supplier: "Imob Vila", amount: 1800, fixed: true, method: "Transferencia" },
  { id: "e4", date: "2025-06-12", type: "gasto", category: "Marketing", description: "Anuncios Instagram", supplier: "Meta", amount: 480, fixed: false, method: "Crédito" },
  { id: "e5", date: "2025-06-15", type: "gasto", category: "Empleados", description: "Ayudante fin de semana", supplier: "—", amount: 900, fixed: true, method: "Pix" },
  { id: "e6", date: "2025-06-18", type: "costo", category: "Mercadería", description: "Frutas y crema", supplier: "Mercado Central", amount: 340, fixed: false, method: "Débito" },
];

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  date: string;
  read: boolean;
};

export const alerts: Alert[] = [
  { id: "a1", title: "Margen baja en Brownie recheado", description: "El margen cayó del 68% al 62% este mes.", severity: "high", date: "2025-06-28", read: false },
  { id: "a2", title: "Tus costos aumentaron 18% este mes", description: "Materia prima subió R$ 512 vs mes anterior.", severity: "medium", date: "2025-06-27", read: false },
  { id: "a3", title: "Las ventas por tienda física bajaron 12%", description: "Revisa promociones locales.", severity: "medium", date: "2025-06-25", read: true },
  { id: "a4", title: "8 clientes sin comprar hace más de 30 días", description: "Considera campaña de reactivación por WhatsApp.", severity: "low", date: "2025-06-22", read: true },
];

export const automations = [
  { id: "au1", name: "Alertas automáticas de margen", desc: "Recibí un aviso cuando un producto pierde margen.", status: "active" as const },
  { id: "au2", name: "Reporte mensual automático", desc: "Recibí tu DRE cada mes por email.", status: "active" as const },
  { id: "au3", name: "Recordatorio de gastos", desc: "Aviso semanal para cargar tus gastos.", status: "available" as const },
  { id: "au4", name: "Integración con WhatsApp", desc: "Registrá ventas directo desde WhatsApp.", status: "premium" as const },
  { id: "au5", name: "Integración con Instagram", desc: "Traé DMs de venta al panel.", status: "premium" as const },
  { id: "au6", name: "Importación de planillas", desc: "Subí tu Excel y lo procesamos.", status: "available" as const },
  { id: "au7", name: "Envío de reporte por email", desc: "Programá reportes automáticos.", status: "available" as const },
  { id: "au8", name: "Soporte automático", desc: "Asistente IA para dudas rápidas.", status: "premium" as const },
];
