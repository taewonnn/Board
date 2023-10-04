<?php

require_once(__DIR__ . '/../class/ArticleModel.php');

    $articleModel = new ArticleModel();

    // list 가져오기
    $getArticle = $articleModel->getArticle();

    // HTTP header 설정
    header('Content-Type: application/json');

    // json 변환
    echo json_encode($getArticle);

?>
