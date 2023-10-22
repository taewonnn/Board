<?php
    require_once(__DIR__ . '/../class/UserModel.php');
    require_once(__DIR__ . '/../class/APIResponse.php');

    $userModel = new UserModel();

    // form 입력값
    $username = $_POST['username'] ?? NULL;
    $email = $_POST['email'] ?? NULL;
    $password = $_POST['password'] ?? NULL;
    $errors = [];

    // id 중복 검사만 수행하는 경우
    if(isset($_POST['check_email'])) {
        $email = $_POST['email'];
        $result = $userModel->isUserExist($email);

        // 결과 확인
        if ($result === true) {
            // 중복인 경우
            $response = new ApiResponse(400,'중복된 이메일 주소입니다.','');
            $response->responseJSON();
        } else if ($result === false) {
            // 중복이 아닌 경우
            $response = new ApiResponse(200,'사용가능한 이메일 주소입니다.','');
            $response->responseJSON();
        } else {
            // 에러나 다른 상황의 경우
            $response = new ApiResponse(500,'서버 오류가 발생했습니다.','');
            $response->responseJSON();
        }
        exit();
    }

    // 서버 측 유효성 검사
    if (empty($username) || strlen($username) < 2 || strlen($username) > 20 || !preg_match("/^[A-Za-z가-힣]+$/u", $username)) {
        $response = new ApiResponse(400, '이름은 2글자 이상 20글자 이하 한글/영어로 작성해야 합니다.', null);
        $response->responseJSON();
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = new ApiResponse(400, '올바른 이메일 형식이 아닙니다.', null);
        $response->responseJSON();
    }

    if (empty($password) || strlen($password) < 3 || preg_match('/\s/', $password)) {
        $response = new ApiResponse(400, '비밀번호는 3자리 이상이며, 공백을 포함할 수 없습니다.', null);
        $response->responseJSON();
    }

    // 에러가 없는 경우
    if (!isset($response)) {
        // registerUsers 함수 불러오기
        try {
            $register = $userModel->registerUsers($username, $email, $password);
            $response = new ApiResponse(200, '회원가입 완료헀습니다.', null);
            $response->responseJSON();
        } catch (mysqli_sql_exception $ex) {
            // 회원가입 실패 시
            // echo $ex->getMessage();
            $response = new ApiResponse(400, '회원가입에 실패했습니다. 다시 시도 해주세요!', null);
            $response->responseJSON();  
        } 
    }

?>
