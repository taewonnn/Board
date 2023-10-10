fetch("../module/navBar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;

    // // authButtons 엘리먼트가 있으면 설정 함수 호출
    if (document.getElementById("authButtons")) {
      setAuthButtons("authButtons");
    } else null;

    // // greeting 엘리먼트가 있으면 설정 함수 호출
    if (document.getElementById("greeting")) {
      setGreeting("greeting");
    } else null;
  })
  .catch((err) => console.error(err));
