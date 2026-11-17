# ISIL Developers Club

Landing de la comunidad, agenda de eventos y calculadora de promedios. Construida con React, TypeScript, Vite y Lucide.

## Desarrollo local

Requiere Node.js compatible con Vite 7.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

## Comprobaciones

```sh
npm test
npm run build
```

La compilación genera `docs/` para el sitio de GitHub Pages bajo `/landing-page/`. En desarrollo se utiliza la raíz `/`.

## Contenido

- Los enlaces oficiales del club están en `src/config/club.ts`.
- La agenda conserva la API de eventos existente. Incluye carga, reintento, estado vacío, detalles e inscripción.
- La calculadora usa cuatro prácticas al 15% y una evaluación final al 40%. Valida notas de 0 a 20 y exige completar todos los campos.
- Los retratos optimizados están en `public/img/people/`. La portada utiliza una ilustración hecha con HTML y CSS; puede sustituirse por una fotografía real del club cuando esté disponible.
- Los recursos enlazan a freeCodeCamp, MDN, GitHub Education y Visual Studio Code.

La inscripción a eventos envía el formulario a la API existente únicamente cuando la persona confirma su registro. Las pruebas automáticas no crean inscripciones.
