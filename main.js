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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// 3. Contadores Animados
function animateCounter(counterElement) {
    if (!counterElement) return;

    const target = +counterElement.getAttribute('data-target');
    let current = 0;
    const duration = 2000; // Duración total de la animación en ms
    const increment = target / (duration / 10); // Calcular el incremento para que dure la duración
    let startTime = null;

    const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        if (progress < duration) {
            current = Math.ceil((progress / duration) * target);
            if (current > target) current = target;
            counterElement.innerText = current;
            requestAnimationFrame(updateCount);
        } else {
            counterElement.innerText = target; // Asegurar que el número final sea exacto
        }
    };
    
    requestAnimationFrame(updateCount);
}

// Observador específico para estadísticas
const statItems = document.querySelectorAll('.stat-item');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const counterElement = entry.target.querySelector('.counter');
            if (counterElement) {
                animateCounter(counterElement);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

statItems.forEach(item => counterObserver.observe(item));

// 4. Menú Hamburguesa para móviles
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuLinks = document.getElementById('mobileMenuLinks');

function openMobileMenu() {
    if (mobileMenuOverlay && mobileMenuLinks) {
        mobileMenuOverlay.classList.add('active');
        mobileMenuLinks.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita scroll del body
    }
}

function closeMobileMenu() {
    if (mobileMenuOverlay && mobileMenuLinks) {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuLinks.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll
    }
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Cerrar menú al hacer clic en un enlace
const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Cerrar menú al redimensionar a desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// 5. Configuración de Particles.js (Fondo dinámico en Hero)
if (document.getElementById('particles-js')) {
    // Configuración adaptativa según el dispositivo
    const isMobile = window.innerWidth <= 768;
    
    particlesJS('particles-js', {
        "particles": {
            "number": { 
                "value": isMobile ? 40 : 80, 
                "density": { "enable": true, "value_area": isMobile ? 600 : 800 } 
            },
            "color": { "value": "#e31e24" },
            "shape": { "type": "circle" },
            "opacity": { 
                "value": isMobile ? 0.3 : 0.5, 
                "random": false 
            },
            "size": { 
                "value": isMobile ? 2 : 3, 
                "random": true 
            },
            "line_linked": { 
                "enable": true, 
                "distance": isMobile ? 100 : 150, 
                "color": "#e31e24", 
                "opacity": isMobile ? 0.2 : 0.4, 
                "width": 1 
            },
            "move": {
                "enable": true,
                "speed": isMobile ? 3 : 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { 
                    "enable": !isMobile, // Deshabilitar hover en móviles
                    "mode": "grab" 
                },
                "onclick": { 
                    "enable": !isMobile, // Deshabilitar click en móviles
                    "mode": "push" 
                },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// 6. Detectar orientación del dispositivo
function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.body.classList.remove('landscape');
        document.body.classList.add('portrait');
    } else {
        document.body.classList.remove('portrait');
        document.body.classList.add('landscape');
    }
}

window.addEventListener('resize', handleOrientationChange);
handleOrientationChange();

// 7. Ajuste para el mapa (asegurar que el iframe se cargue correctamente)
const mapIframe = document.querySelector('.map-frame iframe');
if (mapIframe) {
    mapIframe.addEventListener('load', function() {
        console.log('Mapa cargado correctamente');
    });
}

// 8. Prevenir zoom en inputs para mejor UX en móviles
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    });
});

// 9. Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 10. Lazy loading para imágenes
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// 11. Detectar y aplicar clases según la capacidad táctil
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
} else {
    document.body.classList.add('no-touch');
}

console.log('🚀 Unión Tlaxcala F.C. - Sitio web cargado correctamente');

// Forzar re-renderizado del plugin de Facebook al cambiar el tamaño de ventana
let windowWidth = window.innerWidth;
window.addEventListener('resize', () => {
    if (window.innerWidth !== windowWidth) {
        windowWidth = window.innerWidth;
        if (typeof FB !== 'undefined') {
            FB.XFBML.parse(); // Esto obliga a Facebook a recalcular el ancho
        }
    }
});