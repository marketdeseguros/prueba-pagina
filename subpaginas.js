/*
  Market de Seguros
  Código compartido de Escolar, Nosotros, Blog y Contacto.

  Cargar antes de solicitudes.js y menu-header.js,
  siempre con defer, como aparece en los HTML.
*/

// Cambia aquí las rutas de tus iconos de interfaz.
const iconosInterfaz = {
  'arrow-right': './img/icon-flecha.svg',
  'arrow-up-right': './img/icon-diagonal.svg',
  menu: './img/icon-sandwich.svg',
  x: './img/icon-close.svg'
};

function icon(nombre) {
  const archivo = iconosInterfaz[nombre];

  if (!archivo) return '';

  const elemento = document.createElement('span');

  elemento.className = 'icon icon-mask';
  elemento.setAttribute('aria-hidden', 'true');
  elemento.style.setProperty(
    '--icon-file',
    'url("' + archivo + '")'
  );

  return elemento.outerHTML;
}

/*
  Catálogo para solicitudes.js.
  Escolar usa exclusivamente la categoría "escuelas".
*/

const products = {};

document
  .querySelectorAll('[data-categoria][data-nombre]')
  .forEach(seccion => {
    const categoria = seccion.dataset.categoria;

    products[categoria] ??= [];

    products[categoria].push({
      name: seccion.dataset.nombre,
      detail: seccion.querySelector('.sp-intro').textContent,
      image: seccion
        .querySelector('.product-icon img')
        .getAttribute('src')
    });
  });

const dialog = document.getElementById('product-dialog');
let ultimoBoton = null;

/*
  solicitudes.js amplía esta función con los campos
  y validaciones correspondientes a cada producto.
*/

function openProduct(categoria, indice) {
  const producto = products[categoria]?.[indice];

  if (!producto || !dialog) return;

  ultimoBoton = document.activeElement;

  document.getElementById('dialog-title').textContent =
    producto.name;

  document.getElementById('dialog-description').textContent =
    producto.detail;

  const imagen = document.createElement('img');

  imagen.src = producto.image;
  imagen.alt = '';

  document
    .getElementById('dialog-icon')
    .replaceChildren(imagen);

  if (!dialog.open) {
    dialog.showModal();
  }

  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
}

document.querySelectorAll('[data-producto]').forEach(boton => {
  boton.addEventListener('click', () => {
    const categoria = boton
      .closest('[data-categoria]')
      .dataset.categoria;

    const indice = products[categoria].findIndex(
      producto => producto.name === boton.dataset.producto
    );

    if (indice >= 0) {
      openProduct(categoria, indice);
    }
  });
});

/* Cierre del formulario de cotización */

if (dialog) {
  document
    .getElementById('close-dialog')
    .addEventListener('click', () => dialog.close());

  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    ultimoBoton?.focus({ preventScroll: true });
  });

  dialog.addEventListener('click', evento => {
    if (evento.target !== dialog) return;

    const borde = dialog.getBoundingClientRect();

    if (
      evento.clientX < borde.left ||
      evento.clientX > borde.right ||
      evento.clientY < borde.top ||
      evento.clientY > borde.bottom
    ) {
      dialog.close();
    }
  });
}

/*
  Menú principal móvil.
  menu-header.js administra los menús desplegables.
*/

const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

function cambiarMenu(abierto) {
  mobileNav.hidden = !abierto;

  menuToggle.setAttribute(
    'aria-expanded',
    String(abierto)
  );

  menuToggle.setAttribute(
    'aria-label',
    abierto ? 'Cerrar menú' : 'Abrir menú'
  );

  menuToggle.innerHTML = icon(abierto ? 'x' : 'menu');
}

menuToggle.addEventListener('click', () => {
  cambiarMenu(mobileNav.hidden);
});

mobileNav.querySelectorAll('a').forEach(enlace => {
  enlace.addEventListener('click', () => {
    cambiarMenu(false);
  });
});

document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && !mobileNav.hidden) {
    cambiarMenu(false);
    menuToggle.focus();
  }
});

document.addEventListener('click', evento => {
  if (
    !mobileNav.hidden &&
    !evento.target.closest('.header')
  ) {
    cambiarMenu(false);
  }
});

matchMedia('(min-width: 921px)').addEventListener(
  'change',
  evento => {
    if (evento.matches) {
      cambiarMenu(false);
    }
  }
);

