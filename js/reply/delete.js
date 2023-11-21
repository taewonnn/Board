async function deleteReply(replyId) {
    try {
        if (confirm('해당 댓글을 삭제하시겠습니까?')) {
            // 사용자 id
            const user_id = getCookie('user_id');

            // 게시글 ID를 가져오기
            const urlParams = new URLSearchParams(window.location.search);
            const articles_id = urlParams.get('id');

            // 데이터
            const requestData = {
                users_id: user_id,
                articles_id: articles_id,
                replies_id: replyId,
            };

            // fetch
            const response = await fetch('/include/reply/delete.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.status === 200) {
                // 댓글 삭제 성공 시
                const data = await response.json();
                alert(data.message);
                window.location.href = '';
            } else {
                // 실패 시
                const data = await response.json();
                console.error(data.message);
            }
        } else {
            // 취소한 경우
            alert('댓글 삭제가 취소되었습니다.');
        }
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
    }
}
