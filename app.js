const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')
const session = require('express-session')
const mysqlstore = require('express-mysql-session')
const app = express();

const passport = require('passport'); // 
const passportConfig = require('./utils/passport'); // 

var indexRouter = require('./routes/index');
var createRouter = require('./routes/create');
var authRouter = require('./routes/auth');

app.use(session({
  key: 'sid',
  secret: '135hjgui1g2541jikhfd', //keyboard cat (랜덤한 값)
  resave: true,
  saveUninitialized: true,
  store: new mysqlstore({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'bmill'
  })
}))


app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig();


app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/auth', authRouter);







/*
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});*/

module.exports = app;
