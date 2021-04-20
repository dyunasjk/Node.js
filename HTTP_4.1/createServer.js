// const http = require('http');

// http.createServer( // http.server 객체를 생성
//     (res,res) => { // (request, response) => {} 로 해도 상관은 없음
//         // 여기에 어떻게 응답할지 작성
//     }
// ); // Server 객체가 만들어짐


const http = require('http');


http.createServer( // http.server 객체를 생성
    (req,res) => { 
        res.writeHead(
            200, // 응답 코드
            {'Content-Type': 'text/html; charset=utf8'} // 헤더들, 헤더를 지정
        );
        res.write(
            '<h1>Hello Node!</h1>'
        );
        res.end('<p>Hello Server!</p>'); // req: 요청정보, res: 응답정보
    }
).listen(
    8081, // 포트번호: 서버(기계)의 해당 서비스 구분(프로세스 구분)
    () => {
        console.log('8080번 포트에서 서버대기중');
        console.log('http://localhost:8080/ 접속');
    }
); 