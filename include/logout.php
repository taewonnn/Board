<?php
    setcookie("user_id", "", time()-3600, "/");
    setcookie("user_name", "", time()-3600, "/");
    header("Location: ../index.html");
?>