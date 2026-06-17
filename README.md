# СкладDrive

Статический сайт для GitHub Pages.

## Страницы

- `index.html` — главная страница
- `instruction.html` — инструкция
- `changelog.html` — журнал версий

## Обновления

Актуальная версия и ссылка на архив хранятся в `update.json`.

При новой версии измените в `update.json`:

```json
"latest_version": "1.0.5",
"release_date": "2026-06-15",
"download_url": "https://1drv.ms/f/c/d2e946c5855f5b00/IgA9zbOS55xCSrL014Xw9LCrAVcH9uuBSBQTvQi0XTUO3Ck?e=HzMjbO"
```

Кнопки скачивания на сайте берут ссылку из `update.json` через `update.js`. Сам архив программы хранится на OneDrive, потому что GitHub не подходит для файлов больше 25 МБ.

В репозиторий не добавляйте ключи, лицензии, базы данных, прайсы и другие приватные файлы.
