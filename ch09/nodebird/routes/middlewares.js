exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        // req.isAuthenticated(): passport 모듈에서 구현되어 있는 메소드
        // 인증되었으면 true 반환, 그렇지 않으면 false 반환
        next();
    } else {
        req.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        req.redirect(`/?error=${message}`);
    }
};