const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    // 사용자로부터 입력받는 정보 설정
    usernameField: 'email',
    passwordField: 'password',
    // LocalStrategy 생성자의 첫번째 인수로 주어진 객체는 전략에 관한 설정을 하는곳
    // usernamefield와 passwordfield에는 일치하는 로그인 라우터의 req.body 속성명을 적으면 됨
    // req.body.email에는 이메일 주소가, req.body.password에 비밀번호가 담겨 들어오므로 email과 password 기입
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password); // DB와 데이터 비교
        if (result) {
          done(null, exUser); // (authError, user, info) => {}
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        } // (authError, user, info) => {}
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      } // (authError, user, info) => {}
    } catch (error) {
      console.error(error);
      done(error);
    }
    // 실제 전략을 수행하는 async함수
    // localstrategy 생성자의 두번째 인수로 들어감
    // 첫번째 인수에서 넣어준 email과 apssword는 각각 async 함수의 첫번째와 두번째 매개 변수가 됨
    // 세번째 매개변수인 done함수는 passport.authenticate의 콜백 함수
  }));
};
