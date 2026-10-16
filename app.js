/* MARKET DE SEGUROS */

/* =====================================================
   ÍCONOS ORIGINALES
   ===================================================== */

const iconPaths = {
  'arrow-right':
    '<path d="M5 12h14m-6-6 6 6-6 6"/>',

  'arrow-up-right':
    '<path d="M7 17 17 7M7 7h10v10"/>',

  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.83.58 2.79.7A2 2 0 0 1 22 16.92z"/>',

  mail:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',

  clock:
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',

  menu:
    '<path d="M4 6h16M4 12h16M4 18h16"/>',

  x:
    '<path d="m6 6 12 12M18 6 6 18"/>',

  heart:
    '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/>',

  'circle-check':
    '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',

  messages:
    '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 10h8M8 14h5"/>',

  layers:
    '<path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5"/>',

  'hand-heart':
    '<path d="M11 14h4a2 2 0 0 0 0-4h-3c-2-3-5-2-6-1M2 9v11h4V9H2Zm4 9 6 3 9-6a2 2 0 0 0-3-2l-3 2"/><path d="m14 6-2-2a2 2 0 0 1 3-3 2 2 0 0 1 3 3l-2 2-1 1-1-1Z"/>',

  building:
    '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-4h6v4M8 7h1m6 0h1M8 11h1m6 0h1"/>',

  graduation:
    '<path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v6c3 3 9 3 12 0v-6m4-3v8"/>',

  car:
    '<path d="m5 7 2-4h10l2 4M3 8h18v10H3V8Zm2 10v3m14-3v3M7 13h.01M17 13h.01M2 8h20"/>',

  health:
    '<path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4m4 0h4M10 12v3a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="9" r="2"/>',

  home:
    '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-8h6v8"/>',

  plane:
    '<path d="m22 2-7 20-4-9-9-4L22 2ZM22 2 11 13"/>',

  savings:
    '<path d="M12 3v3m0 12v3M16 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7"/><path d="M5 19h9.5M19 5l2-2M3 3l2 2"/>',

  shield:
    '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m8 12 3 3 5-6"/>',

  people:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/>',

  truck:
    '<path d="M1 3h14v13H1zM15 8h4l3 3v5h-7"/><circle cx="5.5" cy="18" r="2.5"/><circle cx="18.5" cy="18" r="2.5"/>',

  book:
    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3Zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3Z"/>',

  ball:
    '<circle cx="12" cy="12" r="9"/><path d="m12 7 5 4-2 6H9l-2-6 5-4ZM12 3v4M3.5 9 7 11m-1 8 3-2m9 2-3-2m5.5-8L17 11"/>'
};

/* =====================================================
   ÍCONOS DE LOS SEGUROS
   ===================================================== */

const iconosPersonalizados = {
  // PERSONAS
  'Seguro de Auto': './img/icono-auto.png',
  'Vida y familia': './img/iconos/icono-familia.png',
  'Gastos médicos': './img/iconos/icono-gmm.png',
  'Hogar': './img/iconos/icono-hogar.png',
  'Viajes': './img/iconos/icono-viaje.png',
  'Accidentes personales': './img/iconos/icono-escudo.png',
  'Mascotas': './img/iconos/icono-mascota.png',

  // EMPRESAS
  'Gastos Médicos Colectivos': './img/iconos/icono-empresa.png',
  'Responsabilidad civil': './img/iconos/icono-escudo.png',
  'Vida Grupo': './img/iconos/icono-persona.png',
  'Transporte de mercancías': './img/iconos/icono-transporte.png',
  'Flotillas': './img/iconos/icono- flotilla.png',

  // ESCUELAS
  'Accidentes escolares': './img/iconos/icono-escuela.png',
  'Continuidad escolar': './img/iconos/icono-continuidad.png',
  'Deportes': './img/iconos/icono-deporte.png',
  'Responsabilidad Civil Escolar': './img/iconos/icono-escudo.png'
};

/* =====================================================
   ÍCONOS DE LA INTERFAZ
   ===================================================== */

const iconosInterfaz = {
  'arrow-right': './img/icon-flecha.svg',
  'arrow-up-right': './img/icon-diagonal.svg',
  'menu': './img/icon-sandwich.svg',
  'x': './img/icon-close.svg',
  'heart': './img/icon-icon-heartgray.svg',
  'building': './img/icon-enterprise.svg',
  'graduation': './img/icon-school.svg',
  'messages': './img/icon-chat.svg',
  'layers': './img/icon-layers.svg',
  'hand-heart': './img/icon-hand.svg',
  'circle-check': './img/icono-check.svg',
  'book': './img/icono-blog.svg',
  'phone': './img/icon-telefono.svg',
  'mail': './img/icon-mail.svg',
  'clock': './img/icon-clock.svg'
};

