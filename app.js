const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Настройка сессий
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Настройка парсинга тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Настройка папки с публичными файлами
app.use(express.static(path.join(__dirname, 'public')));

// Настройка EJS
app.set('view engine', 'ejs');

// Настройка маршрутов
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const travelsRouter = require('./routes/travels');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/travels', travelsRouter);
app.use('/users', usersRouter);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
