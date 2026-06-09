document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!header || !button || !nav) return;

  function closeMenu() {
    button.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    header.classList.remove("menu-open");
  }

  function openMenu() {
    button.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    header.classList.add("menu-open");
  }

  button.addEventListener("click", function () {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});
