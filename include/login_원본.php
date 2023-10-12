<?php
    require_once '../class/UserModel.php';

    // form 데이터 확인
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        // form 데이터가 제대로 전달되지 않았을 때
        header("Location: ../pages/login.html");
        exit();
    }

    $email = $_POST['email'];
    $password = $_POST['password']; 

    $userModel = new UserModel();
    $user = $userModel->login($email, $password);

    if ($user) {
        // 로그인 성공 시
        setcookie("user_id", $user['id'], time()+3600, "/");
        setcookie("user_name", $user['name'], time()+3600, "/");
        
        header("Location: ../index.html");
    } else {
        // 로그인 실패 시
        header("Location: ../pages/login.html");
    }
?>