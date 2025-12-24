var userInp = document.getElementById("user");
var passInp = document.getElementById("pass");
var form = document.getElementById("signupForm");
var btn = document.getElementById("submitBtn");

// Regex Patterns
var userRegex = /^[a-zA-Z0-9]{4,}$/; // length > 3 means 4 or more
var passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/; // length > 8 means 9 or more

function validate() {
    var userValid = userRegex.test(userInp.value);
    var passValid = passRegex.test(passInp.value);

    // Toggle Warnings
    document.getElementById("userError").style.display = userValid ? "none" : "block";
    document.getElementById("passError").style.display = passValid ? "none" : "block";

    // Enable/Disable Button
    if (userValid && passValid) {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", "true");
    }
}

userInp.addEventListener("input", validate);
passInp.addEventListener("input", validate);

form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Save to Cookie: username=password
    // We add an expiry date so it persists
    var date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 1 day
    document.cookie = userInp.value + "=" + passInp.value + "; expires=" + date.toUTCString() + "; path=/";

    alert("Signup Successful! Please Login.");
    window.location.href = "login.html";
});