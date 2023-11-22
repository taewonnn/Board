// 이미지 미리보기
window.addEventListener('load', () => {
    const imgInput = document.getElementById('image');
    const imgPreview = document.getElementById('imagePreview');

    imgInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            console.log(event.target);
            imgPreview.src = event.target.result;
            imgPreview.style.display = 'block';
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            imgPreview.src = '';
            imgPreview.style.display = 'none';
        }
    });
});
