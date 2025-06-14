// Función para cargar el contenido de un archivo HTML en un elemento de la página
async function loadHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        console.log(`Content from ${filePath} loaded into #${elementId}`);
    } catch (error) {
        console.error(`Error loading HTML from ${filePath}:`, error);
    }
}

// Función que se ejecuta cuando se hace clic en el icono de la hamburguesa
function onClickMenu() {
    // Alterna la clase 'change' en el icono de la hamburguesa para su animación a 'X'
    const menuIcon = document.getElementById("menu-icon");
    if (menuIcon) {
        menuIcon.classList.toggle("change");
    }

    // Alterna la clase 'active' en la lista de navegación para mostrar/ocultar el menú
    const navList = document.getElementById("nav-list");
    if (navList) {
        navList.classList.toggle("active");
    }

    // Alterna la clase 'active' en el overlay de fondo
    const menuOverlay = document.getElementById("menu-overlay");
    if (menuOverlay) {
        menuOverlay.classList.toggle("active");
    }

    // Opcional: Deshabilita el scroll del cuerpo cuando el menú está abierto
    // Esto es útil para evitar que el contenido de la página se desplace
    // detrás del menú desplegable cuando este ocupa toda la altura.
    document.body.classList.toggle("no-scroll");
}

// Espera a que el DOM esté completamente cargado para ejecutar las funciones
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar el HTML del menú en la etiqueta <nav> de tu página principal
    // Asumiendo que tu <nav> principal tiene un ID (ej. id="main-nav-container")
    // y que menu.html está en public/html/
    // ¡IMPORTANTE!: Asegúrate de que tu etiqueta <nav> principal tenga un ID
    // en tu archivo consumption.html o en el HTML donde la uses.
    // Si tu HTML principal es: <nav id="main-nav-container"> </nav>
    // Entonces el elemento al que debes cargar el menú es "main-nav-container"
    // He puesto "main-nav-container" como placeholder, cámbialo al ID real de tu <nav>
    loadHTML('main-nav-container', '/html/menu.html')
        .then(() => {
            // Asegúrate de que onClickMenu() esté disponible globalmente
            // o adjunta el event listener después de cargar el HTML.
            // En tu HTML, tienes onclick="onClickMenu()", así que ya está bien.
        });

    // 2. Adjuntar la función al objeto global window para que onClickMenu() sea accesible
    // si no lo está ya por estar en un script defer/module.
    window.onClickMenu = onClickMenu;


    // Opcional: Cerrar el menú si se hace clic fuera de él (en el overlay)
    const menuOverlay = document.getElementById("menu-overlay");
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            if (menuOverlay.classList.contains('active')) {
                onClickMenu(); // Usa la misma función para cerrar
            }
        });
    }

});

