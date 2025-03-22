// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 Firebase Configuration (Replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAZ5v9ErpfQxSuIlyJvKKdRUce-bJ4bEbQ",
    authDomain: "loginsignupapp-2583f.firebaseapp.com",
    projectId: "loginsignupapp-2583f",
    storageBucket: "loginsignupapp-2583f.firebasestorage.app",
    messagingSenderId: "887306582781",
    appId: "1:887306582781:web:47cb6c222379450ad1dc94"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Function to Register a New User
window.registerUser = function () {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Account created successfully! You can now log in.");
            showLogin(); // Switch to login form
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("This email is already registered. Try logging in instead.");
            } else {
                alert(error.message);
            }
        });
};

// 🔹 Function to Log In Users
window.loginUser = function () {  // ✅ ADDED `window.` TO FIX BUTTON CLICK ISSUE
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);

            // ✅ Redirect to `personal-website.html`
            window.location.href = "personal-website.html"; // 🔹 Adjust if needed
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
            alert(error.message);
        });
};

// 🔹 Show Signup Form
window.showSignup = function () {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.remove("hidden");
};

// 🔹 Show Login Form
window.showLogin = function () {
    document.getElementById("signup-box").classList.add("hidden");
    document.getElementById("login-box").classList.remove("hidden");
};
