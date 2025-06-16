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
