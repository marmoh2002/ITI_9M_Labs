// Topics covered: Variables, DOM Selection, Events, RegEx, Cookies, Functions, Control Flow

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const usernameWarning = document.getElementById('usernameWarning');
const passwordWarning = document.getElementById('passwordWarning');

// Regular expressions for validation
const usernameRegex = /^.{4,}$/; // More than 3 characters (4+)
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/; // 8+ chars, 1 uppercase, 1 number, 1 symbol

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
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if user exists in cookies
    const storedPassword = getCookie('user_' + username);

    if (storedPassword === null) {
        // User doesn't exist, redirect to signup
        alert('Username not found. Please sign up first.');
        setCookie('temp_username', username, 1);
        setCookie('temp_password', password, 1);
        window.location.href = 'signup.html';
    } else if (storedPassword === password) {
        // Successful login
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

// Initialize button state
updateSubmitButton();
