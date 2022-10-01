# sales-front
Таблица реализована с помощью vue js v3, с использованием Сomposition api.
Для задания был сделан тестовый сервер на express js. локально он запускается командой npm run start:server на порту 8080 также можно использовать команду npm run start:all для запуска фронта и сервера
для работы сервера надо запустить postgreSQL. создать базу данных shops, в ней создать таблицу shops с колонками "id","title","sales_count","distance" можно заполнить таблицу случайными значениями

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development only front

```sh
npm run dev
```

### Compile and Hot-Reload for Development with server on express

```sh
npm run start:all
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
