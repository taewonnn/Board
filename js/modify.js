/* 게시글 내용 가져오기 */
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // URL에서 게시글 id 파싱
        const urlParams = new URLSearchParams(window.location.search)
        const articleId = urlParams.get('id')

        // fetch
        const res = await fetch(`../include/modify.php?id=${articleId}`)
        const data = await res.json()
        // 확인
        console.log('res 확인', data)

        // article 변수
        let article

        // 응답 상태 확인
        if (data.status === '403') {
            // 권한 없음 -> 알림 및 리다이렉트
            alert('접근 권한이 없습니다.')
            window.location.href = '/pages/list.html'
        } else if (data.status === '200') {
            article = data.data
            console.log(article)
        } else {
            console.error('에러 :')
        }

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
    } catch (error) {
        // 예외
        console.error('error :', error)
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

            // data
            const data = await res.json()
            console.log('modify -', data)

            if (data.status === '200') {
                alert(data.message)
                window.location.href = `/pages/detail.html?id=${articleId}`
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('에러 :', data.message)
        }
    })
