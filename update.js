document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-download-link]");
  if (!buttons.length) return;

  fetch("update.json?t=" + Date.now(), { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("update.json not found");
      return response.json();
    })
    .then(function (data) {
      if (!data || !data.download_url) return;

      buttons.forEach(function (button) {
        button.href = data.download_url;

        if (data.latest_version) {
          button.setAttribute("title", "Скачать СкладDrive " + data.latest_version);
          button.setAttribute("aria-label", "Скачать СкладDrive " + data.latest_version);
        }
      });
    })
    .catch(function () {
      // Если update.json недоступен, остаётся резервная ссылка из HTML.
    });
});
