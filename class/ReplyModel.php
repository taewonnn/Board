<?php

    require_once(__DIR__ . '/DatabaseClient.php');

    class ReplyModel extends DatabaseClient {
        public $response = null;
        // 부모 클래스의 생성자를 호출
        public function __construct() {
            parent::__construct(); 
        }

        /**
         * get replies by id
         * @param int $id
         * @return array
         */
        public function get($id) {
            $sql = "SELECT r.id, r.users_id, r.articles_id, r.content, r.created_at, u.name
                FROM replies r
                INNER JOIN users AS u ON u.id = r.users_id
                WHERE r.articles_id = $id
            ";

            $result = $this->conn->query($sql);
            $replies = [];

            while ($row = $result->fetch_assoc()) {
                $replies[] = $row;
            }

            return $replies;
        }

        /**
         * create reply
         */
        public function create($users_id, $name, $content) {
            $sql = "INSERT INTO replies
            (users_id, name, content, created_at)
            VALUES('$users_id', '$name', '$content', NOW())
            ";

            $result = $this->conn->query($sql);
            return $result;
        }



    }


?>