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