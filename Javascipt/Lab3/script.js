// 1. Calculate Circle Area
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let circleRadius = prompt("What is the value of your circle's radius", "Type radius Here");

let pi = 3.141592653589793;
let circleArea = pi * circleRadius * circleRadius;

alert("Total area of the circle is " + circleArea);


// part 2 - square root calculation
let number = prompt("What is the value you want to calculate its square root", "Type your value Here");

let squareRootResult = Math.sqrt(number);

alert("squar root of " + number + " is " + squareRootResult);


// part 3 - cosine calculation
let angleInDegrees = prompt("Enter an angle in degrees", "Type angle Here");

// i need to convert degrees to radians because Math.cos uses radians
let angleInRadians = angleInDegrees * (3.141592653589793 / 180);

let cosineResult = Math.cos(angleInRadians);

// round to 4 decimal places
cosineResult = cosineResult.toFixed(4);

document.write("cos " + angleInDegrees + "° is " + cosineResult);

function printOddNumbers(start, end) {
    document.write("<h3>Odd numbers between " + start + " and " + end + " are:</h3>");

    // loop from start to end
    for (let i = start; i <= end; i++) {

        // check if number is odd
        // odd numbers have remainder of 1 when divided by 2
        if (i % 2 !== 0) {
            document.write(i + "<br>");
        }
    }
}


// get start and end numbers from user
let startNumber = prompt("Enter the start number:");
let endNumber = prompt("Enter the end number:");

// convert text to numbers
startNumber = parseInt(startNumber);
endNumber = parseInt(endNumber);

// call the function
printOddNumbers(startNumber, endNumber);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//3. Create array that contain some tips about JavaScript (Array of 10 strings, each string is tip about JS), and show random tip for the user each time he opens the page "Tip of the day". 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let tipsList = [
    "Use let and const instead of var to declare variables.",
    "Remember to add semicolons at the end of your statements.",
    "Use console.log to check your code when something is wrong.",
    "Variable names cannot start with a number.",
    "JavaScript is case sensitive so myVariable and myvariable are different.",
    "Use comments to explain what your code does.",
    "Arrays start counting from 0 not 1.",
    "You can use single quotes or double quotes for strings.",
    "Make sure to close all your brackets and parentheses.",
    "Test your code often to find errors early."
];

// get a random number between 0 and 9
let randomNumber = Math.floor(Math.random() * tipsList.length);

// get the tip from the array using the random number
let todaysTip = tipsList[randomNumber];

// show the tip to the user
alert("Tip of the day: " + todaysTip);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 4. Make a prompt on a page, ask user to enter math expression (Ex. 3+4*5/10*8), and then pass this expression (user input) to a function that take one parameter and execute this expression and then show the result of this expression for the user in an alert in that format: (You entered: 3+4*5, and the result is: 23) do not use eval. 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function calculateExpression(expression) {

    // remove all spaces from the expression
    expression = expression.split(" ").join("");

    // split the expression into numbers and operators
    let parts = expression.split(/([+\-*/])/);

    // convert number strings to actual numbers
    for (let i = 0; i < parts.length; i = i + 2) {
        parts[i] = parseFloat(parts[i]);
    }

    // first we do multiplication and division
    // because they come before addition and subtraction
    let i = 1;
    while (i < parts.length) {
        if (parts[i] === "*") {
            let result = parts[i - 1] * parts[i + 1];
            parts.splice(i - 1, 3, result);
        }
        else if (parts[i] === "/") {
            let result = parts[i - 1] / parts[i + 1];
            parts.splice(i - 1, 3, result);
        }
        else {
            i = i + 2;
        }
    }

    // now we do addition and subtraction
    let finalResult = parts[0];
    for (let j = 1; j < parts.length; j = j + 2) {
        if (parts[j] === "+") {
            finalResult = finalResult + parts[j + 1];
        }
        else if (parts[j] === "-") {
            finalResult = finalResult - parts[j + 1];
        }
    }

    return finalResult;
}


// ask user to enter a math expression
let userExpression = prompt("Enter a math expression:", "3+4*5/10*8");

// calculate the result using our function
let answer = calculateExpression(userExpression);

