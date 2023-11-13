/* 게시글 내용 가져오기 */
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // URL에서 게시글 id 파싱
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        // fetch
        const res = await fetch(`../include/modify.php?id=${articleId}`);
        console.log('게시글 정보 가져오기 res', res);
        if (res.status !== 200) {
            const result = await res.json();
            throw new Error(result.message);
        } else {
            const { data: article } = await res.json();
            // 확인
            console.log('article 확인', article);

            // 작성자
            document.getElementById('name').value = article.authorName;
            // 제목
            document.getElementById('title').value = article.title;
            // 내용
            document.getElementById('content').value = article.content;
            // 이미지
            if (article.image_url) {
                document.getElementById('imagePreview').src = article.image_url;
                document.getElementById('imagePreview').style.display = 'block';
            } else {
                document.getElementById('imagePreview').src = '';
            }
        }
    } catch (error) {
        // 예외
        console.log(error);
        alert(error.message);
    }
});

/* 게시글 내용 수정하기 */
document.querySelector('form[name="modifyArticle"]').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const formData = new FormData(event.target);
        const articleId = new URLSearchParams(window.location.search).get('id');

        const res = await fetch(`../include/modify.php?id=${articleId}`, {
            method: 'POST',
            body: formData,
        });
        console.log('게시글 수정 res', res);

        if (res.status !== 200) {
            const result = await res.json();
            // console.log('게시글 수정 result', result);
            throw new Error(result.message);
        } else {
            const result = await res.json();
            alert(result.message);
            window.location.href = `/pages/detail.html?id=${articleId}`;
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});