/* Colocar iconos */

document.querySelectorAll('[data-icon]').forEach(elemento => {
  elemento.innerHTML = icon(elemento.dataset.icon);
});

/* Año del footer */

document.getElementById('year').textContent =
  String(new Date().getFullYear());

/* Habilitar cotizaciones cuando solicitudes.js esté listo */

document.addEventListener(
  'DOMContentLoaded',
  () => {
    if (!dialog) return;

    const disponible = Boolean(
      document.getElementById('solicitud-cotizacion')
    );

    document
      .querySelectorAll('[data-solicitud]')
      .forEach(boton => {
        boton.disabled = !disponible;
      });

    document.getElementById('formularios-estado').hidden =
      disponible;
  },
  { once: true }
);

/*
  Formulario general de Contacto.
  Es independiente de los formularios de cotización.
*/

const contacto = document.getElementById('form-contacto');

if (contacto) {
  const campos = document.getElementById('contacto-campos');
  const estado = document.getElementById('contacto-estado');
  const enviar = document.getElementById('contacto-enviar');
  const nombre = document.getElementById('contacto-nombre');
  const telefono = document.getElementById('contacto-telefono');
  const mensajeCampo = document.getElementById('contacto-mensaje');

  let enviando = false;

  campos.disabled = false;

  [nombre, telefono, mensajeCampo].forEach(control => {
    control.addEventListener('input', () => {
      control.setCustomValidity('');
    });
  });

  function mensaje(texto, error = false) {
    estado.textContent = texto;

    estado.className =
      'sp-estado' + (error ? ' sp-error' : '');

    estado.hidden = false;
    estado.focus();
  }

  contacto.addEventListener('submit', async evento => {
    evento.preventDefault();

    if (enviando) return;

    contacto
      .querySelectorAll('input:not([type="checkbox"]), textarea')
      .forEach(control => {
        control.value = control.value.trim();
      });

    nombre.setCustomValidity(
      nombre.value.length < 2
        ? 'Escribe tu nombre completo.'
        : ''
    );

    mensajeCampo.setCustomValidity(
      mensajeCampo.value.length < 10
        ? 'Escribe un mensaje de al menos 10 caracteres.'
        : ''
    );

    const digitos = telefono.value.replace(/\D/g, '').length;

    const valido =
      !telefono.value ||
      (
        /^\+?[\d\s().-]+$/.test(telefono.value) &&
        digitos >= 10 &&
        digitos <= 15
      );

    telefono.setCustomValidity(
      valido
        ? ''
        : 'Escribe un teléfono con lada, de 10 a 15 dígitos.'
    );

    if (!contacto.reportValidity()) return;

    if (contacto.elements.namedItem('_honey').value) return;

    if (!/^https?:$/.test(location.protocol)) {
      mensaje(
        'Para enviar el mensaje, abre esta página desde tu sitio web. ' +
        'También puedes escribir a ventas@marketdeseguros.com.',
        true
      );

      return;
    }

    const datos = Object.fromEntries(
      new FormData(contacto).entries()
    );

    datos._subject = 'Contacto Market: ' + datos.Motivo;
    datos._template = 'table';
    datos.Origen = 'Página de contacto';

    enviando = true;
    campos.disabled = true;

    contacto.setAttribute('aria-busy', 'true');

    enviar.textContent = 'Enviando…';
    estado.hidden = true;

    const controlador = new AbortController();

    const limite = setTimeout(
      () => controlador.abort(),
      20000
    );

    try {
      const respuesta = await fetch(contacto.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(datos),
        signal: controlador.signal
      });

      const resultado = await respuesta.json();

      if (
        !respuesta.ok ||
        String(resultado.success) !== 'true'
      ) {
        throw new Error('envio');
      }

      contacto.reset();

      mensaje(
        'Recibimos tu mensaje. Gracias por contactar a Market de Seguros.'
      );
    } catch {
      mensaje(
        'No pudimos confirmar el envío. Intenta de nuevo o ' +
        'escríbenos a ventas@marketdeseguros.com.',
        true
      );
    } finally {
      clearTimeout(limite);

      enviando = false;
      campos.disabled = false;

      contacto.removeAttribute('aria-busy');

      enviar.textContent = 'Enviar mensaje';
    }
  });
}