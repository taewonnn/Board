<?php

    require_once(__DIR__ . '/../../class/ReplyModel.php');
    require_once(__DIR__ . '/../../class/ApiResponse.php');
    
    if($_SERVER['REQUEST_METHOD'] === 'POST') {

        // POST 요청 데이터 읽기
        $data = json_decode(file_get_contents('php://input'), true);
    
        $users_id = $data['users_id'] ?? null;
        $articles_id = $data['articles_id'] ?? null;
        $replies_id = $data['replies_id'] ?? null;

        try {            
            // 인스턴스 생성
            $reply = new ReplyModel();
            $delete = $reply->delete($users_id, $articles_id, $replies_id);

            if ($delete) {
                $response = new ApiResponse(200, '댓글을 삭제했습니다.', null);
                $response->responseJSON();
            } else {
                $response = new ApiResponse(400, '삭제에 실패했습니다.', null);
                $response->responseJSON();
            }
        } catch (Exception $e) {
            // 예외 처리
            $response = new ApiResponse(500, '댓글 삭제 중 오류 발생', null);
            $response->responseJSON();
        }
    } else {
        // POST 요청이 아닌 경우
        $response = new ApiResponse(405, '허용되지 않은 요청입니다.', null);
        $response->responseJSON();
    }

?>


