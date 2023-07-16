# scroll-app
(зачем и почему?)
### цель:
- рандомайзинг элементов датасетов (json)

### задачи, которые выполняет приложение:
- CRUD над массивом датасетов
- импорт и экспорт датасетов
- управление отображением карточек или элементов датасетов
- ручная и автоматическая прокрутки бесконечной ленты

# requirements
- angular
- mdb-angular-ui-kit
- http-angular-server
- pm2 (optional)

# setup
```
  sudo apt-get install npm
  npm i
  sudo npm i http-angular-server -g
  sudo npm i pm2 -g

  pm2 start angular-http-server --name __NAME__ -- index.html -p __PORT__
  pm2 save
```

## pm2 management
```
  pm2 status
  pm2 kill
```

# problems & drawbacks
### scroll-page
- высота скролл контейнера относительно экрана (неточно изменяется)
- индикатор со статусом тайтла карточки (вместо просто красной полосы)
### switch-visibility-page
- ховер убрал не полностью
### datasets-editor-page
- куча  компонентов на странице

# P.S.
- если ваша ОС не линукс, то делайте **SETUP** ручками
- приложение собрано за 7 дней, в свободное время