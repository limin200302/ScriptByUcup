// === Supabase Auth v2 ===
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// === Konfigurasi Supabase kamu ===
const supabaseUrl = 'https://etfbdevjytilaykogzwa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...'
const supabase = createClient(supabaseUrl, supabaseKey)

// === DOM Element ===
const form = document.getElementById("loginForm")
const email = document.getElementById("email")
const password = document.getElementById("password")
const errorMsg = document.getElementById("errorMsg")

// === Toggle Show/Hide Password ===
document.querySelectorAll(".toggle-password").forEach(button => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling
    if (input.type === "password") {
      input.type = "text"
      button.textContent = "🙈"
    } else {
      input.type = "password"
      button.textContent = "👁"
    }
  })
})

// === Login Submit ===
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  errorMsg.textContent = ""

  const userEmail = email.value.trim()
  const userPass = password.value

  if (!userEmail || !userPass) {
    errorMsg.textContent = "Email dan password wajib diisi!"
    return
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPass
    })

    if (error) {
      errorMsg.textContent = "Login gagal: " + error.message
    } else {
      // Simpan username/email (jika diperlukan)
      localStorage.setItem("userEmail", userEmail)
      // Redirect ke halaman utama
      window.location.href = "index.html"
    }
  } catch (err) {
    errorMsg.textContent = "Terjadi kesalahan. Silakan coba lagi."
  }
})
