import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...<potong token kamu>' // Gantilah dengan public anon key dari Supabase
);

// Elemen penting
const menu = document.getElementById("menuList");
const usernameBox = document.getElementById("usernameDisplay");

// Render menu
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
      alert("Berhasil logout");
      location.reload();
    });
  }

  // Google Login
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://aesthetic-crostata-7c8181.netlify.app' // Ganti ke domain kamu
        }
      });
    });
  }
}

// Cek user saat load
supabase.auth.getUser().then(({ data: { user } }) => {
  renderMenu(user);
});

// Hamburger
document.getElementById("hamburgerBtn")?.addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.add("show");
  document.getElementById("menu-overlay").classList.add("show");
});

document.getElementById("closeMenu")?.addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.remove("show");
  document.getElementById("menu-overlay").classList.remove("show");
});

document.getElementById("menu-overlay")?.addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.remove("show");
  document.getElementById("menu-overlay").classList.remove("show");
});


// Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".bg-slide");
setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 3000);
