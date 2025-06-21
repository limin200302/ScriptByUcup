import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://etfbdevjytilaykogzwa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // gunakan API key lengkap di file asli
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

// === Show/Hide Password
document.querySelector(".toggle-password").addEventListener("click", () => {
  const input = passwordInput;
  if (input.type === "password") {
    input.type = "text";
    event.target.textContent = "🙈";
  } else {
    input.type = "password";
    event.target.textContent = "👁";
  }
});

// === Login Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorMsg.textContent = "Login gagal: " + error.message;
  } else {
    localStorage.setItem("userEmail", data.user.email);
    window.location.href = "index.html";
  }
});
