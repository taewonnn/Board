document.getElementById('deleteButton').addEventListener('click', () => {
    // 알림 다이얼로그 표시
    if (confirm('게시글을 삭제하시겠습니까?')) {
        // URL에서 게시글 id 파싱
        const urlParams = new URLSearchParams(window.location.search)
        const articleId = urlParams.get('id')

        // 사용자 id
        const userId = getCookie('user_id')

        // JSON 데이터 준비
        const data = {
            article_id: articleId,
            user_id: userId,
        }

        fetch('/include/delete.php', {
            method: 'POST',
            // JSON 형식으로 데이터 전송
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
                if (res.ok) {
                    // 삭제 성공
                    alert(data.message)
                    // 페이지 이동
                    window.location.href = '/pages/list.html'
                } else {
                    // 삭제 실패
                    alert(data.message)
                }
            })
        })
    }
})
