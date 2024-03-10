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



const noticiaPadel1 = `
¡Noticia de Última Hora!<br><br>
        Juan Lebrón y Alejandro Galán, dos de los jugadores más destacados en el mundo del pádel, han tomado la decisión de separarse tras muchos años de asociación en las pistas. Esta sorprendente noticia ha conmocionado a la comunidad del pádel, ya que la pareja ha sido reconocida como una de las más exitosas en la historia de este deporte.<br><br>
        Lebrón y Galán, conocidos por su impecable coordinación y juego en equipo, han cosechado innumerables éxitos juntos, incluidos múltiples títulos de campeonatos nacionales e internacionales. Su extraordinaria habilidad en la cancha los ha llevado a lo más alto del ranking mundial y los ha convertido en referentes indiscutibles en el mundo del pádel.<br><br>
        Sin embargo, a pesar de su impresionante historial de victorias y logros compartidos, ambos jugadores han decidido tomar caminos separados en sus carreras deportivas. Aunque las razones detrás de esta separación no han sido reveladas públicamente, se especula que podría deberse a diferencias en la estrategia de juego o en los objetivos personales de cada uno.<br><br>
        Esta noticia marca el fin de una era en el pádel profesional y deja a los seguidores del deporte con muchas incógnitas sobre el futuro de ambos jugadores. Los aficionados lamentan el final de una asociación que ha dejado una huella imborrable en la historia del pádel y esperan con interés ver cómo se desenvuelven Lebrón y Galán en sus nuevos caminos por separado.<br><br>
        ¡Permanece atento a las próximas actualizaciones sobre esta sorprendente separación y sus implicaciones en el emocionante mundo del pádel!
`;
const noticiaPadel2=`
Entrenamientos Virtuales<br><br>
        En una era marcada por la tecnología, el mundo del pádel no se queda atrás. Una nueva tendencia está emergiendo en la comunidad de jugadores de pádel: los entrenamientos virtuales. Con la creciente popularidad de las plataformas de videoconferencia y el acceso a tecnologías de seguimiento de movimiento, los jugadores ahora pueden mejorar su juego desde la comodidad de sus hogares.<br><br>
        Los entrenamientos virtuales ofrecen una variedad de ventajas, desde la conveniencia de ajustar el horario de entrenamiento según las necesidades personales hasta la posibilidad de recibir instrucción personalizada de entrenadores de élite en cualquier parte del mundo. Además, estas sesiones permiten a los jugadores analizar su técnica de juego con mayor detalle, gracias a herramientas de reproducción de video y retroalimentación en tiempo real.<br><br>
        Esta innovadora forma de entrenamiento está ganando rápidamente popularidad entre jugadores de todos los niveles, desde principiantes hasta profesionales. Los clubes de pádel y academias están adaptando sus programas de entrenamiento para incluir sesiones virtuales, y muchos jugadores están descubriendo que esta modalidad les brinda una nueva perspectiva y enfoque para mejorar su rendimiento en la cancha.<br><br>
        Si bien los entrenamientos virtuales pueden no reemplazar completamente la experiencia de jugar en una pista real, representan un paso emocionante hacia adelante en la evolución del pádel como deporte. ¡Prepárate para ver más jugadores adoptando esta tecnología y llevando su juego al siguiente nivel!
`
const noticiaPadel3 = `
Descubre a Teresa Pérez Alonso: La Nueva Promesa del Pádel Femenino<br><br>
        El mundo del pádel femenino tiene una nueva estrella en ascenso: Teresa Pérez Alonso, una joven de Cruz del Señor, Tenerife, que está cautivando a todos con su talento y dedicación. A pesar de su corta edad, Teresa ha demostrado una progresión impresionante en el mundo del pádel, destacando por su habilidad en la cancha y su enfoque determinado en cada partido.<br><br>
        Desde sus primeros pasos en el pádel, Teresa ha mostrado un potencial excepcional, captando la atención de entrenadores y aficionados por igual. Su precoz trayectoria ha estado marcada por una serie de victorias y destacadas actuaciones en torneos locales y regionales, donde ha dejado una impresión duradera con su estilo de juego agresivo y su capacidad para adaptarse a cualquier situación en la cancha.<br><br>
        A pesar de su juventud, Teresa Pérez Alonso está decidida a alcanzar nuevas alturas en el mundo del pádel femenino. Con un entrenamiento riguroso y el apoyo de su familia y equipo, se está preparando para competir en el escenario nacional e internacional, donde espera dejar su marca como una de las mejores jugadoras del circuito.<br><br>
        La comunidad del pádel está emocionada por ver el ascenso de esta joven promesa y anticipa con entusiasmo su brillante futuro en el deporte. ¡Mantente atento a Teresa Pérez Alonso, porque esta estrella en ascenso está lista para brillar aún más en el mundo del pádel femenino!
`
const blogMessages = [noticiaPadel1, noticiaPadel2, 
                        noticiaPadel3]

document.addEventListener("DOMContentLoaded", function () {
    const blogPost = document.querySelectorAll(".blog-post");
    const popup = document.querySelector(".popup");
    console.log(blogPost.length)

    blogPost.forEach(function (ele, i) {
        ele.addEventListener("click", function (event) {
            event.stopPropagation(); // Evitar que el clic se propague al elemento de fondo
            const message = blogMessages[i];
            popup.innerHTML = `
                <div class="popup-content">
                    <p>${message}</p>
                    <span class="close-btn">&times;</span>
                </div>
            `;
            popup.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    // Event listener para cerrar la ventana emergente al hacer clic en el botón de cerrar
    popup.addEventListener("click", function (event) {
        if (event.target.classList.contains("close-btn")) {
            popup.style.display = "none";
            document.body.style.overflow = "";

        }
    });

    // Event listener para cerrar la ventana emergente al hacer clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!popup.contains(event.target) && popup.style.display === "block") {
            popup.style.display = "none";
            document.body.style.overflow = "";

        }
        
    });
});
