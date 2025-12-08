//1.1. Write a script that accepts a string from user through prompt and
// count the number of a specific character that the user will define in
// another prompt. Ask the user whether to consider difference between
// letter cases or not then display the number of letter appearance.

let userString = prompt("Please enter a string:");
let charToCount = prompt("Please enter the character you want to count:");
let caseSensitive = confirm("Do you want the count to be case sensitive? 'OK' = Yes and 'Cancel' = No ");

let count = 0;

if (!caseSensitive) {
    userString = userString.toLowerCase();
    charToCount = charToCount.toLowerCase();
}

for (let i = 0; i < userString.length; i++) {
    if (userString[i] === charToCount) {
        count++;
    }
}

alert(`The character "${charToCount}" appears ${count} times in the string.`);

// 1.2. Write a script to determine whether the entered string is
// palindrome or not. Request the string to be entered via prompt, ask
// the user whether to consider case sensitivity of the entered string 
// or not via confirm, handle both cases in your script
// i.e. RADAR NOON MOOM are palindrome.
// Note: raDaR is not a palindrome if user requested considering case of
// entered string, it will be palindrome if user requested ignoring case
// sensitivity.

let palindromeString = prompt("Please enter a string to check if it's a palindrome:");
let palindromeCaseSensitive = confirm("Do you want the palindrome check to be case sensitive? 'OK' = Yes and 'Cancel' = No ");

if (!palindromeCaseSensitive) {
    palindromeString = palindromeString.toLowerCase();
}

let reversedString = palindromeString.split('').reverse().join('');

if (palindromeString === reversedString) {
    alert(`The string "${palindromeString}" is a palindrome.`);
} else {
    alert(`The string "${palindromeString}" is not a palindrome.`);
}

//1.3 Build your own function that takes a single string argument and
// returns the largest word in the string. If there are two or more words
// that are the same length, return the first word from the string with that length.
// e.g. if Input is: "this is a javascript string demo"
// Output will be: javascript

function findLargestWord(inputString) {
    let words = inputString.split(' ');
    let largestWord = "";

    for (let word of words) {
        if (word.length > largestWord.length) {
            largestWord = word;
        }
    }

    return largestWord;
}

let inputString = prompt("Please enter a string to find the largest word:");
let largestWord = findLargestWord(inputString);
alert(`The largest word in the string is: "${largestWord}"`);

//1.4 Write a script that reads from the user his info; validates and
// displays it with a welcoming message with today’s date 
// Use coloring format according to user’s choice. The user has to choose
// either red, green or blue color, take his choice via prompt.
// Name : should be characters only, ie not a number or special character
// phone number : should be numeric only and exactly 8 digits
// mobile number : should be numbers only with length 11 digits and starts with (010|011|012) (use RegExp for mobile number validation)
// Email: should use RegExp for validation that the email is formatted correctly (abc@123.com)

let name = prompt("Please enter your name (characters only):");
while (!/^[a-zA-Z\s]+$/.test(name)) {
    name = prompt("Invalid input. Please enter your name (characters only):");
}

let phoneNumber = prompt("Please enter your phone number (8 digits):");
while (!/^\d{8}$/.test(phoneNumber)) {
    phoneNumber = prompt("Invalid input. Please enter your phone number (8 digits):");
}

let mobileNumber = prompt("Please enter your mobile number (11 digits, starts with 010, 011, or 012):");
while (!/^(010|011|012)\d{8}$/.test(mobileNumber)) {
    mobileNumber = prompt("Invalid input. Please enter your mobile number (11 digits, starts with 010, 011, or 012):");
}

let email = prompt("Please enter your email address:");
while (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    email = prompt("Invalid input. Please enter your email address:");
}

let colorChoice = prompt("Choose a color for the welcome message (red, green, blue):").toLowerCase();
while (!["red", "green", "blue"].includes(colorChoice)) {
    colorChoice = prompt("Invalid choice. Please choose a color for the welcome message (red, green, blue):").toLowerCase();
}

let today = new Date();
let options = { year: 'numeric', month: 'long', day: 'numeric' };
let formattedDate = today.toLocaleDateString(undefined, options);

let welcomeMessage = `Welcome ${name}!\nYour phone number: ${phoneNumber}\nYour mobile number: ${mobileNumber}\nYour email: ${email}\nToday's date: ${formattedDate}`;

let messageDiv = document.createElement('div');
messageDiv.style.color = colorChoice;
messageDiv.style.fontSize = '20px';
messageDiv.style.fontWeight = 'bold';
messageDiv.style.whiteSpace = 'pre-line';
messageDiv.textContent = welcomeMessage;

document.body.appendChild(messageDiv);  
