# ISIL Developers Club

Sitio web: https://isil-club.github.io/

## Desarrollo local

```sh
npm ci
npm run dev
```

## Publicación automática

Cada push a `main` ejecuta `.github/workflows/pages.yml`: instala las dependencias con `npm ci`, ejecuta `npm run build` y publica el resultado en GitHub Pages.

Vite limpia `docs` antes de compilar y copia las imágenes de `public` al resultado. GitHub Pages publica ese artefacto recién generado mediante GitHub Actions.

Para actualizar la web, edita `src` y `public` y sube los cambios a `main`. No es necesario actualizar ni subir `docs` manualmente para publicar; su contenido es generado y no debe editarse a mano.

También se puede ejecutar el flujo desde **Actions → Publicar sitio en GitHub Pages → Run workflow**, seleccionando `main`.
