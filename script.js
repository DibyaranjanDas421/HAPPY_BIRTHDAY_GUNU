// Slideshow logic
let index = 0;
const slides = document.querySelectorAll('.slide');

function showSlide() {
  slides.forEach((slide, i) => slide.classList.remove('active'));
  slides[index].classList.add('active');
  index = (index + 1) % slides.length;
}
setInterval(showSlide, 3000);
showSlide();

// Timer from today 12 PM
function updateTimer() {
  const now = new Date();
  const noon = new Date();
  noon.setHours(12, 0, 0, 0);

  // If it's before 12PM, subtract a day
  if (now < noon) noon.setDate(noon.getDate() - 1);

  const diffMs = now - noon;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent =
    `${hours.toString().padStart(2, '0')}h ` +
    `${minutes.toString().padStart(2, '0')}m ` +
    `${seconds.toString().padStart(2, '0')}s`;
}
setInterval(updateTimer, 1000);
updateTimer();

// Confetti burst once
setTimeout(() => {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}, 1000);

// Music autoplay fallback
window.addEventListener('load', function () {
  const audio = document.getElementById('bg-music');
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      document.body.addEventListener('click', () => {
        audio.play();
      }, { once: true });
    });
  }
});
