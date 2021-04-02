const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearTimeout(interval);
}, 2500);

const immediate = setImmediate(() => {
    console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다');
});

clearImmediate(immediate2);

// 제일 먼저 실행 immediate, immediate2는 바로 clearimmediate를 사용해 취소됨으로 실행X
// 코드 실행 1초 후 interval 콜백 실행
// 1.5s 후 timeout 콜백
// interval 콜백 1초마다 실행 2초때도 실행
// 2.5초 지났을때 모두 취소되므로 3초후에는 로그 남지 않음