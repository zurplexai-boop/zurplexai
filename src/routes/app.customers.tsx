import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge, Card, Field, Modal, ModalActions, PageHeader, Select, StatCard } from "@/components/app/ui";
import { fmt, type Customer } from "@/lib/mock-data";
import { useMockStore } from "@/lib/mock-store";
import { useAppI18n } from "@/lib/app-i18n";

export const Route = createFileRoute("/app/customers")({
  head: () => ({ meta: [{ title: "Clientes — ZurplexAI" }] }),
  component: CustomersPage,
});

const channels = ["WhatsApp", "Instagram", "Tienda física", "Sitio web", "Marketplace"];

function CustomersPage() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useMockStore();
  const { t } = useAppI18n();
  const c18 = t.customers;
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  return (
    <>
      <PageHeader
        title={c18.title}
        subtitle={c18.subtitle}
        actions={
          <button
            onClick={() => setCreating(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> {c18.newCustomer}
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={t.common.total} value={String(customers.length)} />
        <StatCard label={c18.newThisMonth} value="14" tone="positive" />
        <StatCard label={c18.recurring} value="47" />
        <StatCard label={c18.inactive} value="8" tone="warning" />
      </section>

      <div className="mt-6">
        <Card title={c18.allCustomers}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">{t.common.name}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.phone}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.email}</th>
                  <th className="py-2 pr-3 font-medium">{c18.lastPurchase}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.total}</th>
                  <th className="py-2 pr-3 font-medium">{t.common.channel}</th>
                  <th className="py-2 pr-3 text-right font-medium">{t.common.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/50">
                    <td className="py-2.5 pr-3 font-medium">{c.name}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{c.phone}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{c.email}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{c.lastPurchase}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs">{fmt(c.total)}</td>
                    <td className="py-2.5 pr-3"><Badge tone="info">{c.channel}</Badge></td>
                    <td className="py-2.5 pr-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          aria-label={t.common.edit}
                          onClick={() => setEditing(c)}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button
                          aria-label={t.common.delete}
                          onClick={() => {
                            if (window.confirm(`${t.common.confirmDelete} "${c.name}"?`)) deleteCustomer(c.id);
                          }}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {creating && (
        <CustomerModal
          title={c18.newCustomer}
          onClose={() => setCreating(false)}
          onSave={(data) => {
            addCustomer(data);
            setCreating(false);
          }}
        />
      )}
      {editing && (
        <CustomerModal
          title={c18.editCustomer}
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            updateCustomer(editing.id, data);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}

function CustomerModal({
  title,
  initial,
  onClose,
  onSave,
}: {
  title: string;
  initial?: Customer;
  onClose: () => void;
  onSave: (c: { name: string; phone: string; email: string; channel: string }) => void;
}) {
  const { t } = useAppI18n();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    phone: initial?.phone ?? "",
    email: initial?.email ?? "",
    channel: initial?.channel ?? channels[0],
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal title={title} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="grid grid-cols-2 gap-3"
      >
        <Field label={t.common.name} required className="col-span-2" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <Field label={t.common.phone} required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <Field label={t.common.email} type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
        <Select label={t.common.channel} options={channels} className="col-span-2" value={form.channel} onChange={(e) => set("channel", e.target.value)} />
        <ModalActions onCancel={onClose} />
      </form>
    </Modal>
  );
}
