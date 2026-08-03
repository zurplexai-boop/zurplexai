## Objetivo

Poder elegir el idioma (Español / Português) desde el panel de usuario y que **toda la interfaz del panel** cambie al instante, sin recargar.

## Situación actual

- Ya existe `src/lib/app-i18n.tsx` con un diccionario mínimo (menú lateral + algunas palabras comunes) y guarda el idioma en el navegador.
- El selector ES/PT ya está en la barra lateral (`AppLayout`), pero hoy solo traduce el menú: los títulos, botones, tablas, modales y textos de cada pantalla están escritos directamente en español.
- La pantalla de Configuración muestra "Idioma" como texto fijo, sin selector.

## Qué se va a hacer

1. **Ampliar el diccionario** en `src/lib/app-i18n.tsx` con secciones por pantalla: dashboard, ventas, productos, clientes, costos y gastos, finanzas, alertas, automatizaciones, soporte y configuración. Cada clave con su versión en español y en portugués (incluye títulos, subtítulos, encabezados de tabla, botones, etiquetas de formularios y textos vacíos).

2. **Reemplazar los textos fijos por claves de traducción** en las pantallas del panel:
   - `app.dashboard.tsx`, `app.sales.tsx`, `app.products.tsx`, `app.customers.tsx`, `app.costs-expenses.tsx`, `app.finance.tsx`, `app.alerts.tsx`, `app.automations.tsx`, `app.support.tsx`, `app.settings.tsx`
   - También los `title` de cada pestaña del navegador.

3. **Agregar el selector de idioma en Configuración** (tarjeta "Idioma y notificaciones"): dos botones Español / Português que llaman a la misma función `setLang` que ya usa la barra lateral. Al tocarlo, todo cambia al instante y queda guardado para la próxima visita.

4. **Formato de fechas y moneda**: usar el locale correspondiente (`es` / `pt-BR`) al mostrar fechas; los montos siguen en R$ como ahora.

## Fuera de alcance

- No se traducen los **datos de ejemplo** (nombres de productos, clientes, proveedores): son datos del negocio, no interfaz.
- No se cambia diseño, colores, tipografía ni la disposición de ninguna pantalla.
- No se toca la landing pública (tiene su propio sistema de idioma).

## Detalle técnico

- Se extiende el tipo `Dict` de `src/lib/app-i18n.tsx` con un objeto por pantalla; ambos idiomas comparten el mismo tipo, así TypeScript avisa si falta una traducción.
- Cada pantalla usa `const { t } = useAppI18n()`.
- El `head()` de cada ruta no puede leer el contexto: el título del navegador se mantiene fijo o se actualiza con un pequeño efecto dentro del componente.
- Cambio incremental: primero el diccionario, luego pantalla por pantalla, sin tocar la lógica de datos ni el `mock-store`.

## Qué probar al terminar

- Cambiar idioma desde la barra lateral y desde Configuración: todas las pantallas cambian al instante.
- Recargar la página: el idioma elegido se mantiene.
- Los modales (nueva venta, producto, cliente, gasto) también aparecen traducidos.
