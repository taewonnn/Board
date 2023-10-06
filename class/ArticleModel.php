<?php

require_once(__DIR__ . '/DatabaseClient.php');

class ArticleModel extends DatabaseClient{

    // 부모 클래스의 생성자를 호출
    public function __construct() {
        parent::__construct(); 
    }

    /**
     * get Article list
     * @retrun array
     */
    public function getArticle() {
        // 쿼리
        $sql = "SELECT articles.*, users.name AS author_name
            FROM articles
            JOIN users ON articles.users_id = users.id
            ORDER BY articles.created_at DESC
        ";

        // 쿼리 실행
        $result = $this->getConnection()->query($sql);
        
        // 배열
        $articles = [];
        while($row = $result->fetch_assoc()) {
            $articles[] = $row;
        }
    
        // 결과 반환
        return $articles;
    }
}
?>