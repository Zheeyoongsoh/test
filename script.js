// luvto gelato website interactions
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // Menu category filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const flavourCards = document.querySelectorAll(".flavour-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("active", item === button));

      flavourCards.forEach(card => {
        const shouldShow = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  // Reveal content as it enters the viewport; graceful fallback if unsupported.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Keep footer year current.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Replace these with your real contact links before publishing.
  // Example: https://wa.me/60123456789
  const instagramUrl = "https://www.instagram.com/";
  const whatsappUrl = "https://wa.me/";
  document.querySelector('.visit-actions a[href^="https://www.instagram.com/"]').href = instagramUrl;
  document.getElementById("whatsappLink").href = whatsappUrl;
});
