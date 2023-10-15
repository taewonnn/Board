<?php
require_once(__DIR__ . '/../class/ArticleModel.php');

$articleModel = new ArticleModel();

// POST 요청 데이터 읽기
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['article_id']) && isset($data['user_id'])) {
    $article_id = $data['article_id'];
    $user_id = $data['user_id'];

    // 게시글 정보 가져오기
    $article = $articleModel->getArticleById($article_id);

    if ($article && $article['users_id'] == $user_id) {
        // 현재 사용자가 게시글 작성자인 경우에만 삭제 허용
        $delete = $articleModel->deleteArticle($article_id, $user_id);

        if ($delete) {
            // 삭제 성공
            $response = array(
                "status" => "success",
                "message" => "게시글이 성공적으로 삭제되었습니다.",
                "data" => null
            );
            http_response_code(200);
            echo json_encode($response);
        } else {
            // 삭제 실패
            $response = array(
                "status" => "error",
                "message" => "게시글 삭제 중 오류가 발생했습니다.",
                "data" => null
            );
            http_response_code(500);
            echo json_encode($response);
        }
    } else {
        // 권한 없음
        $response = array(
            "status" => "error",
            "message" => "게시글 삭제 권한이 없습니다.",
            "data" => null
        );
        http_response_code(403);
        echo json_encode($response);
    }
} else {
    // 파라미터 누락
    $response = array(
        "status" => "error",
        "message" => "필수 파라미터가 누락되었습니다.",
        "data" => null
    );
    http_response_code(400);
    echo json_encode($response);
}
?>