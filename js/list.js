window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('../include/list.php')
        const { data } = await res.json()

        const container = document.getElementById('articleContainer')

        data.forEach((article) => {
            console.log(article)

            // Card 생성
            const card = document.createElement('div')
            card.className = 'card'
            card.style.width = '18rem'

            // Card Image 생성
            // const img = document.createElement("img");
            // img.className = "card-img-top";
            // img.src = article.image_url ? article.image_url : "";
            // card.appendChild(img);

            // Card Body 생성
            const cardBody = document.createElement('div')
            cardBody.className = 'card-body'

            // Card Title 생성
            const cardTitle = document.createElement('h5')
            cardTitle.className = 'card-title'
            cardTitle.innerHTML = article.title
            cardBody.appendChild(cardTitle)

            // Card Text 생성
            const cardText = document.createElement('p')
            cardText.className = 'card-text'
            cardText.innerHTML = truncateTextByWords(article.content, 3)
            cardBody.appendChild(cardText)

            // Button 추가
            const button = document.createElement('a')
            button.href = `detail.html?id=${article.id}`
            button.className = 'btn btn-primary'
            button.innerHTML = '더보기'
            cardBody.appendChild(button)

            // cardBody를 card에 추가
            card.appendChild(cardBody)

            // card를 container에 추가
            container.appendChild(card)
        })
    } catch (error) {
        console.log('fail', error)
    }
})
