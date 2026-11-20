# La Percha

Demo de una tienda de ropa en Santiago, República Dominicana. Catálogo con filtros y búsqueda, carrito que se conserva en el navegador y pedido directo por WhatsApp. Negocio ficticio, hecho por [StackRD](https://daltonarc.github.io/stackrd-web/).

Demo en vivo: https://daltonarc.github.io/stackrd-demo-la-percha/

## Uso

- Elige la talla y agrega los productos al carrito.
- El carrito se guarda en `localStorage` y sigue ahí al recargar la página.
- "Enviar pedido por WhatsApp" abre un chat con el pedido ya escrito. El mensaje empieza con `[DEMO La Percha]` para distinguirlo de un pedido real.
- El número de WhatsApp se cambia en un solo lugar: `js/config.js`.

## Correr localmente

```bash
npm start
```

Abre http://127.0.0.1:3000. Requiere Node.js 18 o superior. `scripts/verify-server.sh` comprueba qué rutas sirve.

## Tecnologías

HTML, CSS y JavaScript sin dependencias. Fuentes Anton e Inter servidas desde `fonts/`. Imágenes en WebP.

## Créditos de las fotos

Fotografías de [Unsplash](https://unsplash.com), recortadas y convertidas a WebP.

