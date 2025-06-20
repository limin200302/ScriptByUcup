// Debug load & catch error global
console.log("✅ register.js loaded");
window.addEventListener('error', e => {
  console.error('Global error:', e.error || e.message);
  alert('Terjadi kesalahan: ' + (e.error?.message || e.message));
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Konfigurasi Firebase (isi dengan yang ada di console kamu)
const firebaseConfig = {
  apiKey: "AIzaSyA-29lXZhj3j8xHZTyGHhhxjFWlc4Yi9xc",
  authDomain: "mamet-ucup-store.firebaseapp.com",
  projectId: "mamet-ucup-store",
  storageBucket: "mamet-ucup-store.appspot.com",
  messagingSenderId: "869665931228",
  appId: "1:869665931228:web:91c361712536ef7d16d919",
  measurementId: "G-M5YM3RP8NG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("registerForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const errorMsg = document.getElementById("errorMsg");
  const suggestionText = document.getElementById("usernameSuggestion");

  // Toggle show/hide password
  document.querySelectorAll(".toggle-password").forEach(btn => {
    btn.addEventListener("click", () => {
      const inp = btn.previousElementSibling;
      if (inp.type === "password") {
        inp.type = "text";
        btn.textContent = "🙈";
      } else {
        inp.type = "password";
        btn.textContent = "👁";
      }
    });
  });

  // Check username availability
  username.addEventListener("input", async () => {
    const uname = username.value.trim().toLowerCase();
    if (uname.length < 3) {
      suggestionText.textContent = "";
      return;
    }
    const taken = await checkUsernameExists(uname);
    suggestionText.textContent = taken
      ? `Nama sudah dipakai. Coba: ${uname}${Math.floor(Math.random() * 900 + 100)}`
      : "";
  });

  async function checkUsernameExists(uname) {
    const q = query(collection(db, "users"), where("username", "==", uname));
    const snap = await getDocs(q);
    return !snap.empty;
  }

  // Form submit handler
  form.addEventListener("submit", async e => {
    e.preventDefault();
    errorMsg.textContent = "";
    console.log("Submit handler dijalankan");

    const uname = username.value.trim().toLowerCase();
    const userEmail = email.value.trim();
    const userPass = password.value;
    const confirmPass = confirmPassword.value;

    if (!uname || !userEmail || !userPass || !confirmPass) {
      errorMsg.textContent = "Semua kolom wajib diisi!";
      return;
    }
    if (userPass !== confirmPass) {
      errorMsg.textContent = "Password tidak cocok!";
      return;
    }
    if (await checkUsernameExists(uname)) {
      errorMsg.textContent = "Username sudah digunakan!";
      return;
    }

    try {
      console.log("Mendaftar ke Firebase...");
      const cred = await createUserWithEmailAndPassword(auth, userEmail, userPass);
      console.log("Firebase auth berhasil:", cred.user.uid);

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        username: uname,
        email: userEmail,
        createdAt: new Date()
      });

      alert("✅ Pendaftaran berhasil! Silakan login.");
      window.location.href = "login.html";
    } catch (err) {
      console.error("Error saat daftar:", err);
      errorMsg.textContent = err.message.includes("email-already")
        ? "Email sudah digunakan!"
        : "Gagal mendaftar. Silakan coba lagi.";
    }
  });
});
