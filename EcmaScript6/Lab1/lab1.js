// ----------------------------------------------------------------
// 1. Array Manipulation (let, Arrow Functions, Sort, Filter, Spread)
// ----------------------------------------------------------------
let numbers = [12, 5, 80, 2, 60, 45, 100, 3];

// Sort Ascending
let sortedAsc = [...numbers].sort((a, b) => a - b);
console.log("Ascending:", sortedAsc);

// Sort Descending
let sortedDesc = [...numbers].sort((a, b) => b - a);
console.log("Descending:", sortedDesc);

// Filter larger than 50
let largeNumbers = numbers.filter(n => n > 50);
console.log("Larger than 50:", largeNumbers);

// Max and Min using Spread Operator
console.log("Max Number:", Math.max(...numbers));
console.log("Min Number:", Math.min(...numbers));


// ----------------------------------------------------------------
// 2. Rest Operator & Template Literals
// ----------------------------------------------------------------
let calculate = (operator, ...args) => {
    let result;

    switch (operator) {
        case "sum":
            result = args.reduce((acc, item) => acc + item, 0);
            break;
        case "multiply":
            result = args.reduce((acc, item) => acc * item, 1);
            break;
        case "subtract":
            result = args.reduce((acc, item) => acc - item);
            break;
        default:
            result = "Unknown operation";
    }

    console.log(`result of ${operator} operation for ${args} is ${result}`);
}


// ----------------------------------------------------------------
// 3. Object Literals (Shorthand & Concise Methods)
// ----------------------------------------------------------------

let projectid = prompt("Enter Project ID:", "101");
let projectName = prompt("Enter Project Name:", "ES6 Learning");
let duration = prompt("Enter Duration:", "3 Days");

const Project = {
    projectid,
    projectName,
    duration,

    printData() {
        console.log(`ID: ${this.projectid}, Name: ${this.projectName}, Duration: ${this.duration}`);
    }
};

Project.printData();