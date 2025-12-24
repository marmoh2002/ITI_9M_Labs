// Signup page JavaScript
// This handles user registration

let signupForm = document.getElementById('signupForm');
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let submitBtn = document.getElementById('submitBtn');
let usernameWarning = document.getElementById('usernameWarning');
let passwordWarning = document.getElementById('passwordWarning');
let successMessage = document.getElementById('successMessage');

// Validation regex patterns
let usernameRegex = /^.{4,}$/;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/;

let isUsernameValid = false;
let isPasswordValid = false;

// Cookie helper functions
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
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

// Check if coming from login page
let tempUsername = getCookie('temp_username');
let tempPassword = getCookie('temp_password');

if (tempUsername) {
    usernameInput.value = tempUsername;
    validateUsername();
}

if (tempPassword) {
    passwordInput.value = tempPassword;
    validatePassword();
}

// Username validation function
function validateUsername() {
    let username = usernameInput.value;

    // Test against regex
    if (usernameRegex.test(username)) {
        isUsernameValid = true;
    } else {
        isUsernameValid = false;
    }

    // Show/hide warning
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

// Password validation function
function validatePassword() {
    let password = passwordInput.value;

    // Check password requirements
    if (passwordRegex.test(password)) {
        isPasswordValid = true;
    } else {
        isPasswordValid = false;
    }

    // Update UI based on validation
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

// Update button state
function updateSubmitButton() {
    if (isUsernameValid && isPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Add event listeners
usernameInput.addEventListener('input', function () {
    validateUsername();
});

passwordInput.addEventListener('input', function () {
    validatePassword();
});

// Handle form submit
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let username = usernameInput.value;
    let password = passwordInput.value;

    // Check if username already exists
    let existingPassword = getCookie('user_' + username);

    if (existingPassword !== null) {
        alert('Username already exists. Please choose a different username or login.');
        return;
    }

    // Save new user
    setCookie('user_' + username, password, 365);

    // Clear temporary cookies
    setCookie('temp_username', '', -1);
    setCookie('temp_password', '', -1);

    // Show success message
    successMessage.style.display = 'block';
    signupForm.style.display = 'none';

    // Redirect after 2 seconds
    setTimeout(function () {
        window.location.href = 'index.html';
    }, 2000);
});

// Initialize button
updateSubmitButton();