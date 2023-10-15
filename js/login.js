document.addEventListener('DOMContentLoaded', () => {
    // 요소 설정
    const loginFrom = document.querySelector('form')
    const errorMessage = document.getElementById('errorMessage')

    // 쿠키 설정 함수
    const setCookie = (name, value, minutes) => {
        const expirationDate = new Date(
            new Date().getTime() + minutes * 60 * 1000
        )
        document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`
    }

    const login = (email, password) => {
        fetch('/include/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${email}&password=${password}`,
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                if (data.status === 200) {
                    // 로그인 성공 시 - 쿠키 셋팅
                    setCookie('user_id', data.data.id, 60)
                    setCookie('user_name', data.data.name, 60)
                    alert('로그인 성공')
                    window.location.href = '/index.html'
                } else {
                    errorMessage.innerText = data.message
                }
            })
            .catch((error) => {
                console.error('Error: ', error)
                alert('다시 시도해주세요!')
            })
    }

    loginFrom.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.querySelector('input[name="email"]').value
        const password = document.querySelector('input[name="password').value
        login(email, password)
    })
})
