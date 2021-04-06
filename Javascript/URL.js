const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gitbut.co.kr/book/bokklist/aspx?sercate1=00100000#anchor');// WHATWG 방식
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('--------------------------');
const parseURL = url.parse('http://www.gitbut.co.kr/book/bokklist/aspx?sercate1=00100000#anchor');
// 기존 노드의 방식
console.log('url.parse():', parseURL);
console.log('url.format():', url.format(parseURL));

// -------------------------------------//

const url = require ('url');
const queryString = require('queryString');
// deprecated 가능성 있음: url.parse()
const parseUrl