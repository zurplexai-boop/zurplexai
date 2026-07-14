import { createFileRoute } from "@tanstack/react-router";
import { Plus, AlertTriangle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge, Card, Field, Modal, ModalActions, PageHeader } from "@/components/app/ui";
import { fmt, type Product } from "@/lib/mock-data";
import { useMockStore } from "@/lib/mock-store";

export const Route = createFileRoute("/app/products")({
  head: () => ({ meta: [{ title: "Productos — ZurplexAI" }] }),
  component: ProductsPage,
});

function statusBadge(status: string) {
  if (status === "healthy") return <Badge tone="success">Saludable</Badge>;
  if (status === "attention") return <Badge tone="warning">Atención</Badge>;
  return <Badge tone="danger">Margen baja</Badge>;
}

function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useMockStore();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const attention = products.filter((p) => p.status !== "healthy");

  return (
    <>
      <PageHeader
        title="Productos"
        subtitle="Rentabilidad y rotación de tu catálogo."
        actions={
          <button
            onClick={() => setCreating(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> Nuevo producto
          </button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate font-semibold">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              {statusBadge(p.status)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Precio</div>
                <div className="font-mono">{fmt(p.price)}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Costo</div>
                <div className="font-mono text-muted-foreground">{fmt(p.cost)}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Margen</div>
                <div className="font-semibold text-accent-sky">{p.margin}%</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Vendidos mes</div>
                <div className="font-semibold">{p.soldMonth}</div>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-1.5">
              <button
                onClick={() => setEditing(p)}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-3 w-3" /> Editar
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`¿Eliminar "${p.name}"?`)) deleteProduct(p.id);
                }}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Card title="Productos que merecen atención">
          {attention.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">Todo saludable por ahora.</p>
          ) : (
            <ul className="divide-y divide-border">
              {attention.map((p) => (
                <li key={p.id} className="flex items-start gap-3 py-3">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-warning/10 text-warning ring-1 ring-warning/30">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">{p.name}</span>
                      {statusBadge(p.status)}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {p.status === "low-margin"
                        ? `Margen ${p.margin}% — revisá precio o costo.`
                        : "Vende poco este mes — considerá promoción."}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {creating && (
        <ProductModal
          title="Nuevo producto"
          onClose={() => setCreating(false)}
          onSave={(data) => {
            addProduct(data);
            setCreating(false);
          }}
        />
      )}
      {editing && (
        <ProductModal
          title="Editar producto"
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            updateProduct(editing.id, data);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}

function ProductModal({
  title,
  initial,
  onClose,
  onSave,
}: {
  title: string;
  initial?: Product;
  onClose: () => void;
  onSave: (p: { name: string; category: string; price: number; cost: number; soldMonth: number }) => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    category: initial?.category ?? "",
    price: initial?.price ?? 0,
    cost: initial?.cost ?? 0,
    soldMonth: initial?.soldMonth ?? 0,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const margin = form.price > 0 ? Math.round(((form.price - form.cost) / form.price) * 100) : 0;

  return (
    <Modal title={title} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="grid grid-cols-2 gap-3"
      >
        <Field label="Nombre" required className="col-span-2" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <Field label="Categoría" required value={form.category} onChange={(e) => set("category", e.target.value)} />
        <Field label="Vendidos mes" type="number" min={0} value={form.soldMonth} onChange={(e) => set("soldMonth", Number(e.target.value))} />
        <Field label="Precio" type="number" step="0.01" min={0} required value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
        <Field label="Costo" type="number" step="0.01" min={0} required value={form.cost} onChange={(e) => set("cost", Number(e.target.value))} />
        <div className="col-span-2 rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
          Margen calculado: <span className="font-semibold text-accent-sky">{margin}%</span>
        </div>
        <ModalActions onCancel={onClose} />
      </form>
    </Modal>
  );
}
