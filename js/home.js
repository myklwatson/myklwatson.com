//* -- SLIDESHOW --*//
function startSlideshow(slideshowSelector, interval = 4000) {
  const slides = document.querySelectorAll(`${slideshowSelector} .slide`);
  if (!slides.length) return;

  let slideIndex = 0;
  slides[slideIndex].classList.add("active");

  setInterval(() => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, interval);
}


//* -- SERVICES TOGGLE --*//
function initServiceToggles() {
  const toggles = document.querySelectorAll('.service-toggle');
  const mobileImage = document.getElementById('mobile-service-image');
  if (!toggles.length) return;

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      // Collapse all others
      toggles.forEach(t => {
        if (t !== toggle) t.querySelector('p').style.display = 'none';
      });
      // Toggle current
      const p = toggle.querySelector('p');
      p.style.display = p.style.display === 'block' ? 'none' : 'block';

      // Update image
      if (mobileImage && toggle.dataset.image) {
        mobileImage.src = toggle.dataset.image;
      }
    });
  });
}


//* -- SCROLL TO TOP --*//
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (!scrollToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


//* -- PRODUCT CAROUSEL --*//
function initProductCarousel() {
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");
  if (!track) return;

  let index = 0;
  let autoSlide;

  function moveCarousel(step) {
    const cards = document.querySelectorAll(".product-card");
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 10; // includes gap
    const totalCards = cards.length;
    const containerWidth = track.parentElement.offsetWidth;
    const visibleCards = Math.floor(containerWidth / cards[0].offsetWidth);

    // --- Disable carousel entirely if all cards fit (desktop) ---
    if (totalCards <= visibleCards) {
      track.style.transform = "translateX(0)";
      if (autoSlide) clearInterval(autoSlide);
      return; // no movement needed
    }

    index += step;

    // --- Loop back to start when reaching the end ---
    if (index > totalCards - visibleCards) {
      index = 0;
    }
    if (index < 0) {
      index = totalCards - visibleCards;
    }

    const offset = index * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextButton?.addEventListener("click", () => moveCarousel(1));
  prevButton?.addEventListener("click", () => moveCarousel(-1));

  // --- Auto-rotate every 5 seconds (mobile only) ---
  function startAutoSlide() {
    const cards = document.querySelectorAll(".product-card");
    const containerWidth = track.parentElement.offsetWidth;
    const visibleCards = Math.floor(containerWidth / cards[0].offsetWidth);

    // only auto-slide if not all are visible
    if (cards.length > visibleCards) {
      autoSlide = setInterval(() => moveCarousel(1), 5000);
    }
  }

  startAutoSlide();

  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", startAutoSlide);
}

//* -- INITIALISE ALL --*//
document.addEventListener("DOMContentLoaded", () => {
  startSlideshow(".slideshow", 4000);
  initServiceToggles();
  initScrollToTop();
  initProductCarousel();
});