function iconoOriginal(name) {
  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'
    + (iconPaths[name] || iconPaths.shield)
    + '</svg>';
}

function icon(name, nombreSeguro) {
  const archivo = nombreSeguro
    ? iconosPersonalizados[nombreSeguro]
    : iconosInterfaz[name];

  if (!archivo) return iconoOriginal(name);

  const imagen = document.createElement('img');
  imagen.src = archivo;
  imagen.alt = '';
  imagen.className = 'icon';
  imagen.style.objectFit = 'contain';
  imagen.dataset.iconoRespaldo = name;

  return imagen.outerHTML;
}

document.addEventListener('error', function (event) {
  const imagen = event.target;

  if (
    imagen instanceof HTMLImageElement &&
    imagen.dataset.iconoRespaldo
  ) {
    imagen.outerHTML = iconoOriginal(imagen.dataset.iconoRespaldo);
  }
}, true);

function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(elemento => {
    elemento.innerHTML = icon(elemento.dataset.icon);
  });
}

/* =====================================================
   SEGUROS Y TEXTOS DE LAS TARJETAS
   ===================================================== */

const products = {
  personas: [
    {
      name: 'Seguro de Auto',
      icon: 'car',
      desc: 'Cada camino tiene sus planes. Encuentra protección para tu auto y tus trayectos.',
      detail: 'Tu auto te lleva a lo que importa. Revisamos contigo las opciones para protegerlo de acuerdo con su uso y con tus necesidades.',
      points: [
        'Uso y características de tu vehículo.',
        'Opciones de cobertura adecuadas a tus necesidades.',
        'Deducibles, asistencias y condiciones del plan.'
      ]
    },
    {
      name: 'Vida y familia',
      icon: 'heart',
      desc: 'Un respaldo económico para quienes forman parte de tu historia.',
      detail: 'Conoce las opciones de protección de vida, ahorro, retiro, educación y servicios funerarios. Selecciona el seguro que te interesa y compártenos tus datos para preparar una cotización.',
      points: [
        'Personas que deseas proteger.',
        'Suma asegurada y plazo de protección.',
        'Beneficios que obtienes al contratar.'
      ]
    },
    {
      name: 'Gastos médicos',
      icon: 'health',
      desc: 'Conoce tus opciones para afrontar los gastos de una enfermedad o accidente.',
      detail: 'Un plan de gastos médicos se elige con información. Te orientamos para conocer cómo funciona y qué aspectos revisar antes de contratar.',
      points: [
        'Red hospitalaria y nivel de atención.',
        'Deducible, coaseguro y suma asegurada.',
        'Periodos de espera, exclusiones y requisitos.'
      ]
    },
    {
      name: 'Hogar',
      icon: 'home',
      desc: 'Tu casa es más que un lugar. Conoce cómo cuidar tu patrimonio.',
      detail: 'Cada hogar es diferente. Revisamos las alternativas para tu vivienda y sus contenidos, incluyendo las coberturas disponibles para fenómenos naturales.',
      points: [
        'Ubicación, características y uso de la vivienda.',
        'Protección para inmueble y contenidos.',
        'Disponibilidad de coberturas de sismo e inundación.'
      ]
    },
    {
      name: 'Viajes',
      icon: 'plane',
      desc: 'Disfruta lo que viene, con asistencia para los imprevistos del camino.',
      detail: 'Desde una escapada hasta ese viaje que llevas tiempo planeando, te ayudamos a revisar las opciones de asistencia de acuerdo con tu destino y duración.',
      points: [
        'Destino, fechas y personas que viajarán.',
        'Asistencia médica y beneficios disponibles.',
        'Límites, exclusiones y requisitos del viaje.'
      ]
    },
    {
      name: 'Accidentes personales',
      icon: 'shield',
      desc: 'Un respaldo para los gastos que puede dejar un accidente en tu día a día.',
      detail: 'Una caída, una lesión o un percance pueden cambiar tus planes. Te ayudamos a conocer las opciones de protección por accidentes para adultos, niños y familias.',
      points: [
        'Personas que deseas asegurar y actividades que realizan.',
        'Gastos médicos y beneficios por accidente disponibles.',
        'Sumas aseguradas, exclusiones y forma de atención.'
      ]
    },
    {
      name: 'Mascotas',
      icon: 'heart',
      desc: 'También son familia. Conoce cómo cuidarlas ante un accidente o enfermedad.',
      detail: 'Cuando tu mascota necesita atención, quieres saber con qué apoyo cuentas. Revisamos contigo las opciones para gastos veterinarios y las condiciones para contratar.',
      points: [
        'Edad y características de tu mascota.',
        'Atención veterinaria y beneficios incluidos en cada plan.',
        'Límites de cobertura, requisitos y exclusiones.'
      ]
    }
  ],

  empresas: [
    {
      name: 'Gastos Médicos Colectivos',
      icon: 'building',
      desc: 'Opciones de protección médica para quienes forman parte de tu empresa.',
      detail: 'Cuidar a tu equipo también implica contar con alternativas ante los gastos de una enfermedad o accidente. Te asesoramos para elegir un seguro de gastos médicos colectivos de acuerdo con las necesidades de tu empresa.',
      points: [
        'Características del grupo que deseas asegurar.',
        'Red hospitalaria, deducible, coaseguro y suma asegurada.',
        'Coberturas, requisitos de contratación y condiciones del plan.'
      ]
    },
    {
      name: 'Responsabilidad civil',
      icon: 'shield',
      desc: 'Conoce las opciones ante daños a terceros relacionados con tu actividad.',
      detail: 'Te ayudamos a revisar la responsabilidad civil de tu empresa de acuerdo con su actividad. Contamos con opciones para negocios como restaurantes y hoteles.',
      points: [
        'Actividades y riesgos de tu empresa.',
        'Alcance de la responsabilidad civil contratada.',
        'Sumas aseguradas, exclusiones y deducibles.'
      ]
    },
    {
      name: 'Vida Grupo',
      icon: 'people',
      desc: 'Cuida a quienes hacen posible cada logro de tu empresa.',
      detail: 'Tu equipo es parte de la historia de tu empresa. Conoce las opciones de protección de vida para tus colaboradores y el respaldo para sus beneficiarios.',
      points: [
        'Características y número de colaboradores.',
        'Sumas aseguradas y coberturas disponibles.',
        'Requisitos de ingreso y administración del grupo.'
      ]
    },
    {
      name: 'Transporte de mercancías',
      icon: 'truck',
      desc: 'Protección para tu mercancía mientras se mueve hacia su destino.',
      detail: 'Cada traslado tiene características distintas. Revisamos las opciones para asegurar tus mercancías de acuerdo con su tipo, medio de transporte y recorrido.',
      points: [
        'Tipo, valor y empaque de las mercancías.',
        'Origen, destino y medios de transporte.',
        'Riesgos cubiertos, medidas de seguridad y exclusiones.'
      ]
    },
    {
      name: 'Flotillas',
      icon: 'car',
      desc: 'Tus vehículos mueven tu negocio. Encuentra protección acorde a su uso.',
      detail: 'Reúne la protección de tus vehículos en un esquema pensado para tu operación. Te ayudamos a revisar opciones según el número de unidades, sus características y el trabajo que realizan.',
      points: [
        'Tipos de vehículos, usos y recorridos.',
        'Coberturas y deducibles por unidad.',
        'Administración de altas, bajas y renovaciones.'
      ]
    }
  ],

  escuelas: [
    {
      name: 'Accidentes escolares',
      icon: 'graduation',
      desc: 'Acompaña a tu comunidad ante los accidentes del día a día.',
      detail: 'Te orientamos sobre las opciones de atención por accidentes para alumnos y docentes. Revisamos el alcance del plan y cómo utilizarlo con tu institución.',
      points: [
        'Edades y número de alumnos y docentes.',
        'Suma asegurada y alcance de la protección.',
        'Red de atención y proceso para reportar accidentes.'
      ]
    },
    {
      name: 'Continuidad escolar',
      icon: 'book',
      desc: 'Conoce cómo apoyar la continuidad de los estudios ante la ausencia de un sostén económico.',
      detail: 'También conocido como seguro de orfandad, busca apoyar la continuidad escolar ante el fallecimiento del padre, madre o tutor asegurado, conforme a las condiciones del plan.',
      points: [
        'Persona asegurada y alumno beneficiario.',
        'Colegiaturas, plazo y alcance del beneficio.',
        'Requisitos de contratación y condiciones del plan.'
      ]
    },
    {
      name: 'Deportes',
      icon: 'ball',
      desc: 'Conoce las opciones para cuidar a tu equipo dentro de la cancha.',
      detail: 'Las actividades deportivas necesitan una revisión específica. Te ayudamos a conocer los planes colectivos disponibles para fútbol y otras disciplinas elegibles.',
      points: [
        'Disciplina, edades y número de participantes.',
        'Entrenamientos y competencias por asegurar.',
        'Actividades elegibles, límites y exclusiones.'
      ]
    },
    {
      name: 'Responsabilidad Civil Escolar',
      icon: 'shield',
      desc: 'Revisa los riesgos de tu institución y la protección ante reclamaciones de terceros.',
      detail: 'La responsabilidad civil de una escuela necesita una revisión propia. Te orientamos sobre el alcance de la protección para la institución y sus actividades.',
      points: [
        'Instalaciones y actividades de la institución.',
        'Los alumnos y docentes no son terceros; revisamos su protección por separado.',
        'Riesgos cubiertos, sumas aseguradas y exclusiones.'
      ]
    }
  ]
};

