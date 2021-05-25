const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 라우터에서 사용되는 미들웨어 정의
  // res.locals.user = null; // res.loacls --> nunjucks에서 사용됨
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
}); // GET /profile

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
}); // GET .join 요청처리 라우터

router.get('/', (req, res, next) => { // 최초 접속하는 부분 
  const twits = [];
  res.render('main', { // main.html 화면을 만드는 부분
    title: 'NodeBird',
    twits,
  });
}); // GET / 요청 처리

module.exports = router;
