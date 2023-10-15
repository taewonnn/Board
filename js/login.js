document.addEventListener('DOMContentLoaded', () => {
    // 요소 설정
    const loginForm = document.querySelector('form')
    const errorMessage = document.getElementById('errorMessage')

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
                console.log(response)
                if (!response.ok) {
                    // 서버에서 응답이 ok가 아니면 에러 메시지를 반환합니다.
                    return response.json().then((err) => {
                        throw err
                    })
                }
                // 정상 응답 반환
                return response.json()
            })
            .then((data) => {
                if (data.error) {
                    // 에러 메시지 표시
                    errorMessage.innerText = data.error
                } else {
                    // 로그인이 성공한 경우 쿠키로 사용자 정보 저장 (60분 동안 유효)
                    const expirationDate = new Date(
                        new Date().getTime() + 60 * 60 * 1000
                    )
                    document.cookie = `user_id=${
                        data.id
                    }; expires=${expirationDate.toUTCString()}; path=/`
                    document.cookie = `user_name=${
                        data.name
                    }; expires=${expirationDate.toUTCString()}; path=/`

                    // 로그인이 성공한 경우 리다이렉트 또는 원하는 작업 수행
                    window.location.href = '/index.html'
                }
            })
            .catch((error) => {
                console.error(error)
                errorMessage.innerText = error.error || '다시 시도해주세요!'
            })
    })
})
document.addEventListener('DOMContentLoaded', () => {
    // 요소 설정
    const loginForm = document.querySelector('form')
    const errorMessage = document.getElementById('errorMessage')

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
                console.log(response)
                if (!response.ok) {
                    // 서버에서 응답이 ok가 아니면 에러 메시지를 반환합니다.
                    return response.json().then((err) => {
                        throw err
                    })
                }
                // 정상 응답 반환
                return response.json()
            })
            .then((data) => {
                if (data.error) {
                    // 에러 메시지 표시
                    errorMessage.innerText = data.error
                } else {
                    // 로그인이 성공한 경우 쿠키로 사용자 정보 저장 (60분 동안 유효)
                    const expirationDate = new Date(
                        new Date().getTime() + 60 * 60 * 1000
                    )
                    document.cookie = `user_id=${
                        data.id
                    }; expires=${expirationDate.toUTCString()}; path=/`
                    document.cookie = `user_name=${
                        data.name
                    }; expires=${expirationDate.toUTCString()}; path=/`

                    // 로그인이 성공한 경우 리다이렉트 또는 원하는 작업 수행
                    window.location.href = '/index.html'
                }
            })
            .catch((error) => {
                console.error(error)
                errorMessage.innerText = error.error || '다시 시도해주세요!'
            })
    })
})
