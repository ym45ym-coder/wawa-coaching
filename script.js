const slides = Array.from(document.querySelectorAll(".special-slide"));
const prevButton = document.querySelector(".slider-arrow.prev");
const nextButton = document.querySelector(".slider-arrow.next");
const sliderCard = document.querySelector(".special-card");

let currentSlide = 0;
let swipeStartX = 0;
let swipeStartY = 0;

function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentSlide);
    });
}

prevButton?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

nextButton?.addEventListener("click", () => {
    showSlide(currentSlide + 1);
});

sliderCard?.addEventListener("pointerdown", (event) => {
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
});

sliderCard?.addEventListener("pointerup", (event) => {
    const diffX = event.clientX - swipeStartX;
    const diffY = event.clientY - swipeStartY;

    if (Math.abs(diffX) < 45 || Math.abs(diffX) < Math.abs(diffY)) return;

    if (diffX < 0) {
        showSlide(currentSlide + 1);
    } else {
        showSlide(currentSlide - 1);
    }
});
