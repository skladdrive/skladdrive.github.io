document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-download-link]");
  const mirrorButtons = document.querySelectorAll("[data-mirror-link]");
  const rustoreLinks = document.querySelectorAll("[data-rustore-link]");
  const rustoreAppUrl =
    "https://www.rustore.ru/catalog/app/ru.skladdrive.phone";

  const manifestUrl =
    "https://skladdrive-payment.skladdrive.workers.dev/updates/latest.json";

  rustoreLinks.forEach(function (link) {
    link.href = rustoreAppUrl;
  });

  if (!buttons.length && !mirrorButtons.length) return;

  function applyUpdate(data) {
    if (!data) return;

    const downloadUrl =
      data.primary_download_url || data.download_url || data.mirror_url;
    const mirrorUrl = data.mirror_url || data.download_url;

    if (downloadUrl) {
      buttons.forEach(function (button) {
        button.href = downloadUrl;
        button.removeAttribute("target");
        button.removeAttribute("rel");

        if (data.latest_version) {
          button.setAttribute(
            "title",
            "Скачать СкладDrive " + data.latest_version,
          );
          button.setAttribute(
            "aria-label",
            "Скачать СкладDrive " + data.latest_version,
          );
        }
      });
    }

    if (mirrorUrl) {
      mirrorButtons.forEach(function (button) {
        button.href = mirrorUrl;
        button.removeAttribute("target");
        button.removeAttribute("rel");
      });
    }
  }

  // Свой update.json на Pages - основной источник: он публикуется сразу
  // после правки и не требует деплоя воркера. Манифест воркера запрашивается
  // вторым: в нём download_url жёстко указывает на R2, а этот канал медленный.
  function fetchJson(url) {
    return fetch(url + "?t=" + Date.now(), { cache: "no-store" }).then(
      function (response) {
        if (!response.ok) throw new Error("update manifest not found");
        return response.json();
      },
    );
  }

  fetchJson("update.json")
    .then(applyUpdate)
    .catch(function () {
      return fetchJson(manifestUrl).then(applyUpdate).catch(function () {
        // В HTML остаётся прямая ссылка на релиз GitHub.
      });
    });
});
