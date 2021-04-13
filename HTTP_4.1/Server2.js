const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./server2.html'); // 비동기적 방식
        // data의 타입: Buffer 객체
        res.writeHead(
            200, // response code
            { 'Content-Type' : 'text/html; charset=utf8'}
        );
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(
            500, // response code
            { 'Content-Type' : 'text/plain; charset=uft8'} // plain : 아무것도 없는 코드
        );
        res.end(err.message);
    }
}).listen(8081, () => {
        console.log('8081번 포트에서 서버 대기 중입니다!');
        console.log('http://localhost:8081/ 접속');
    }
);