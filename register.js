import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase Config
const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'
);

// Elemen DOM
const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const suggestionText = document.getElementById("usernameSuggestion");

// Show/Hide Password
document.querySelectorAll(".toggle-password").forEach(button => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      button.textContent = "🙈";
    } else {
      input.type = "password";
      button.textContent = "👁";
    }
  });
});

// Cek Username Tersedia
username.addEventListener("input", async () => {
  const uname = username.value.trim().toLowerCase();
  if (uname.length < 3) return suggestionText.textContent = "";

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', uname);

  if (data && data.length > 0) {
    suggestionText.textContent = `Nama sudah dipakai. Coba: ${uname}${Math.floor(Math.random() * 900 + 100)}`;
  } else {
    suggestionText.textContent = "";
  }
});

// Submit Form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const uname = username.value.trim().toLowerCase();
  const userEmail = email.value.trim();
  const userPass = password.value;

  // Validasi Form
  if (!uname || !userEmail || !userPass) {
    return errorMsg.textContent = "Semua kolom wajib diisi!";
  }

  try {
    // Daftar ke Auth Supabase
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPass,
      options: {
        emailRedirectTo: "https://aesthetic-crostata-7c8181.netlify.app/login.html",
        data: { username: uname }
      }
    });

    if (error) {
      errorMsg.textContent = "❌ " + error.message;
      return;
    }

    // Simpan ke tabel `users`
    await supabase.from('users').insert({
      id: data.user.id,
      username: uname,
      email: userEmail,
      created_at: new Date()
    });

    alert("📧 Link konfirmasi telah dikirim ke email kamu.\nSilakan klik link verifikasi sebelum login.");
    form.reset();

  } catch (err) {
    errorMsg.textContent = "Terjadi kesalahan saat registrasi.";
  }
});
