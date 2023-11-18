<?php

    require_once(__DIR__ . '/../../class/ReplyModel.php');
    require_once(__DIR__ . '/../../class/ApiResponse.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            // POST 요청 데이터 읽기
            $data = json_decode(file_get_contents('php://input'), true);

            // 답글 id
            $replyId = $data['replyId'] ?? null;
            // content
            $content = $data['content'] ?? null;

            // ReplyModel 인스턴스 생성
            $reply = new ReplyModel();

            // 댓글 수정 실행
            $modify = $reply->modify($replyId, $content);

            if ($modify) {
                $response = new ApiResponse('200', '댓글 수정을 완료했습니다.', null);
                $response->responseJSON();
            } else {
                $response = new ApiResponse('400', '댓글 수정에 실패했습니다.', null);
                $response->responseJSON();
            }
        } catch (Exception $e) {
            // 예외 처리
            $response = new ApiResponse(500, '댓글 수정 중 오류 발생', null);
            $response->responseJSON();
        }
    } else {
        $response = new ApiResponse('405', '허용되지 않은 요청입니다.', null);
        $response->responseJSON();
    }
    
?>