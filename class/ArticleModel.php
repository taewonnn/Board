<?php

require_once(__DIR__ . '/DatabaseClient.php');

class ArticleModel extends DatabaseClient {

    // 부모 클래스의 생성자를 호출
    public function __construct() {
        parent::__construct(); 
    }

    /**
     * get article list
     * @retrun array
     */
    public function getArticles() {
        // 쿼리
        $sql = "SELECT articles.*, users.name AS authorName
            FROM articles
            JOIN users ON articles.users_id = users.id
            ORDER BY articles.created_at DESC
        ";

        // 쿼리 실행
        $result = $this->conn->query($sql);
        
        // 배열
        $articles = [];
        while($row = $result->fetch_assoc()) {
            $articles[] = $row;
        }
    
        // 결과 반환
        return $articles;
    }

    /**
     * create article
     * @param int $user_id
     * @param string $title
     * @param string $content
     * @param string $image_url
     * @return bool
     */
    public function createArticle($users_id, $title, $content, $image_url) {
        $sql = "INSERT INTO articles
            (users_id, title, content, image_url, created_at)
            VALUES('$users_id', '$title', '$content', '$image_url', NOW())
        ";

        return $this->conn->query($sql) === true;
    }

    /**
     * get article by id
     */
    public function getArticleById($id) {
        $sql = "SELECT articles.*, users.name AS authorName
            FROM articles
            JOIN users ON articles.users_id = users.id
            WHERE articles.id = $id
        ";

        $result = $this->conn->query($sql);
        return $result->fetch_assoc();
    }

    /**
     * modify article
     * @param int $article_id
     * @param int $users_id
     * @param string $title | null
     * @param string $content | null
     * @param string $image_url | null
     * @return bool
     */
    public function modifyArticle($article_id, $users_id, $title, $content, $image_url) {
        $sql = "UPDATE articles
            SET content = '$content', title = '$title', image_url = '$image_url'
            WHERE id = $article_id AND users_id = $users_id
        ";

        $result = $this->conn->query($sql);
        return $result === true;
    }


    /**
     * delete article
     * 
     */
    public function deleteArticle($article_id, $user_id) {
        $sql = "DELETE FROM articles
                WHERE id = $article_id AND users_id = $user_id
        ";
    
        $result = $this->conn->query($sql);
    
        return $result === true;
    }







}



?>

