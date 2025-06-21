import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Inisialisasi Supabase
const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'
);

// === UI Dinamis berdasarkan login ===
const menu = document.querySelector(".mobile-menu ul");

function renderMenu(user) {
  menu.innerHTML = `
    <li><a href="index.html">🏠 Beranda</a></li>
    <li><a href="tentang.html">📄 Tentang</a></li>
  `;

  if (user) {
    const username = user.user_metadata?.username || user.email;

    menu.innerHTML += `
      <li><a href="#">👋 ${username}</a></li>
      <li><a href="riwayat.html">📜 Riwayat Transaksi</a></li>
      <li><a href="#" id="logoutBtn">🚪 Logout</a></li>
    `;
  } else {
    menu.innerHTML += `
      <li><a href="login.html">🔐 Login</a></li>
      <li><a href="register.html">📝 Daftar</a></li>
    `;
  }
}

// Cek Status Login Saat Halaman Dibuka
supabase.auth.getUser().then(({ data: { user } }) => {
  renderMenu(user);
});

// Logout
document.addEventListener("click", async (e) => {
  if (e.target.id === "logoutBtn") {
    e.preventDefault();
    await supabase.auth.signOut();
    alert("Berhasil keluar.");
    location.reload();
  }
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
