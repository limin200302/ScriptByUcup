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
  getDoc,
  collection,
  query,
  where,
  getDocs
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
const suggestionText = document.getElementById("usernameSuggestion");
const errorMsg = document.getElementById("errorMsg");

// Cek login
onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "index.html";
});

// Saran username otomatis
usernameInput.addEventListener("input", async () => {
  const inputName = usernameInput.value.trim().toLowerCase();
  if (inputName.length < 3) return suggestionText.textContent = "";

  const exists = await checkUsernameExists(inputName);
  if (exists) {
    const suggestion = inputName + Math.floor(Math.random() * 1000);
    suggestionText.textContent = `Nama sudah dipakai. Coba: ${suggestion}`;
  } else {
    suggestionText.textContent = "";
  }
});

async function checkUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// Toggle show/hide password
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "👁" : "🙈";
  });
});

// Handle register
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim().toLowerCase();
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password !== confirmPassword) {
    errorMsg.textContent = "Password tidak cocok.";
    return;
  }

  if (await checkUsernameExists(username)) {
    errorMsg.textContent = "Username sudah digunakan. Coba yang lain.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Simpan ke Firestore
    await setDoc(doc(db, "users", uid), {
      uid,
      username,
      email,
      createdAt: new Date()
    });

    window.location.href = "index.html";
  } catch (err) {
    errorMsg.textContent = "Gagal daftar: " + err.message;
  }
});
