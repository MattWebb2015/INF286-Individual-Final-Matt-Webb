document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const themeButtons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("theme", mode);
    });
  });

  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const categories = card.dataset.category || "";
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  const contactForm = document.querySelector("#contactForm");
  const formMessage = document.querySelector("#formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      formMessage.classList.remove("success", "error");

      if (!name || !email || !message) {
        formMessage.textContent = "Please complete all fields before sending.";
        formMessage.classList.add("error");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.classList.add("error");
        return;
      }

      formMessage.textContent = "Message looks good. This demo form is ready for a real form service later.";
      formMessage.classList.add("success");
      contactForm.reset();
    });
  }
});
