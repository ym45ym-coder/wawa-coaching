const slides = Array.from(document.querySelectorAll(".special-slide"));
const prevButton = document.querySelector(".slider-arrow.prev");
const nextButton = document.querySelector(".slider-arrow.next");
const sliderCard = document.querySelector(".special-card");
const dots = Array.from(document.querySelectorAll(".slider-dot"));

let currentSlide = 0;
let swipeStartX = 0;
let swipeStartY = 0;

function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentSlide);
    });
    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentSlide);
    });
}

prevButton?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

nextButton?.addEventListener("click", () => {
    showSlide(currentSlide + 1);
});

dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
        showSlide(dotIndex);
    });
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
