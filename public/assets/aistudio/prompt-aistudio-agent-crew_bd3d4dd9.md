# Rediseño de la landing de Agent Crew

Sos un diseñador y desarrollador front-end senior. Vas a rehacer la landing de **Agent Crew** (agentes de IA para empresas, implementados por etapas con una persona del equipo al lado). El código que entregues se va a integrar a mano en una aplicación que ya está en producción, así que las reglas de abajo no son sugerencias: si una choca con el diseño, gana la regla.

## Lo que te adjunto

1. **La página de referencia:** tomá de ella el estilo (la estructura visual, el ritmo de las secciones, la tipografía, el uso del espacio y el tipo de animaciones). **No copies** sus textos, su marca, su logo, sus imágenes ni su paleta exacta: Agent Crew tiene identidad propia.
2. **El video del inicio**, hecho con Kling 4.0: es el fondo animado del inicio.
3. **`landing.ts`**: todos los textos de la landing actual. Es la única fuente de contenido: podés reordenar, acortar o reagrupar, pero no inventes datos, cifras, clientes, testimonios, logos de clientes, precios ni promesas que no estén ahí.

## Tecnología (obligatoria)

El destino final es **Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4**. Como tu vista previa no corre Next.js, escribí **React 19 + TypeScript + Tailwind v4** con estas reglas, para que el paso a Next sea copiar y pegar:

- **Sin dependencias** además de `react` y `react-dom`: nada de framer-motion, GSAP, shadcn, Radix, lucide, react-router, librerías de carrusel ni de íconos. Animaciones con CSS (`@keyframes`, `transition`) e `IntersectionObserver`; los íconos, SVG en un `icons.tsx`.
- **Tailwind v4, configurado en CSS:** un solo `globals.css` que empieza con `@import "tailwindcss";` y define los tokens en `@theme { ... }` (colores, fuentes, radios, sombras). Sin `tailwind.config.js`. Las clases propias (`.btn`, `.field`, etc.) van en ese mismo archivo. Para la vista previa podés usar `@tailwindcss/browser@4`.
- **Fuentes de Google Fonts**, declaradas como variables CSS (`--font-display`, `--font-sans`) en `@theme`. En la vista previa cargalas con un `<link>`; en el destino las carga `next/font`.
- **Imágenes** con `<img>` y `width`/`height` explícitos. Todas las rutas (imágenes, video, poster) viven en `landing.ts`, nunca escritas en un componente.
- **Nada de servidor ni de terceros:** sin `fetch`, sin APIs, sin la API de Gemini, sin cookies, sin `localStorage`, sin analytics, sin scripts ni recursos de otros dominios. Todo es local, en `/public`.
- **Render determinístico** (la página se prerenderiza en el servidor): nada de `Date.now()`, `new Date()`, `Math.random()`, `crypto.randomUUID()` ni acceso a `window`/`document` durante el render. Eso va sólo en `useEffect` o en un handler. Para ids, `useId()`.
- **Sin hooks donde no hacen falta:** una sección sin estado ni eventos es un componente simple, sin hooks. Un componente que usa hooks o eventos lleva `'use client';` en la primera línea.
- **Estructura de archivos:**

```
src/content/landing.ts                 todos los textos y las rutas de imágenes y video
src/app/globals.css                    tokens y clases propias
src/components/<Seccion>.tsx           una sección por archivo (TopBar, Hero, ..., Contact, Footer)
src/components/icons.tsx
src/components/ContactFormView.tsx     la vista del formulario (ver abajo)
src/lib/contact.ts                     los tipos del formulario (te los paso: no los cambies)
src/preview/ContactFormDemo.tsx        sólo para tu vista previa: maneja la vista con datos falsos
src/App.tsx                            arma la página
```

## El video del inicio (Kling 4.0)

