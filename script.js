// Sticky Header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Hero Slider
  const bgSlides = document.querySelectorAll('.bg-slide');
  const sliderContainer = document.querySelector('.hero-slider');
  let currentSlide = 0;
  let interval;

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

  showSlide(currentSlide);
  interval = setInterval(nextSlide, 3000);

  // Swipe support
  let startX = 0;
  let isDragging = false;

  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
  });

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

  // === Hamburger Menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeBtn = document.getElementById('closeMenu');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');

  hamburgerBtn.addEventListener('click', () => {
    menu.classList.add('show');
    overlay.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('show');
    overlay.classList.remove('show');
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('show');
    overlay.classList.remove('show');
  });
});
