<?php
    require_once(__DIR__ . '/../class/UserModel.php');

    $userModel = new UserModel();

    // form 입력값
    // 띄어쓰기 / Decode
    // $username = str_replace(" ","", trim(urldecode($_POST['username']))) ?? NULL;
    $username = $_POST['username'] ?? NULL;
    $email = $_POST['email'] ?? NULL;
    $password = $_POST['password'] ?? NULL;
    $errors = [];

    // id 중복 검사만 수행하는 경우
    if(isset($_POST['check_email'])) {
        $email = $_POST['email'];
        $result = $userModel->isUserExist($email);

        // 결과를 json으로 반환
        header('Content-Type: application/json');

        // 결과 확인
        if ($result === true) {
            // 중복인 경우
            echo json_encode(array('status' => 'taken'));
        } else if ($result === false) { 
            // 중복이 아닌 경우
            echo json_encode(array('status' => 'available'));
        } else {
            // 에러나 다른 상황의 경우
            echo json_encode(array('status' => 'error'));
        }
        exit();
    }

    // 서버 측 유효성 검사
    if (!$username) {
        $errors[] = '이름이 필요합니다.';
    }
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = '올바른 이메일 양식이 아닙니다';
    }
    if (!$password || strlen($password) < 3) {
        $errors[] = '비밀번호는 최소 3자 이상 필요합니다.';
    }

    // id 중복 검사만 수행하는 경우
    if(isset($_POST['check_email'])) {
        $email = $_POST['email'];
        $result = $userModel->isUserExist($email);

        // 결과를 json으로 반환
        header('Content-Type: application/json');

        // 결과 확인
        if ($result === true) {
            // 중복인 경우
            echo json_encode(array('status' => 'taken'));
        } else if ($result === false) { 
            // 중복이 아닌 경우
            echo json_encode(array('status' => 'available'));
        } else {
            // 에러나 다른 상황의 경우
            echo json_encode(array('status' => 'error'));
        }
        exit();
    }

    // 에러가 없는 경우
    if (!$errors) {
        // registerUsers 함수 불러오기
        $register = $userModel->registerUsers($username, $email, $password);

        if ($register) {
            header("Location: ../index.html");
            exit;
        } else {
            // 회원가입 실패 시
            $errors[] = 'Registration failed. Please try again.';
        }
    }

    // 에러가 있는 경우, 에러 메시지와 함께 이전 페이지로 리다이렉트
    if ($errors) {
        echo '회원가입 실패';
    } exit;


?>

