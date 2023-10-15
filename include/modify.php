<?php

require_once(__DIR__ . '/../class/ArticleModel.php');
require_once(__DIR__ . '/../class/ImageUploader.php');

header("Content-Type: application/json; charset=UTF-8");

$articleModel = new ArticleModel();
$articleId = $_GET['id'] ?? null;
$userId = $_COOKIE["user_id"] ?? null;

function handleGetRequest($articleModel, $articleId, $userId) {
    $getArticle = $articleModel->getArticleById($articleId);

    if ($getArticle) {
        if ($userId == $getArticle['users_id']) {
            $response = [
                'article' => $getArticle,
                'status' => ['code' => 'success']
            ];
            echo json_encode($response);
        } else {
            http_response_code(403);
            $response = [
                'status' => ['code' => 'error', 'message' => '접근 권한이 없습니다.']
            ];
            echo json_encode($response);
            exit();
        }
    } else {
        $response = [
            'status' => ['code' => 'error', 'message' => '게시글이 존재하지 않습니다.']
        ];
        echo json_encode($response);
        exit();
    }
}

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
            $response = [
                'status' => ['code' => 'error', 'message' => '이미지 업로드 실패']
            ];
            echo json_encode($response);
            exit;
        }
    }

    $result = $articleModel->modifyArticle($articleId, $userId, $title, $content, $image_url);

    if ($result) {
        $response = [
            'status' => ['code' => 'success']
        ];
        echo json_encode($response);
    } else {
        http_response_code(500);
        $response = [
            'status' => ['code' => 'error', 'message' => 'Update failed']
        ];
        echo json_encode($response);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    handleGetRequest($articleModel, $articleId, $userId);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    handlePostRequest($articleModel, $articleId, $userId);
}
?>