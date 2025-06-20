import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-29lXZhj3j8xHZTyGHhhxjFWlc4Yi9xc",
  authDomain: "mamet-ucup-store.firebaseapp.com",
  projectId: "mamet-ucup-store",
  storageBucket: "mamet-ucup-store.firebasestorage.app",
  messagingSenderId: "869665931228",
  appId: "1:869665931228:web:2e4aac081befbca516d919",
  measurementId: "G-VR803Q47EC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const errorMsg = document.getElementById("errorMsg");
const suggestionText = document.getElementById("usernameSuggestion");

// Cek apakah sudah login
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

// Toggle password
document.querySelectorAll(".toggle-password").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "👁" : "🙈";
  });
});

// Cek username exist
usernameInput.addEventListener("input", async () => {
  const val = usernameInput.value.trim().toLowerCase();
  if (val.length < 3) return suggestionText.textContent = "";
  const exists = await checkUsernameExists(val);
  if (exists) {
    suggestionText.textContent = `Nama sudah dipakai. Coba: ${val}${Math.floor(Math.random() * 999)}`;
  } else {
    suggestionText.textContent = "";
  }
});

async function checkUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// Handle register
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const username = usernameInput.value.trim().toLowerCase();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;

  if (!username || !email || !password || !confirmPassword) {
    return errorMsg.textContent = "Semua kolom wajib diisi!";
  }

  if (password !== confirmPassword) {
    return errorMsg.textContent = "Password tidak cocok!";
  }

  const usernameTaken = await checkUsernameExists(username);
  if (usernameTaken) {
    return errorMsg.textContent = "Username sudah digunakan!";
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    await setDoc(doc(db, "users", uid), {
      uid,
      username,
      email,
      createdAt: new Date()
    });

    alert("Berhasil daftar! Kamu akan diarahkan...");
    window.location.href = "index.html";

  } catch (err) {
    errorMsg.textContent = err.message.includes("email-already") ?
      "Email sudah digunakan!" :
      "Terjadi kesalahan: " + err.message;
  }
});
