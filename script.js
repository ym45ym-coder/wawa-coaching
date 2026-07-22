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

const siteHeader = document.querySelector(".site-header");
let lastScrollY = window.scrollY;
let ticking = false;

function updateMobileHeader() {
    if (!siteHeader) return;

    const currentScrollY = window.scrollY;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const delta = currentScrollY - lastScrollY;

    if (!isMobile || currentScrollY < 40) {
        siteHeader.classList.remove("header-hidden");
        lastScrollY = currentScrollY;
        ticking = false;
        return;
    }

    if (delta > 8) {
        siteHeader.classList.add("header-hidden");
    } else if (delta < -8) {
        siteHeader.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateMobileHeader);
}, { passive: true });

window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 900px)").matches) {
        siteHeader?.classList.remove("header-hidden");
    }
    lastScrollY = window.scrollY;
});
