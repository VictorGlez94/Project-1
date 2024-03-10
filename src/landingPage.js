document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    }

    showSlide(currentSlide);

    const nextBtn = document.createElement("span");
    nextBtn.innerHTML = "&#9658;"; // Right arrow symbol
    nextBtn.classList.add("arrow", "next");
    nextBtn.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    const prevBtn = document.createElement("span");
    prevBtn.innerHTML = "&#9668;"; // Left arrow symbol
    prevBtn.classList.add("arrow", "prev");
    prevBtn.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    const slider = document.querySelector(".slider");
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);
});
