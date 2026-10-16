/*
  MARKET DE SEGUROS
  Archivo: solicitudes.js

  Cargar después de app.js, con defer.
  Envío mediante FormSubmit.
  Requiere activar el correo destinatario.
*/

(function () {
  'use strict';

  /* =====================================================
     CONFIGURACIÓN GENERAL
     ===================================================== */

  const CORREO_DESTINO = 'ventas@marketdeseguros.com';
  const PAGINA_AUTO = './seguro-auto.html';
  const AVISO_PRIVACIDAD = './avisoprivacidad.html';

  // Límites técnicos editables.
  // No representan condiciones de contratación.
  const MAX_VIAJEROS = 100;
  const MAX_ASEGURADOS = 100;

  const PARENTESCOS_GASTOS_MEDICOS = [
    'Cónyuge o pareja',
    'Hijo(a)',
    'Padre o madre',
    'Hermano(a)',
    'Otro'
  ];

  /* =====================================================
     PREGUNTAS DE CADA PRODUCTO

     [] significa que solo pide los datos generales.
     Vida y familia se configura en configurarVidaFamilia().
     ===================================================== */

  const CAMPOS_POR_PRODUCTO = {
    personas: {
      'Vida y familia': [],

      'Gastos médicos': [
        {
          clave: 'tipo_poliza_gm',
          etiqueta: 'Tipo de póliza',
          tipo: 'select',
          opciones: ['Individual', 'Familiar'],
          obligatorio: true
        },
        {
          clave: 'asegurados_gm',
          etiqueta: 'Número de personas a asegurar',
          tipo: 'number',
          min: 1,
          max: MAX_ASEGURADOS,
          paso: 1,
          obligatorio: true
        },
        {
          etiqueta: 'Profesión u oficio',
          tipo: 'text',
          ejemplo: 'Ej: Asistente Administrativo',
          obligatorio: true
        }
      ],

      'Hogar': [
        {
          etiqueta: 'Tipo de vivienda',
          tipo: 'select',
          opciones: [
            'Casa',
            'Departamento en condominio',
            'Casa en condominio horizontal'
          ],
          obligatorio: true
        },
        {
          etiqueta: 'Uso del inmueble',
          tipo: 'select',
          opciones: [
            'Propietario',
            'Propietario pero la renta'
          ],
          obligatorio: true
        },
        {
          etiqueta: 'Tipo de muros',
          tipo: 'select',
          opciones: [
            'Concreto',
            'Tabique',
            'Ladrillo',
            'Madera'
          ],
          obligatorio: true
        },
        {
          etiqueta: 'Tipo de techos',
          tipo: 'select',
          opciones: [
            'Losa de concreto macizo',
            'Lámina',
            'Teja',
            'Plafón'
          ]
        },
        {
          etiqueta: 'Medidas de seguridad',
          tipo: 'checkbox',
          opciones: [
            'Alarma',
            'Vigilancia privada',
            'Cámaras de seguridad',
            'Protecciones en puertas y ventanas',
            'Acceso controlado',
            'Ninguna'
          ],
          obligatorio: true
        }
      ],

      'Viajes': [
        {
          etiqueta: 'Destino del viaje',
          tipo: 'text',
          obligatorio: true
        },
        {
          clave: 'salida',
          etiqueta: 'Fecha de salida',
          tipo: 'date',
          obligatorio: true
        },
        {
          clave: 'regreso',
          etiqueta: 'Fecha de regreso',
          tipo: 'date',
          obligatorio: true
        },
        {
          clave: 'viajeros',
          etiqueta: 'Número de viajeros',
          tipo: 'number',
          min: 1,
          max: MAX_VIAJEROS,
          paso: 1,
          obligatorio: true
        }
      ],

      'Accidentes personales': [
        {
          etiqueta: 'Género',
          tipo: 'select',
          opciones: ['Femenino', 'Masculino'],
          obligatorio: true
        },
        {
          clave: 'nacimiento',
          etiqueta: 'Fecha de nacimiento',
          tipo: 'date',
          obligatorio: true
        },
        {
          etiqueta: 'Ocupación y/o actividad principal',
          tipo: 'text',
          ejemplo: 'Ej: Contador',
          obligatorio: true
        }
      ],

      'Mascotas': [
        {
          etiqueta: 'Nombre de la mascota',
          tipo: 'text',
          obligatorio: true
        },
        {
          etiqueta: 'Raza',
          tipo: 'text',
          ejemplo: 'Labrador',
          obligatorio: true
        },
        {
          etiqueta: 'Edad',
          tipo: 'number',
          min: 0,
          max: 7,
          paso: 1,
          ejemplo: '7',
          obligatorio: true
        }
      ]
    },

    empresas: {
      'Gastos Médicos Colectivos': [],

      'Responsabilidad civil': [],

      'Vida Grupo': [],

      'Transporte de mercancías': [
        {
          etiqueta: 'Lugar de salida (Municipio y Estado)',
          tipo: 'text',
          ejemplo: 'Ej: Guadalajara, Jalisco',
          obligatorio: true
        },
        {
          clave: 'salida_carga',
          etiqueta: 'Fecha de salida',
          tipo: 'date',
          obligatorio: true
        },
        {
          etiqueta: 'Lugar de llegada (Municipio y Estado)',
          tipo: 'text',
          ejemplo: 'Ej: Monterrey, Nuevo León',
          obligatorio: true
        },
        {
          clave: 'llegada_carga',
          etiqueta: 'Fecha de llegada',
          tipo: 'date',
          obligatorio: true
        },
        {
          etiqueta: 'Valor monetario de la carga (MXN)',
          tipo: 'number',
          min: 0.01,
          paso: 0.01,
          obligatorio: true
        },
        {
          etiqueta: 'Tipo de carga que transporta',
          tipo: 'text',
          ejemplo: 'Ej: muebles, ropa, maquinaria o alimentos',
          obligatorio: true
        }
      ],

      'Flotillas': []
    },

    escuelas: {
      'Accidentes escolares': [
        {
          etiqueta: 'Nombre de la escuela',
          tipo: 'text',
          obligatorio: true
        },
        {
          clave: 'codigo_postal',
          etiqueta: 'Código postal',
          tipo: 'text',
          obligatorio: true
        },
        {
          etiqueta: 'Número de alumnos',
          tipo: 'number',
          min: 1,
          paso: 1,
          obligatorio: true
        },
        {
          etiqueta: 'Número de docentes',
          tipo: 'number',
          min: 0,
          paso: 1,
          obligatorio: true
        },
        {
          etiqueta: 'Suma Asegurada para los Gastos Médicos',
          tipo: 'select',
          opciones: [
            '10,000',
            '15,000',
            '20,000',
            '25,000',
            '30,000',
            '50,000'
          ],
          obligatorio: true
        }
      ],

      'Continuidad escolar': [
        {
          etiqueta: 'Nombre de la escuela',
          tipo: 'text',
          obligatorio: true
        },
        {
          etiqueta: 'Número de alumnos',
          tipo: 'number',
          min: 1,
          paso: 1,
          obligatorio: true
        },
        {
          etiqueta: 'Cuota de inscripción (MXN)',
          tipo: 'number',
          min: 0.01,
          paso: 0.01,
          obligatorio: true
        },
        {
          etiqueta: 'Cuota de colegiatura (MXN)',
          tipo: 'number',
          min: 0.01,
          paso: 0.01,
          obligatorio: true
        },
        {
          etiqueta: 'Selecciona los niveles educativos que correspondan a tu institución',
          tipo: 'checkbox',
          opciones: [
            'Maternal',
            'Kinder/Preescolar',
            'Primaria',
            'Secundaria',
            'Preparatoria/Bachillerato',
            'Universidad'
          ]
        }
      ],

      'Deportes': [
        {
          etiqueta: 'Razón social',
          tipo: 'text',
          obligatorio: true
        },
        {
          etiqueta: 'RFC de persona física o moral',
          tipo: 'text',
          obligatorio: true
        },
        {
          etiqueta: 'Domicilio fiscal',
          tipo: 'text',
          obligatorio: true
        },
        {
          etiqueta: 'Número de personas que integran el grupo',
          tipo: 'number',
          min: 1,
          paso: 1,
          obligatorio: true
        },
        {
          etiqueta: 'Rango de edad de los participantes',
          tipo: 'text',
          ejemplo: 'Ej: 5-17 años',
          obligatorio: true
        }
      ],

      'Responsabilidad civil escolar': [
        {
          etiqueta: 'Nombre de la escuela',
          tipo: 'text',
          obligatorio: true
        },
        {
          clave: 'codigo_postal',
          etiqueta: 'Código postal',
          tipo: 'text',
          obligatorio: true
        }
      ]
    }
  };

  let actualizarDatosProducto = () => {};

  /* =====================================================
     FUNCIONES GENERALES
     ===================================================== */

  function normalizarNombre(nombre) {
    return String(nombre || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }

  function fechaLocalHoy() {
    const fecha = new Date();

    return [
      fecha.getFullYear(),
      String(fecha.getMonth() + 1).padStart(2, '0'),
      String(fecha.getDate()).padStart(2, '0')
    ].join('-');
  }

  // Mantiene los ceros iniciales:
  // el código postal siempre se maneja como texto.
  function configurarCodigoPostal(control) {
    control.type = 'text';
    control.inputMode = 'numeric';
    control.autocomplete = 'postal-code';
    control.pattern = '[0-9]{5}';
    control.minLength = 5;
    control.maxLength = 5;
    control.title = 'Escribe un código postal de 5 dígitos.';
  }

  function configurarNacimiento(control) {
    if (!control) return () => {};

    function actualizar() {
      const hoy = fechaLocalHoy();

      control.max = hoy;

      control.setCustomValidity(
        control.value && control.value > hoy
          ? 'La fecha de nacimiento no puede ser posterior a hoy.'
          : ''
      );
    }

    control.addEventListener('input', actualizar);
    control.addEventListener('change', actualizar);

    actualizar();
    return actualizar;
  }

  function configurarFechasCarga(controles) {
    const salida = controles.get('salida_carga');
    const llegada = controles.get('llegada_carga');

    if (!salida || !llegada) return () => {};

    function actualizar() {
      llegada.min = salida.value || '';

      llegada.setCustomValidity(
        salida.value &&
        llegada.value &&
        llegada.value < salida.value
          ? 'La fecha de llegada debe ser igual o posterior a la fecha de salida.'
          : ''
      );
    }

    [salida, llegada].forEach(control => {
      control.addEventListener('input', actualizar);
      control.addEventListener('change', actualizar);
    });

    actualizar();
    return actualizar;
  }

  /* =====================================================
     SELECCIÓN MÚLTIPLE
     ===================================================== */

  function crearSeleccionMultiple(dato, indice) {
    const bloque = document.createElement('fieldset');
    bloque.className = 'sol-campo sol-completo';

    const leyenda = document.createElement('legend');
    leyenda.className = 'sol-edades-titulo';
    leyenda.textContent =
      dato.etiqueta + (dato.obligatorio ? ' *' : ' (opcional)');

    const ayuda = document.createElement('p');
    ayuda.id = 'sol-opciones-ayuda-' + indice;
    ayuda.className = 'sol-intro';
    ayuda.textContent = 'Puedes seleccionar varias opciones.';

    const lista = document.createElement('div');
    lista.className = 'sol-opciones';

    const casillas = [];

    (dato.opciones || []).forEach((valor, posicion) => {
      const etiqueta = document.createElement('label');
      etiqueta.className = 'sol-opcion';

      const control = document.createElement('input');
      control.type = 'checkbox';
      control.id = 'sol-extra-' + indice + '-opcion-' + posicion;
      control.name = 'Dato ' + (indice + 1) + ': ' + dato.etiqueta;
      control.value = valor;
      control.setAttribute('aria-describedby', ayuda.id);

      const texto = document.createElement('span');
      texto.textContent = valor;

      etiqueta.append(control, texto);
      lista.append(etiqueta);
      casillas.push(control);

      control.addEventListener('change', () => {
        if (control.checked) {
          casillas.forEach(otra => {
            if (
              otra !== control &&
              (
                normalizarNombre(valor) === 'ninguna' ||
                normalizarNombre(otra.value) === 'ninguna'
              )
            ) {
              otra.checked = false;
            }
          });
        }

        validar();
      });
    });

    function validar() {
      if (!casillas.length) return;

      const seleccionadas = casillas.filter(c => c.checked);
      let mensaje = '';

      if (dato.obligatorio && !seleccionadas.length) {
        mensaje = 'Selecciona al menos una opción.';
      }

      if (
        seleccionadas.length > 1 &&
        seleccionadas.some(c =>
          normalizarNombre(c.value) === 'ninguna'
        )
      ) {
        mensaje = 'Selecciona Ninguna o las medidas que correspondan.';
      }

      casillas[0].setCustomValidity(mensaje);
    }

    bloque.append(leyenda, ayuda, lista);
    validar();

    return { bloque, validar };
  }

  /* =====================================================
     VIAJES: FECHAS Y EDADES
     ===================================================== */

  function configurarViaje(contenedor, controles) {
    const salida = controles.get('salida');
    const regreso = controles.get('regreso');
    const cantidad = controles.get('viajeros');

    if (!salida || !regreso || !cantidad) return () => {};

    const grupo = document.createElement('fieldset');
    grupo.className = 'sol-completo';
    grupo.id = 'sol-edades-viajeros';
    grupo.hidden = true;

    const leyenda = document.createElement('legend');
    leyenda.className = 'sol-edades-titulo';
    leyenda.textContent = 'Edades de los viajeros';

    const ayuda = document.createElement('p');
    ayuda.id = 'sol-ayuda-edades';
    ayuda.className = 'sol-intro';
    ayuda.textContent =
      'Indica la edad en años cumplidos de cada viajero. ' +
      'Para menores de un año, escribe 0.';

    const lista = document.createElement('div');
    lista.className = 'sol-grid';

    grupo.append(leyenda, ayuda, lista);
    contenedor.append(grupo);

    function actualizar() {
      regreso.min = salida.value || '';

      regreso.setCustomValidity(
        salida.value &&
        regreso.value &&
        regreso.value < salida.value
          ? 'La fecha de regreso debe ser igual o posterior a la fecha de salida.'
          : ''
      );

      const total = Number(cantidad.value);

      const valido =
        Number.isInteger(total) &&
        total >= 1 &&
        total <= MAX_VIAJEROS;

      cantidad.setCustomValidity(
        cantidad.value && !valido
          ? 'Escribe un número entero entre 1 y ' + MAX_VIAJEROS + '.'
          : ''
      );

      grupo.hidden = !valido;
      grupo.disabled = !valido;

      if (!valido) return;

      while (lista.children.length > total) {
        lista.lastElementChild.remove();
      }

      while (lista.children.length < total) {
        const numero = lista.children.length + 1;

        const bloque = document.createElement('div');
        bloque.className = 'sol-campo';

        const etiqueta = document.createElement('label');
        etiqueta.htmlFor = 'sol-edad-viajero-' + numero;
        etiqueta.textContent =
          'Edad del viajero ' + numero + ' (años) *';

        const edad = document.createElement('input');
        edad.id = etiqueta.htmlFor;
        edad.name = 'Edad del viajero ' + numero + ' (años)';
        edad.type = 'number';
        edad.min = '0';
        edad.step = '1';
        edad.inputMode = 'numeric';
        edad.required = true;
        edad.setAttribute('aria-describedby', ayuda.id);

        bloque.append(etiqueta, edad);
        lista.append(bloque);
      }
    }

    [salida, regreso, cantidad].forEach(control => {
      control.addEventListener('input', actualizar);
      control.addEventListener('change', actualizar);
    });

    actualizar();
    return actualizar;
  }

  /* =====================================================
     GASTOS MÉDICOS INDIVIDUALES Y FAMILIARES
     ===================================================== */

  function configurarGastosMedicos(contenedor, controles) {
    const tipo = controles.get('tipo_poliza_gm');
    const cantidad = controles.get('asegurados_gm');

    if (!tipo || !cantidad) return () => {};

    const bloqueCantidad = cantidad.closest('.sol-campo');

    const grupo = document.createElement('fieldset');
    grupo.id = 'sol-personas-aseguradas';
    grupo.className = 'sol-completo';

    const leyenda = document.createElement('legend');
    leyenda.className = 'sol-edades-titulo';
    leyenda.textContent = 'Datos de las personas a asegurar';

    const ayuda = document.createElement('p');
    ayuda.className = 'sol-intro';
    ayuda.textContent =
      'El total incluye al titular. Captura sus datos como Persona 1 ' +
      'e indica el parentesco de las demás personas respecto a él o ella.';

    const lista = document.createElement('div');

    grupo.append(leyenda, ayuda, lista);
    contenedor.append(grupo);

    const personas = [];
    let tipoAnterior = '';

    function crearCampo(
      grid,
      numero,
      clave,
      texto,
      tipoCampo,
      opciones
    ) {
      const bloque = document.createElement('div');
      bloque.className = 'sol-campo';

      const etiqueta = document.createElement('label');

      const control = document.createElement(
        tipoCampo === 'select' ? 'select' : 'input'
      );

      control.id = 'sol-asegurado-' + numero + '-' + clave;
      control.name = 'Persona ' + numero + ': ' + texto;
      control.required = true;

      etiqueta.htmlFor = control.id;
      etiqueta.textContent = texto + ' *';

      if (tipoCampo === 'select') {
        ['', ...opciones].forEach(valor => {
          const opcion = document.createElement('option');
          opcion.value = valor;
          opcion.textContent = valor || 'Selecciona una opción';
          control.append(opcion);
        });
      } else {
        control.type = tipoCampo;

        if (tipoCampo === 'text') {
          control.maxLength = 100;
        }
      }

      bloque.append(etiqueta, control);
      grid.append(bloque);

      return { bloque, control };
    }

    function crearPersona(numero) {
      const bloque = document.createElement('fieldset');
      bloque.className = 'sol-asegurado';

      const titulo = document.createElement('legend');
      titulo.className = 'sol-edades-titulo';
      titulo.textContent =
        'Persona ' + numero + (numero === 1 ? ' · Titular' : '');

      const grid = document.createElement('div');
      grid.className = 'sol-grid';

      bloque.append(titulo, grid);

      const nacimiento = crearCampo(
        grid,
        numero,
        'nacimiento',
        'Fecha de nacimiento',
        'date'
      );

      nacimiento.control.addEventListener('input', actualizar);
      nacimiento.control.addEventListener('change', actualizar);

      crearCampo(
        grid,
        numero,
        'genero',
        'Género',
        'select',
        ['Femenino', 'Masculino']
      );

      const parentesco = crearCampo(
        grid,
        numero,
        'parentesco',
        'Parentesco con el titular',
        numero === 1 ? 'text' : 'select',
        PARENTESCOS_GASTOS_MEDICOS
      );

      parentesco.bloque.classList.add('sol-completo');

      let otro = null;

      if (numero === 1) {
        parentesco.control.value = 'Titular';
        parentesco.control.readOnly = true;
      } else {
        otro = crearCampo(
          grid,
          numero,
          'otro-parentesco',
          'Especifica el parentesco',
          'text'
        );

        otro.bloque.classList.add('sol-completo');

        const actualizarOtro = () => {
          const activo = parentesco.control.value === 'Otro';

          otro.bloque.hidden = !activo;
          otro.control.disabled = !activo;
          otro.control.required = activo;
        };

        parentesco.control.addEventListener('input', actualizarOtro);
        parentesco.control.addEventListener('change', actualizarOtro);

        actualizarOtro();
      }

      lista.append(bloque);

      return {
        bloque,
        nacimiento: nacimiento.control,
        parentesco: parentesco.control,
        otro
      };
    }

    function actualizar() {
      const individual = tipo.value === 'Individual';
      const familiar = tipo.value === 'Familiar';
      const seleccionado = individual || familiar;

      bloqueCantidad.hidden = !seleccionado;
      cantidad.disabled = !seleccionado;
      cantidad.readOnly = individual;
      cantidad.min = individual ? '1' : '2';
      cantidad.max = individual ? '1' : String(MAX_ASEGURADOS);

      if (individual) {
        cantidad.value = '1';
      } else if (familiar && tipoAnterior !== 'Familiar') {
        cantidad.value = '2';
      }

      tipoAnterior = tipo.value;

      const total = Number(cantidad.value);
      const minimo = individual ? 1 : 2;

      const valido =
        seleccionado &&
        Number.isInteger(total) &&
        total >= minimo &&
        total <= (individual ? 1 : MAX_ASEGURADOS);

      cantidad.setCustomValidity(
        seleccionado && cantidad.value && !valido
          ? 'Escribe un número entero entre ' +
            minimo + ' y ' + MAX_ASEGURADOS + '.'
          : ''
      );

      grupo.hidden = !valido;
      grupo.disabled = !valido;

      if (!valido) return;

      while (personas.length > total) {
        personas.pop().bloque.remove();
      }

      while (personas.length < total) {
        personas.push(crearPersona(personas.length + 1));
      }

      const fecha = new Date();

      const hoy = [
        fecha.getFullYear(),
        String(fecha.getMonth() + 1).padStart(2, '0'),
        String(fecha.getDate()).padStart(2, '0')
      ].join('-');

      personas.forEach(persona => {
        persona.nacimiento.max = hoy;

        persona.nacimiento.setCustomValidity(
          persona.nacimiento.value && persona.nacimiento.value > hoy
            ? 'La fecha de nacimiento no puede ser posterior a hoy.'
            : ''
        );

        if (persona.otro) {
          const activo = persona.parentesco.value === 'Otro';

          persona.otro.bloque.hidden = !activo;
          persona.otro.control.disabled = !activo;
          persona.otro.control.required = activo;

          if (activo) {
            persona.otro.control.value =
              persona.otro.control.value.trim();
          }
        }
      });
    }

    [tipo, cantidad].forEach(control => {
      control.addEventListener('input', actualizar);
      control.addEventListener('change', actualizar);
    });

    actualizar();
    return actualizar;
  }

  /* =====================================================
     VIDA Y FAMILIA

     Opciones:
     - Retiro
     - Educativo
     - Vida Premia
     - Servicios Funerarios
     - PPR
     - Vida Temporal
     - Vida Pagos Limitados
     ===================================================== */

  function configurarVidaFamilia(contenedor) {
    function agregarCampo(
      destino,
      clave,
      texto,
      tipo,
      opciones = [],
      limites = {}
    ) {
      const bloque = document.createElement('div');
      bloque.className = 'sol-campo';

      const etiqueta = document.createElement('label');

      const control = document.createElement(
        tipo === 'select' ? 'select' : 'input'
      );

      control.id = 'sol-vida-' + clave;
      control.name = 'Vida y familia: ' + texto;
      control.required = true;

      etiqueta.htmlFor = control.id;
      etiqueta.textContent = texto + ' *';

      if (tipo === 'select') {
        control.add(new Option('Selecciona una opción', ''));

        opciones.forEach(valor => {
          control.add(new Option(valor, valor));
        });
      } else {
        control.type = tipo;

        if (tipo === 'number') {
          control.min = '0';
          control.step = '1';
        }

        if (tipo === 'text') {
          control.maxLength = 160;
        }

        Object.entries(limites).forEach(([atributo, valor]) => {
          control.setAttribute(atributo, valor);
        });

        if (tipo === 'date') {
          configurarNacimiento(control);
        }
      }

      bloque.append(etiqueta, control);
      destino.append(bloque);

      return control;
    }

    function titulo(destino, texto) {
      const h = document.createElement('h4');
      h.className = 'sol-completo';
      h.textContent = texto;
      destino.append(h);
    }

    const opciones = [
      'Retiro',
      'Educativo',
      'Vida Premia',
      'Servicios Funerarios',
      'PPR',
      'Vida Temporal',
      'Vida Pagos Limitados'
    ];

    const selector = agregarCampo(
      contenedor,
      'seguro',
      'Tipo de seguro de vida',
      'select',
      opciones
    );

    selector.parentElement.classList.add('sol-completo');

    const detalle = document.createElement('div');
    detalle.className = 'sol-grid sol-completo';
    contenedor.append(detalle);

    let validarDetalle = () => {};

    function cambiarSeguro() {
      // Elimina las preguntas de la opción anterior.
      detalle.replaceChildren();
      validarDetalle = () => {};

      if (!selector.value) return;

      /* SERVICIOS FUNERARIOS */

      if (selector.value === 'Servicios Funerarios') {
        const tipo = agregarCampo(
          detalle,
          'poliza',
          'Tipo de póliza',
          'select',
          ['Individual', 'Familiar']
        );

        const cantidad = agregarCampo(
          detalle,
          'cantidad',
          'Número de personas a asegurar (incluye al titular)',
          'number',
          [],
          {
            min: 2,
            max: MAX_ASEGURADOS
          }
        );

        const grupo = document.createElement('fieldset');
        grupo.className = 'sol-grid sol-completo';
        detalle.append(grupo);

        function actualizarPersonas() {
          const familiar = tipo.value === 'Familiar';

          cantidad.parentElement.hidden = !familiar;
          cantidad.disabled = !familiar;

          const total = familiar
            ? Number(cantidad.value)
            : tipo.value === 'Individual' ? 1 : 0;

          const valido =
            Number.isInteger(total) &&
            total >= (familiar ? 2 : 1) &&
            total <= MAX_ASEGURADOS;

          cantidad.setCustomValidity(
            familiar && cantidad.value && !valido
              ? 'Indica un número entero entre 2 y ' +
                MAX_ASEGURADOS + '.'
              : ''
          );

          grupo.hidden = !valido;
          grupo.disabled = !valido;

          if (!valido) return;

          while (grupo.children.length > total) {
            grupo.lastElementChild.remove();
          }

          const fecha = new Date();

          const hoy = [
            fecha.getFullYear(),
            String(fecha.getMonth() + 1).padStart(2, '0'),
            String(fecha.getDate()).padStart(2, '0')
          ].join('-');

          while (grupo.children.length < total) {
            const numero = grupo.children.length + 1;

            agregarCampo(
              grupo,
              'nacimiento-' + numero,
              'Fecha de nacimiento de la persona ' + numero,
              'date',
              [],
              { max: hoy }
            );
          }
        }

        [tipo, cantidad].forEach(control => {
          control.addEventListener('input', actualizarPersonas);
          control.addEventListener('change', actualizarPersonas);
        });

        validarDetalle = actualizarPersonas;
        actualizarPersonas();
        return;
      }

      /* DATOS COMUNES DE VIDA */

      const educativo = selector.value === 'Educativo';

      if (educativo) {
        titulo(detalle, 'Datos del padre');
      }

      const prefijo = educativo ? 'Padre: ' : '';

      const edad = agregarCampo(
        detalle,
        'edad',
        prefijo + 'Edad',
        'number'
      );

      agregarCampo(
        detalle,
        'genero',
        prefijo + 'Género',
        'select',
        ['Femenino', 'Masculino']
      );

      agregarCampo(
        detalle,
        'fumador',
        prefijo + 'Fumador',
        'select',
        ['Sí', 'No']
      );

      /* RETIRO Y PPR */

      if (['Retiro', 'PPR'].includes(selector.value)) {
        const retiro = agregarCampo(
          detalle,
          'retiro',
          'Edad a la que desea retirarse',
          'number'
        );

        validarDetalle = () => {
          retiro.setCustomValidity(
            edad.value &&
            retiro.value &&
            Number(retiro.value) <= Number(edad.value)
              ? 'La edad de retiro debe ser mayor que tu edad actual.'
              : ''
          );
        };

        [edad, retiro].forEach(control => {
          control.addEventListener('input', validarDetalle);
        });
      }

      /* PLAZOS */

      const plazos = {
        'Vida Premia': [
          '5 años',
          '10 años',
          '15 años',
          '20 años'
        ],
        'Vida Temporal': [
          '10 años',
          '20 años',
          '25 años'
        ],
        'Vida Pagos Limitados': [
          '5 años',
          '10 años',
          '15 años',
          '20 años'
        ]
      };

      if (plazos[selector.value]) {
        agregarCampo(
          detalle,
          'plazo',
          'Plazo',
          'select',
          plazos[selector.value]
        );
      }

      /* AHORRO Y FORMA DE PAGO */

      agregarCampo(
        detalle,
        'ahorro',
        prefijo +
          'Sin que afecte tu economía, ¿cuánto dinero puedes ahorrar mensualmente? (MXN)',
        'number',
        [],
        {
          min: 0,
          step: '0.01'
        }
      );

      agregarCampo(
        detalle,
        'pago',
        prefijo + 'Forma de pago',
        'select',
        ['Anual', 'Semestral', 'Trimestral', 'Mensual']
      );

      /* EDUCATIVO: DATOS DEL MENOR */

      if (educativo) {
        titulo(detalle, 'Datos del menor');

        agregarCampo(
          detalle,
          'menor-nombre',
          'Menor: Nombre completo',
          'text'
        );

        agregarCampo(
          detalle,
          'menor-edad',
          'Menor: Edad (0 a 17 años)',
          'number',
          [],
          {
            min: 0,
            max: 17
          }
        );

        agregarCampo(
          detalle,
          'plan',
          'Plan a cotizar',
          'select',
          ['15 años', '18 años', '22 años']
        );
      }
    }

    selector.addEventListener('change', cambiarSeguro);
    cambiarSeguro();

    return () => validarDetalle();
  }

  /* =====================================================
     GENERADOR DE PREGUNTAS POR PRODUCTO
     ===================================================== */

  function mostrarCamposProducto(categoria, producto) {
    actualizarDatosProducto = () => {};

    const configuracion =
      Object.entries(CAMPOS_POR_PRODUCTO[categoria] || {})
        .find(([nombre]) =>
          normalizarNombre(nombre) === normalizarNombre(producto.name)
        )?.[1] || [];

    const contenedor = campo('datos-producto');
    contenedor.replaceChildren();

    if (
      categoria === 'personas' &&
      normalizarNombre(producto.name) === 'vida y familia'
    ) {
      contenedor.hidden = false;
      actualizarDatosProducto = configurarVidaFamilia(contenedor);
      return;
    }

    contenedor.hidden = configuracion.length === 0;

    if (!configuracion.length) return;

    const titulo = document.createElement('h4');
    titulo.className = 'sol-completo';
    titulo.textContent = 'Datos para tu seguro';
    contenedor.append(titulo);

    const tipos = [
      'text',
      'email',
      'tel',
      'number',
      'date',
      'select',
      'textarea'
    ];

    const controles = new Map();
    const validadores = [];

    configuracion.forEach((dato, indice) => {
      if (dato.tipo === 'checkbox') {
        const seleccion = crearSeleccionMultiple(dato, indice);

        contenedor.append(seleccion.bloque);
        validadores.push(seleccion.validar);
        return;
      }

      const tipo = tipos.includes(dato.tipo) ? dato.tipo : 'text';

      const bloque = document.createElement('div');
      bloque.className =
        'sol-campo' + (tipo === 'textarea' ? ' sol-completo' : '');

      const etiqueta = document.createElement('label');

      const control = document.createElement(
        tipo === 'select' || tipo === 'textarea' ? tipo : 'input'
      );

      control.id = 'sol-extra-' + indice;

      if (dato.clave) {
        controles.set(dato.clave, control);
      }

      control.name = 'Dato ' + (indice + 1) + ': ' + dato.etiqueta;
      control.required = dato.obligatorio === true;

      etiqueta.htmlFor = control.id;
      etiqueta.textContent =
        dato.etiqueta + (control.required ? ' *' : ' (opcional)');

      if (tipo === 'select') {
        const vacia = document.createElement('option');
        vacia.value = '';
        vacia.textContent = 'Selecciona una opción';
        control.append(vacia);

        (dato.opciones || []).forEach(valor => {
          const opcion = document.createElement('option');
          opcion.value = valor;
          opcion.textContent = valor;
          control.append(opcion);
        });
      } else {
        if (tipo === 'textarea') {
          control.rows = 3;
        } else {
          control.type = tipo;
        }

        if (['text', 'email', 'tel', 'textarea'].includes(tipo)) {
          control.maxLength =
            dato.maxCaracteres ?? (tipo === 'textarea' ? 1500 : 160);
        }

        if (dato.ejemplo && tipo !== 'date') {
          control.placeholder = dato.ejemplo;
        }

        if (tipo === 'number' || tipo === 'date') {
          if (dato.min !== undefined) {
            control.min = dato.min;
          }

          if (dato.max !== undefined) {
            control.max = dato.max;
          }
        }

        if (tipo === 'number') {
          control.step = dato.paso ?? 1;
        }
      }

      if (dato.clave === 'codigo_postal') {
        configurarCodigoPostal(control);
      }

      bloque.append(etiqueta, control);
      contenedor.append(bloque);
    });

    const actualizarViaje = configurarViaje(contenedor, controles);

    const actualizarMedicos =
      configurarGastosMedicos(contenedor, controles);

    const actualizarCarga = configurarFechasCarga(controles);

    const actualizarNacimiento =
      configurarNacimiento(controles.get('nacimiento'));

    actualizarDatosProducto = () => {
      actualizarViaje();
      actualizarMedicos();
      actualizarCarga();
      actualizarNacimiento();
      validadores.forEach(validar => validar());
    };
  }

  /* =====================================================
     CONEXIÓN CON EL MODAL
     ===================================================== */

  const modal = document.getElementById('product-dialog');
  const botonAnterior = document.getElementById('dialog-email');

  if (document.getElementById('solicitud-cotizacion')) return;

  if (
    !modal ||
    !botonAnterior ||
    typeof openProduct !== 'function' ||
    typeof products === 'undefined'
  ) {
    console.error('Carga solicitudes.js después de app.js, usando defer.');
    return;
  }

  /* =====================================================
     ESTILOS DEL FORMULARIO
     ===================================================== */

  const estilos = document.createElement('style');

  estilos.textContent = `
    #product-dialog [hidden] {
      display: none !important;
    }

    #solicitud-cotizacion {
      border-top: 1px solid var(--line, #dae6ee);
      margin-top: 26px;
      padding-top: 24px;
    }

    #solicitud-cotizacion h3 {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }

    #solicitud-cotizacion .sol-edades-titulo {
      font-weight: 600;
      margin-bottom: 8px;
    }

    #solicitud-cotizacion .sol-asegurado {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid var(--line, #dae6ee);
    }

    #solicitud-cotizacion .sol-opciones {
      display: grid;
      gap: 10px;
    }

    #solicitud-cotizacion .sol-opcion {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin: 0;
      font-weight: 400;
    }

    #solicitud-cotizacion .sol-opcion input {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      margin-top: 2px;
      accent-color: #0c3361;
    }

    #solicitud-cotizacion .sol-intro {
      color: var(--muted, #607184);
      font-size: .875rem;
      margin-bottom: 20px;
    }

    #solicitud-cotizacion fieldset {
      padding: 0;
      margin: 0;
      border: 0;
      min-width: 0;
    }

    #solicitud-cotizacion .sol-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    #solicitud-cotizacion .sol-campo {
      min-width: 0;
    }

    #solicitud-cotizacion .sol-completo {
      grid-column: 1 / -1;
    }

    #solicitud-cotizacion label {
      display: block;
      margin-bottom: 6px;
      font-size: .875rem;
      font-weight: 600;
    }

    #solicitud-cotizacion input:not([type="checkbox"]),
    #solicitud-cotizacion textarea,
    #solicitud-cotizacion select {
      width: 100%;
      min-height: 46px;
      padding: 11px 12px;
      border: 1px solid #bdcddb;
      border-radius: 8px;
      font: inherit;
      font-size: 16px;
      color: var(--navy, #0c3361);
      background: #fff;
    }

    #solicitud-cotizacion input[readonly] {
      background: #edf7fb;
    }

    #solicitud-cotizacion textarea {
      resize: vertical;
    }

    #solicitud-cotizacion input:focus-visible,
    #solicitud-cotizacion textarea:focus-visible,
    #solicitud-cotizacion select:focus-visible {
      outline: 2px solid var(--cyan, #1c99cd);
      outline-offset: 2px;
    }

    #solicitud-cotizacion .sol-privacidad {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin: 20px 0;
      font-size: .8125rem;
      font-weight: 400;
      line-height: 1.5;
    }

    #solicitud-cotizacion .sol-privacidad input {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      margin-top: 2px;
      accent-color: #0c3361;
    }

    #solicitud-cotizacion .sol-privacidad a {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    #solicitud-cotizacion .button {
      width: 100%;
    }

    #solicitud-cotizacion .button:disabled {
      opacity: .65;
      transform: none;
    }

    #solicitud-cotizacion .sol-estado {
      padding: 16px;
      margin-top: 16px;
      border-radius: 9px;
      background: #edf7fb;
      color: #0c3361;
      font-size: .875rem;
    }

    #solicitud-cotizacion .sol-error {
      background: #fff2f0;
      color: #8a2525;
    }

    #solicitud-cotizacion [hidden] {
      display: none !important;
    }

    @media (max-width: 540px) {
      #solicitud-cotizacion .sol-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.append(estilos);

  /* =====================================================
     FORMULARIO GENERAL
     ===================================================== */

  const formulario = document.createElement('form');
  formulario.id = 'solicitud-cotizacion';
  formulario.method = 'POST';
  formulario.action = 'https://formsubmit.co/' + CORREO_DESTINO;
  formulario.hidden = true;

  formulario.innerHTML = `
    <div id="sol-encabezado">
      <h3>Solicita tu cotización</h3>

      <p class="sol-intro">
        Déjanos tus datos para que un asesor se ponga en contacto contigo.
        Los campos marcados con * son obligatorios.
      </p>
    </div>

    <fieldset id="sol-campos">
      <legend class="sr-only">
        Datos para solicitar tu cotización
      </legend>

      <input type="hidden" name="_subject" id="sol-asunto">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="Categoria" id="sol-categoria">

      <input
        type="text"
        name="_honey"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
        style="display:none"
      >

      <div class="sol-grid">
        <div class="sol-campo sol-completo">
          <label for="sol-producto">Seguro seleccionado</label>

          <input
            id="sol-producto"
            name="Producto"
            type="text"
            readonly
          >
        </div>

        <div class="sol-campo sol-completo">
          <label for="sol-nombre">Nombre completo *</label>

          <input
            id="sol-nombre"
            name="Nombre"
            type="text"
            autocomplete="name"
            required
            minlength="2"
            maxlength="120"
          >
        </div>

        <div class="sol-campo">
          <label for="sol-email">Correo electrónico *</label>

          <input
            id="sol-email"
            name="email"
            type="email"
            autocomplete="email"
            required
            maxlength="254"
          >
        </div>

        <div class="sol-campo">
          <label for="sol-telefono">Teléfono *</label>

          <input
            id="sol-telefono"
            name="Telefono"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            required
            maxlength="25"
          >
        </div>

        <div
          class="sol-campo sol-completo"
          id="sol-codigo-postal-campo"
        >
          <label for="sol-codigo-postal">Código postal *</label>

          <input
            id="sol-codigo-postal"
            name="Codigo_postal"
            type="text"
            autocomplete="postal-code"
            inputmode="numeric"
            pattern="[0-9]{5}"
            minlength="5"
            maxlength="5"
            title="Escribe un código postal de 5 dígitos."
            required
          >
        </div>

        <div
          class="sol-campo sol-completo"
          id="sol-organizacion-campo"
          hidden
        >
          <label for="sol-organizacion">
            Empresa
          </label>

          <input
            id="sol-organizacion"
            name="Organizacion"
            type="text"
            autocomplete="organization"
            maxlength="160"
            disabled
          >
        </div>

        <div
          id="sol-datos-producto"
          class="sol-grid sol-completo"
          hidden
        ></div>

        <div class="sol-campo sol-completo">
          <label for="sol-comentarios">
            Comentarios (opcional)
          </label>

          <textarea
            id="sol-comentarios"
            name="Comentarios"
            rows="3"
            maxlength="1500"
          ></textarea>
        </div>
      </div>

      <label class="sol-privacidad" for="sol-privacidad">
        <input
          id="sol-privacidad"
          name="Privacidad"
          type="checkbox"
          value="Autorizo el uso de mis datos para atender esta solicitud."
          required
        >

        <span>
          He leído el
          <a
            id="sol-aviso"
            target="_blank"
            rel="noopener noreferrer"
          >
            aviso de privacidad<span class="sr-only"> (abre otra pestaña)</span>
          </a>
          y autorizo el uso de mis datos para atender mi solicitud
          de cotización. *
        </span>
      </label>

      <button
        id="sol-enviar"
        class="button button-navy"
        type="submit"
      >
        Enviar solicitud
      </button>
    </fieldset>

    <p
      id="sol-estado"
      class="sol-estado"
      role="status"
      aria-live="polite"
      tabindex="-1"
      hidden
    ></p>
  `;

  botonAnterior.before(formulario);
  formulario.querySelector('#sol-aviso').href = AVISO_PRIVACIDAD;

  const campo = id => formulario.querySelector('#sol-' + id);
  const campos = campo('campos');
  const estado = campo('estado');
  const enviar = campo('enviar');
  const encabezado = campo('encabezado');

  const enlaceTelefono = modal.querySelector('.dialog-phone');

  const telefonoOcultoInicial =
    enlaceTelefono ? enlaceTelefono.hidden : false;

  let solicitudActual = 0;
  let controlador = null;
  let enviando = false;

  /* =====================================================
     APERTURA DEL PRODUCTO
     ===================================================== */

  const abrirProductoOriginal = openProduct;

  openProduct = function (categoria, indice) {
    const producto =
      products[categoria] && products[categoria][indice];

    if (!producto) return;

    solicitudActual++;

    if (controlador) {
      controlador.abort();
    }

    controlador = null;
    enviando = false;

    formulario.reset();
    formulario.removeAttribute('aria-busy');

    formulario
      .querySelectorAll('input, textarea, select')
      .forEach(elemento => {
        elemento.setCustomValidity('');
      });

    campos.disabled = false;
    campos.hidden = false;
    encabezado.hidden = false;

    estado.hidden = true;
    estado.textContent = '';
    estado.className = 'sol-estado';

    enviar.textContent = 'Enviar solicitud';

    campo('producto').value = producto.name;

    campo('categoria').value = {
      personas: 'Personas',
      empresas: 'Empresas',
      escuelas: 'Escuelas'
    }[categoria] || categoria;

    campo('asunto').value =
      'Nueva solicitud de cotización: ' +
      producto.name.replace(/[\r\n]+/g, ' ').slice(0, 150);

    const esEmpresa = categoria === 'empresas';

    campo('organizacion-campo').hidden = !esEmpresa;
    campo('organizacion').disabled = !esEmpresa;

    if (!esEmpresa) {
      campo('organizacion').value = '';
    }

    /*
      CÓDIGO POSTAL GENERAL
    */
    const pedirCodigoPostalGeneral = categoria !== 'escuelas';
    const codigoPostalGeneral = campo('codigo-postal');

    campo('codigo-postal-campo').hidden = !pedirCodigoPostalGeneral;
    codigoPostalGeneral.disabled = !pedirCodigoPostalGeneral;
    codigoPostalGeneral.required = pedirCodigoPostalGeneral;
    codigoPostalGeneral.setCustomValidity('');

    if (!pedirCodigoPostalGeneral) {
      codigoPostalGeneral.value = '';
    }

    mostrarCamposProducto(categoria, producto);

    // Solo Auto utiliza el cotizador.
    const esAuto =
      categoria === 'personas' &&
      ['auto', 'seguro de auto'].includes(
        normalizarNombre(producto.name)
      );

    const resultado =
      abrirProductoOriginal.call(this, categoria, indice);

    // Aplicamos la visibilidad después del comportamiento original.
    formulario.hidden = esAuto;
    botonAnterior.hidden = !esAuto;

    if (enlaceTelefono) {
      enlaceTelefono.hidden =
        esAuto ? telefonoOcultoInicial : true;
    }

    if (esAuto) {
      botonAnterior.href = PAGINA_AUTO;
      botonAnterior.removeAttribute('target');

      botonAnterior.innerHTML =
        'Cotizar mi auto ' +
        '<span data-icon="arrow-up-right" aria-hidden="true">' +
        icon('arrow-up-right') +
        '</span>';
    } else {
      botonAnterior.removeAttribute('href');
    }

    return resultado;
  };

  /* =====================================================
     VALIDACIÓN Y MENSAJES
     ===================================================== */

  campo('nombre').addEventListener('input', () => {
    campo('nombre').setCustomValidity('');
  });

  campo('telefono').addEventListener('input', () => {
    campo('telefono').setCustomValidity('');
  });

  function mostrarEstado(texto, error) {
    estado.textContent = texto;
    estado.className = 'sol-estado' + (error ? ' sol-error' : '');
    estado.hidden = false;
    estado.focus();
  }

  /* =====================================================
     ENVÍO MEDIANTE FORMSUBMIT
     ===================================================== */

  formulario.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    if (enviando || formulario.hidden || campos.hidden) return;

    actualizarDatosProducto();

    campo('nombre').value = campo('nombre').value.trim();
    campo('email').value = campo('email').value.trim();
    campo('telefono').value = campo('telefono').value.trim();

    // Un campo obligatorio no se puede completar solo con espacios.
    campo('datos-producto')
      .querySelectorAll('input[type="text"], textarea')
      .forEach(control => {
        if (!control.disabled && !control.readOnly) {
          control.value = control.value.trim();
        }
      });

    campo('nombre').setCustomValidity(
      campo('nombre').value.length < 2
        ? 'Escribe tu nombre completo.'
        : ''
    );

    const telefono = campo('telefono').value;
    const cantidadDigitos = telefono.replace(/\D/g, '').length;

    const telefonoValido =
      /^\+?[\d\s().-]+$/.test(telefono) &&
      cantidadDigitos >= 10 &&
      cantidadDigitos <= 15;

    campo('telefono').setCustomValidity(
      telefonoValido
        ? ''
        : 'Escribe un teléfono válido, con lada y de 10 a 15 dígitos.'
    );

    if (!formulario.reportValidity()) return;

    if (formulario.elements.namedItem('_honey').value) return;

    if (!/^https?:$/.test(window.location.protocol)) {
      mostrarEstado(
        'El envío estará disponible al abrir este formulario desde el sitio web.',
        true
      );
      return;
    }

    // Captura los datos antes de desactivar los campos.
    // getAll conserva todas las casillas seleccionadas.
    const entradas = new FormData(formulario);

    const datos = Object.fromEntries(
      [...new Set(entradas.keys())].map(nombre => [
        nombre,
        entradas.getAll(nombre).map(String).join(', ')
      ])
    );

    datos._url =
      window.location.origin + window.location.pathname;

    const numeroSolicitud = ++solicitudActual;
    const abortador = new AbortController();

    controlador = abortador;

    const tiempoLimite = setTimeout(
      () => abortador.abort(),
      20000
    );

    enviando = true;
    campos.disabled = true;
    enviar.textContent = 'Enviando…';
    formulario.setAttribute('aria-busy', 'true');
    estado.hidden = true;

    try {
      const respuesta = await fetch(
        'https://formsubmit.co/ajax/' + CORREO_DESTINO,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(datos),
          signal: abortador.signal
        }
      );

      const resultado = await respuesta.json();

      if (
        !respuesta.ok ||
        String(resultado.success).toLowerCase() !== 'true'
      ) {
        throw new Error('El servicio no confirmó la solicitud.');
      }

      if (numeroSolicitud !== solicitudActual) return;

      campos.hidden = true;
      encabezado.hidden = true;

      mostrarEstado(
        'Solicitud enviada. Gracias por contactarnos; nuestro equipo dará seguimiento a tu cotización.',
        false
      );
    } catch (error) {
      if (numeroSolicitud !== solicitudActual) return;

      mostrarEstado(
        'No pudimos confirmar el envío. Tus datos siguen aquí; puedes volver a intentarlo.',
        true
      );
    } finally {
      clearTimeout(tiempoLimite);

      if (numeroSolicitud === solicitudActual) {
        controlador = null;
        enviando = false;
        campos.disabled = false;
        enviar.textContent = 'Enviar solicitud';
        formulario.removeAttribute('aria-busy');
      }
    }
  });
})();