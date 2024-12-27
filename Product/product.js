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

showSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

let modal = document.getElementById('myModal');
let modalImg = document.getElementById("img01");