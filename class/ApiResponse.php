<?php
    class ApiResponse {
        public $status;
        public $message;
        public $data;

        /**
         * 
         */
        public function __construct($status = 0, $message ="", $data = array()) {
            // 생성자에서는 응답을 안하는게 좋음
            $this->status = $status;
            $this->message = $message;
            $this->data = $data;
        }

        // json 헤더 설정
        public function setHeader($type = "") {
            if (strtolower($type) == "json") {
                header("Content-Type: application/json; charset=UTF-8");
            }
        }
        
        // Json 응답 함수
        public function responseJSON(){
            $this->setHeader("json");
            $response = array();
            if (!empty($this->message)) $response['message'] = $this->message;
            if (isset($this->data) > 0) $response['data'] = $this->data;
            http_response_code($this->status);
            echo json_encode($response);
        }

        // text 응답 함수
        public function responseText(){
            $this->setHeader("text");
            http_response_code($this->status);
            echo $this->data;
        }
    }

?>