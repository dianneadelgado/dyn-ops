document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const hamburger = document.querySelector(".hamburger"); // Match class to your HTML
  const navLinks = document.querySelector(".nav-links");   // Match class to your HTML

  // --- Mobile Navigation ---
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let scrollInterval;

  const speed = 2;
  const interval = 20;

  // --- Consolidated Mouse/Touch Logic ---
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    clearInterval(scrollInterval); // Stop auto-scroll on drag
  });

  const stopScrolling = () => {
    isDown = false;
    slider.classList.remove("active");
    clearInterval(scrollInterval);
  };

  slider.addEventListener("mouseleave", stopScrolling);
  slider.addEventListener("mouseup", stopScrolling);

  slider.addEventListener("mousemove", (e) => {
    // 1. Handle Dragging
    if (isDown) {
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
      return;
    }

    // 2. Handle Auto-scroll Hover Zones
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    clearInterval(scrollInterval);

    if (x < width * 0.2) {
      scrollInterval = setInterval(() => { slider.scrollLeft -= speed; }, interval);
    } else if (x > width * 0.8) {
      scrollInterval = setInterval(() => { slider.scrollLeft += speed; }, interval);
    }
  });

  // --- Mobile Touch ---
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // --- Buttons ---
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      slider.scrollLeft -= (slider.querySelector(".slide").offsetWidth + 16);
    });
    nextBtn.addEventListener("click", () => {
      slider.scrollLeft += (slider.querySelector(".slide").offsetWidth + 16);
    });
  }
});