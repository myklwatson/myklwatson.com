document.addEventListener("DOMContentLoaded", function() {
  const track = document.querySelector(".about-display .display-track");
  let cards = Array.from(track.children);
  const nextButton = document.querySelector(".about-display .display-btn.next");
  const prevButton = document.querySelector(".about-display .display-btn.prev");

  let cardWidth = cards[0].getBoundingClientRect().width;
  let cardIndex = 0;
  let isTransitioning = false;

  // Duplicate all cards once for seamless infinite loop
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  cards = Array.from(track.children);

  // Set initial position
  track.style.transform = `translateX(0px)`;

  // Move to card at index
  function moveToIndex(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  // Reset track after reaching duplicates
  track.addEventListener("transitionend", () => {
    isTransitioning = false;

    // Forward wrap
    if (cardIndex >= cards.length / 2) {
      track.style.transition = "none";
      cardIndex = cardIndex - cards.length / 2;
      track.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
    }

    // Backward wrap
    if (cardIndex < 0) {
      track.style.transition = "none";
      cardIndex = cardIndex + cards.length / 2;
      track.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
    }
  });

  // Button navigation
  nextButton.addEventListener("click", () => {
    cardIndex++;
    moveToIndex(cardIndex);
    resetAutoScroll();
  });

  prevButton.addEventListener("click", () => {
    cardIndex--;
    moveToIndex(cardIndex);
    resetAutoScroll();
  });

  // Auto-scroll
  let autoScroll = setInterval(() => {
    cardIndex++;
    moveToIndex(cardIndex);
  }, 4000);

  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
      cardIndex++;
      moveToIndex(cardIndex);
    }, 4000);
  }

  // Update card width on window resize
  window.addEventListener("resize", () => {
    cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
  });
});
