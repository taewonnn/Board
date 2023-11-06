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
         * @param int $users_id
         * @param string $name
         * @param string $content
         * @return array
         */
        public function create($users_id, $articleId, $content) {
            $sql = "INSERT INTO replies
                (users_id, articles_id, content, created_at)
                VALUES('$users_id', '$articleId', '$content', NOW())
        ";

            $result = $this->conn->query($sql);
            return $result;
        }

        /**
         * delete reply
         * @param int $users_id
         * @param int $articles_id
         * @param int $replies_id 
         */
        public function delete($users_id, $articles_id, $replies_id ) {
            $sql = "DELETE FROM replies
                WHERE users_id = $users_id AND articles_id = $articles_id AND id = $replies_id
            ";
        
            $result = $this->conn->query($sql);
            return $result === true;
        }

        /**
         * modify reply by ID
         * @param int $replyId
         * @param string $content
         * @return bool
         */
        public function modify($replyId, $content) {
            $sql = "UPDATE replies
                SET content = '$content'
                WHERE id = $replyId
            ";

            $result = $this->conn->query($sql);
            return $result === true;
        }


    }


?>