// show the result to the user
alert("You entered: " + userExpression + ", and the result is: " + answer);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//5. Create an array of objects that hold student name along with his degree
// (Each element of the array is an object has 2 properties: Name and Degree).
// Find student Name, who got degree between 90 and 100 [Use find()].
// Print students names, who got a degree less than 60 [Use filter()].
// Add a new student to the array [Use push()],()], and then use for…in to print all elements of the array.
// Remove the last student of the array [Use pop()], and then use for…of to print all elements of the array.
// Sort the array alphabetically based on the student name. 
// Use splice() function to add 2 new students after the second element of the array [Bonus].
// Use splice() function to remove 1 student after the third element in the array [Bonus].

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Creating an array of student objects
let students = [
    { name: "Ahmed", degree: 85 },
    { name: "Sara", degree: 92 },
    { name: "Mohammed", degree: 55 },
    { name: "Fatima", degree: 78 },
    { name: "Ali", degree: 45 },
    { name: "Noor", degree: 98 }
];
alert("Initial list of students:\n" + students.map(s => s.name + " - " + s.degree).join("\n"));
// Finding a student with a degree between 90 and 100
let topStudent = students.find(function (student) {
    return student.degree >= 90 && student.degree <= 100;
});
alert("Student with degree between 90 and 100:\n" + topStudent.name);

// Filtering students with a degree less than 60
let failingStudents = students.filter(function (student) {
    return student.degree < 60;
});
let failingStudentsMessage = "Students with degree less than 60:\n";
for (let index = 0; index < failingStudents.length; index++) {
    failingStudentsMessage = failingStudentsMessage + failingStudents[index].name + "\n";
}
alert(failingStudentsMessage);

// Adding a new student using the push method
let newStudentName = prompt("Enter the name of the new student:");
let newStudentDegree = prompt("Enter the degree of the new student:");
let newStudent = { name: newStudentName, degree: Number(newStudentDegree) };
students.push(newStudent);

let addedStudentMessage = "After adding a new student (using for...in loop):\n";
for (let index in students) {
    addedStudentMessage = addedStudentMessage + students[index].name + " - " + students[index].degree + "\n";
}
alert(addedStudentMessage);

// Removing the last student using the pop method
let removedStudent = students.pop();
alert("Removed student: " + removedStudent.name);

let afterRemovalMessage = "After removing the last student (using for...of loop):\n";
for (let student of students) {
    afterRemovalMessage = afterRemovalMessage + student.name + " - " + student.degree + "\n";
}
alert(afterRemovalMessage);

// Sorting the array alphabetically by student name
students.sort(function (firstStudent, secondStudent) {
    if (firstStudent.name < secondStudent.name) {
        return -1;
    }
    if (firstStudent.name > secondStudent.name) {
        return 1;
    }
    return 0;
});

let sortedMessage = "Students sorted alphabetically by name:\n";
for (let student of students) {
    sortedMessage = sortedMessage + student.name + "\n";
}
alert(sortedMessage);

// Bonus: Using splice to add 2 students after the second element
let firstNewStudent = { name: "Layla", degree: 88 };
let secondNewStudent = { name: "Hassan", degree: 67 };
students.splice(2, 0, firstNewStudent, secondNewStudent);

let afterSpliceAddMessage = "After adding 2 students at position 2:\n";
for (let student of students) {
    afterSpliceAddMessage = afterSpliceAddMessage + student.name + " - " + student.degree + "\n";
}
alert(afterSpliceAddMessage);

// Bonus: Using splice to remove 1 student after the third element
students.splice(3, 1);

let afterSpliceRemoveMessage = "After removing 1 student at position 3:\n";
for (let student of students) {
    afterSpliceRemoveMessage = afterSpliceRemoveMessage + student.name + " - " + student.degree + "\n";
}
alert(afterSpliceRemoveMessage);


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Task 4
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ++++++++++
//  Task 4.1
// ++++++++++

// First Method: Using the arguments object
function reverseParametersFirstMethod() {
    let parametersArray = Array.from(arguments);
    let reversedArray = parametersArray.reverse();
    return reversedArray;
}

// Second Method: Using rest parameters
function reverseParametersSecondMethod(...parameters) {
    let reversedArray = parameters.reverse();
    return reversedArray;
}

// Using the functions
alert("Task 4.1 - Reverse Parameters Functions");

let firstMethodResult1 = reverseParametersFirstMethod(1, 2, 3, 4, 5);
let firstMethodResult2 = reverseParametersFirstMethod("a", "b", "c", "d");
alert("First Method Results:\n" +
    "Input: 1, 2, 3, 4, 5\n" +
    "Output: " + firstMethodResult1.join(", ") + "\n\n" +
    "Input: a, b, c, d\n" +
    "Output: " + firstMethodResult2.join(", "));

