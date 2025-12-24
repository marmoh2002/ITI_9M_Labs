// Topics covered: Variables, DOM, Events, RegEx, Cookies, Control Flow, Functions

// DOM elements
const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const usernameWarning = document.getElementById('usernameWarning');
const passwordWarning = document.getElementById('passwordWarning');
const successMessage = document.getElementById('successMessage');

// Regular expressions
const usernameRegex = /^.{4,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/;

let isUsernameValid = false;
let isPasswordValid = false;

// Cookie functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Pre-fill from login page if redirected
const tempUsername = getCookie('temp_username');
const tempPassword = getCookie('temp_password');

if (tempUsername) {
    usernameInput.value = tempUsername;
    validateUsername();
}

if (tempPassword) {
    passwordInput.value = tempPassword;
    validatePassword();
}

// Validation functions
function validateUsername() {
    const username = usernameInput.value;
    isUsernameValid = usernameRegex.test(username);

    if (username.length > 0 && !isUsernameValid) {
        usernameWarning.classList.add('show');
        usernameInput.style.borderColor = '#e74c3c';
    } else {
        usernameWarning.classList.remove('show');
        usernameInput.style.borderColor = isUsernameValid ? '#2ecc71' : '#ddd';
    }

    updateSubmitButton();
}

function validatePassword() {
    const password = passwordInput.value;
    isPasswordValid = passwordRegex.test(password);

    if (password.length > 0 && !isPasswordValid) {
        passwordWarning.classList.add('show');
        passwordInput.style.borderColor = '#e74c3c';
    } else {
        passwordWarning.classList.remove('show');
        passwordInput.style.borderColor = isPasswordValid ? '#2ecc71' : '#ddd';
    }

    updateSubmitButton();
}

function updateSubmitButton() {
    if (isUsernameValid && isPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Event listeners
usernameInput.addEventListener('input', validateUsername);
passwordInput.addEventListener('input', validatePassword);

// Form submission
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if username already exists
    const existingPassword = getCookie('user_' + username);

    if (existingPassword !== null) {
        alert('Username already exists. Please choose a different username or login.');
        return;
    }

    // Save user credentials in cookies
    setCookie('user_' + username, password, 365);

    // Clear temporary cookies
    setCookie('temp_username', '', -1);
    setCookie('temp_password', '', -1);

    // Show success message
    successMessage.style.display = 'block';
    signupForm.style.display = 'none';

    // Redirect to login after 2 seconds
    setTimeout(function () {
        window.location.href = 'index.html';
    }, 2000);
});

// Initialize button state
updateSubmitButton();