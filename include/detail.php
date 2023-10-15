<?php

require_once(__DIR__ . '/../class/ArticleModel.php');
    // 인스턴스 생성
    $articleModel = new ArticleModel();

    // id 파라미터 URL에서 가져오기
    $articleId = $_GET['id'];

    // article 가져오기
    $getArticle = $articleModel->getArticleById($articleId);

    // HTTP header 설정
    header('Content-Type: application/json');

    // json 변환
    echo json_encode($getArticle);

?>
