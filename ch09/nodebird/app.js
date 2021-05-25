const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();// .env의 내용을 읽어서 노드 환경 변수 값을 설정
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

const { sequelize } = require('./models');
const passportConfig = require('passport');

const app = express(); // Server 객체 새성
passportConfig(); // passport 설정
app.set('port', process.env.PORT || 8001); // 포트번호 설정
app.set('view engine', 'html'); // 넌적스 설정
nunjucks.configure('views', { // views 폴더가 뷰 내용 작업 폴더임을 설정
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err)=> {
    console.log(err);
  })
// 미들웨어 설정 시작(순서 중요) 미들웨어는 반드시 next도 처리해줘야한다
app.use(morgan('dev')); // 로그 관련
app.use(express.static(path.join(__dirname, 'public'))); // 정적 리소스(html, js, jpg, png, css 등등), 폴더를 public으로 지정
app.use(express.json()); // json처리, body-parser
app.use(express.urlencoded({ extended: false })); //body-parser가 처리해줌
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키처리, 쿠키를 암호화하기 위해 사용하는 키값을 설정
app.use(session({ // express-session 패키지 설정
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
// req에 passport 모듈 정보를 저장
app.use(passport.session());
// 사용자 정의 미들웨어 구현
// 미들웨어 req, res, next로 구성 next를 안쓰면 라우터를 안거침
app.use('/', pageRouter); // 미들웨어 설정, 프론트 컨트롤러의 역할
//라우터는 미들웨어 중에 하나
app.unsubscribe('./auth', authRouter);
// 404 에러 처리 미들웨어
app.use((req, res, next) => { // 404처리 미들웨어
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => { // 에러처리 미들웨어, err 파라미터가 하나 더 있다
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
// 위에 까지가 미들웨어

app.listen(app.get('port'), () => { // 서버가 실행되면서 대기중으로 표시
  console.log(app.get('port'), '번 포트에서 대기중');
});
