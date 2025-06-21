// === Supabase Init ===
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://etfbdevjytilaykogzwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'; // Ganti dengan API key terbaru kalau perlu
const supabase = createClient(supabaseUrl, supabaseKey);

// === DOM Reference ===
const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeMenuBtn = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("menu-overlay");

// === Hamburger Menu Toggle ===
hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.add("show");
  overlay.classList.add("show");
});
closeMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});
overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});

// === Update UI Auth Status ===
async function updateAuthUI() {
  const { data: { session } } = await supabase.auth.getSession();
  const menu = document.querySelector(".mobile-menu ul");

  // Bersihkan menu lama
  menu.innerHTML = "";

  // Hapus greeting lama jika ada
  const prevGreeting = document.getElementById("greeting");
  if (prevGreeting) prevGreeting.remove();

  if (session?.user) {
    const user = session.user;
    const username = user.user_metadata?.username || user.email;

    // Tambahkan greeting
    const greeting = document.createElement("div");
    greeting.id = "greeting";
    greeting.textContent = `Halo, ${username} 👋`;
    greeting.style.cssText = "text-align:center; margin: 1rem 0; font-weight:bold; color: #ffcc00;";
    document.body.prepend(greeting);

    // Isi menu untuk user login
    menu.innerHTML = `
      <li><a href="index.html">🏠 Beranda</a></li>
      <li><a href="tentang.html">📄 Tentang</a></li>
      <li><a href="#" id="logoutBtn">🚪 Logout</a></li>
    `;
  } else {
    // Isi menu untuk user belum login
    menu.innerHTML = `
      <li><a href="index.html">🏠 Beranda</a></li>
      <li><a href="tentang.html">📄 Tentang</a></li>
      <li><a href="login.html">🔐 Login</a></li>
      <li><a href="register.html">📝 Daftar</a></li>
    `;
  }
}

// === Logout Handler ===
document.addEventListener("click", async (e) => {
  if (e.target.id === "logoutBtn") {
    e.preventDefault();
    await supabase.auth.signOut();
    alert("Berhasil logout.");
    updateAuthUI(); // Update UI setelah logout
  }
});

// === Inisialisasi Saat Load ===
updateAuthUI();

// === (Optional) Auto-rotate Slider ===
// Jika kamu punya slider otomatis di hero-section
const slides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 4000); // ganti slide setiap 4 detik
