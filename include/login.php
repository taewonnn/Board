<?php

    require_once(__DIR__ . '/../class/UserModel.php');
    require_once(__DIR__ . '/../class/ApiResponse.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // POST 요청이 들어왔을 때만 처리

        if (!isset($_POST['email']) || !isset($_POST['password'])) {
            // 필수 데이터가 전달되지 않았을 때 에러 응답
            $response = new ApiResponse(400, '이메일과 비밀번호를 모두 입력해주세요', null);
            exit();
        }

        // 입력값 - email / password
        $email = $_POST['email'];
        $password = $_POST['password'];

        // 로그인 쿼리
        $userModel = new UserModel();
        $user = $userModel->login($email, $password);

        if ($user) {
            // 로그인 성공 시
            $data = array('id' => $user['id'], 'name' => $user['name']);
            $response = new ApiResponse(200, '로그인에 성공하였습니다.', $data);
            exit();
        } else {
            // 로그인 실패 시
            $response = new ApiResponse(401, '이메일 또는 비밀번호가 올바르지 않습니다.', null);
            exit();
        }
    } else {
        // POST 요청이 아닌 경우
        $response = new ApiResponse(405, '허용되지 않은 요청입니다.', null);
        exit();
    }
?>