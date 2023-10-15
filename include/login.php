<?php

require_once(__DIR__ . '/../class/UserModel.php');

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // POST 요청이 들어왔을 때만 처리

    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        // 필수 데이터가 전달되지 않았을 때 에러 응답
        http_response_code(400); // Bad Request
        echo json_encode(array('error' => '이메일과 비밀번호를 모두 입력하세요.'));
        exit();
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

    $userModel = new UserModel();
    $user = $userModel->login($email, $password);

    if ($user) {
        // 로그인 성공 시 사용자 정보를 JSON으로 응답
        echo json_encode(array('id' => $user['id'], 'name' => $user['name']));
        exit();
    } else {
        // 로그인 실패 시
        http_response_code(401); // Unauthorized
        echo json_encode(array('error' => '이메일 또는 비밀번호가 올바르지 않습니다.'));
        exit();
    }
} else {
    // POST 요청이 아닌 경우 에러 응답
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('error' => '허용되지 않은 요청 메서드입니다.'));
    exit();
}
?>