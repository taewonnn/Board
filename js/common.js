// 쿠키값 가져오는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

// 로그인 상태에 따른 버튼(로그인/로그아웃) 설정 함수
function setAuthButtons(authButtonsContainerId) {
  // 쿠키에서 user_id 값을 가져옴
  const userId = getCookie("user_id");
  const authButtons = document.getElementById(authButtonsContainerId);

  // user_id 쿠키가 존재하면 로그아웃 버튼을, 존재하지 않으면 로그인/회원가입 버튼을 보여줌
  if (userId) {
    authButtons.innerHTML = `
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/include/logout.php">로그아웃</a>
            </li>
        `;
  } else {
    authButtons.innerHTML = `
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/pages/login.html">로그인</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/pages/register.html">회원가입</a>
            </li>
        `;
  }
}

// 사용자 인사말 설정 함수
function setGreeting(greetingContainerId) {
  // 쿠키에서 user_name 값을 가져옴
  const username = getCookie("user_name");
  const greetingContainer = document.getElementById(greetingContainerId);

  if (username) {
    greetingContainer.innerText = `Welcome, ${username}!!`;
  } else {
    greetingContainer.innerText = `Welcome! Please log in.`;
  }
}

// 문서 로드 시 실행
// document.addEventListener("DOMContentLoaded", function () {
// authButtons 엘리먼트가 있으면 설정 함수 호출
if (document.getElementById("authButtons")) {
  setAuthButtons("authButtons");
}

// greeting 엘리먼트가 있으면 설정 함수 호출
if (document.getElementById("greeting")) {
  setGreeting("greeting");
}
// });
