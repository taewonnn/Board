<?php

    class ImageUploader {
        private $uploadDir;

        public function __construct($uploadDir)
        {
            $this->uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/images/';
        }

        public function uploadImage($image)
        {
            // 업로드된 파일의 이름, 임시 이름 지정
            $file_name = $image['name'];
            $file_tmp_name = $image['tmp_name'];

            // 확인용
            // var_dump('경로 추가'. $this->uploadDir );

            // 파일 확장자 검사
            if (!empty($file_name)) {
                $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);
                $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'avif'];

                if (!in_array($file_extension, $allowed_extensions)) {
                    throw new Exception('허용되지 않은 파일 확장자입니다.');
                }
            }

            // 파일 이동
            if (move_uploaded_file($file_tmp_name, $this->uploadDir . $file_name)) {
                return "/images/" . $file_name;
            } else {
                throw new Exception('파일 업로드에 실패했습니다.');
            }
        }
    }
?>