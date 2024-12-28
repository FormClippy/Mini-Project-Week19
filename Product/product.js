let slideIndex = 1;

function showSlides(n) {

    const slides = document.getElementsByClassName('banner-wrapper')
    
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "flex";

}

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}




let productDesc = document.getElementsByClassName('all-grid-item-desc');
let productBtn = document.getElementsByClassName('all-grid-item-btn');
let productClose = document.getElementsByClassName('all-grid-item-desc-x');

for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', function () {
        productDesc[i].style.display = 'block';
    
        productDesc[i].classList.add('popup'); // เพิ่ม class "show"
    });
}

for (let i = 0; i < productClose.length; i++) {
    productClose[i].addEventListener('click', function () {
        productDesc[i].style.display = 'none';
    });
}



