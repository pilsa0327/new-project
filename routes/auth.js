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
/*
router.post('/auth_process', function(req, res){
  let { id, password} = req.body;
    db.query(`SELECT * FROM user_info WHERE userid =? `, [id], function (err, userInfo) {
        if (!userInfo.length) {
            return res.send('아이디 없음')
        }
        else {
            if (userInfo[0].password === password) {
                req.session.is_logined = true;
                req.session.userId = userInfo[0].userd;
                req.session.password = userInfo[0].password;
                req.session.save(function () {
                    return res.redirect(`/`)
                })
            } else {
                // 로그인 실패(패스워드 틀림)
                return res.send('패스워드 틀림')
            }
        }
    })
})*/

router.post('/auth_process', passport.authenticate('local', {
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
