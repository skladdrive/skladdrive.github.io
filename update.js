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

  fetch(manifestUrl + "?t=" + Date.now(), { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("release manifest not found");
      return response.json();
    })
    .then(applyUpdate)
    .catch(function () {
      return fetch("update.json?t=" + Date.now(), {
        cache: "no-store",
      })
        .then(function (response) {
          if (!response.ok) throw new Error("update.json not found");
          return response.json();
        })
        .then(applyUpdate)
        .catch(function () {
          // В HTML остаётся прямая ссылка на резервное облачное зеркало.
        });
    });
});
