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

// === Firebase Config
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

// === Elemen DOM
const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errorMsg = document.getElementById("errorMsg");
const suggestionText = document.getElementById("usernameSuggestion");

// === Show/Hide Password
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

// === Cek Username Exist
username.addEventListener("input", async () => {
  const uname = username.value.trim().toLowerCase();
  if (uname.length < 3) return suggestionText.textContent = "";
  const taken = await checkUsernameExists(uname);
  if (taken) {
    suggestionText.textContent = `Nama sudah dipakai. Coba: ${uname}${Math.floor(Math.random() * 900 + 100)}`;
  } else {
    suggestionText.textContent = "";
  }
});

async function checkUsernameExists(uname) {
  const q = query(collection(db, "users"), where("username", "==", uname));
  const snap = await getDocs(q);
  return !snap.empty;
}

// === Daftar Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const uname = username.value.trim().toLowerCase();
  const userEmail = email.value.trim();
  const userPass = password.value;
  const confirmPass = confirmPassword.value;

  if (!uname || !userEmail || !userPass || !confirmPass) {
    return errorMsg.textContent = "Semua kolom wajib diisi!";
  }

  if (userPass !== confirmPass) {
    return errorMsg.textContent = "Password tidak cocok!";
  }

  const isTaken = await checkUsernameExists(uname);
  if (isTaken) {
    return errorMsg.textContent = "Username sudah digunakan!";
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
    errorMsg.textContent = err.message.includes("email-already") ? "Email sudah digunakan!" : "Gagal mendaftar.";
  }
});
