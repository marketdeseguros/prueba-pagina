(() => {
  const archivoInicio = "index.html";
  const archivoPrivacidad = "aviso-de-privacidad.html";

  // Coloca aquí la misma ruta del logo que usas en el footer del index.
  const archivoLogo = "img/market-blanco.png";

  const carpeta = new URL(".", document.currentScript.src);
  const ruta = (archivo) => new URL(archivo, carpeta).href;
  const inicio = ruta(archivoInicio);

  const contenedor = document.getElementById("footer-compartido");

  if (!contenedor) return;

  contenedor.innerHTML = `
    <footer class="market-footer">
      <div class="market-footer__container">

        <div class="market-footer__top">

          <!-- LOGO -->
          <div class="market-footer__brand">
            <a
              class="market-footer__logo"
              href="${inicio}"
              aria-label="Market de Seguros, inicio"
            >
              <img
                src="${ruta(archivoLogo)}"
                alt="Market de Seguros"
              >
            </a>
          </div>

          <!-- TU PROTECCIÓN -->
          <div class="market-footer__column">
            <h2>Tu protección</h2>

            <a href="${inicio}?categoria=personas#seguros">
              Personas y familias
            </a>

            <a href="${inicio}?categoria=empresas#seguros">
              Empresas y negocios
            </a>

            <a href="${inicio}?categoria=escuelas#seguros">
              Comunidad escolar
            </a>
          </div>

          <!-- ESTAMOS CERCA -->
          <div class="market-footer__column">
            <h2>Estamos cerca</h2>

            <a href="${inicio}#nosotros">
              Conoce Market
            </a>

            <a
              href="https://marketdesegurossmw.segumarket.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cotiza en línea, abre otra pestaña"
            >
              Cotiza en línea ↗
            </a>

            <a
              href="https://www.facebook.com/segurosyfianzasmultimarca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Facebook, abre otra pestaña"
            >
              Síguenos en Facebook ↗
            </a>
          </div>

          <!-- DIRECCIÓN Y TELÉFONO -->
          <div class="market-footer__column market-footer__address">
            <h2>Visítanos en Morelos</h2>

            <p>
              Av. Plan de Ayala 1759, local B-20.<br>
              Plaza Cascada, col. Jacarandas, 62420.<br>
              Cuernavaca, Morelos.
            </p>

            <a href="tel:+527771193499">
              777 119 34 99
            </a>
          </div>

        </div>

        <!-- LÍNEA DIVISORIA, DERECHOS Y AVISO -->
        <div class="market-footer__bottom">
          <p>
            © <span id="year">${new Date().getFullYear()}</span>
            Market de Seguros. Todos los derechos reservados.
          </p>

          <a href="${ruta(archivoPrivacidad)}">
            Aviso de privacidad
          </a>
        </div>

      </div>
    </footer>
  `;

  // Selecciona la categoría al llegar a la página de inicio.
  function seleccionarCategoria() {
    const categoria = new URLSearchParams(
      window.location.search
    ).get("categoria");

    const categorias = ["personas", "empresas", "escuelas"];

    if (!categorias.includes(categoria)) return;

    const boton = document.getElementById("tab-" + categoria);

    if (boton) {
      boton.click();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      seleccionarCategoria,
      { once: true }
    );
  } else {
    seleccionarCategoria();
  }
})();