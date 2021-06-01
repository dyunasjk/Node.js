const passport = require('passport');
const local = require('./localStrategy'); // 로그인 전략
const kakao = require('./kakaoStrategy'); // 로그인 전략, 어떤 형식으로 로그인 할지 정의
const User = require('../models/user');
const mdbConn = require('./mariaDBConn.js');

module.exports = () => { // 이 화살표 함수는 passportConfig() 함수를 app.js에서 psassportConfig()에서 호출됨
    passport.serializeUser((user, done) => {
    // 직렬화 사용자, 로그인시 실행
    // req.session 객체에 어떤 데이터를 저장할 지 선택, 사용자 정보를
    // 다 들고 있으면 메모리를 많이 차지하기 때문에 사용자의 아이디만 저장
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
    // 매번 request에 대해 실행
    // passport.session()에서 호출하는 메솧드
    // req.session에 저장된 사용자 아이디를 바탕으로 Db조회
    // 그리고 사용자 정보를 얻어낸 후 req.user에 저장
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
            // User 모델에서 id로 저장된 row를 찾아 user객체로 전달
            // done() 메소드 호출, user 객체를 req.user에 저장 (req.user=user)
    });

    local();
    kakao();
}