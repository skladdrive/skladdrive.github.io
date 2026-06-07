const slides = [
  {
    src: "assets/screenshots/1.png",
    alt: "СкладDrive: раздел Склад",
    title: "Склад",
    caption: "Группы, поиск, остатки, закупка и продажа в основном складском разделе.",
  },
  {
    src: "assets/screenshots/2.png",
    alt: "СкладDrive: раздел Поступление",
    title: "Поступление",
    caption: "Быстрое добавление товара по штрихкоду или артикулу и проведение поступления.",
  },
  {
    src: "assets/screenshots/3.png",
    alt: "СкладDrive: раздел Списание",
    title: "Списание",
    caption: "Поиск позиции, карточка товара, удаление строки, списание и возврат поставщику.",
  },
  {
    src: "assets/screenshots/4.png",
    alt: "СкладDrive: раздел Статистика",
    title: "Статистика",
    caption: "Остаток, поступления, выручка, прибыль и движение за выбранный период.",
  },
  {
    src: "assets/screenshots/5.png",
    alt: "СкладDrive: раздел Инвентаризация",
    title: "Инвентаризация",
    caption: "Сверка выгрузки сканера с остатками и применение найденных расхождений.",
  },
  {
    src: "assets/screenshots/6.png",
    alt: "СкладDrive: раздел Справочник",
    title: "Справочник",
    caption: "Импорт файлов, настройка колонок, поиск, обслуживание и экспорт справочника.",
  },
  {
    src: "assets/screenshots/7.png",
    alt: "СкладDrive: раздел Прайсы",
    title: "Прайсы",
    caption: "Добавление, настройка и объединение прайсов поставщиков в один результат.",
  },
  {
    src: "assets/screenshots/8.png",
    alt: "СкладDrive: раздел Сервис",
    title: "Сервис",
    caption: "Резервные копии, восстановление, контроль малого остатка и экспорт.",
  },
];

const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const image = gallery.querySelector("[data-gallery-image]");
  const title = gallery.querySelector("[data-gallery-title]");
  const caption = gallery.querySelector("[data-gallery-caption]");
  const count = gallery.querySelector("[data-gallery-count]");
  const thumbs = [...gallery.querySelectorAll("[data-gallery-thumb]")];
  const prev = gallery.querySelector("[data-gallery-prev]");
  const next = gallery.querySelector("[data-gallery-next]");
  let current = 0;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    image.src = slide.src;
    image.alt = slide.alt;
    title.textContent = slide.title;
    caption.textContent = slide.caption;
    count.textContent = `${current + 1} / ${slides.length}`;
    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("active", thumbIndex === current);
      thumb.setAttribute("aria-current", thumbIndex === current ? "true" : "false");
    });
  };

  prev.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => showSlide(Number(thumb.dataset.galleryThumb)));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showSlide(current - 1);
    }
    if (event.key === "ArrowRight") {
      showSlide(current + 1);
    }
  });
}
