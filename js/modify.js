/* 게시글 내용 가져오기 */
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // URL에서 게시글 id 파싱
        const urlParams = new URLSearchParams(window.location.search)
        const articleId = urlParams.get('id')

        // fetch
        const res = await fetch(`../include/modify.php?id=${articleId}`)
        // 확인
        console.log('res 확인', res)

        // 응답 상태 확인
        if (res.status === 403) {
            // 권한 없음 -> 알림 및 리다이렉트
            alert('접근 권한이 없습니다.')
            window.location.href = '/pages/list.html'
            return
        } else if (!res.ok) {
            // 기타 응답 오류
            console.error('error', res)
            return
        }

        // 응답이 정상 -> json 파싱
        const { article } = await res.json()

        // 확인
        console.log(article)

        // 작성자
        document.getElementById('name').value = article.authorName
        // 제목
        document.getElementById('title').value = article.title
        // 내용
        document.getElementById('content').value = article.content
        // 이미지
        if (article.image_url) {
            document.getElementById('imagePreview').src = article.image_url
            document.getElementById('imagePreview').style.display = 'block'
        } else {
            document.getElementById('imagePreview').src = ''
        }
    } catch {
        // ❗️ 에러 처리 필요
        console.error('error')
    }
})

/* 게시글 내용 수정하기 */
document
    .querySelector('form[name="modifyArticle"]')
    .addEventListener('submit', async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData(event.target)
            const articleId = new URLSearchParams(window.location.search).get(
                'id'
            )

            const res = await fetch(`../include/modify.php?id=${articleId}`, {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                console.error('에러 :', res)
                return
            }

            const result = await res.json()
            console.log(result)
            if (result.status.code === 'success') {
                alert('수정 완료')
                window.location.href = `/pages/detail.html?id=${articleId}`
            } else {
                console.error(result.status.code)
            }
        } catch (error) {
            console.error('에러 :', result.status.code)
        }
    })
