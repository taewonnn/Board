<?php

class ApiResponse {
    public $status;
    public $message;
    public $data;

    public function __construct($status, $message, $data) {
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;

        // JSON 응답을 위한 헤더 설정
        header("Content-Type: application/json; charset=UTF-8");

        // 응답 데이터를 JSON 형식으로 인코딩
        echo json_encode($this);
    }
}




?>