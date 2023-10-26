/* 사용X */
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton')

    console.log('확인', logoutButton)
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // 쿠키 삭제
            document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

            // 홈 페이지로 리디렉션
            window.location.href = '/index.html'
        })
    }
})
