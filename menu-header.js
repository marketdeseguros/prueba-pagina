(function () {
  'use strict';

  const menus = [
    {
      clave: 'personas',
      nombres: ['personas'],
      enlaces: [
        ['Auto', './seguro-auto.html'],
        ['Viajes', './seguro-viaje.html'],
        ['Gastos Médicos', './gastos-medicos.html'],
        ['Vida y familia', './vida-familia.html'],
        ['Hogar', './seguro-hogar.html'],
        ['Accidentes Personales', './accidentes-personales.html'],
        ['Mascotas', './seguro-mascotas.html']
      ]
    },
    {
      clave: 'empresas',
      nombres: ['empresas', 'empresa'],
      enlaces: [
        ['Flotillas', './flotillas.html'],
        ['Vida Grupo', './vida-grupo'],
        ['Responsabilidad civil', './responsabilidad-civil'],
        ['Protección para Pymes', './seguro-pymes.html'],
        ['Gastos Médicos Colectivos', './gastos-medicos-colectivos'],
        ['Transporte de mercancías', './transporte-mercancias']
      ]
    },
    {
      clave: 'escolar',
      nombres: ['escolar', 'escuela', 'escuelas'],
      enlaces: [
        ['Accidentes Escolares', './accidentes-escolares.html'],
        ['Continuidad Escolar', './continuidad-escolar.html'],
        ['Deportes', './seguro-deportes.html'],
        ['Responsabilidad CivilEscolar','./responsabilidad-civil-escolar.html'
        ]
      ]
    }, 
  ];

  function iniciar() {
    const header = document.querySelector('header.header');

    if (!header || header.dataset.cascadaLista === 'true') return;

    header.dataset.cascadaLista = 'true';

    const escritorio = matchMedia('(min-width: 921px)');
    const sinHover = matchMedia('(hover: none)');
    const grupos = [];

    const estilos = document.createElement('style');

    estilos.id = 'menu-cascada-estilos';

    estilos.textContent = `
      .header .mc-grupo {
        position: relative;
      }

      .header .mc-fila {
        display: flex;
        align-items: center;
      }

      .header .mc-fila > a {
        cursor: pointer;
      }

      .header .mc-panel[hidden] {
        display: none !important;
      }

      .header .mc-panel {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 50;

        width: max-content;
        min-width: 230px;
        max-width: min(300px, calc(100vw - 32px));
        max-height: calc(100dvh - 120px);
        overflow-y: auto;

        margin: 0;
        padding: 8px;
        list-style: none;

        background: #fff;
        border: 1px solid var(--line, #dae6ee);
        border-radius: 8px;
        box-shadow: 0 10px 24px #0c33611f;
      }

      .header .mc-panel li {
        margin: 0;
        padding: 0;
      }

      .header .mc-panel a {
        display: block;
        padding: 11px 14px;

        border: 0;
        border-radius: 5px;

        font-size: .875rem;
        font-weight: 500;
        line-height: 1.5;

        color: var(--navy, #0c3361);
        white-space: normal;
        text-decoration: none;
      }

      .header .mc-panel a::after {
        content: none;
      }

      .header .mc-panel a:hover,
      .header .mc-panel a:focus-visible {
        background: var(--ice, #edf7fb);
        color: var(--cyan-text, #087da9);
      }

      .header .desktop-nav .mc-grupo[data-menu="recursos"] .mc-panel {
        left: auto;
        right: 0;
      }

      .header .mobile-nav.mc-nav {
        max-height: calc(100dvh - 90px);
        overflow-y: auto;
      }

      .header .mobile-nav .mc-fila {
        border-bottom: 1px solid var(--line, #edf1f5);
      }

      .header .mobile-nav .mc-fila > a {
        flex: 1;
        border: 0;
      }

      .header .mobile-nav .mc-panel {
        position: static;

        width: auto;
        min-width: 0;
        max-width: none;
        max-height: none;
        overflow: visible;

        margin: 0 0 8px 8px;
        padding: 4px 0 4px 10px;

        border: 0;
        border-left: 2px solid var(--line, #dae6ee);
        border-radius: 0;
        box-shadow: none;
      }
    `;

    document.head.append(estilos);

    function normalizar(texto) {
      return texto.trim().toLowerCase();
    }

    function mostrar(grupo, abierto) {
      grupo.panel.hidden = !abierto;
      grupo.enlace.setAttribute('aria-expanded', String(abierto));
    }

    function cerrarTodos() {
      grupos.forEach(grupo => mostrar(grupo, false));
    }

    function abrir(grupo) {
      cerrarTodos();
      mostrar(grupo, true);
    }

    function alternar(grupo) {
      const estabaCerrado = grupo.panel.hidden;

      cerrarTodos();

      if (estabaCerrado) {
        mostrar(grupo, true);
      }
    }

    header.querySelectorAll('.desktop-nav, .mobile-nav').forEach((nav, numero) => {
      nav.classList.add('mc-nav');

      const originales = [...nav.children].filter(
        nodo => nodo.tagName === 'A'
      );

      const tieneEscolar = originales.some(enlace =>
        ['escolar', 'escuela', 'escuelas'].includes(
          normalizar(enlace.textContent)
        )
      );

      const empresas = originales.find(enlace =>
        ['empresas', 'empresa'].includes(normalizar(enlace.textContent))
      );

      if (!tieneEscolar && empresas) {
        const escolar = document.createElement('a');

        escolar.href = './escuela.html';
        escolar.textContent = 'Escolar';

        empresas.after(escolar);
      }

      const enlaces = [...nav.children].filter(
        nodo => nodo.tagName === 'A'
      );

      enlaces.forEach(enlace => {
        const config = menus.find(menu =>
          menu.nombres.includes(normalizar(enlace.textContent))
        );

        if (!config) return;

        const nombre = enlace.textContent.trim();

        const grupo = document.createElement('div');
        grupo.className = 'mc-grupo';
        grupo.dataset.menu = config.clave;

        const fila = document.createElement('div');
        fila.className = 'mc-fila';

        const panel = document.createElement('ul');
        panel.className = 'mc-panel';
        panel.id = 'mc-' + numero + '-' + config.clave;
        panel.hidden = true;
        panel.setAttribute('aria-label', 'Opciones de ' + nombre);

        enlace.setAttribute('aria-controls', panel.id);

        enlace.before(grupo);
        fila.append(enlace);
        grupo.append(fila, panel);

        config.enlaces.forEach(([texto, destino]) => {
          const item = document.createElement('li');
          const link = document.createElement('a');

          link.textContent = texto;
          link.href = destino;

          item.append(link);
          panel.append(item);
        });

        const estado = { grupo, enlace, panel };
        let ultimoPuntero = '';

        grupos.push(estado);
        mostrar(estado, false);

        grupo.addEventListener('pointerenter', evento => {
          if (escritorio.matches && evento.pointerType === 'mouse') {
            abrir(estado);
          }
        });

        grupo.addEventListener('pointerleave', evento => {
          if (
            escritorio.matches &&
            evento.pointerType === 'mouse' &&
            !grupo.contains(document.activeElement)
          ) {
            mostrar(estado, false);
          }
        });

        grupo.addEventListener('focusout', evento => {
          if (!grupo.contains(evento.relatedTarget)) {
            mostrar(estado, false);
          }
        });

        enlace.addEventListener('pointerdown', evento => {
          ultimoPuntero = evento.pointerType;
        });

        enlace.addEventListener('click', evento => {
          const puntero = evento.pointerType || ultimoPuntero;
          ultimoPuntero = '';

          if (
            evento.ctrlKey ||
            evento.metaKey ||
            evento.shiftKey ||
            evento.altKey ||
            evento.button > 0
          ) {
            return;
          }

          const debeAlternar =
            nav.classList.contains('mobile-nav') ||
            !escritorio.matches ||
            puntero === 'touch' ||
            puntero === 'pen' ||
            evento.detail === 0 ||
            (!puntero && sinHover.matches);

          if (!debeAlternar) return;

          evento.preventDefault();
          evento.stopImmediatePropagation();

          alternar(estado);
        }, { capture: true });

        grupo.addEventListener('keydown', evento => {
          if (
            evento.target === enlace &&
            evento.key === 'ArrowDown'
          ) {
            evento.preventDefault();
            evento.stopPropagation();

            abrir(estado);
            panel.querySelector('a')?.focus();
          }

          if (
            evento.target === enlace &&
            (evento.key === 'Enter' || evento.key === ' ')
          ) {
            evento.preventDefault();
            evento.stopPropagation();

            if (!evento.repeat) {
              alternar(estado);
            }
          }

          if (evento.key === 'Escape' && !panel.hidden) {
            evento.preventDefault();
            evento.stopPropagation();

            mostrar(estado, false);
            enlace.focus();
          }
        });
      });
    });

    const menuMovil = header.querySelector('.mobile-nav');
    const botonMovil = header.querySelector('#menu-toggle');

    botonMovil?.addEventListener('click', cerrarTodos);

    header.addEventListener('click', evento => {
      const enlace = evento.target.closest('a');

      if (!enlace) return;

      cerrarTodos();

      if (
        enlace.closest('.mobile-nav') &&
        menuMovil &&
        !menuMovil.hidden
      ) {
        botonMovil?.click();
      }
    });

    document.addEventListener('click', evento => {
      if (!header.contains(evento.target)) {
        cerrarTodos();
      }
    });

    document.addEventListener('keydown', evento => {
      if (evento.key === 'Escape') {
        cerrarTodos();
      }
    });

    escritorio.addEventListener('change', cerrarTodos);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  } else {
    iniciar();
  }
})();