window.addEventListener('DOMContentLoaded', async () => {
    try {
        // URL에서 게시글의 ID 파싱
        const urlParams = new URLSearchParams(window.location.search)
        const articleId = urlParams.get('id')

        // ID를 사용하여 게시글의 디테일 데이터 가져오기
        const res = await fetch(`../include/detail.php?id=${articleId}`)
        const { data: article } = await res.json()
        // 확인
        console.log(article)

        document.getElementById('articleTitle').innerHTML = article.title
        document.getElementById('articleAuthor').innerHTML = article.author
        document.getElementById('articleContent').innerHTML = article.content
        document.getElementById(
            'articleAuthor'
        ).innerHTML = `작성자 : ${article.authorName}`
        // 수정 버튼
        document.getElementById('modifyButton').href =
            '/pages/modify.html?id=' + article.id

        // 이미지
        if (article.image_url === '' || article.image_url == null) {
            document.getElementById('articleImage').style.display = 'none'
        } else {
            document.getElementById('articleImage').src = article.image_url
        }
    } catch (error) {
        console.log('fail', error)
    }
})
