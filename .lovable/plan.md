## Problema

Los botones "Entrar" / CTA de la landing no navegan a ningún lado porque están definidos como `<a href="#">` o `<a href="#cta">`. Son anclas dentro de la misma página, no enlaces a la app.

Ubicaciones encontradas en `src/routes/index.tsx`:

- Línea 184 — botón "Entrar" del header (desktop): `href="#"`
- Línea 190 — CTA principal del header (desktop): `href="#cta"`
- Línea 125 — botón dentro del menú móvil: solo cierra el menú, no navega
- Líneas 236 y 243 — CTAs del hero (primario y secundario): `href="#cta"`
- Líneas 595 y 602 — CTAs de la sección final: `href="#"`

## Cambios

Reemplazar esos `<a href="#...">` por `<Link>` de `@tanstack/react-router` con destinos reales:

- **"Entrar" (header desktop + menú móvil)** → `<Link to="/login">`
- **CTA primario del header** → `<Link to="/onboarding">` (crear cuenta / empezar)
- **CTA primario del hero** → `<Link to="/onboarding">`
- **CTA secundario del hero** → `<Link to="/login">` (o mantener ancla `#product` si el texto es "Ver producto")
- **CTA final — primario** → `<Link to="/onboarding">`
- **CTA final — secundario** → `<Link to="/login">`

En el menú móvil, además de cerrar el menú, el botón "Entrar" debe hacer `navigate({ to: "/login" })` con `useNavigate`.

## Alcance

- Solo se toca `src/routes/index.tsx` (frontend/presentación).
- No se cambia copy, estilos, ni el resto de la landing.
- No se modifica auth ni backend — `/login` y `/onboarding` ya existen como pantallas mock y llevan a `/app/dashboard`.

## Detalle técnico

`Link` ya está importado en el archivo (línea 1). Mantener las clases actuales de cada botón para no alterar el diseño; solo cambiar el elemento `<a>` por `<Link to="...">` y quitar `href`.
