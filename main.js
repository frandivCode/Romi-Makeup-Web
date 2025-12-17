const modalOverlay = document.getElementById('modal-overlay');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

function openModal(id) {
    const service = services.find(item => item.id === id);

    if (service) {
        modalTitle.innerText = service.title;
        modalDesc.innerText = service.fullDesc
        modalImg.src = service.image;
        modalImg.alt = service.title;

        modalOverlay.style.display = 'flex';
        setTimeout(() => {
            modalOverlay.classList.add('active');
        }, 10);

        document.body.style.overflow = 'hidden';
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
        image: "https://plus.unsplash.com/premium_photo-1661326352695-6cbe1ff74ee9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        title: "Clases de Automaquillaje",
        shortDesc: "Aprende técnicas profesionales para realzar tus mejores rasgos.",
        fullDesc: "Clases personalizadas de 3 horas donde analizamos tu neceser, descartamos productos vencidos y te enseño a usar lo que ya tienes. Aprenderás: preparación de piel, corrección de imperfecciones, visagismo básico y transformación de maquillaje de día a noche.",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        title: "Servicio de Uñas",
        shortDesc: "Soft gel, kapping y esmaltado semipermanente.",
        fullDesc: "Cuidado integral de tus manos. Realizamos manicuría rusa combinada, nivelación de la placa ungueal y esmaltado con productos hipoalergénicos. Diseños a mano alzada y nail art minimalista. Tratamiento de hidratación de cutículas incluido.",
        image: "https://images.unsplash.com/photo-1727468939344-44929b044076?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

const container = document.getElementById('services-container');

function renderServices() {
    const cardsHTML = services.map(service => {
        return `
            <article class="service-card" onclick="openModal(${service.id})">
                <div class="card-image">
                    <img src="${service.image}" alt="${service.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3>${service.title}</h3>
                    <p>${service.shortDesc}</p>
                    
                    <button class="btn-card" onclick="openModal(${service.id})" arial-label="Ver detalles">
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
        // 1. Identificar si el que clickeé ya estaba abierto
        const isAlreadyActive = header.classList.contains('active');

        // 2. CERRAR TODOS (Lógica de "Exclusivo")
        // Recorremos todos los headers para quitarles la clase active y cerrar su contenido
        accordionHeaders.forEach(otherHeader => {
            otherHeader.classList.remove('active');
            otherHeader.nextElementSibling.style.maxHeight = null; // Colapsa el contenido
        });

        // 3. Si el que clickeé NO estaba abierto, lo abrimos ahora
        if (!isAlreadyActive) {
            header.classList.add('active');

            // Truco para animar la altura automáticamente (height: auto no anima)
            const content = header.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});