- `<video autoPlay muted loop playsInline preload="metadata" poster="/video/hero-poster.webp" aria-hidden="true">` con dos fuentes, en este orden: `/video/hero.webm` y `/video/hero.mp4`. Es decorativo: sin sonido y sin controles nativos.
- Un **botón para pausar y reanudar** la animación, siempre visible, de 44 × 44 px como mínimo, con `aria-label` "Pausar la animación" / "Reproducir la animación" (WCAG 2.2.2).
- Con `prefers-reduced-motion: reduce`, el video no arranca: se ve el poster.
- Se pausa cuando sale de la pantalla (`IntersectionObserver`) y vuelve a reproducirse al volver, salvo que la persona lo haya pausado.
- El texto que va encima lleva una capa (un degradado) que asegura contraste AA (4.5:1) sobre cualquier cuadro del video.
- En el teléfono el video se recorta con `object-fit: cover`, con un `object-position` que no deje afuera lo principal de la animación.
- Nada del layout depende de que el video cargue: con el poster solo, el inicio se ve completo.

## El formulario: el contrato con el backend (no se negocia)

El formulario manda cada consulta al sistema de ventas. Su lógica (el envío, la validación en el servidor, la captura anticipada del teléfono, la atribución y los reintentos) **ya existe y no la escribís vos**. Vos hacés sólo la **vista**: `ContactFormView`, un componente sin estado propio que recibe todo por props. En el destino, mi contenedor le pasa los props reales; en tu vista previa, `ContactFormDemo` le pasa datos falsos, con un selector para ver cada estado (vacío, enviando, con errores, con "¿celular o fijo?", servicio caído, demasiados envíos y enviado).

### Los tipos (copialos tal cual en `src/lib/contact.ts`)

```ts
export const contactAreas = [
  'Atención al cliente',
  'Ventas y seguimiento',
  'Operaciones',
  'Administración y cobranzas',
] as const;

export type ContactField = 'name' | 'email' | 'company' | 'phone' | 'topic' | 'message';

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'invalid'; errors: ContactErrors; askPhoneType?: boolean }
  | { status: 'rate_limited' }
  | { status: 'unavailable' };

export const contactLimits = { name: 120, email: 254, company: 120, phone: 40, message: 4000 } as const;

export const honeypotField = 'website';
export const callRequestedField = 'call_requested';
export const phoneTypeField = 'phone_type';
```

### Los props de la vista (exactos)

```ts
import type { FormEvent, Ref } from 'react';
import type { ContactState } from '../lib/contact';

export interface ContactFormViewProps {
  state: ContactState;              // lo que devolvió el último envío
  pending: boolean;                 // hay un envío en curso
  askPhoneType: boolean;            // mostrar la pregunta "¿celular o fijo?"
  sentTo: string;                   // el email al que vamos a escribir ('' si no se sabe)
  formRef: Ref<HTMLFormElement>;
  summaryRef: Ref<HTMLDivElement>;  // el resumen de errores: el contenedor le da el foco
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onPhoneBlur: () => void;
  onPhoneChange: (value: string) => void;
  onCallRequestedChange: (checked: boolean) => void;
  onPhoneTypeChange: () => void;
  onReset: () => void;              // "Enviar otro pedido"
}
```

### Reglas del markup

- `<form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Pedí un diagnóstico">`. **Sin** `action`, sin `method` y sin validar en el navegador: los errores llegan del servidor en `state.errors`, y la vista sólo los muestra.
- Los campos son **no controlados** (sin `value` ni estado propio): si el envío vuelve con errores, lo escrito tiene que seguir ahí.
- Cada campo lleva estos atributos exactos. Su `id` es `contact-<name>`, con su `<label htmlFor>`:

| name | elemento | type / autoComplete | maxLength | obligatorio |
|---|---|---|---|---|
| `name` | input | `text` / `name` | 120 | sí |
| `email` | input | `email` / `email` | 254 | sí |
| `company` | input | `text` / `organization` | 120 | sí |
| `phone` | input | `tel` / `tel` | 40 | no: "(opcional)" |
| `call_requested` | checkbox con `id="contact-call"` y `value="yes"`, sin marcar | — | — | no |
| `topic` | select: primero `<option value="">Todavía no lo sé</option>`, después las 4 de `contactAreas`, con `value` igual al texto | — | — | no |
| `message` | textarea, `rows={5}` | — | 4000 | sí |

