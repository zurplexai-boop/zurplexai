import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  products as initialProducts,
  sales as initialSales,
  customers as initialCustomers,
  expenses as initialExpenses,
  type Product,
  type Sale,
  type Customer,
  type Expense,
} from "./mock-data";

type NewSale = Omit<Sale, "id">;
type NewProduct = Omit<Product, "id" | "margin" | "soldMonth" | "status"> & {
  soldMonth?: number;
};
type NewCustomer = Omit<Customer, "id" | "total" | "lastPurchase"> & {
  total?: number;
  lastPurchase?: string;
};
type NewExpense = Omit<Expense, "id">;

type StoreContext = {
  products: Product[];
  sales: Sale[];
  customers: Customer[];
  expenses: Expense[];
  totals: {
    income: number;
    costs: number;
    expensesTotal: number;
    profit: number;
    margin: number;
  };
  addSale: (s: NewSale) => void;
  addProduct: (p: NewProduct) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCustomer: (c: NewCustomer) => void;
  updateCustomer: (id: string, c: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addExpense: (e: NewExpense) => void;
  deleteExpense: (id: string) => void;
};

const Ctx = createContext<StoreContext | null>(null);

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;

const computeMargin = (price: number, cost: number) =>
  price > 0 ? Math.round(((price - cost) / price) * 100) : 0;

const computeStatus = (margin: number): Product["status"] =>
  margin < 35 ? "low-margin" : margin < 50 ? "attention" : "healthy";

export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const value = useMemo<StoreContext>(() => {
    const income = sales.reduce((s, x) => s + x.qty * x.price, 0);
    const costs = expenses.filter((e) => e.type === "costo").reduce((s, e) => s + e.amount, 0);
    const expensesTotal = expenses.filter((e) => e.type === "gasto").reduce((s, e) => s + e.amount, 0);
    const profit = income - costs - expensesTotal;
    const margin = income > 0 ? Math.round((profit / income) * 100) : 0;

    return {
      products,
      sales,
      customers,
      expenses,
      totals: { income, costs, expensesTotal, profit, margin },
      addSale: (s) => setSales((prev) => [{ ...s, id: uid() }, ...prev]),
      addProduct: (p) => {
        const margin = computeMargin(p.price, p.cost);
        setProducts((prev) => [
          {
            ...p,
            id: uid(),
            margin,
            soldMonth: p.soldMonth ?? 0,
            status: computeStatus(margin),
          },
          ...prev,
        ]);
      },
      updateProduct: (id, p) =>
        setProducts((prev) =>
          prev.map((x) => {
            if (x.id !== id) return x;
            const next = { ...x, ...p };
            const margin = computeMargin(next.price, next.cost);
            return { ...next, margin, status: computeStatus(margin) };
          }),
        ),
      deleteProduct: (id) => setProducts((prev) => prev.filter((x) => x.id !== id)),
      addCustomer: (c) =>
        setCustomers((prev) => [
          {
            ...c,
            id: uid(),
            total: c.total ?? 0,
            lastPurchase: c.lastPurchase ?? new Date().toISOString().slice(0, 10),
          },
          ...prev,
        ]),
      updateCustomer: (id, c) =>
        setCustomers((prev) => prev.map((x) => (x.id === id ? { ...x, ...c } : x))),
      deleteCustomer: (id) => setCustomers((prev) => prev.filter((x) => x.id !== id)),
      addExpense: (e) => setExpenses((prev) => [{ ...e, id: uid() }, ...prev]),
      deleteExpense: (id) => setExpenses((prev) => prev.filter((x) => x.id !== id)),
    };
  }, [products, sales, customers, expenses]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMockStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMockStore must be used within MockStoreProvider");
  return ctx;
}
