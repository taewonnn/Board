document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form')
    const errorMessage = document.getElementById('error-message')
    const welcomeMessage = document.getElementById('welcome-message') // 추가

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault() // 기본 제출 동작 방지

        const email = document.querySelector('input[name="email"]').value
        const password = document.querySelector('input[name="password"]').value

        // 로그인 데이터를 서버로 전송
        fetch('/include/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${email}&password=${password}`,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('로그인에 실패했습니다.')
                }
                return response.json() // JSON 응답을 파싱
            })
            .then((data) => {
                if (data.error) {
                    errorMessage.innerText = data.error // 에러 메시지 표시
                } else {
                    // 로그인이 성공한 경우 쿠키로 사용자 정보 저장 (60분 동안 유효)
                    const expirationDate = new Date()
                    document.cookie = `user_id=${
                        data.id
                    }; expires=${expirationDate.toUTCString()}; path=/`
                    document.cookie = `user_name=${
                        data.name
                    }; expires=${expirationDate.toUTCString()}; path=/`

                    // 로그인이 성공한 경우 리다이렉트 또는 원하는 작업 수행
                    window.location.href = '/index.html'

                    // 환영 메시지 업데이트
                    welcomeMessage.innerText = `Welcome, ${data.name}!`
                }
            })
            .catch((error) => {
                errorMessage.innerText = error.message // 기타 오류 메시지 표시
            })
    })
})
