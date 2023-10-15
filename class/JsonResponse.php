<?php

class JsonResponse {
    // static - PHP에서 클래스의 인스턴스를 만들지 않고 클래스의 메서드나 프로퍼티를 사용 가능
    public static function send($data, $status = 200) {
        http_response_code($status);
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode($data);
        exit();
    }
    
    public static function success($data = []) {
        $response = [
            'status' => ['code' => 'success'],
            'data' => $data
        ];
        self::send($response);
    }
    
    public static function error($message, $status = 400) {
        $response = [
            'status' => ['code' => 'error', 'message' => $message]
        ];
        self::send($response, $status);
    }
}

?>