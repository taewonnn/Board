document.addEventListener('DOMContentLoaded', () => {
    // 로그인 확인
    const userId = getCookie('user_id')
    const authorName = getCookie('user_name')

    if (!userId || !authorName) {
        alert('로그인이 필요한 서비스입니다!')
        window.location.href = '/pages/login.html'
        return
    }

    // 작성자 이름 넣기
    document.getElementById('name').value = authorName

    // form
    const form = document.querySelector('form')

    // 작성하기 버튼 클릭 시 이벤트
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        // FormData 객체를 사용하여 폼 데이터 수집
        const formData = new FormData(e.target)

        fetch('/include/create.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                // console.log(response);
                return response.json()
            })
            .then((data) => {
                // 확인
                console.log(data)
                if (data.status === '400') {
                    alert(data.message)
                } else if (data.status === '500') {
                    alert(data.message)
                } else if (data.status === '201') {
                    alert(data.message)
                    window.location.href = '/pages/list.html'
                } else {
                    // 예외
                    alert('서버 오류 :' + data.message)
                }
            })
            .catch((error) => {
                console.error('Error: ', error)
                alert('다시 시도해주세요!')
            })
    })
})
