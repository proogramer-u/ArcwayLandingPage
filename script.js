document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll("[data-reveal]");

    if (revealItems.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        revealItems.forEach((item) => observer.observe(item));
    }

    const modal = document.querySelector("[data-modal]");
    const openButtons = document.querySelectorAll("[data-modal-open]");
    const closeButton = document.querySelector("[data-modal-close]");
    const waitlistForm = document.querySelector("[data-waitlist-form]");
    const waitlistSuccess = document.querySelector("[data-waitlist-success]");
    const waitlistIntro = document.querySelector("[data-waitlist-intro]");

    if (!modal || openButtons.length === 0 || !closeButton) return;

    const firstInput = modal.querySelector("input");

    const openModal = () => {
        modal.classList.add("is-open");
        if (waitlistForm && waitlistSuccess && waitlistIntro) {
            waitlistForm.classList.remove("is-hidden");
            waitlistSuccess.classList.add("is-hidden");
            waitlistIntro.classList.remove("is-hidden");
            waitlistForm.reset();
        }
        if (firstInput) firstInput.focus();
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
    };

    openButtons.forEach((button) =>
        button.addEventListener("click", (event) => {
            event.preventDefault();
            openModal();
        })
    );

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    if (waitlistForm && waitlistSuccess && waitlistIntro) {
        waitlistForm.addEventListener("submit", (event) => {
            event.preventDefault();
            waitlistForm.classList.add("is-hidden");
            waitlistSuccess.classList.remove("is-hidden");
            waitlistIntro.classList.add("is-hidden");
        });
    }
});
