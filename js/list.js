window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("../include/list.php");
    const data = await res.json();

    const container = document.getElementById("article-container");

    data.forEach((article) => {
      // Card 생성
      const card = document.createElement("div");
      card.className = "card";
      card.style.width = "18rem";

      // 이미지
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = ""; // 이 부분을 article의 이미지 URL로 변경
      img.alt = "";
      card.appendChild(img);

      // Card Body 생성
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      // Card Title 생성
      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = article.title;
      cardBody.appendChild(cardTitle);

      // Card Text 생성
      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = article.content;
      cardBody.appendChild(cardText);

      // Button 추가
      const button = document.createElement("a");
      button.href = "#";
      button.className = "btn btn-primary";
      button.textContent = "더보기";
      cardBody.appendChild(button);

      // cardBody를 card에 추가
      card.appendChild(cardBody);

      // card를 container에 추가
      container.appendChild(card);
    });
  } catch (error) {
    console.log("fail", error);
  }
});
