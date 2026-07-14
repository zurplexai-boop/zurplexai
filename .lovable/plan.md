## Objetivo

Hacer funcionales los botones de las secciones Ventas, Productos, Clientes, Costos/Gastos y Finanzas usando **estado local en memoria** (mock interactivo). Sin backend, sin persistencia al recargar.

## Enfoque técnico

Crear un `MockDataProvider` (React Context) en `src/lib/mock-store.tsx` que:

- Inicializa el estado con los arrays actuales de `src/lib/mock-data.ts` (`products`, `sales`, `customers`, `expenses`).
- Expone getters y acciones: `addSale`, `addProduct`, `updateProduct`, `deleteProduct`, `addCustomer`, `updateCustomer`, `deleteCustomer`, `addExpense`, `deleteExpense`.
- Deriva KPIs de finanzas (`income`, `expenses`, `costs`, `profit`, `margin`) a partir de las ventas y gastos actuales.

Se monta dentro de `src/routes/app.tsx` para que todas las páginas hijas lo consuman con un hook `useMockStore()`.

## Cambios por pantalla

**Ventas (`app.sales.tsx`)**
- El modal "Nueva venta" ya existe: conectar el submit para llamar `addSale({ date, product, qty, price, customer, channel, method })` y cerrar.
- Botón "Exportar" queda como no-op visible (tooltip "Próximamente") — fuera de alcance.

**Productos (`app.products.tsx`)**
- Botón "Nuevo producto" → abre modal con formulario (nombre, categoría, precio, costo). Calcula margen automáticamente. `addProduct` en submit.
- Cada fila: menú/acciones "Editar" y "Eliminar" → modal edición + confirm delete.

**Clientes (`app.customers.tsx`)**
- Botón "Nuevo cliente" → modal (nombre, teléfono, email, canal). `addCustomer`.
- Cada fila: "Editar" / "Eliminar".

**Costos y Gastos (`app.costs-expenses.tsx`)**
- Botón "Nuevo movimiento" → modal (tipo costo/gasto, categoría, descripción, proveedor, monto, método, fijo sí/no). `addExpense`.
- Tabs "Todos / Costos / Gastos" ya cambian el filtro visualmente — verificar que sigan funcionando con datos del store.
- Cada fila: "Eliminar".

**Finanzas (`app.finance.tsx`)**
- No agrega botones nuevos: las tarjetas de KPI (income, costs, expenses, profit, margin) se recalculan desde el store en lugar de leer los mocks estáticos. Así al registrar una venta o un gasto los números se actualizan.

## Fuera de alcance (esta pasada)

- Alertas, Automatizaciones, Configuración, Soporte, Onboarding, Dashboard KPIs — se dejan como están.
- Exportar / importar CSV.
- Persistencia (recargar borra los cambios — comportamiento esperado).
- Validación avanzada de formularios (solo `required` y `type=number`).

## Detalle técnico

- Nuevo archivo `src/lib/mock-store.tsx` con `MockDataProvider` + `useMockStore()`. Tipos reutilizados de `mock-data.ts`.
- IDs generados con `crypto.randomUUID()`.
- Componente reutilizable `Modal` en `src/components/app/ui.tsx` (o inline en cada pantalla si ya existe patrón — Ventas ya tiene uno; extraerlo).
- Confirmación de borrado con `window.confirm` para mantenerlo simple.
- Finanzas: `useMemo` sobre `sales` y `expenses` para KPIs.
