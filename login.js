import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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

const loginBtn = document.getElementById("loginGoogle");
const statusText = document.getElementById("loginStatus");

loginBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Simpan user baru ke Firestore jika belum ada
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date()
      });
    }

    // Simpan nama ke localStorage
    localStorage.setItem("username", user.displayName);
    statusText.textContent = "Login berhasil! Mengarahkan...";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    statusText.textContent = "Login gagal. Silakan coba lagi.";
  }
});
