// Confetti Animation
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confetti = Array.from({ length: 120 }).map(() => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 6 + 4,
  d: Math.random() * 40,
  color: ["#ffeb3b", "#e91e63", "#4caf50"][Math.floor(Math.random() * 3)],
  tilt: Math.random() * 10 - 10,
}));

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((p) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((p) => {
    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.x += Math.sin(p.d);
    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}

setInterval(drawConfetti, 20);

// Video Carousel Logic
(function () {
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const items = Array.from(track.children);
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  // Initialize carousel
  updateCarousel();
})();

// Photo Carousel Logic
(function () {
  const photoTrack = document.querySelector(".photo-carousel .carousel-track");
  const photoPrevButton = document.querySelector(".photo-carousel .carousel-control.prev");
  const photoNextButton = document.querySelector(".photo-carousel .carousel-control.next");
  const photoItems = Array.from(photoTrack.children);
  let photoIndex = 0;

  function updatePhotoCarousel() {
    const slideWidth = photoItems[0].getBoundingClientRect().width;
    photoTrack.style.transform = `translateX(-${slideWidth * photoIndex}px)`;
  }

  photoPrevButton.addEventListener("click", () => {
    photoIndex = photoIndex > 0 ? photoIndex - 1 : photoItems.length - 1;
    updatePhotoCarousel();
  });

  photoNextButton.addEventListener("click", () => {
    photoIndex = photoIndex < photoItems.length - 1 ? photoIndex + 1 : 0;
    updatePhotoCarousel();
  });

  window.addEventListener("resize", updatePhotoCarousel);

  // Initialize carousel
  updatePhotoCarousel();
})();