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

HTML, CSS y JavaScript sin dependencias. Fuentes Anton e Inter servidas desde `fonts/`. Imágenes en WebP 4:5.

## Créditos de las fotos

La camisa denim y la sudadera gris son fotografías de [Unsplash](https://unsplash.com). El resto viene de [Openverse](https://openverse.org), con licencia CC0 o dominio público. Todas están recortadas y convertidas a WebP.

- Camisa Lino Cuello Mao: shop8447, CC0, [origen](https://live.staticflickr.com/65535/49062043592_b00580507e.jpg)
- Camisa Cuadros Cibao: Punker1999, CC0, [origen](https://upload.wikimedia.org/wikipedia/commons/a/ae/Plaid_IZOD_men%27s_shirt.jpg)
- Hoodie Azul Loma: Creative Vix, CC0, [origen](https://cdn.stocksnap.io/img-thumbs/960w/EU4KRTXEQH.jpg)
- Jean Recto Cibao: it's me neosiam, CC0, [origen](https://cdn.stocksnap.io/img-thumbs/960w/QBSVGRFT2Y.jpg)
- Pantalón de Vestir Gris: Kotivalo, CC0, [origen](https://upload.wikimedia.org/wikipedia/commons/0/09/Men%27s_trousers_inside_out.jpg)
- Falda Plisada Negra: desconocido, CC0, [origen](https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA3L21pYTI4ODI2LWltYWdlLmpwZw.jpg)
- Tenis Blancos Centro: Alina Kakshapati, CC0, [origen](https://pd.w.org/2025/08/13268afef601b6793.86121493-1536x2048.jpg)
- Sandalias Cuero Oscuro: athrasher, CC0, [origen](https://live.staticflickr.com/2515/3930005102_696ef6c886_b.jpg)
