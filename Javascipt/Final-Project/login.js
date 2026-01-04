// Login page javascript file
// I'm using DOM to get the form elements

let loginForm = document.getElementById('loginForm');
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let submitBtn = document.getElementById('submitBtn');
let usernameWarning = document.getElementById('usernameWarning');
let passwordWarning = document.getElementById('passwordWarning');

// These are the validation patterns my teacher showed us
let usernameRegex = /^.{4,}$/;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/;

let isUsernameValid = false;
let isPasswordValid = false;

// Function to set cookies (learned from w3schools)
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get cookies
function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        // remove spaces
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Check if username is valid
function validateUsername() {
    let username = usernameInput.value;

    if (usernameRegex.test(username)) {
        isUsernameValid = true;
    } else {
        isUsernameValid = false;
    }

    if (username.length > 0 && !isUsernameValid) {
        usernameWarning.style.display = 'block';
        usernameInput.style.borderColor = '#e74c3c';
    } else {
        usernameWarning.style.display = 'none';
        if (isUsernameValid) {
            usernameInput.style.borderColor = '#2ecc71';
        } else {
            usernameInput.style.borderColor = '#ddd';
        }
    }

    updateSubmitButton();
}

// Check if password is valid
function validatePassword() {
    let password = passwordInput.value;

    if (passwordRegex.test(password)) {
        isPasswordValid = true;
    } else {
        isPasswordValid = false;
    }

    if (password.length > 0 && !isPasswordValid) {
        passwordWarning.style.display = 'block';
        passwordInput.style.borderColor = '#e74c3c';
    } else {
        passwordWarning.style.display = 'none';
        if (isPasswordValid) {
            passwordInput.style.borderColor = '#2ecc71';
        } else {
            passwordInput.style.borderColor = '#ddd';
        }
    }

    updateSubmitButton();
}

// Enable or disable submit button based on validation
function updateSubmitButton() {
    if (isUsernameValid && isPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Add event listeners to inputs
usernameInput.addEventListener('input', function () {
    validateUsername();
});

passwordInput.addEventListener('input', function () {
    validatePassword();
});

// Handle form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let username = usernameInput.value;
    let password = passwordInput.value;

    // Check if user exists
    let storedPassword = getCookie('user_' + username);

    if (storedPassword === null) {
        // User not found
        alert('Username not found. Please sign up first.');
        // Save temp data to use in signup
        setCookie('temp_username', username, 1);
        setCookie('temp_password', password, 1);
        window.location.href = 'signup.html';
    } else if (storedPassword === password) {
        // Login successful!
        setCookie('logged_in_user', username, 7);
        window.location.href = 'home.html';
    } else {
        // Wrong password
        alert('Incorrect password. Please try again.');
        passwordInput.value = '';
        isPasswordValid = false;
        updateSubmitButton();
    }
});

// Make sure button starts disabled
updateSubmitButton();