document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-download-link]");
  if (!buttons.length) return;

  const manifestUrl =
    "https://skladdrive-payment.skladdrive.workers.dev/updates/latest.json";

  function applyUpdate(data) {
    if (!data || !data.download_url) return;

    buttons.forEach(function (button) {
      button.href = data.download_url;
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
          // В HTML остаётся прямая резервная ссылка на Worker.
        });
    });
});
