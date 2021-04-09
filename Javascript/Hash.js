const crypto = require('crypto');


const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
console.log(
    'base64: ',
    crypto.createHash('sha512') // 사용할 해시 알고리즘을 선택하여 crypto 객체생성
    .update('암호화할 문자열') // 암호화
    .digest('base64'));        // base64로 엔코딩 처리 문자열~~~~ ==에서 ==이 base64마지막 부분을 알림
console.log(
    'base64: ',
    crypto.createHash('sha512') 
    .update('암호화할 문자열') 
    .digest('hexa'));   //hexa로 엔코딩 처리