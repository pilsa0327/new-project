var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const db = require('../utils/db')
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt-nodejs')

router.use(bodyParser.urlencoded({ extended: false }));

router.use(session({
  key: 'sid',
  secret: '135hjgui1g2541jikhfd', //keboard cat (랜덤한 값)
  resave: false,
  saveUninitialized: true,
  store: new mysqlstore({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'bmill'
  })
}))

/* GET users listing. */
router.get('/', function (req, res, next) {

  return res.render('create');
});


router.post('/create_process', function (req, res) {
  let { id, password, password2 } = req.body

  if (password.length < 8 || password.length > 16) {
    res.send('암호를 8자이상 16자 이하로 설정해주세요.')
  }
  var check = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
  if (!check.test(password)) {
    res.send('영문, 숫자, 특수문자의 조합으로 입력해주세요.')
  }
  else {


    db.query('select * from user_info where userid = ?', id, function (err, user) {
      if (err) {
        console.log('err : ', err);
      } else {
        if (user.length === 0 || user.length !== 0) {
          if (user.length !== 0 && user[0].userid === id) {
            return res.send('중복된 아이디가 존재합니다.')
          } else {
            if (password === password2) {
              password = bcrypt.hashSync(password)
              let sql = { userid: id, password: password };
              db.query('insert into user_info set ?', sql, function (err, result) {
                return res.redirect('/')
              })
            }
          }
        }
      }
    })
  }

})

module.exports = router;