// const fs = require('fs');
// fs.readFile(
//     /*__dirname+*/'./readme.txt', // 처리할 파일 경로 포함 파일 명
//     (err,data) => { // 처리 후 실행 할 콜백함수
//         if (err) {
//             throw err;
//         }
//         console.log(data); // Buffer 객체
//         console.log(data.toString()); // 
//     }
// )

//promise로 만들기
const fs = require('fs').promises;

fs.readFile(__dirname+'/readme.txt').then((data)=>{
    console.log(data);
    console.log(data.toString());
}).catch((err)=>{
    console.error(err);
});