- `phone`: `onBlur={onPhoneBlur}` y `onChange={(e) => onPhoneChange(e.currentTarget.value)}`.
- La casilla va después del teléfono, con `onChange={(e) => onCallRequestedChange(e.currentTarget.checked)}`. Su texto es **exactamente** "Quiero que Agent Crew me llame a este teléfono para coordinar el diagnóstico.": es un consentimiento versionado, sin una coma de diferencia.
- Si `askPhoneType` es true, debajo del teléfono: un `<fieldset>` con `<legend>` "¿Es un celular o un teléfono fijo?" y dos radios `name="phone_type"`, `value="mobile"` ("Celular") y `value="landline"` ("Fijo"), cada uno con `onChange={onPhoneTypeChange}`.
- **El campo trampa**, siempre presente y fuera de la pantalla (nunca con `display: none`): un `div` con `aria-hidden="true"` y `position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden`, que contiene `<label htmlFor="contact-website">No completar</label>` y `<input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />`.
- **Ningún otro elemento con `name`** ni inputs ocultos: el contenedor agrega los suyos al enviar.
- Un campo con error (`state.status === 'invalid'` con `state.errors[campo]`): `aria-invalid="true"`, el texto del error en `<p id="contact-<campo>-error">` con un ícono, y `aria-describedby` apuntando a ese `id`. El `message` tiene además una ayuda en `<p id="contact-message-help">`, también en su `aria-describedby`.
- **El resumen de errores**, arriba de los campos si hay alguno: `<div ref={summaryRef} role="alert" tabIndex={-1} aria-labelledby="contact-errors-title">`, con el título "Revisá 1 campo para enviar tu pedido" o "Revisá N campos para enviar tu pedido" y una lista de links a cada campo con error, en el orden name, email, company, phone, topic, message. El click hace `preventDefault()` y le da el foco al campo.
- **Los avisos** de `unavailable` y `rate_limited`, con `role="alert"` y los textos de `contactForm.notices`. El formulario sigue visible debajo, con lo escrito.
- **El botón:** `type="submit"`, `disabled={pending}` y `aria-busy={pending}`. Dice "Pedí un diagnóstico" y, mientras `pending`, un spinner con "Enviando…". Debajo: "Usamos tus datos sólo para responderte."
- **Enviado** (`state.status === 'sent'`): en lugar del formulario, un bloque `role="status"` con "Recibimos tu pedido de diagnóstico", "Te escribimos a {sentTo} para coordinar la llamada." (o el texto sin email si `sentTo` está vacío), "Qué sigue" con los tres pasos numerados, y un botón "Enviar otro pedido" que llama a `onReset`.
- Los textos del formulario salen de `contactForm`, `ctaLabel` y `callConsent` de `landing.ts`, sin cambios.
- La sección del formulario es `<section id="contacto">`.

## Lo que se conserva del sitio

- **Las anclas:** `#contacto` (la usan links de afuera), `#inicio` en el contenedor de la página y `#contenido` en el `<main>`, con un link "Ir al contenido" que aparece al tabular.
- **La acción principal de toda la página** dice "Pedí un diagnóstico" y lleva a `#contacto` (en la barra, en el inicio y al cierre).
- **El footer** conserva, textual, "Agent Crew es una marca comercial operada por Franco Rebollo, titular de la actividad económica en Argentina." y un link "Información legal" a `/informacion-legal` (los pide la verificación del negocio en Meta).
- Todo texto nuevo (botones, `aria-label`, avisos) en español rioplatense, con voseo.

## Calidad

- Mobile-first: se diseña a 375 px y se prueba a 320, 375, 768, 1024 y 1440, sin scroll horizontal en ninguno.
- WCAG 2.2 AA: contraste 4.5:1 (3:1 en texto grande), foco visible en todo lo que se toca, zonas táctiles de 44 px, un solo `<h1>` y los títulos en orden.
- Toda animación respeta `prefers-reduced-motion: reduce`: se quita o queda quieta.
- Sin JavaScript, el contenido se ve: una animación de entrada nunca deja un texto invisible esperando al JS.

## Entrega

1. Todos los archivos de la estructura de arriba, completos.
2. La lista de los assets que esperás en `/public`, con su nombre, tamaño y formato.
3. Una tabla que repase cada regla de "El formulario" y de "Lo que se conserva del sitio", con "cumple" o "no cumple".
