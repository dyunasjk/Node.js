const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();// .env의 내용을 읽어서 노드 환경 변수 값을 설정
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
// 미들웨어 설정 시작(순서 중요)
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
// 사용자 정의 미들웨어 구현
// 미들웨어 req, res, next로 구성 next를 안쓰면 라우터를 안거침
app.use('/', pageRouter); // 미들웨어 설정
//라우터는 미들웨어 중에 하나

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => { // 에러처리 미들웨어
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
// 위에 까지가 미들웨어

app.listen(app.get('port'), () => { // 서버가 실행되면서 대기중으로 표시
  console.log(app.get('port'), '번 포트에서 대기중');
});
