<?php

require_once(__DIR__ . '/DatabaseClient.php');

class UserModel extends DatabaseClient {
    public $response = null;
    // 부모 클래스의 생성자를 호출
    public function __construct() {
        parent::__construct(); 
    }

    /**
     * Get user by email/password(for login)
     * @param string $email User email
     * @param string $password User password
     * @return array
     */
    public function login($email, $password) {
        $sql = "SELECT * 
            FROM users 
            WHERE email = '$email' AND password = '$password'
        ";

        // $result = $this->conn()->query($sql);
        $result = $this->conn->query($sql);

        if($result && $result->num_rows >0) {
            return $result->fetch_assoc();
        }
        return null;
    }

    /**
     * register users
     * @param string $usernmae
     * @param string $hashedPassword
     * @return bool
     */
    // 파라미터 배열로 받기
    public function registerUsers($username, $email, $password) {
        $sql = "INSERT INTO users (name, email, password) 
            VALUES ('$username', '$email', '$password')
        ";

        $result = $this->conn->query($sql);

        return $result;
    }

    /** 
     * validate auth
     * @param string $email User email
     * @return bool
     */
    public function isUserExist($email) {
        $sql = "SELECT * 
            FROM users 
            WHERE email = '$email'
            ";

        $result = $this->conn->query($sql);

        return $result && $result->num_rows > 0;
    }

    



}



    