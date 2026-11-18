# Perfiles de LinkedIn

Los enlaces permitidos están en `linkedin-members.json`. El actor utilizado es
`supreme_coder/linkedin-profile-scraper`. Solo se publica el puesto y la empresa
vigentes, o el titular profesional cuando no hay un empleo vigente confirmado.

El token se lee desde `APIFY_TOKEN` en el entorno o desde `.env.local` en desarrollo.
No debe llevar el prefijo `VITE_` ni guardarse en los archivos del sitio.

```sh
# Extraer de nuevo los seis perfiles, con un máximo de 0,10 USD por ejecución.
npm run profiles:refresh

# Importar una ejecución completada sin iniciar otro scrapeo.
npm run profiles:sync -- ID_DE_EJECUCION
```

GitHub Actions ejecuta la extracción el día 1 de cada mes a las 05:17 de Perú
(`17 10 1 * *` en UTC). También se puede abrir el workflow de Pages y seleccionar
`refresh_profiles` al ejecutarlo manualmente. Los pushes normales compilan los
datos guardados y no consumen consultas de Apify.

La actualización mensual guarda `src/features/creditos/linkedin-profiles.json`
en `main` con `GITHUB_TOKEN`. La misma ejecución compila ese commit y publica
GitHub Pages. Si Apify falla o devuelve una respuesta parcial, el job falla antes
de reemplazar los datos y la publicación anterior sigue disponible.

El secreto `APIFY_TOKEN` debe estar en los secretos de Actions del repositorio.
El permiso `contents: write` solo se concede al job de actualización mensual.
