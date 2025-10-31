document.addEventListener("DOMContentLoaded", function() {

  const track = document.querySelector(".about-display .display-track");
  let cards = Array.from(track.children);
  const nextButton = document.querySelector(".about-display .display-btn.next");
  const prevButton = document.querySelector(".about-display .display-btn.prev");

  let cardWidth = cards[0].getBoundingClientRect().width;
  let cardIndex = 0;
  let isTransitioning = false;

  // Clone first and last cards for seamless looping
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, cards[0]);

  cards = Array.from(track.children); // update card list
  cardIndex = 1; // start at first real card

  // Set initial position
  track.style.transform = `translateX(-${cardWidth * cardIndex}px)`;

  // Function to move track
  function moveToIndex(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  // Handle transition end for looping
  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    if (cards[cardIndex] === firstClone) {
      track.style.transition = "none";
      cardIndex = 1;
      track.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
    }
    if (cards[cardIndex] === lastClone) {
      track.style.transition = "none";
      cardIndex = cards.length - 2;
      track.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
    }
  });

  // Next button
  nextButton.addEventListener("click", () => {
    cardIndex++;
    moveToIndex(cardIndex);
  });

  // Previous button
  prevButton.addEventListener("click", () => {
    cardIndex--;
    moveToIndex(cardIndex);
  });

  // Auto-scroll
  setInterval(() => {
    cardIndex++;
    moveToIndex(cardIndex);
  }, 4000);

  // Update card width on resize
  window.addEventListener("resize", () => {
    cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth * cardIndex}px)`;
  });
  
track.addEventListener("mouseenter", () => clearInterval(autoScroll));
track.addEventListener("mouseleave", () => startAutoScroll());
});