const categoryLabels = {
  personas: 'PARA TI Y TU FAMILIA',
  empresas: 'PARA TU EMPRESA',
  escuelas: 'PARA TU COMUNIDAD ESCOLAR'
};

/* =====================================================
   CREACIÓN DE LAS TARJETAS
   ===================================================== */

Object.entries(products).forEach(([category, items]) => {
  const panel = document.getElementById('panel-' + category);

  items.forEach((product, index) => {
    const card = document.createElement('article');
    card.className = 'product-card';

    card.innerHTML =
      '<div class="product-top">' +
        '<div class="product-icon">' +
          icon(product.icon, product.name) +
        '</div>' +
        '<span class="product-number" aria-hidden="true">' +
          '0' + (index + 1) +
        '</span>' +
      '</div>' +
      '<h3>' + product.name + '</h3>' +
      '<p>' + product.desc + '</p>' +
      '<button type="button" aria-label="Conocer ' +
        product.name +
        '" aria-haspopup="dialog">' +
        'Conocer seguro ' + icon('arrow-right') +
      '</button>';

    card.querySelector('button').addEventListener('click', () => {
      openProduct(category, index);
    });

    panel.append(card);
  });
});

/* =====================================================
   PESTAÑAS: PERSONAS, EMPRESAS Y ESCUELAS
   ===================================================== */

