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

  let slides = document.querySelectorAll('.slide');
  let currentIndex = 0;
  let interval = setInterval(showNextSlide, 3000); // Ganti tiap 3 detik

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  document.querySelector('.next').addEventListener('click', () => {
    showNextSlide();
    resetInterval();
  });

  document.querySelector('.prev').addEventListener('click', () => {
    showPrevSlide();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(showNextSlide, 3000);
  }
});
