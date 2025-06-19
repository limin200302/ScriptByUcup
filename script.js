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
