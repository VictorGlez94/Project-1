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

    const nextBtn = document.createElement("arrows");
    nextBtn.innerHTML = "&#9658;"; // Right arrow symbol
    nextBtn.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    const prevBtn = document.createElement("arrows");
    prevBtn.innerHTML = "&#9668;"; // Left arrow symbol
    prevBtn.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    const containerBtns = document.createElement("contBtns");
    containerBtns.classList.add("contBtnsStyle")
    containerBtns.appendChild(prevBtn);
    containerBtns.appendChild(nextBtn);

    const slider = document.querySelector(".slider");
    slider.appendChild(containerBtns);
});

const blogMessages = ["Ale galán y Juan Lebrón se separan", "Victor es un paquete", 
                        "Hola que tal"]

document.addEventListener("DOMContentLoaded", function () {
    const blogMessages = ["Ale galán y Juan Lebrón se separan", "Victor es un paquete", "Hola que tal"];
    const blogPost = document.querySelectorAll(".blog-post");
    const popup = document.querySelector(".popup");
    console.log(blogPost.length)

    blogPost.forEach(function (ele, i) {
        ele.addEventListener("click", function (event) {
            event.stopPropagation(); // Evitar que el clic se propague al elemento de fondo
            const message = blogMessages[i];
            popup.innerHTML = `
                <div class="popup-content">
                    ${message}
                    <span class="close-btn">&times;</span>
                </div>
            `;
            popup.style.display = "block";
        });
    });

    // Event listener para cerrar la ventana emergente al hacer clic en el botón de cerrar
    popup.addEventListener("click", function (event) {
        if (event.target.classList.contains("close-btn")) {
            popup.style.display = "none";
        }
    });

    // Event listener para cerrar la ventana emergente al hacer clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!popup.contains(event.target) && popup.style.display === "block") {
            popup.style.display = "none";
        }
        
    });
});
