<?php

    require_once(__DIR__ . '/../class/ArticleModel.php');
    require_once(__DIR__ . '/../class/ImageUploader.php');
    require_once(__DIR__ . '/../class/APIResponse.php');

    // 인스턴스 생성
    $articleModel = new ArticleModel();
    
    // id 확인
    $articleId = $_GET['id'] ?? null;
    $userId = $_COOKIE["user_id"] ?? null;

    // GET 요청 함수 - 게시글 가져오기
    function handleGetRequest($articleModel, $articleId, $userId) {
        // 게시글 가져오기
        $getArticle = $articleModel->getArticleById($articleId);

        if ($getArticle) {
            // 권한 확인
            if ($userId == $getArticle['users_id']) {
                $response = new ApiResponse('200','',$getArticle);
                exit();
            } else {
                $response = new ApiResponse('403','접근 권한이 없습니다.', '');
                exit();
            }
        } else {
            $response = new ApiResponse('404','게시글이 존재하지 않습니다.', '');
            exit();
        }
    }

    // POST 요청 함수 - 게시글 수정
    function handlePostRequest($articleModel, $articleId, $userId) {
        $title = $_POST['title'] ?? null;
        $content = $_POST['content'] ?? null;
        $image = $_FILES['image'] ?? null;

        // 현재 게시글의 정보를 가져와서 이미지가 있는지 확인
        $currentArticle = $articleModel->getArticleById($articleId);
        $image_url = $currentArticle['image_url'] ?? null;

        // 이미지 파일 체크
        if ($image && $image['size'] > 0) {
            $uploadDir = "/images";
            $imageUploader = new ImageUploader($uploadDir);
            $image_url = $imageUploader->uploadImage($image);

            if (!$image_url) {
                $response = new ApiResponse('400', '이미지 업로드에 실패했습니다.','');
                exit();
            }
        }

        $result = $articleModel->modifyArticle($articleId, $userId, $title, $content, $image_url);

        if ($result) {
            $reseponse = new ApiResponse('200', '게시글 수정 완료했습니다.', '');
        } else {
            $reseponse = new ApiResponse('500', '업데이트에 실패했습니다.', '');
        }
        exit();
    }

    // HTTP 메서드 확인
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        handleGetRequest($articleModel, $articleId, $userId);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handlePostRequest($articleModel, $articleId, $userId);
    } else {
        $response = new ApiResponse(405, '허용되지 않은 요청입니다.', null);
        exit();
    }
?>