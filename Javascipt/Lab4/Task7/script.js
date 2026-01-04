// getting all the elements i need
var fullNameInput = document.getElementById("fullName");
var nameError = document.getElementById("nameError");
var passwordInput = document.getElementById("password");
var repeatPasswordInput = document.getElementById("repeatPassword");
var passwordError = document.getElementById("passwordError");

var isNameValid = false;
var isPasswordMatch = false;

fullNameInput.addEventListener("focus", function () {
    fullNameInput.style.border = "solid 1px blue";
});

fullNameInput.addEventListener("blur", function () {
    fullNameInput.style.border = "";

    var nameValue = fullNameInput.value.trim();

    // check if name is empty or less than 4 characters
    if (nameValue === "" || nameValue.length <= 3) {
        nameError.style.display = "inline";
        fullNameInput.style.backgroundColor = "gray";
        isNameValid = false;

        // need to use setTimeout because focus doesnt work properly in blur event otherwise
        setTimeout(function () {
            fullNameInput.focus();
            fullNameInput.select();
        }, 0);
    } else {
        nameError.style.display = "none";
        fullNameInput.style.backgroundColor = "white";
        isNameValid = true;
    }
});

// validate repeat password when user leaves the field
repeatPasswordInput.addEventListener("blur", function () {
    var pass = passwordInput.value;
    var repeatPass = repeatPasswordInput.value;

    // check if passwords match and arent empty
    if (pass !== repeatPass || pass === "" || repeatPass === "") {
        passwordError.style.display = "inline";
        repeatPasswordInput.style.backgroundColor = "gray";
        passwordInput.style.backgroundColor = "gray";
        isPasswordMatch = false;
    } else {
        passwordError.style.display = "none";
        repeatPasswordInput.style.backgroundColor = "white";
        passwordInput.style.backgroundColor = "white";
        isPasswordMatch = true;
    }
});

// also check when password field changes
passwordInput.addEventListener("blur", function () {
    // only validate if repeat password has something in it
    if (repeatPasswordInput.value !== "") {
        var pass = passwordInput.value;
        var repeatPass = repeatPasswordInput.value;

        if (pass !== repeatPass) {
            passwordError.style.display = "inline";
            repeatPasswordInput.style.backgroundColor = "gray";
            passwordInput.style.backgroundColor = "gray";
            isPasswordMatch = false;
        } else {
            passwordError.style.display = "none";
            repeatPasswordInput.style.backgroundColor = "white";
            passwordInput.style.backgroundColor = "white";
            isPasswordMatch = true;
        }
    }
});