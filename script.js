// Import Supabase (harus pakai <script type="module"> di index.html)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'
);

// === Sticky Header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  // === Hero Slider
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

  // === Swipe Support
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

  // === Cek Login User
  const { data: { user } } = await supabase.auth.getUser();
  const menuList = document.querySelector(".mobile-menu ul");

  if (user) {
    // Tambahkan sapaan
    const greeting = document.createElement("div");
    greeting.textContent = `Halo, ${user.user_metadata?.username || user.email} 👋`;
    greeting.style.cssText = "text-align:center; margin: 1rem 0; font-weight:bold; color: #ffcc00;";
    document.body.prepend(greeting);

    // Tambah menu Riwayat
    const riwayat = document.createElement("li");
    riwayat.innerHTML = `<a href="history.html">📋 Riwayat</a>`;
    menuList.appendChild(riwayat);

    // Tambah tombol Logout
    const logout = document.createElement("li");
    logout.innerHTML = `<a href="#" id="logoutBtn">🚪 Logout</a>`;
    menuList.appendChild(logout);

    // Sembunyikan Login & Daftar
    menuList.querySelectorAll("li").forEach((li) => {
      const link = li.querySelector("a")?.getAttribute("href");
      if (link === "login.html" || link === "register.html") li.remove();
    });

    // Logout action
    document.getElementById("logoutBtn").addEventListener("click", async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      location.reload();
    });
  }
});
