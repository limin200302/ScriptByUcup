// Sticky Header (aktif terus saat scroll)
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === FINAL: Background Hero Slider (auto + swipe)
document.addEventListener('DOMContentLoaded', () => {
  console.log("Website Mamet Store siap digunakan 🚀");

  const bgSlides = document.querySelectorAll('.bg-slide');
  const sliderContainer = document.querySelector('.hero-slider');
  let currentSlide = 0;
  let interval = setInterval(nextSlide, 3000);

  function showSlide(index) {
    bgSlides.forEach(slide => slide.classList.remove('active'));
    bgSlides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % bgSlides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + bgSlides.length) % bgSlides.length;
    showSlide(currentSlide);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  }

  // === Swipe / Drag support
  let startX = 0;
  let isDragging = false;

  // Touch (HP)
  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
  });

  // Mouse (desktop)
  sliderContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  sliderContainer.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.clientX;
    handleSwipe(endX - startX);
  });

  function handleSwipe(deltaX) {
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      resetInterval();
    }
  }

  // Tampilkan slide pertama
  showSlide(currentSlide);
});
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('show');
}
