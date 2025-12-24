// TOPIC 5: Regular Expressions
// Password: At least 1 Uppercase, 1 Number, 1 Symbol, Length > 8
const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
const userRegex = /^[a-zA-Z0-9]{4,}$/; // Username length > 3 (so 4+)

// TOPIC 4: Cookie Helper Functions
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim(); // TOPIC 2: String methods
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Function to validate inputs (TOPIC 3: DOM Manipulation)
function validateInputs(username, password, errorElement) {
    if (!userRegex.test(username)) {
        errorElement.innerText = "Username must be > 3 characters.";
        errorElement.style.display = "block";
        return false;
    }
    if (!passRegex.test(password)) {
        errorElement.innerText = "Password must be > 8 chars, contain 1 Upper, 1 Number, 1 Symbol.";
        errorElement.style.display = "block";
        return false;
    }
    errorElement.style.display = "none";
    return true;
}