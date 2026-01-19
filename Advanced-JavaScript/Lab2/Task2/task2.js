let employees = [
    { id: 101, name: "Nadia", salary: 5000, dept: "PD" },
    { id: 102, name: "Ali", salary: 3000, dept: "OS" },
    { id: 103, name: "Eman", salary: 7000, dept: "PD" },
    { id: 104, name: "Mona", salary: 4000, dept: "Mobile" }
];

// Q1
function createNameExtractor() {
    return function (emp) {
        return emp.name;
    };
}

const getName = createNameExtractor();
console.log("Q1:", getName(employees[0]));
// Q2
let counterFunc = (function () {
    let counter = 0;
    return function () {
        counter++;
        return counter;
    };
})();
console.log("Q2:", counterFunc());
console.log("Q2:", counterFunc());

//Q3
function colorBackgroundChanger() {
    let count = 0;
    const colors = ["yellow", "blue", "green", "black", "white"];

    return function () {
        document.body.style.backgroundColor = colors[count % colors.length];
        count++;
        console.log(`Q3: Button clicked ${count} times\nColor set to: ${colors[(count - 1) % colors.length]}`);
    };
}

let btn = document.getElementById("colorBtn");
if (btn) btn.onclick = colorBackgroundChanger();

//Q4
function closAdder(fixedNumber) {
    return function (numberToAdd) {
        return fixedNumber + numberToAdd;
    };
}

const addFive = closAdder(5);
console.log("Q4:", addFive(10));
console.log("Q4:", addFive(20));

// Q5
function trackEmpAdd() {
    let count = 0;
    return function () {
        count++;
        return "Total Employees Added: ${count}";
    };
}

const empTracker = trackEmpAdd();
console.log("Q5:", empTracker());
console.log("Q5:", empTracker());

// Q6
function createBonusCalculator(percentage) {
    return function (salary) {
        return salary + (salary * percentage);
    };
}

const applyTenPercent = createBonusCalculator(0.1);
console.log("Q6 (10% on 5000):", applyTenPercent(5000));

// Q7
function deptGreeter(deptName) {
    return function (empName) {
        return `Welcome ${empName} to the ${deptName} department!`;
    };
}

const pdGreeter = deptGreeter("PD");
console.log("Q7:", pdGreeter("Nadia"));

//Q8
const empNames = employees.map(function (emp) {
    return emp.name;
});
console.log("Q8:", empNames);

//Q9
const highEarning = employees.filter(function (emp) {
    return emp.salary > 4500;
});
console.log("Q9:", highEarning);

//Q10
const totalSalaries = employees.reduce(function (acc, emp) {
    return acc + emp.salary;
}, 0);

console.log("Q10: Total Salaries =", totalSalaries);

// Q11
function increaseSalaryPure(emp) {
    return {
        id: emp.id,
        name: emp.name,
        dept: emp.dept,
        salary: emp.salary * 1.10
    };
}
console.log("Q11:", increaseSalaryPure(employees[0]));
// Q12
let newEmployee = { id: 105, name: "Samer", salary: 5500, dept: "HR" };

let newEmpArray = employees.map(function (emp) {
    return emp;
});

newEmpArray.push(newEmployee);

console.log("Q12 Original Array Length:", employees.length);
console.log("Q12 New Array Length:", newEmpArray.length);
console.log("Q12 New Array:", newEmpArray);


// Q13
function applyBonus(fn, data) {
    return data.map(fn);
}

const bonusFn = createBonusCalculator(0.2);
const newSalaries = applyBonus(emp => bonusFn(emp.salary), employees);

console.log("Q13:", newSalaries);

// Q14
function createDeptFilter(dept) {
    return function (emp) {
        return emp.dept === dept;
    };
}

const filterPD = createDeptFilter("PD");
const pdEmployees = employees.filter(filterPD);
console.log("Q14:", pdEmployees);

// Q15
const increasedSalariesEmps = employees.map(function (emp) {
    return Object.assign({}, emp, { salary: emp.salary * 1.05 });
});

console.log("Q15 (First Original):", employees[0].salary);
console.log("Q15 (First Updated):", increasedSalariesEmps[0].salary);

