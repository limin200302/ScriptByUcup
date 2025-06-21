import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Inisialisasi Supabase
const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'
);

// === UI Dinamis berdasarkan login ===
const menu = document.querySelector(".mobile-menu ul");
const usernameBox = document.getElementById("usernameDisplay");

function renderMenu(user) {
  if (user) {
    const username = user.user_metadata?.username || user.email;
    usernameBox.innerText = `👋 ${username}`;
    menu.innerHTML = `
      <li><a href="index.html">🏠 Beranda</a></li>
      <li><a href="tentang.html">📄 Tentang</a></li>
      <li><a href="riwayat.html">📜 Riwayat Transaksi</a></li>
      <li><a href="#" id="logoutBtn">🚪 Logout</a></li>
    `;
  } else {
    usernameBox.innerText = "";
    menu.innerHTML = `
      <li><a href="index.html">🏠 Beranda</a></li>
      <li><a href="tentang.html">📄 Tentang</a></li>
      <li><a href="login.html">🔐 Login</a></li>
      <li><a href="register.html">📝 Daftar</a></li>
    `;
  }

  // Tambah event listener logout kalau ada
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      alert("Berhasil keluar.");
      renderMenu(null);
    });
  }
}

// Cek status login saat halaman dibuka
supabase.auth.getUser().then(({ data: { user } }) => {
  renderMenu(user);
});

// === Hamburger Menu ===
const hamburger = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("menu-overlay");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("show");
  overlay.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});
overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});

// === Slider Hero Otomatis ===
let currentSlide = 0;
const slides = document.querySelectorAll(".bg-slide");
setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 4000);
