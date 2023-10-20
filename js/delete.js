// fetch 함수
async function fetchDeleteData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response
}

// 삭제 버튼 클릭 이벤트
document.getElementById('deleteButton').addEventListener('click', async () => {
    try {
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

            // fetch
            const res = await fetchDeleteData('/include/delete.php', data)
            console.log('res 확인', res)

            if (res.status !== 200) {
                // 에러 발생 시
                const result = await res.json()
                throw new Error(result.message)
            } else {
                // 성공 시
                const data = await res.json()
                alert(data.message)
                window.location.href = '/pages/list.html'
            }
        }
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
})