let secondMethodResult1 = reverseParametersSecondMethod(10, 20, 30, 40, 50);
let secondMethodResult2 = reverseParametersSecondMethod("x", "y", "z");
alert("Second Method Results:\n" +
    "Input: 10, 20, 30, 40, 50\n" +
    "Output: " + secondMethodResult1.join(", ") + "\n\n" +
    "Input: x, y, z\n" +
    "Output: " + secondMethodResult2.join(", "));


// ++++++++++
//  Task 4.2
// ++++++++++

function acceptOnlyTwoParameters(firstParameter, secondParameter) {
    // Check if the number of arguments is not exactly 2
    if (arguments.length < 2) {
        throw new Error("Error: Too few parameters. This function requires exactly 2 parameters.");
    }
    if (arguments.length > 2) {
        throw new Error("Error: Too many parameters. This function requires exactly 2 parameters.");
    }

    // If exactly 2 parameters are passed, return them
    return "First Parameter: " + firstParameter + "\nSecond Parameter: " + secondParameter;
}

// Using the function
alert("Task 4.2 - Function That Accepts Only 2 Parameters");

// Test with exactly 2 parameters (this does not throw an exception)
try {
    let result = acceptOnlyTwoParameters("Hello", "World");
    alert("Test with 2 parameters:\n" + result);
} catch (error) {
    alert(error.message);
}

// Test with 1 parameter (throws an exception)
try {
    let result = acceptOnlyTwoParameters("Hello");
    alert("Test with 1 parameter:\n" + result);
} catch (error) {
    alert("Test with 1 parameter:\n" + error.message);
}

// Test with 3 parameters (throws an exception)
try {
    let result = acceptOnlyTwoParameters("Hello", "World", "Extra");
    alert("Test with 3 parameters:\n" + result);
} catch (error) {
    alert("Test with 3 parameters:\n" + error.message);
}


// ++++++++++
//  Task 4.3
// ++++++++++

function addNumbers(...numbers) {
    // Check if no parameters were passed
    if (numbers.length === 0) {
        throw new Error("Error: No parameters passed. Please provide at least one number.");
    }

    // Check if all parameters are numbers
    for (let index = 0; index < numbers.length; index++) {
        if (typeof numbers[index] !== "number") {
            throw new Error("Error: Invalid data type. All parameters must be numbers. Found: " + typeof numbers[index]);
        }
    }

    // Calculate the sum of all numbers
    let sum = 0;
    for (let index = 0; index < numbers.length; index++) {
        sum = sum + numbers[index];
    }

    return sum;
}

// Using the function
alert("Task 4.3 - Adding Function With Validation");

// Test with valid numbers (this does not throw an exception)
try {
    let result = addNumbers(10, 20, 30, 40);
    alert("Test with valid numbers (10, 20, 30, 40):\nSum = " + result);
} catch (error) {
    alert(error.message);
}

// Test with no parameters (throws an exception)
try {
    let result = addNumbers();
    alert("Test with no parameters:\nSum = " + result);
} catch (error) {
    alert("Test with no parameters:\n" + error.message);
}

// Test with a string parameter (throws an exception)
try {
    let result = addNumbers(10, "hello", 30);
    alert("Test with a string parameter:\nSum = " + result);
} catch (error) {
    alert("Test with a string parameter (10, 'hello', 30):\n" + error.message);
}

// Test with a single number (this does not throw an exception)
try {
    let result = addNumbers(100);
    alert("Test with a single number (100):\nSum = " + result);
} catch (error) {
    alert(error.message);
}


// ++++++++++
//  Bonus: Interactive Version with confirm
// ++++++++++

let continueProgram = confirm("Would you like to test the addNumbers function with your own input?");

if (continueProgram) {
    let userInput = prompt("Enter numbers separated by commas (for example: 5, 10, 15):");

    try {
        // Split the input string and convert to numbers
        let inputArray = userInput.split(",");
        let numbersArray = [];

        for (let index = 0; index < inputArray.length; index++) {
            let trimmedValue = inputArray[index].trim();
            let convertedNumber = Number(trimmedValue);

            if (isNaN(convertedNumber)) {
                throw new Error("Error: '" + trimmedValue + "' is not a valid number.");
            }

            numbersArray.push(convertedNumber);
        }

        // Use the spread operator to pass array elements as individual parameters
        let result = addNumbers(...numbersArray);
        alert("Your numbers: " + numbersArray.join(", ") + "\nSum = " + result);

    } catch (error) {
        alert(error.message);
    }
} else {
    alert("Thank you for using the program!");
}