// Sticky Header (aktif terus saat scroll)
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 🟡 Tambahan di paling bawah (versi final)
document.addEventListener('DOMContentLoaded', () => {
  console.log("Website Mamet Store siap digunakan 🚀");
});
document.addEventListener('DOMContentLoaded', () => {
  console.log("Website Mamet Store siap digunakan 🚀");

  document.addEventListener('DOMContentLoaded', () => {
  console.log("Website Mamet Store siap digunakan 🚀");

  const bgSlides = document.querySelectorAll('.bg-slide');
  let currentSlide = 0;

  function showSlide(index) {
    bgSlides.forEach(slide => slide.classList.remove('active'));
    bgSlides[index].classList.add('active');
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % bgSlides.length;
    showSlide(currentSlide);
  }, 3000); // Ganti tiap 3 detik
});
document.addEventListener('DOMContentLoaded', () => {
  console.log("Website Mamet Store siap digunakan 🚀");

  const bgSlides = document.querySelectorAll('.bg-slide');
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

  // === Manual swipe/drag ===
  let startX = 0;
  let isDragging = false;

  const sliderContainer = document.querySelector('.hero-slider');

  // Touch (HP)
  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
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
    let endX = e.clientX;
    handleSwipe(endX - startX);
  });

  function handleSwipe(deltaX) {
    if (Math.abs(deltaX) > 50) { // threshold
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      resetInterval();
    }
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  }
});
  
