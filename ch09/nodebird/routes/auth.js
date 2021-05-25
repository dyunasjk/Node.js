const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => { // POST /auth/join 요청 라우터
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
// 회원가입 라우터
// 기존에 같은 이메일로 가입한 사용자가 있는지 조회한 후 있다면 회원가입 페이지로 되돌려보냄. 단 주소 뒤 에러를 쿼리스트링으로 표시
// 없다면 비밀번호를 암호화하고 사용자 정보 생성
// 비밀번호 암호화를 위해 bcrypt 모듈 사용
// 두번째 인자의 숫자를 키울수록 암호화는 더욱 되지만, 시간도 오래 걸림.
// promise를 지원하는 ㅎ마수이므로 await 사용

router.post('/login', isNotLoggedIn, (req, res, next) => { // POST /auth/login 요청
  passport.authenticate('local', (authError, user, info) => { // passport.authenticate(로그인 전략 설정, 콜백)
    // 로그인 성공하든 실패하든지 콜백이 실행됨
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});
// 로그인 라우터
// 로그인 요청이 들어오면 passportAuthenticate('local') 미들웨어가 로컬 로그인 전략을 수행
// 라우터 미들웨어 안에 들어있는 미들웨어
// 미들웨어에 사용자 정의 기능을 추가하고 싶을 때 이렇게 사용 가능
// 내부 미들웨어에 (req, res, next) 인수로 제공해서 호출해서 사용하면 됨
// 전략이 성공하거나 실패하면 authenticate()의 콜백함수가 실행.
// 콜백함수의 첫번째 매개변수 값이 있다면 실패
// 두번째 매개변수 값이 있다면 성공, req.login() 호출
// passport는 req 객체에 login과 logout 메소드를 추가
// req.login은 passport.serializeUser를 호출
// req.login에 제공하는 user 객체가 serializeUser로 넘어가게 됨

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
// 로그아웃 라우터
// req.logout()는 req.user 객체를 제거하고, req.session.destroy는 req.session 객체의 내용을 제거
// 세션정보를 지운 후 메인페이지로 되돌아감.

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
