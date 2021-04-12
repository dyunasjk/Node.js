const buffer = Buffer.from( '저를 버퍼로 바꿔보세요' );
console.log ('from(): ', buffer);
console.log ('length: ', buffer.length);
console.log ('toString(): ', buffer.toString());
const array = [Buffer.from ('띄엄'), Buffer.from ('띄엄'), Buffer.from ('띄어쓰기')];
const buffer2 = Buffer.concat (array); // 여러 버퍼를 배열로 저장
console.log('concat(): ', buffer2.toString());
const buffer3 = Buffer.alloc(5); // allocation: 
console.log ('alloc():', buffer3); // 버퍼는 비트단위로 처리