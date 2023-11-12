// 댓글 작성 form 요소와 버튼 요소 가져오기
const createReplyForm = document.getElementById('createReply');
const replyContent = document.getElementById('replyContent');
const replyButton = document.querySelector('.reply-button');

// 댓글 작성 버튼 클릭 시 이벤트 핸들러 등록
replyButton.addEventListener('click', (event) => {
    event.preventDefault();

    // 게시글 ID를 가져오기 (URL 파라미터)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // 댓글 내용 가져오기
    const content = replyContent.value;

    // 데이터 준비
    const data = {
        articleId: articleId,
        content: content,
    };

    //POST 요청
    fetch('/include/reply/create.php', {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(async (response) => {
            console.log('res 확인', response.status);
            if (response.status !== 201) {
                // 에러 메시지 지정
                const result = await response.json();
                throw new Error(result.message);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            // 작성 성공 시
            console.log('data', data);
            alert(data.message);
            window.location.href = '';
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
});
