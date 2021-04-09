const crypto = require('crypto');

crypto.randomBytes (
    64, // 발생시킬 문자열 길이
    (err, buf) => { // 설정된 길이만큼 문자열이 생성되면 호출하는 콜백함수 생성
        // const salt = buf.toString('base64');
        const salt = 'My salt'.toString('base64'); // 솔트값이 정해지면 암호화 코드는 동일 => 서버에 암호화된 값을 넣어 비교후 로그인하게끔 구현
        console.log(salt);
        crypto.pbkdf2(
            '암호화할 문자열',
            salt,
            100000, // 반복횟수
            64, //길이
            'sha512', // 암호화 알고리즘
            (err,key) => {
                console.log('password: ', key.toString('base64'));
            }
        );
    }
)