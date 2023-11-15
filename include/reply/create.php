<?php

    require_once(__DIR__ . '/../../class/ReplyModel.php');
    require_once(__DIR__ . '/../../class/ApiResponse.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // 쿠키 - users_id 검증
        $users_id = $_COOKIE['user_id'] ?? null;
        if (!$users_id) {
            $response = new ApiResponse(401, '사용자 인증에 실패했습니다.', null);
            $response->responseJSON();
            exit();
        }

        // 데이터
        // POST 요청 데이터 읽기
        $data = json_decode(file_get_contents('php://input'), true);
        
        $content = $data['content'] ?? null;
        $articleId = $data['articleId'] ?? null;

        // 입력 데이터 유효성 검증
        if (empty($content)) {
            $response = new ApiResponse(400, '내용을 입력해주세요', null);
            $response->responseJSON();
            exit();
        }

        try {
            // 인스턴스 생성
            $reply = new ReplyModel();
            $create = $reply->create($users_id, $articleId, $content);

            // 줄바꿈 적용
            $content = nl2br($content);

            if ($create) {
                $response = new ApiResponse(201, '댓글 작성 성공', null);
                $response->responseJSON();
            } else {
                $response = new ApiResponse(500, '댓글 작성 실패', null);
                $response->responseJSON();
            }
        } catch (Exception $e) {
            // 예외 처리
            $response = new ApiResponse(500, '댓글 작성 중 오류 발생', null);
            $response->responseJSON();
        }
    } else {
        // POST 요청이 아닌 경우
        $response = new ApiResponse(405, '허용되지 않은 요청입니다.', null);
        $response->responseJSON();
    }
?>