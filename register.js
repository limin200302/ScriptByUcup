import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA-29lXZhj3j8xHZTyGHhhxjFWlc4Yi9xc",
  authDomain: "mamet-ucup-store.firebaseapp.com",
  projectId: "mamet-ucup-store",
  storageBucket: "mamet-ucup-store.appspot.com",
  messagingSenderId: "869665931228",
  appId: "1:869665931228:web:2e4aac081befbca516d919",
  measurementId: "G-VR803Q47EC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM
const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errorMsg = document.getElementById("errorMsg");
const usernameSuggestion = document.getElementById("usernameSuggestion");

// Show/Hide password
document.querySelectorAll(".toggle-password").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈";
    } else {
      input.type = "password";
      btn.textContent = "👁";
    }
  });
});

// Cek Username
username.addEventListener("input", async () => {
  const uname = username.value.trim().toLowerCase();
  if (uname.length < 3) return usernameSuggestion.textContent = "";
  const isTaken = await checkUsernameExists(uname);
  usernameSuggestion.textContent = isTaken ? `Nama sudah dipakai. Coba: ${uname}${Math.floor(100 + Math.random() * 900)}` : "";
});

async function checkUsernameExists(uname) {
  const q = query(collection(db, "users"), where("username", "==", uname));
  const snap = await getDocs(q);
  return !snap.empty;
}

// Submit Daftar
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

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

  const isTaken = await checkUsernameExists(uname);
  if (isTaken) {
    errorMsg.textContent = "Username sudah digunakan!";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, userEmail, userPass);
    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      username: uname,
      email: userEmail,
      createdAt: new Date()
    });

    alert("Pendaftaran berhasil! Silakan login.");
    window.location.href = "login.html";
  } catch (err) {
    if (err.message.includes("email-already")) {
      errorMsg.textContent = "Email sudah digunakan!";
    } else {
      errorMsg.textContent = "Gagal mendaftar. Silakan coba lagi.";
    }
  }
});
