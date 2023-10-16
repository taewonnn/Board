<?php

    require_once(__DIR__ . '/../class/ArticleModel.php');
    require_once(__DIR__ . '/../class/ApiResponse.php');

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        // id 파라미터 URL에서 가져오기
        $articleId = $_GET['id'];
        
        // article 가져오기
        $articleModel = new ArticleModel();
        $getArticle = $articleModel->getArticleById($articleId);

        // response
        $response = new ApiResponse('200', '',$getArticle);
    } else {
        // GET 요청이 아닌 경우
        $response = new ApiResponse(405, '허용되지 않은 요청입니다.', null);
        exit();
    }

?>
