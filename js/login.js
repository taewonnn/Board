document.addEventListener('DOMContentLoaded', () => {
    // 요소 설정
    const loginFrom = document.querySelector('form');
    const errorMessage = document.getElementById('errorMessage');

    // 쿠키 설정 함수
    const setCookie = (name, value, minutes) => {
        const expirationDate = new Date(new Date().getTime() + minutes * 60 * 1000);
        document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    };

    const login = (email, password) => {
        fetch('/include/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${email}&password=${password}`,
        })
            .then(async (res) => {
                console.log(res);
                if (res.status !== 200) {
                    // 에러 메시지 지정
                    const result = await res.json();
                    throw new Error(result.message);
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                // 로그인 성공 시 - 쿠키 셋팅
                setCookie('user_id', data.data.id, 60);
                setCookie('user_name', data.data.name, 60);
                alert('로그인 성공');
                window.location.href = '/index.html';
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    };

    loginFrom.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password').value;
        login(email, password);
    });
});