const tabs = [...document.querySelectorAll('[data-tab]')];

function selectTab(category, focus = false) {
  tabs.forEach(tab => {
    const selected = tab.dataset.tab === category;

    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;

    document.getElementById(
      tab.getAttribute('aria-controls')
    ).hidden = !selected;

    if (selected && focus) tab.focus();
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    selectTab(tab.dataset.tab);
  });

  tab.addEventListener('keydown', event => {
    let next;

    if (event.key === 'ArrowRight') {
      next = (index + 1) % tabs.length;
    }

    if (event.key === 'ArrowLeft') {
      next = (index - 1 + tabs.length) % tabs.length;
    }

    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;

    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next].dataset.tab, true);
    }
  });
});

document.querySelectorAll('[data-select-tab]').forEach(link => {
  link.addEventListener('click', () => {
    selectTab(link.dataset.selectTab);
  });
});

document.getElementById('school-options').addEventListener(
  'click',
  () => {
    selectTab('escuelas');

    document.getElementById('seguros').scrollIntoView({
      behavior: matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches ? 'instant' : 'smooth'
    });

    document.getElementById('tab-escuelas').focus({
      preventScroll: true
    });
  }
);

/* =====================================================
   VENTANA CON LOS DETALLES DEL SEGURO
   ===================================================== */

const dialog = document.getElementById('product-dialog');
let lastTrigger;

function openProduct(category, index) {
  const product = products[category][index];
  lastTrigger = document.activeElement;

  document.getElementById('dialog-title').textContent = product.name;
  document.getElementById('dialog-category').textContent =
    categoryLabels[category];

  document.getElementById('dialog-description').textContent =
    product.detail;

  document.getElementById('dialog-icon').innerHTML =
    icon(product.icon, product.name);

  const list = document.getElementById('dialog-points');
  list.replaceChildren();

  product.points.forEach(point => {
    const item = document.createElement('li');
    item.innerHTML = icon('circle-check');

    const text = document.createElement('span');
    text.textContent = point;

    item.append(text);
    list.append(item);
  });

  const subject = 'Quiero cotizar: ' + product.name;

  const body =
    'Hola.\n\n' +
    'Me gustaría recibir asesoría y una cotización de ' +
    product.name.toLowerCase() +
    '.\n\nGracias.';

  document.getElementById('dialog-email').href =
    'mailto:ventas@marketdeseguros.com?subject=' +
    encodeURIComponent(subject) +
    '&body=' +
    encodeURIComponent(body);

  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
}

document.getElementById('close-dialog').addEventListener(
  'click',
  () => dialog.close()
);

dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();

    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    ) {
      dialog.close();
    }
  }
});

dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastTrigger?.focus({ preventScroll: true });
});

/* =====================================================
   MENÚ MÓVIL
   ===================================================== */

const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  menuToggle.innerHTML = icon('menu');
}

menuToggle.addEventListener('click', () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;

  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute(
    'aria-label',
    willOpen ? 'Cerrar menú' : 'Abrir menú'
  );

  menuToggle.innerHTML = icon(willOpen ? 'x' : 'menu');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', event => {
  if (!mobileNav.hidden && !event.target.closest('.header')) {
    closeMenu();
  }
});

matchMedia('(min-width: 921px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

/* =====================================================
   INICIALIZACIÓN
   ===================================================== */

document.getElementById('year').textContent =
  String(new Date().getFullYear());

hydrateIcons();