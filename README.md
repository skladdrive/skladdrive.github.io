# СкладDrive

Статический сайт для GitHub Pages.

## Страницы

- `index.html` — главная страница
- `instruction.html` — инструкция
- `changelog.html` — журнал версий

## Обновления

Актуальная версия и ссылка на архив хранятся в `update.json`.

При новой версии изменить в `update.json`:

```json
"latest_version": "1.0.5",
"release_date": "2026-06-15",
"download_url": "https://skladdrive.github.io/downloads/SkladDrive_1.0.5.zip"
```

Кнопки скачивания на сайте берут ссылку из `update.json` через `update.js`.

В репозиторий не добавляйть ключи, лицензии, базы данных, прайсы и другие приватные файлы.
