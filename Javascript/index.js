const {odd, even } = require('./var');
const checkNumber = require('./func'); // 함수를 받고

function checkStringOddOrEven(str) {
    if (str.length % 2) return odd;
    return even;
}

console.log(checkNumber(10)); // 모듈로 뱉음
console.log(checkStringOddOrEven('hello'));