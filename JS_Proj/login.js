// ... (Include same DOM selection and Regex Validation as above) ...

form.addEventListener("submit", function (e) {
    e.preventDefault();
    var enteredUser = userInp.value;
    var enteredPass = passInp.value;

    // 1. Get all cookies
    var allCookies = document.cookie.split("; ");
    var userFound = false;

    // 2. Loop through cookies to find the username
    for (var i = 0; i < allCookies.length; i++) {
        var cookiePair = allCookies[i].split("=");
        var key = cookiePair[0];
        var value = cookiePair[1];

        if (key === enteredUser) {
            userFound = true;
            if (value === enteredPass) {
                // Success
                window.location.href = "home.html";
            } else {
                alert("Wrong Password!");
            }
            break;
        }
    }

    // 3. User not found -> Redirect to Signup
    if (!userFound) {
        alert("User not found! Redirecting to Sign Up...");
        window.location.href = "signup.html";
    }
});