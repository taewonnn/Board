window.addEventListener('DOMContentLoaded', async () => {
    try {
        // URL에서 게시글의 ID 파싱
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        // ID를 사용하여 게시글의 디테일 데이터 가져오기
        const res = await fetch(`../include/detail.php?id=${articleId}`);
        console.log(res);
        if (res.status !== 200) {
            const result = await res.json();
            throw new Error(result.message);
        } else {
            const { data } = await res.json();
            // 확인
            console.log('확인', data);

            // 게시글
            const article = data.article;

            // 게시글 정보
            document.getElementById('articleTitle').innerText = article.title;
            document.getElementById('articleAuthor').innerText = article.author;
            document.getElementById('articleContent').innerText = article.content;
            document.getElementById('articleAuthor').innerText = `작성자 : ${article.authorName}`;
            // 수정 버튼
            document.getElementById('modifyButton').href = '/pages/modify.html?id=' + article.id;

            // 이미지
            if (article.image_url === '' || article.image_url == null) {
                document.getElementById('articleImage').style.display = 'none';
            } else {
                document.getElementById('articleImage').src = article.image_url;
            }

            // 댓글 정보
            if (data.replies) {
                const replies = data.replies;
                console.log('답글 데이터 : ', replies);

                // 댓글 목록 컨테이너
                const commentList = document.querySelector('.comment-list');
                // 댓글 정보를 반복하여 각 댓글을 생성하고 추가
                replies.forEach((reply) => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item';

                    // 댓글 작성자 ID와 현재 사용자 ID 비교
                    const user_id = getCookie('user_id');
                    if (reply.users_id === user_id) {
                        // 본인이 작성한 댓글인 경우 수정 및 삭제 버튼 추가
                        li.innerHTML = `
                            <strong>${reply.name}</strong> : ${reply.content}
                            <br/>
                            <small>${reply.created_at}</small>
                            <button class="btn btn-warning btn-sm" id="modifyReplyBtn" data-reply-id="${reply.id}" onclick="modifyReply(${reply.id})">수정</button>
                            <button class="btn btn-danger btn-sm" id="deleteReplyBtn" data-reply-id="${reply.id}" onclick="deleteReply(${reply.id})">삭제</button>
                            `;
                    } else {
                        // 다른 사용자가 작성한 댓글인 경우
                        li.innerHTML = `
                            <strong>${reply.name}</strong> : ${reply.content}
                            <br/>
                            <small>${reply.created_at}</small>
                        `;
                    }
                    commentList.appendChild(li);
                });
            } else {
                return;
            }
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});
