document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.prototype.slice.call(document.querySelectorAll(".screenshot-grid .screenshot-card"));

  if (cards.length < 2) return;

  let currentIndex = 0;

  const viewer = document.createElement("div");
  viewer.className = "lightbox";
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-modal", "true");
  viewer.setAttribute("aria-label", "Просмотр скриншота");
  viewer.hidden = true;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "lightbox-close";
  closeButton.setAttribute("aria-label", "Закрыть просмотр");
  closeButton.textContent = "\u00d7";

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "lightbox-nav lightbox-nav-prev";
  prevButton.setAttribute("aria-label", "Предыдущий скриншот");
  prevButton.textContent = "\u2039";

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "lightbox-nav lightbox-nav-next";
  nextButton.setAttribute("aria-label", "Следующий скриншот");
  nextButton.textContent = "\u203a";

  const figure = document.createElement("figure");
  figure.className = "lightbox-figure";

  const image = document.createElement("img");
  image.className = "lightbox-image";
  image.setAttribute("decoding", "async");

  const footer = document.createElement("figcaption");
  footer.className = "lightbox-footer";

  const caption = document.createElement("span");
  caption.className = "lightbox-caption";

  const counter = document.createElement("span");
  counter.className = "lightbox-counter";

  const externalLink = document.createElement("a");
  externalLink.className = "lightbox-link";
  externalLink.textContent = "Открыть в новой вкладке";
  externalLink.target = "_blank";
  externalLink.rel = "noopener";

  footer.appendChild(caption);
  footer.appendChild(counter);
  footer.appendChild(externalLink);
  figure.appendChild(image);
  figure.appendChild(footer);

  viewer.appendChild(closeButton);
  viewer.appendChild(prevButton);
  viewer.appendChild(nextButton);
  viewer.appendChild(figure);
  document.body.appendChild(viewer);

  let lastFocused = null;

  function render() {
    const card = cards[currentIndex];
    const thumb = card.querySelector("img");
    const heading = card.querySelector("h3");
    image.src = card.getAttribute("href");
    image.alt = thumb ? thumb.getAttribute("alt") : "";
    caption.textContent = heading ? heading.textContent : "";
    counter.textContent = currentIndex + 1 + " / " + cards.length;
    externalLink.href = card.getAttribute("href");
  }

  function open(index) {
    currentIndex = index;
    lastFocused = document.activeElement;
    render();
    viewer.hidden = false;
    document.documentElement.classList.add("lightbox-shown");
    closeButton.focus();
  }

  function close() {
    viewer.hidden = true;
    document.documentElement.classList.remove("lightbox-shown");
    image.removeAttribute("src");
    if (lastFocused && lastFocused.focus) {
      lastFocused.focus();
    }
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    render();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    render();
  }

  cards.forEach(function (card, index) {
    card.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      open(index);
    });
  });

  closeButton.addEventListener("click", close);
  nextButton.addEventListener("click", showNext);
  prevButton.addEventListener("click", showPrev);

  viewer.addEventListener("click", function (event) {
    if (event.target === viewer || event.target === figure) {
      close();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (viewer.hidden) return;
    if (event.key === "Escape") {
      close();
    } else if (event.key === "ArrowRight") {
      showNext();
    } else if (event.key === "ArrowLeft") {
      showPrev();
    }
  });
});
