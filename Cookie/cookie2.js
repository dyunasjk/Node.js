const http = require( 'http' );
const fs = require( 'fs' ).promises;
const url = require( 'url' );
const qs = require( 'querystring' );

const parseCookies = (cookie = '' ) => // 쿠키 변수 디폴트 값 설정, parseCookies() 호출 가능
    cookie
    .split ( ';' ) // { name=???, Expires=???, HTTPonly, Path=/} 배열
    .map (v => v.split ( '=' )) // 콜백을 호출 결과 => [name, ???], [Expires, ???],...
    .reduce ((acc, [k, v]) => { // 
        acc[k. trim ()] = decodeURIComponent (v);
        return acc;
    }, {}); // reduce에 의해 배열을 객체 형태로 바꾼다. {name,???} {Expires, ???}

http.createServer(async (req, res) => {
    const cookies = parseCookies (req.headers.cookie );

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith( '/login' )) { // 메서드 지정 안하면 get 요청이라 인지
        // GET/Login 요청 처리부분
        const { query } = url.parse(req. url );
        const { name } = qs.parse(query);
        const expires = new Date();
        //쿠키 유효시간을 현재 시간 +5분으로 설정
        expires.setMinutes (expires. getMinutes () + 5);
        res.writeHead (302, {
            Location : '/' ,
            'Set-Cookie' : 'name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/',}); // 쿠키 값, ;으로 구분
            res.end ();
            // name이라는 쿠키가 있는 경우
        } else if (cookies.name) {
            res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
            // res.end(`${cookies.Path`);
            res.end(`${cookies.name}님 안녕하세요`);
        } else {
            try {
            const data = await fs. readFile ( ' ./cookie2.html' );
            res.writeHead (200 , { 'Content-Type' : 'text/html; charset=ut f-8' });
            res.end (data );
            } catch (err) {
                res. writeHead(500, { ' Content-Type ' : 'text/plain; charset=utf-8' });
                res. end (err.message );
            }
        }
})
.listen (8084, () => {
    console. log( '8084포트에서 서버 대기 중입니다' );
});