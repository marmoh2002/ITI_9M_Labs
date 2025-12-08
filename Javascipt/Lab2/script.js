//1.1. Write a script that accepts a string from user through prompt and
// count the number of a specific character that the user will define in
// another prompt. Ask the user whether to consider difference between
// letter cases or not then display the number of letter appearance.

// get the string from user
var str = prompt("enter a string:");
var char = prompt("what character do u want to count?");
var caseSens = confirm("case sensitive? ok for yes, cancel for no");

// make everything lowercase if they dont want case sensitive
var counter = 0;
if (caseSens == false) {
    str = str.toLowerCase();
    char = char.toLowerCase();
}

// loop thru string and count
var i = 0;
while (i < str.length) {
    if (str[i] == char) {
        counter = counter + 1;
    }
    i = i + 1;
}

alert("the character " + char + " shows up " + counter + " times");


// 1.2. Write a script to determine whether the entered string is
// palindrome or not. Request the string to be entered via prompt, ask
// the user whether to consider case sensitivity of the entered string 
// or not via confirm, handle both cases in your script
// i.e. RADAR NOON MOOM are palindrome.
// Note: raDaR is not a palindrome if user requested considering case of
// entered string, it will be palindrome if user requested ignoring case
// sensitivity.

var word = prompt("enter a word to check palindrome:");
var checkCase = confirm("case sensitive? ok=yes cancel=no");

// convert to lowercase if needed
if (checkCase == false) {
    word = word.toLowerCase();
}

// reverse the string manually
var reversed = "";
for (var j = word.length - 1; j >= 0; j--) {
    reversed = reversed + word[j];
}

// check if same
if (word == reversed) {
    alert(word + " IS a palindrome!!");
} else {
    alert(word + " is NOT a palindrome");
}

//1.3 Build your own function that takes a single string argument and
// returns the largest word in the string. If there are two or more words
// that are the same length, return the first word from the string with that length.
// e.g. if Input is: "this is a javascript string demo"
// Output will be: javascript


function biggestWord(sentence) {
    // split into words
    var wordList = sentence.split(" ");
    var biggest = "";

    // check each word
    for (var k = 0; k < wordList.length; k++) {
        if (wordList[k].length > biggest.length) {
            biggest = wordList[k];
        }
    }

    return biggest;
}

var userSentence = prompt("enter a sentence:");
var result = biggestWord(userSentence);
alert("biggest word is: " + result);

//1.4 Write a script that reads from the user his info; validates and
// displays it with a welcoming message with today’s date 
// Use coloring format according to user’s choice. The user has to choose
// either red, green or blue color, take his choice via prompt.
// Name : should be characters only, ie not a number or special character
// phone number : should be numeric only and exactly 8 digits
// mobile number : should be numbers only with length 11 digits and starts with (010|011|012) (use RegExp for mobile number validation)
// Email: should use RegExp for validation that the email is formatted correctly (abc@123.com)

// get name - only letters allowed
var userName = prompt("enter ur name:");
var nameOk = false;

while (nameOk == false) {
    // check if name has only letters and spaces
    var badChar = false;
    for (var m = 0; m < userName.length; m++) {
        var c = userName[m];
        if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == ' ')) {
            badChar = true;
        }
    }

    if (badChar == true || userName.length == 0) {
        userName = prompt("wrong! enter name with letters only:");
    } else {
        nameOk = true;
    }
}

// get phone - must be 8 numbers
var phone = prompt("enter phone number (8 digits):");

while (true) {
    // check length and if all numbers
    var phoneGood = true;
    if (phone.length != 8) {
        phoneGood = false;
    }
    for (var n = 0; n < phone.length; n++) {
        if (phone[n] < '0' || phone[n] > '9') {
            phoneGood = false;
        }
    }

    if (phoneGood == false) {
        phone = prompt("wrong! enter 8 digit phone:");
    } else {
        break;
    }
}

// mobile number validation with regex
var mobile = prompt("enter mobile (11 digits starting with 010/011/012):");
var mobileRegex = /^(010|011|012)[0-9]{8}$/;

while (mobileRegex.test(mobile) == false) {
    mobile = prompt("wrong format! try again:");
}

// email validation
var userEmail = prompt("enter email:");
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

while (emailRegex.test(userEmail) == false) {
    userEmail = prompt("bad email! enter valid email:");
}

// color choice
var color = prompt("pick color: red green or blue");
color = color.toLowerCase();

while (color != "red" && color != "green" && color != "blue") {
    color = prompt("pick red green or blue only!");
    color = color.toLowerCase();
}

// get todays date
var d = new Date();
var dateStr = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// show the message
var msg = "Welcome " + userName + "!\n";
msg = msg + "Phone: " + phone + "\n";
msg = msg + "Mobile: " + mobile + "\n";
msg = msg + "Email: " + userEmail + "\n";
msg = msg + "Date: " + dateStr;

var div = document.createElement("div");
div.style.color = color;
div.style.fontSize = "18px";
div.innerText = msg;

document.body.appendChild(div);