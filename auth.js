// ===============================
// SHOPORA AUTHENTICATION SYSTEM
// ===============================


// Get registered users
function getUsers() {
    return JSON.parse(localStorage.getItem("shoporaUsers")) || [];
}


// Save users
function saveUsers(users) {
    localStorage.setItem("shoporaUsers", JSON.stringify(users));
}


// Get currently logged-in user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("shoporaCurrentUser"));
}


// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("shoporaCurrentUser") !== null;
}


// ===============================
// REGISTER
// ===============================

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message = document.getElementById("form-message");

    // Empty fields
    if (!name || !email || !password || !confirmPassword) {

        message.textContent = "Please fill all fields.";
        message.className = "form-message error";

        return;
    }


    // Password length
    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        message.className = "form-message error";

        return;
    }


    // Password match
    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        message.className = "form-message error";

        return;
    }


    const users = getUsers();


    // Check existing email
    const existingUser = users.find(
        user => user.email === email
    );


    if (existingUser) {

        message.textContent =
            "An account with this email already exists.";

        message.className = "form-message error";

        return;
    }


    // Create user
    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

        createdAt: new Date().toISOString()

    };


    users.push(newUser);

    saveUsers(users);


    message.textContent =
        "Registration successful! Redirecting to login...";

    message.className = "form-message success";


    // Redirect
    setTimeout(() => {

        window.location.href = "login.html";

    }, 1200);

}


// ===============================
// LOGIN
// ===============================

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim().toLowerCase();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("form-message");


    if (!email || !password) {

        message.textContent =
            "Please enter your email and password.";

        message.className = "form-message error";

        return;
    }


    const users = getUsers();


    const user = users.find(
        item =>
            item.email === email &&
            item.password === password
    );


    if (!user) {

        message.textContent =
            "Invalid email or password.";

        message.className = "form-message error";

        return;
    }


    // Save logged-in user
    const currentUser = {

        id: user.id,

        name: user.name,

        email: user.email

    };


    localStorage.setItem(
        "shoporaCurrentUser",
        JSON.stringify(currentUser)
    );


    message.textContent =
        `Welcome back, ${user.name}!`;

    message.className = "form-message success";


    setTimeout(() => {

        window.location.href = "index.html";

    }, 1000);

}


// ===============================
// LOGOUT
// ===============================

function logoutUser() {

    localStorage.removeItem("shoporaCurrentUser");

    window.location.href = "login.html";
}


// ===============================
// PROTECT PAGE
// ===============================

function requireLogin() {

    if (!isLoggedIn()) {

        window.location.href = "login.html";

    }

}


// ===============================
// SHOW USER
// ===============================

function displayCurrentUser() {

    const user = getCurrentUser();

    const userName =
        document.getElementById("user-name");

    if (userName && user) {

        userName.textContent = user.name;

    }

}

function updateNavbarAuth() {

    const authArea = document.getElementById("auth-area");

    if (!authArea) return;

    const user = getCurrentUser();

    if (user) {

        authArea.innerHTML =
    '<span class="welcome-user">Hi, <strong>' +
    user.name +
    '</strong> 👋</span>' +
    '<button class="logout-btn" onclick="logoutUser()">Logout</button>';

    } else {

        authArea.innerHTML =
            '<a href="login.html">Login</a> | ' +
            '<a href="register.html">Register</a>';

    }
}

document.addEventListener("DOMContentLoaded", updateNavbarAuth);