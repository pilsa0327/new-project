var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const db = require('../utils/db')
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);
const passport = require('passport');

router.use(bodyParser.urlencoded({ extended: false }));

router.use(session({
  key: 'sid',
  secret: '135hjgui1g2541jikhfd',
  resave: false,
  saveUninitialized: true,
  store: new mysqlstore({
      host: 'localhost',
      user: 'root',
      password: '111111',
      database: 'bmill'
  }),
  cookie: { 
    secure: true  
  }
}))

router.get('/', function(req, res) {
  
  return res.render('auth');
});

router.post('/auth_process', passport.authenticate('local', {
  failureRedirect: '/auth'
}), (req, res) => {
  req.session.is_logined = true;
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/auth'
}), (req, res) => {
  req.session.is_logined = true;
  res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.session.destroy(function(){ 
        req.session;
    });
    return res.redirect('/');
  });



module.exports = router;
