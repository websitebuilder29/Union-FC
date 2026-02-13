// 1. Navbar Dinámica al hacer Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Animación de Aparición al hacer Scroll (Scroll Reveal)
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-top, .reveal-bottom, .stat-item');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Si es un stat-item, iniciar contador
            if (entry.target.classList.contains('stat-item') && !entry.target.dataset.animated) {
                const counterElement = entry.target.querySelector('.counter');
                animateCounter(counterElement);
                entry.target.dataset.animated = 'true'; // Marcar como animado para no repetir
            }
        } else {
            // Opcional: Remover 'active' al salir del viewport si quieres que se repita la animación
            // entry.target.classList.remove('active');
            // Si quieres que el contador se reinicie o no, ajusta aquí
        }
    });
}, { threshold: 0.2 }); // Ajusta el threshold para cuándo se activa la animación

revealElements.forEach(el => observer.observe(el));


// 3. Contadores Animados
function animateCounter(counterElement) {
    if (!counterElement) return;

    const target = +counterElement.getAttribute('data-target');
    let current = 0;
    const duration = 2000; // Duración total de la animación en ms
    const increment = target / (duration / 10); // Calcular el incremento para que dure la duración

    const updateCount = () => {
        if (current < target) {
            current += increment;
            if (current > target) current = target; // Asegurar que no exceda el target
            counterElement.innerText = Math.ceil(current);
            requestAnimationFrame(updateCount); // Mejor para animaciones
        } else {
            counterElement.innerText = target; // Asegurar que el número final sea exacto
        }
    };
    updateCount();
}


// 4. Configuración de Particles.js (Fondo dinámico en Hero)
particlesJS('particles-js', {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#e31e24" }, // Color rojo del equipo
      "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
      "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
      "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
      "line_linked": { "enable": true, "distance": 150, "color": "#e31e24", "opacity": 0.4, "width": 1 },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" }, // Efecto de "agarrar" con el mouse
        "onclick": { "enable": true, "mode": "push" }, // Efecto al hacer clic
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
        "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
        "repulse": { "distance": 200, "duration": 0.4 },
        "push": { "particles_nb": 4 },
        "remove": { "particles_nb": 2 }
      }
    },
    "retina_detect": true
});