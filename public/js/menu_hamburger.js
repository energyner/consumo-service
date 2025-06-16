/*Ejecucion del menu desplegable en cualquier parte de la pantalla */
function onClickMenu() {
  const menu = document.getElementById("nav");
  const menuBg = document.getElementById("menu-bg");
  const menuBtn = document.getElementById("menu");

  menuBtn.classList.toggle("change");
  menuBg.classList.toggle("open");
  menu.classList.toggle("open");
}

// Cerrar el menú si se hace clic fuera
document.addEventListener("click", function (event) {
  const menu = document.getElementById("nav");
  const menuBg = document.getElementById("menu-bg");
  const menuBtn = document.getElementById("menu");

  if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      menuBg.classList.remove("open");
      menuBtn.classList.remove("change");
    }
  }
});

// Efecto al hacer scroll
window.onscroll = function () {
  const menu = document.getElementById("menu-bar");
  if (menu) {
    const scrolled = window.scrollY;
    menu.style.transform = "translateY(" + scrolled + "px)";
  }
};
