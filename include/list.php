<?php

    require_once(__DIR__ . '/../class/ArticleModel.php');
    require_once(__DIR__ . '/../class/ApiResponse.php');

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        // list 가져오기
        $articleModel = new ArticleModel();
        $articles = $articleModel->getArticles();
        
        $response = new ApiResponse(200, '',$articles);
        exit();
    } else {
        // GET 요청이 아닌 경우
        $response = new ApiResponse(405, '허용되지 않은 요청입니다.', null);
        exit();
    }

?>
