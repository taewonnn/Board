window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("../include/list.php");
    const data = res.json();
    console.log(data);

    // 데이터 그리기
  } catch (error) {
    console.log("fail", error);
  }
});
