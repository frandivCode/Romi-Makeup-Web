const modalOverlay = document.getElementById('modal-overlay');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

function openModal(id) {
    const service = services.find(item => item.id === id);

    if (service) {
        modalTitle.innerText = service.title;
        modalDesc.innerText = service.fullDesc;
        modalImg.src = service.image;
        modalImg.alt = service.title;

        modalOverlay.style.display = 'flex';
        setTimeout(() => {
            modalOverlay.classList.add('active');
        }, 10);

        document.body.style.overflow = 'hidden';

        const tituloServicio = service.title;

        const mensajeConsultar = `Hola Romi, quiero consultar disponibilidad para el servicio de ${tituloServicio}.`;
        document.getElementById('modal-wa-consultar').href = `https://wa.me/3549635027?text=${encodeURIComponent(mensajeConsultar)}`;

        const mensajeReservar = `Hola Romi, quiero reservar el servicio de ${tituloServicio}.`;
        document.getElementById('modal-wa-reservar').href = `https://wa.me/3549635027?text=${encodeURIComponent(mensajeReservar)}`;
    }
}

function closeModal() {
    modalOverlay.classList.remove('active');

    setTimeout(() => {
        modalOverlay.style.display = 'none';
    }, 300);

    document.body.style.overflow = 'auto';
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

const services = [
    {
        id: 1,
        title: "Maquillaje Social",
        shortDesc: "Para bodas, graduaciones y eventos especiales.",
        fullDesc: "Servicio completo de maquillaje para eventos. Incluye preparación de la piel (skincare express), pruebas de alergia, aplicación de pestañas postizas y fijación de larga duración (24hs). Utilizamos productos de alta gama (MAC, Dior, Estée Lauder) para asegurar un acabado fotográfico impecable.",
        image: "./img/maquillaje-social.webp"
    },
    {
        id: 2,
        title: "Clases de Automaquillaje",
        shortDesc: "Aprende técnicas profesionales para realzar tus mejores rasgos.",
        fullDesc: "Clases personalizadas de 3 horas donde analizamos tu neceser, descartamos productos vencidos y te enseño a usar lo que ya tienes. Aprenderás: preparación de piel, corrección de imperfecciones, visagismo básico y transformación de maquillaje de día a noche.",
        image: "./img/clases-automaquillaje.webp"
    },
    {
        id: 3,
        title: "Servicio de Uñas",
        shortDesc: "Soft gel, kapping y esmaltado semipermanente.",
        fullDesc: "Cuidado integral de tus manos. Realizamos manicuría rusa combinada, nivelación de la placa ungueal y esmaltado con productos hipoalergénicos. Diseños a mano alzada y nail art minimalista. Tratamiento de hidratación de cutículas incluido.",
        image: "./img/servicio-nails.webp"
    }
];

const container = document.getElementById('services-container');

function renderServices() {
    const cardsHTML = services.map(service => {
        return `
        <article class="service-card">
            <figure class="card-image">
                <img src="${service.image}" alt="Servicio de ${service.title}" loading="lazy" decoding="async">
            </figure>
            <div class="card-content">
                <h3>${service.title}</h3>
                <p>${service.shortDesc}</p>
                <button class="btn-card" onclick="openModal(${service.id})" aria-label="Ver detalles de ${service.title}">
                    Ver detalles
                </button>
            </div>
        </article>
        `;
    }).join('');

    container.innerHTML = cardsHTML;
}

renderServices();

function toggleWhatsappMenu() {
    const menu = document.getElementById('wa-menu');
    menu.classList.toggle('show');
}

window.onclick = function (event) {
    if (!event.target.matches('.btn-solid')) {
        var dropdowns = document.getElementsByClassName("wa-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const gridItems = document.querySelectorAll('.grid-mansonry .grid-img');

let currentIndex = 0;
let imagesList = [];

gridItems.forEach((item, index) => {
    const img = item.querySelector('img');

    if (img) {
        imagesList.push(img.src);
    }

    item.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = imagesList[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex >= imagesList.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = imagesList.length - 1;
    }

    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = imagesList[currentIndex];
        lightboxImg.style.opacity = 1;
    }, 200);
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft') changeImage(-1);
});


const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const isAlreadyActive = header.classList.contains('active');

        accordionHeaders.forEach(otherHeader => {
            otherHeader.classList.remove('active');
            otherHeader.nextElementSibling.style.maxHeight = null;
        });

        if (!isAlreadyActive) {
            header.classList.add('active');
            const content = header.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

function toggleFloatingWA() {
    const menu = document.getElementById('wa-floating-menu');
    menu.classList.toggle('show');

    const isExpanded = menu.classList.contains('show');
    menu.setAttribute('aria-hidden', !isExpanded);
}

document.getElementById('current-year').textContent = new Date().getFullYear();

const btnMenu = document.getElementById('btn-menu');
const navMenu = document.querySelector('nav');
const menuLinks = document.querySelectorAll('.menu-principal a');

function toggleMenu() {
    btnMenu.classList.toggle('activo');
    navMenu.classList.toggle('abierto');

    if (navMenu.classList.contains('abierto')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

btnMenu.addEventListener('click', toggleMenu);

navMenu.addEventListener('click', (e) => {
    if (e.target === navMenu) {
        toggleMenu();
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});