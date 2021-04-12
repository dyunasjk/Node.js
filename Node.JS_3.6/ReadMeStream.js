const fs = require( 'fs' );
const readStream = fs.createReadStream( './ReadMe3.txt' , { highWaterMark: 16 } /* 처리할 chunk의 길이 */);
const dataArr = [];

readStream.on( // 이벤트와 이벤트리스터를 연결하는 메소드
    'data' // 이벤명, 처리할 데이터가 있으면 발생하는 입네트
    , (chunk) => { // 이벤트 처리함수 - 이벤트 핸들러, 이벤트 리스너
    dataArr.push(chunk);
    console.log('data : ' , chunk, chunk.length);
});

readStream.on (
    'end', // 처리할 데이터가 없으면 발생
    () => { // 이벤트 리스너 실행
    console.log ('end : ' , Buffer.concat(dataArr).toString());
});
readStream.on(
    'error',
    (err) => {
    console.log('error : ' , err);
});