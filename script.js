import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Inisialisasi Supabase
const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'
);

// Elemen
const menu = document.getElementById("menuList");
const usernameBox = document.getElementById("usernameDisplay");

// Render menu dinamis
function renderMenu(user) {
  try {
    if (user) {
      const username =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email ||
        "Pengguna";

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

    // Tambah Event Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        await supabase.auth.signOut();
        alert("Berhasil logout");
        renderMenu(null);
      });
    }

    // Tambah Event Login Google
    const googleLoginBtn = document.getElementById("googleLoginBtn");
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: 'https://aesthetic-crostata-7c8181.netlify.app' // Ganti ke domain deploy kamu
          }
        });
      });
    }
  } catch (error) {
    console.error("Gagal render menu:", error);
    usernameBox.textContent = "";
    menu.innerHTML = `<li style="color:red;">❌ Gagal load menu</li>`;
  }
}

// Load awal setelah redirect Google (pastikan user dikenali)
document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) console.error("Gagal ambil user:", error);
  renderMenu(user);
});

// Pantau perubahan login
supabase.auth.onAuthStateChange((_event, session) => {
  renderMenu(session?.user || null);
});

// Hamburger toggle
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

// Hero slider otomatis
let currentSlide = 0;
const slides = document.querySelectorAll(".bg-slide");
setInterval(() => {
  slides[currentSlide]?.classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide]?.classList.add("active");
}, 3000);
