console.log("Portfolio chargé !");

// =========================
// Modales (généralisé)
// =========================

document.querySelectorAll("[data-modal-target]").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById(btn.dataset.modalTarget).classList.add("open");
    });
});

document.querySelectorAll(".modal .close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal").classList.remove("open");
    });
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
    });
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal.open").forEach(m => m.classList.remove("open"));
    }
});

// =========================
// Galeries (généralisé)
// =========================

function initGallery(galleryClass, previewSelector, prevSelector, nextSelector) {
    const images = document.querySelectorAll(galleryClass + " img");
    const preview = document.querySelector(previewSelector);
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);
    if (!images.length) return;

    let current = 0;

    function update(index) {
        current = index;
        preview.src = images[index].src;
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    images.forEach((img, index) => img.addEventListener("click", () => update(index)));
    nextBtn.addEventListener("click", () => update((current + 1) % images.length));
    prevBtn.addEventListener("click", () => update((current - 1 + images.length) % images.length));

    update(0);
}

initGallery(".site-gallery", "#site-preview", ".prev-site", ".next-site");
initGallery(".press-gallery", "#press-preview", ".prev-press", ".next-press");
initGallery(".painting-gallery", "#painting-preview", ".prev-painting", ".next-painting");
initGallery(".mazeiko-gallery", "#mazeiko-preview", ".prev-mazeiko", ".next-mazeiko");

// =========================
// Formulaire de contact
// =========================

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: data,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            formStatus.textContent = "Merci ! Votre message a bien été envoyé.";
            formStatus.classList.remove("error");
            formStatus.classList.add("success");
            contactForm.reset();
        } else {
            formStatus.textContent = "Une erreur est survenue, réessaie plus tard.";
            formStatus.classList.remove("success");
            formStatus.classList.add("error");
        }
    } catch (error) {
        formStatus.textContent = "Une erreur est survenue, réessaie plus tard.";
        formStatus.classList.remove("success");
        formStatus.classList.add("error");
    }
});