<?php

class DatabaseClient {
    protected $conn = null;
    private $host = "127.0.0.1:3306";
    private $user = "root";
    private $pass = "1234";
    private $name = "board";

    // 생성자  - class의 인스턴스가 생성되면 아래 함수가 실행
    public function __construct() {
        $this->connect();
    }

    // 생성자에서 사용하기 위한 함수
    public function connect() {
        if ($this->conn == null) {
            $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->name);

            // Check connection
            if ($this->conn->connect_error) {
                die("Connection failed: " . $this->conn->connect_error);
            }
        }
    }

    // $conn이 private이라 자식에서 사용하기 위한 함수
    protected function getConnection() {
        return $this->conn;
    }
}
?>