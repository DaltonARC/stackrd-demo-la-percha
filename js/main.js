(function () {
  var TALLAS_R = ['S', 'M', 'L', 'XL'];
  var TALLAS_P = ['28', '30', '32', '34'];
  var TALLAS_C = ['38', '40', '42', '44'];
  var PRODUCTOS = [
    { id: 'camisa', nombre: 'Camisa Denim Lunares', cat: 'Camisas', precio: 1500, tallas: TALLAS_R, alt: 'Camisa de mezclilla con lunares colgada de un gancho' },
    { id: 'camisa-lino', nombre: 'Camisa Lino Cuello Mao', cat: 'Camisas', precio: 1800, tallas: TALLAS_R, alt: 'Camisa de lino color crema con cuello mao y mangas arremangadas' },
    { id: 'camisa-cuadros', nombre: 'Camisa Cuadros Cibao', cat: 'Camisas', precio: 1700, tallas: TALLAS_R, alt: 'Camisa de cuadros oscuros con botones en el cuello colgada de un gancho' },
    { id: 'sudadera', nombre: 'Sudadera Gris Capucha', cat: 'Sudaderas', precio: 2200, tallas: ['M', 'L', 'XL'], alt: 'Persona de espaldas con una sudadera gris con capucha' },
    { id: 'hoodie', nombre: 'Hoodie Azul Loma', cat: 'Sudaderas', precio: 2400, tallas: ['M', 'L', 'XL'], alt: 'Persona con un hoodie azul con capucha frente a un paisaje de montaña' },
    { id: 'jeans', nombre: 'Jean Recto Cibao', cat: 'Pantalones', precio: 1900, tallas: TALLAS_P, alt: 'Varios jeans azules colgados en fila' },
    { id: 'pantalon', nombre: 'Pantalón de Vestir Gris', cat: 'Pantalones', precio: 2100, tallas: TALLAS_P, alt: 'Pantalón de vestir gris colgado frente a una ventana' },
    { id: 'falda', nombre: 'Falda Plisada Negra', cat: 'Faldas', precio: 1600, tallas: ['S', 'M', 'L'], alt: 'Falda plisada negra con ribete de colores sobre fondo claro' },
    { id: 'tenis', nombre: 'Tenis Blancos Centro', cat: 'Calzado', precio: 3200, tallas: TALLAS_C, alt: 'Pies con tenis blancos sobre el césped' },
    { id: 'sandalias', nombre: 'Sandalias Cuero Oscuro', cat: 'Calzado', precio: 1200, tallas: TALLAS_C, alt: 'Par de sandalias oscuras sobre el césped de un parque' }
  ];

  var KEY = 'lapercha-carrito';
  var MAX_LINEAS = 20, MAX_CANT = 20;
  var $ = function (id) { return document.getElementById(id); };
  var porId = {};
  PRODUCTOS.forEach(function (p) { porId[p.id] = p; });

  var cat = 'Todo', q = '';
  var estado = cargar();

  function cargar() {
    var vacio = { items: [], nombre: '', entrega: '' };
    var g = guardado.leer(KEY);
    if (!g || !Array.isArray(g.items)) return vacio;
    var vistos = {};
    g.items.forEach(function (it) {
      if (!it || typeof it.id !== 'string' || !porId[it.id]) return;
      if (porId[it.id].tallas.indexOf(it.t) < 0) return;
      var c = Math.floor(Number(it.q));
      if (!(c >= 1)) return;
      var k = it.id + '|' + it.t;
      if (vistos[k] || vacio.items.length >= MAX_LINEAS) return;
      vistos[k] = 1;
      vacio.items.push({ id: it.id, t: it.t, q: Math.min(c, MAX_CANT) });
    });
    vacio.nombre = typeof g.nombre === 'string' ? g.nombre.slice(0, 60) : '';
    vacio.entrega = typeof g.entrega === 'string' ? g.entrega : '';
    return vacio;
  }
  function guardar() { guardado.escribir(KEY, estado); }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function tarjeta(p) {
    var radios = p.tallas.map(function (t, i) {
      return '<label><input type="radio" name="t-' + p.id + '" value="' + esc(t) + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(t) + '</span></label>';
    }).join('');
    return '<article class="prod" data-id="' + p.id + '">' +
      '<img src="img/' + p.id + '-480.webp" srcset="img/' + p.id + '-480.webp 480w, img/' + p.id + '-800.webp 800w" sizes="(min-width:1100px) 270px, (min-width:700px) 33vw, 50vw" width="480" height="600" loading="lazy" alt="' + esc(p.alt) + '">' +
      '<div class="info"><span class="cat-name">' + esc(p.cat) + '</span><h3>' + esc(p.nombre) + '</h3>' +
      '<div class="price">' + fmt(p.precio) + '</div>' +
      '<fieldset class="tallas"><legend>Talla</legend>' + radios + '</fieldset>' +
      '<button type="button" class="add" data-add="' + p.id + '">Agregar al carrito</button></div></article>';
  }

  function pintarFiltros() {
    var cats = ['Todo'];
    PRODUCTOS.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    $('filtros').innerHTML = cats.map(function (c) {
      return '<button type="button" data-cat="' + esc(c) + '" aria-pressed="' + (c === cat) + '">' + esc(c) + '</button>';
    }).join('');
  }

  function pintarCatalogo() {
    var t = q.trim().toLowerCase();
    var lista = PRODUCTOS.filter(function (p) {
      return (cat === 'Todo' || p.cat === cat) && (!t || (p.nombre + ' ' + p.cat).toLowerCase().indexOf(t) >= 0);
    });
    $('grid').innerHTML = lista.map(tarjeta).join('');
    $('vacio').hidden = lista.length > 0;
    $('resultados').textContent = lista.length + (lista.length === 1 ? ' producto' : ' productos');
  }

  function totales() {
    var n = 0, t = 0;
    estado.items.forEach(function (it) { n += it.q; t += it.q * porId[it.id].precio; });
    return { n: n, t: t };
  }

  function mensaje() {
    var lineas = estado.items.map(function (it) {
      var p = porId[it.id];
      return '- ' + it.q + ' x ' + p.nombre + ' (' + it.t + '): ' + fmt(p.precio * it.q);
    });
    var nombre = $('nombre').value.trim().replace(/[\s.,;:!?]+$/, '');
    var m = 'Hola, quiero hacer este pedido:\n' + lineas.join('\n') + '\nTotal: ' + fmt(totales().t);
    if (nombre) m += '\nNombre: ' + nombre;
    m += '\nEntrega: ' + $('entrega').value;
    return m;
  }

  function pintarCarro() {
    var tt = totales();
    var b = $('cuentaCarro');
    b.textContent = tt.n;
    b.setAttribute('aria-label', tt.n + (tt.n === 1 ? ' artículo' : ' artículos'));
    $('total').textContent = fmt(tt.t);
    var cont = $('lineas');
    if (!estado.items.length) {
      cont.innerHTML = '<p class="vacio-c">Tu carrito está vacío.</p>';
    } else {
      cont.innerHTML = estado.items.map(function (it, i) {
        var p = porId[it.id];
        return '<div class="lin"><div class="nm">' + esc(p.nombre) + '<small>Talla ' + esc(it.t) + ' · ' + fmt(p.precio) + '</small></div>' +
          '<div class="ctl" role="group" aria-label="Cantidad de ' + esc(p.nombre) + '">' +
          '<button type="button" data-m="-" data-i="' + i + '" aria-label="Quitar una unidad">−</button><b>' + it.q + '</b>' +
          '<button type="button" data-m="+" data-i="' + i + '" aria-label="Agregar una unidad">+</button></div>' +
          '<button type="button" class="quitar" data-m="x" data-i="' + i + '" aria-label="Eliminar ' + esc(p.nombre) + '"><svg class="i" aria-hidden="true"><use href="#i-trash"/></svg></button></div>';
      }).join('');
    }
    var a = $('enviar');
    var ok = estado.items.length > 0;
    a.setAttribute('aria-disabled', ok ? 'false' : 'true');
    a.tabIndex = ok ? 0 : -1;
    a.href = ok ? wa(mensaje()) : '#';
  }

  function aviso(t) { $('aviso').textContent = ''; setTimeout(function () { $('aviso').textContent = t; }, 30); }

  $('grid').addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (!b) return;
    var id = b.dataset.add, art = b.closest('.prod');
    var t = art.querySelector('input[type=radio]:checked').value;
    var f = estado.items.filter(function (it) { return it.id === id && it.t === t; })[0];
    if (f) f.q = Math.min(f.q + 1, MAX_CANT);
    else if (estado.items.length < MAX_LINEAS) estado.items.push({ id: id, t: t, q: 1 });
    guardar(); pintarCarro();
    b.textContent = 'Agregado';
    b.classList.add('ok');
    aviso(porId[id].nombre + ', talla ' + t + ', agregado al carrito');
    setTimeout(function () { b.textContent = 'Agregar al carrito'; b.classList.remove('ok'); }, 1200);
  });

  $('filtros').addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    cat = b.dataset.cat;
    pintarFiltros(); pintarCatalogo();
  });
  $('buscar').addEventListener('input', function (e) { q = e.target.value; pintarCatalogo(); });

  $('lineas').addEventListener('click', function (e) {
    var b = e.target.closest('[data-m]');
    if (!b) return;
    var i = +b.dataset.i, it = estado.items[i];
    if (!it) return;
    if (b.dataset.m === '+') it.q = Math.min(it.q + 1, MAX_CANT);
    if (b.dataset.m === '-') it.q -= 1;
    if (b.dataset.m === 'x' || it.q < 1) estado.items.splice(i, 1);
    guardar(); pintarCarro();
    var sig = $('lineas').querySelector('[data-m]');
    if (sig) sig.focus(); else $('cerrarCarro').focus();
  });

  var dlg = $('carro');
  $('abrirCarro').addEventListener('click', function () { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); });
  $('cerrarCarro').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  $('nombre').value = estado.nombre;
  if (estado.entrega) $('entrega').value = estado.entrega;
  $('pie').addEventListener('input', function () {
    estado.nombre = $('nombre').value.slice(0, 60);
    estado.entrega = $('entrega').value;
    guardar(); pintarCarro();
  });
  $('enviar').addEventListener('click', function (e) { if (!estado.items.length) e.preventDefault(); });

  pintarFiltros(); pintarCatalogo(); pintarCarro();
})();
