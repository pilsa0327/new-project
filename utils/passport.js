const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db')
const bcrypt = require('bcrypt-nodejs')
module.exports = () => {
    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        console.log('1111111')
        done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    });

    passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        console.log(user.userId)
        done(null, user); // 여기의 user가 req.user가 됨
        
    });

    passport.use(new LocalStrategy({ // local 전략을 세움
        usernameField: 'id',
        passwordField: 'password',
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
    }, (id, password, done) => {
        db.query('select * from user_info where userId = ?', [id], function (err, user) {
            if (err) return done(err); // 서버 에러 처리
            if (!user.length) {
                return done(null, false, { message: '존재하지 않는 아이디입니다' });
            }
            else {

                bcrypt.compare(password, user[0].password, function (err, tf) {
                    if( tf === false ) {
                      return done(null, false, { message: '비밀번호가 틀렸습니다' });
                    } else if ( tf === true ) {
                      return done(null, user[0]);
                    }
                  })
                  /*
                if (user[0].password == password) {

                    return done(null, user[0]);
                } else {
                    return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
                }
                // 임의 에러 처리
                */

            }
        });
    }
    ))

}