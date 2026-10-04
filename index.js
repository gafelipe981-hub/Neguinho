
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const navLinks = navigation.querySelectorAll("a");
    const filterButtons = document.querySelectorAll(".filter-button");
    const juiceCards = document.querySelectorAll(".juice-card");
    const currentYear = document.getElementById("currentYear");

    // Atualiza automaticamente o ano do rodapé.
    currentYear.textContent = new Date().getFullYear();

    // MENU RESPONSIVO
    function closeMenu() {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        document.body.classList.remove("menu-open");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Abrir menu" : "Fechar menu"
        );

        navigation.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (
            navigation.classList.contains("open") &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });

    // FILTRO DO CARDÁPIO
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            juiceCards.forEach((card) => {
                const categories = (card.dataset.category || "").split(" ");
                const shouldShow =
                    selectedFilter === "todos" ||
                    categories.includes(selectedFilter);

                card.classList.toggle("is-hidden", !shouldShow);
            });
        });
    });

    // ANIMAÇÕES DE ENTRADA
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealElements = document.querySelectorAll(
        ".intro, .section-heading, .juice-card, .manifesto-content, " +
        ".benefit-item, .contact-card"
    );

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add("reveal");
        });

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    }

    // WHATSAPP
    // IMPORTANTE: substitua o número de exemplo pelo WhatsApp real da marca.
    // Formato internacional: código do país + DDD + número, somente dígitos.
    const whatsappNumber = "5511959679526";

    const whatsappLinks = [
        {
            element: document.getElementById("whatsappContact"),
            message:
                "Olá! Gostaria de saber mais sobre os sucos da Bee Flower."
        },
        {
            element: document.getElementById("whatsappFloating"),
            message:
                "Olá! Gostaria de saber mais sobre a Bee Flower."
        }
    ];

    whatsappLinks.forEach(({ element, message }) => {
        if (!element) return;

        element.href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        element.target = "_blank";
        element.rel = "noopener noreferrer";
    });

    // FALLBACK PARA IMAGENS QUE NÃO CARREGAREM
    document.querySelectorAll(".juice-image-wrap img, .hero-image").forEach((img) => {
        img.addEventListener("error", () => {
            img.style.visibility = "hidden";
            img.parentElement.style.background =
                "linear-gradient(135deg, #E7EDDF, #F3E9D0)";
        });
    });
});