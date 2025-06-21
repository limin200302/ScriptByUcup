import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'YOUR_PUBLIC_ANON_KEY'
);

const menu = document.getElementById("menuList");
const usernameBox = document.getElementById("usernameDisplay");

// Render menu berdasarkan user login
function renderMenu(user) {
  if (user) {
    const username = user.user_metadata?.full_name || user.email;
    usernameBox.textContent = `👋 ${username}`;
    menu.innerHTML = `
      <li><a href="index.html">🏠 Beranda</a></li>
      <li><a href="tentang.html">📄 Tentang</a></li>
      <li><a href="riwayat.html">📜 Riwayat</a></li>
      <li><a href="#" id="logoutBtn">🚪 Logout</a></li>
    `;
  } else {
    usernameBox.textContent = "";
    menu.innerHTML = `
      <li><a href="index.html">🏠 Beranda</a></li>
      <li><a href="tentang.html">📄 Tentang</a></li>
      <li><a href="#" id="googleLoginBtn">🔐 Login dengan Google</a></li>
    `;
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      alert("Berhasil keluar.");
      renderMenu(null);
    });
  }

  // Login Google
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://aesthetic-crostata-7c8181.netlify.app' // Sesuaikan
        }
      });
    });
  }
}

// Cek saat load
supabase.auth.getUser().then(({ data: { user } }) => {
  renderMenu(user);
});

// Hamburger logic
const hamburger = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("menu-overlay");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.add("show");
  overlay.classList.add("show");
});
closeBtn?.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});
overlay?.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});

// Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".bg-slide");
setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 3000);
