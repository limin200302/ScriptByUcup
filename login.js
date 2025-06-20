import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyA-29lXZhj3j8xHZTyGHhhxjFWlc4Yi9xc",
  authDomain: "mamet-ucup-store.firebaseapp.com",
  projectId: "mamet-ucup-store",
  storageBucket: "mamet-ucup-store.appspot.com",
  messagingSenderId: "869665931228",
  appId: "1:869665931228:web:2e4aac081befbca516d919",
  measurementId: "G-VR803Q47EC"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login dengan Google
const googleBtn = document.getElementById("googleLogin");

googleBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Simpan nama user ke localStorage (jika kamu mau tampilkan di index.html)
    localStorage.setItem("username", user.displayName);

    // Redirect ke index.html
    window.location.href = "index.html";
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
});

// (Optional) Cek status login saat file dimuat
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Sudah login sebagai:", user.displayName);
  } else {
    console.log("Belum login");
  }
});
