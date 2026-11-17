# Fondos de los retratos

Se retiró el fondo blanco de cinco fotografías con la herramienta integrada ImageGen, en modo de edición con transparencia. Los archivos originales se conservan. Los fondos de color se aplican en CSS sobre los recortes PNG.

| Persona | Original | Recorte final | Fondo |
| --- | --- | --- | --- |
| Cesar Preciado | `public/img/CesarPreciado.jpeg` | `public/img/portraits/CesarPreciado.png` | Azul pizarra |
| Rafael Acalá | `public/img/RafaelAcala.jpg` | `public/img/portraits/RafaelAcala.png` | Azul |
| Juan Yllanes | `public/img/JuanYllanes.png` | `public/img/portraits/JuanYllanes.png` | Verde petróleo |
| Andy Chung | `public/img/AndyChung.jpeg` | `public/img/portraits/AndyChung.png` | Violeta |
| Ana Rivas | `public/img/AnaRivas.jpg` | `public/img/portraits/AnaRivas.png` | Rosa malva |

Las fotos de Jair Castañeda y Matt Castillo conservan sus archivos y estilos originales.

## Prompt final

Se utilizó el siguiente prompt en una edición independiente por cada original de la tabla, como única imagen de entrada. Se activó `transparent_background: true`.

```text
Use case: background-extraction. Asset type: a real person's existing team portrait for a website. Image 1 is the ONLY edit target. Remove ONLY the plain white background and export a clean cutout on a genuinely TRANSPARENT background with alpha, not white and not a checkerboard baked into the image. Preserve the photographed person exactly: same identity, facial geometry, facial features, expression, eyes, glasses if present, skin texture, hair including fine strands, original lighting, clothes, jewelry, pose, proportions, crop, framing, and subject size. Do not beautify, retouch, relight, redraw, restyle, replace clothing, sharpen facial features, or invent missing body parts. Preserve all white clothing and highlights that belong to the person. Remove background white halos carefully without erasing hair. Maintain the original portrait's aspect ratio and composition. No new background, no text, no watermark.
```
