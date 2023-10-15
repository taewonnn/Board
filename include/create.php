<?php
require_once(__DIR__ . '/../class/ArticleModel.php');
require_once(__DIR__ . '/../class/ImageUploader.php');
require_once(__DIR__ . '/../class/ApiResponse.php');

// header("Content-Type: application/json; charset=UTF-8");

// $response = ["success" => false, "message" => "실패"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $image = $_FILES['image'] ?? null;
    $image_url = null;

    // 쿠키 - users_id 검증
    $users_id = $_COOKIE['user_id'] ?? null;
    if (!$users_id) {
        $response = new ApiResponse("error", "사용자 인증에 실패했습니다.", null);
        
        exit;
    }

    // 입력 데이터 유효성 검증
    if (empty($name) || empty($title) || empty($content)) {
        $response = new ApiResponse("error", "제목과 내용을 입력해주세요", null);
        exit;
    }

    try {
        // 이미지가 제출되었을 경우만 이미지 업로드 로직을 실행
        if ($image && $image['size'] > 0) {
            $uploadDir = "/images";
            $imageUploader = new ImageUploader($uploadDir);
            $image_url = $imageUploader->uploadImage($image);
            
            if (!$image_url) {
                $response = new ApiResponse("error", "이미지 업로드 실패", null);
                exit;
            }
        }

        // 게시글 작성 쿼리 실행
        $articleModel = new ArticleModel();
        // 줄바꿈 적용
        $content = nl2br($content);
        $createArticle = $articleModel->createArticle($users_id, $title, $content, $image_url);

        if ($createArticle) {
            $response = new ApiResponse("success", "게시글 작성 성공", null);
        } else {
            $response = new ApiResponse("error", "게시글 작성 실패", null);
        }

    } catch (Exception $e) {
        $response = new ApiResponse("error", $e->getMessage(), null);
    } catch (Error $e) {
        $response = new ApiResponse("error", $e->getMessage(), null);
    } finally {
        // ❗️ 여기서 $response json으로 무조건 반환??
        exit; 
    }
}
?>