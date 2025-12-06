"use strict";

//1-Make function that write “welcome to my page” 6 times using h1 to h6 header sizes using one line (document.write)  javascript code “see attached image” . (Use for loop, and don’t use h1 to h6 explicitly).


for (let i = 0; i < 6; i++) {
    document.write("<h", i + 1, "> welcome to my page </h", i + 1, ">");
}
// 2- Make a function that takes today’s temperature as a parameter, prints: “HOT” if the entered temperature are more than or equals 30 and “Cold” if it’s less than 30 (use ternary conditional operator).
function checkTemperature(temp) {
    temp >= 30 ? console.log("HOT") : console.log("Cold");
}
//take user input for temperature
let userTemp = parseFloat(prompt("Enter today's temperature:"));
checkTemperature(userTemp);


// 3- Write a script that takes from the user n values and returns their sum, stop receiving values from user when he enters 0 or sum exceeds 100, check that the entered data is numeric and inform the user with the total sum of the entered values in console. 
let n = 6;
let sum = 0;

for (let i = 0; i < n || sum > 100; i++) {
    let userInput = prompt("Enter a number (enter 0 to stop):");
    let num = Number(userInput);
    if (isNaN(num)) {
        console.log("Please enter a valid numeric value.");
        i--;
        continue;
    }
    if (num === 0) {
        i = n; // to break the loop
    }
    sum += num;
    if (sum > 100) {
        console.log("Sum exceeded 100.");
        i = n;
    }
}
console.log("Total sum of entered values:", sum);

// 4- On your page, show alert for the user that say “Welcome to my site”, then show him prompt ask him to enter his name and write to the page  “ welcome + his name”. (Remark what happen to the home page after writing welcome page).
alert("Welcome to my site");

let userName = prompt("Please enter your name:");
document.write("welcome " + userName);
document.write("<br>");


//  5- Create a function that accepts three numerical values x, y and z. The function should check if x is divisible by y only or z only or both y and z. 
// Example: If user entered values are 10, 2, and 5 then the output will be: 10 is divisible by both 2 and 5. 
// If user entered values are 10, 2, and 4 then the output will be: 10 is divisible by 2 only. 
// If user entered values are 10, 5, and 4 then the output will be: 10 is divisible by 5 only. 

function checkDivisibility(x, y, z) {
    const divisibleByY = x % y === 0;
    const divisibleByZ = x % z === 0;

    (divisibleByY && divisibleByZ) ? console.log(x, " is divisible by both ", y, " and ", z) : (divisibleByY) ? console.log(x, " is divisible by ", y, "only") : (divisibleByZ) ? console.log(x, " is divisible by ", z, "only") : console.log(x, " is divisible by neither ", y, " nor ", z)
}
let x = Number(prompt("enter x:"));
let y = Number(prompt("enter y:"));
let z = Number(prompt("enter z:"));
checkDivisibility(x, y, z);

//On contact page prompt user to enter his name, make sure that name is string, and let the user enter his birth year and make sure that it is a number, and it is less than 2010, and then calculate his age. For each prompt if user input valid show him next prompt, if not valid show him the same prompt again until user enters it correctly (use loops). And after validating user input, write all user input on the page in that format:
// Name: ahmed
// Birth year: 1981
// Age: 30

do {
    var usrname = prompt("Please enter your name:");
} while (!isNaN(usrname) || usrname.trim() === "");
do {
    var birthYear = Number(prompt("Please enter your birth year (less than 2010):"));
} while (isNaN(birthYear) || birthYear >= 2010);
let age = new Date().getFullYear() - birthYear;
document.write("Name: " + usrname + "<br>");
document.write("Birth year: " + birthYear + "<br>");
document.write("Age: " + age);