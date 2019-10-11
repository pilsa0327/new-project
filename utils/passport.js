const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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
                    if (tf === false) {
                        return done(null, false, { message: '비밀번호가 틀렸습니다' });
                    } else if (tf === true) {
                        return done(null, user[0]);
                    }
                })
            }
        });
    }
    ))

    passport.use(new FacebookStrategy({
        profileFields: ['id', 'email', 'name'],
        clientID: '2747572838638230',
        clientSecret: 'd454a923aed7e937f3f922451af94db4',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        session: true
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile)
            console.log(profile._json.id, profile.emails[0].value, profile.provider)
            let sql = { id: profile._json.id, email: profile.emails[0].value, provider: profile.provider };
            db.query(`select * from sns_info where email = ?`, profile.emails[0].value, function (err, user) {
                if (user[0].email !== profile.emails[0].value) {
                    db.query(`INSERT INTO sns_info set ?`, sql, function (err, userInfo) {
                        done(null, userInfo);
                    })
                }
                else {
                    done(null, user);
                }
            })
            /* User.findOrCreate(..., function(err, user) {
               if (err) { return done(err); }
               done(null, user);
             });*/
        }
    ));


}