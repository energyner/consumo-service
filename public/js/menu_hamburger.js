// public/js/menu-hamburger.js

// Función para cargar el contenido de un archivo HTML en un elemento de la página
async function loadHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            targetElement.innerHTML = html;
            console.log(`Contenido de ${filePath} cargado en #${elementId}`);
            // Adjuntar el event listener al icono de hamburguesa DESPUÉS de que se cargue el HTML
            const hamburgerIcon = document.getElementById("hamburger-icon");
            if (hamburgerIcon) {
                hamburgerIcon.addEventListener('click', toggleMenu);
            }

            // Adjuntar el event listener al overlay para cerrar el menú al hacer clic fuera
            const menuOverlay = document.getElementById("menu-overlay");
            if (menuOverlay) {
                menuOverlay.addEventListener('click', toggleMenu); // Usa la misma función para cerrar
            }
        } else {
            console.error(`Error: Elemento con ID "${elementId}" no encontrado en el DOM.`);
        }
    } catch (error) {
        console.error(`Error cargando HTML desde ${filePath}:`, error);
    }
}

// Función para alternar el estado del menú
function toggleMenu() {
    // Referencias a los elementos del menú
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const navMenu = document.getElementById("nav-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    if (hamburgerIcon && navMenu && menuOverlay) {
        // Alterna las clases para abrir/cerrar el menú y animar el icono
        hamburgerIcon.classList.toggle("open");
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("open");

        // Deshabilita/habilita el scroll del cuerpo para evitar que el contenido
        // de la página se desplace detrás del menú desplegable.
        document.body.classList.toggle("no-scroll");
    } else {
        console.error("Error: Uno o más elementos del menú no se encontraron en el DOM.");
    }
}

// Espera a que el DOM esté completamente cargado para ejecutar las funciones iniciales
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar el HTML del menú en la etiqueta <nav> de tu página principal
    // ¡IMPORTANTE!: Asegúrate de que la etiqueta <nav> en tu HTML principal
    // (ej. consumption.html) tenga este ID.
    // Ejemplo: <nav id="main-nav-container"></nav>
    loadHTML('main-nav-container', '/html/menu.html');
});


