// get the full name from URL parameters
var urlParams = new URLSearchParams(window.location.search);
var fullName = urlParams.get("fullName");

// display the message
var msgElement = document.getElementById("thankYouMsg");
msgElement.textContent = "Thank you " + fullName + " for registering in our website";
