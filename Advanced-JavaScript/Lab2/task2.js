// ===========================
// part two:
// ===========================
console.log("\n--- PART TWO ---");

const createEmployee = (name, age, dept, salary) => {
    let _salary = salary;

    return {
        name,
        age,
        dept,
        // Getter
        getSalary: () => _salary,
        // Setter
        setSalary: (val) => { _salary = val; },
        // Display
        toString: () => `${name} (${dept}): $${_salary}`
    };
};

// DATA: Array Literal (No 'new Array()')
const employees = [
    createEmployee("Ali", 28, "IT", 5000),
    createEmployee("Sara", 32, "HR", 4000),
    createEmployee("Omar", 25, "IT", 6000),
    createEmployee("Laila", 30, "Finance", 4500),
    createEmployee("Khaled", 35, "HR", 3500)
];

console.log("Employee List:", employees.map(e => e.name));


// --- Q1 ---
const getNameFn = () => (emp) => emp.name;
const extractName = getNameFn();
console.log("Q1 First Emp Name:", extractName(employees[0]));

// --- Q2 ---
const createCounter = () => {
    let count = 0;
    return () => ++count;
};
const counter = createCounter();
console.log("Q2 Counter:", counter(), counter(), counter());

// --- Q3 ---
const clickTracker = () => {
    let clicks = 0;
    return () => {
        clicks++;
        console.log(`Background changed! Total clicks: ${clicks}`);
    };
};

const btnHandler = clickTracker();
// btnHandler(); 

// --- Q4 ---
const createAdder = (amount) => (num) => num + amount;
const addTen = createAdder(10);
console.log("Q4 Add 10 to 5:", addTen(5));

// --- Q5 ---
const empTracker = (() => {
    let count = 0;
    return {
        add: () => ++count,
        getCount: () => count
    };
})();
empTracker.add();
empTracker.add();
console.log("Q5 Employees added:", empTracker.getCount());

// --- Q6 ---
const applyBonusSetup = (percent) => (emp) => {
    const current = emp.getSalary();
    emp.setSalary(current * (1 + percent / 100));
};
const give10Percent = applyBonusSetup(10);
give10Percent(employees[0]);
console.log("Q6 Ali's New Salary:", employees[0].getSalary());

// --- Q7 ---
const greetDept = (dept) => () => `Welcome to the ${dept} department!`;
console.log("Q7 Greeting:", greetDept("IT")());

// --- Q8 ---
const names = employees.map(e => e.name);
console.log("Q8 Names:", names);

// --- Q9 ---
const highEarners = employees.filter(e => e.getSalary() > 4500);
console.log("Q9 Earn > 4500:", highEarners.map(e => e.name));

// --- Q10 ---
const totalSalary = employees.reduce((sum, e) => sum + e.getSalary(), 0);
console.log("Q10 Total Payroll:", totalSalary);

// --- Q11 ---
const raiseSalaryPure = (emp) => {
    return createEmployee(emp.name, emp.age, emp.dept, emp.getSalary() * 1.10);
};
const richerOmar = raiseSalaryPure(employees[2]);
console.log("Q11 Pure check:", richerOmar.getSalary() > employees[2].getSalary());

// --- Q12 ---
const newEmployeesList = [...employees, createEmployee("NewUser", 20, "Intern", 1000)];
console.log("Q12 Array Lengths:", employees.length, "vs", newEmployeesList.length);

// --- Q13 ---
const applyFn = (fn, emp) => fn(emp);
applyFn((e) => console.log("Processing:", e.name), employees[1]);

// --- Q14 ---
const filterBy = (dept) => (arr) => arr.filter(e => e.dept === dept);
const getHR = filterBy("HR");
console.log("Q14 HR Staff:", getHR(employees).map(e => e.name));

// --- Q15 ---
const bumpedSalaries = employees.map(e => {
    return createEmployee(e.name, e.age, e.dept, e.getSalary() * 1.05);
});
console.log("Q15 Original Salary:", employees[3].getSalary());
console.log("Q15 Updated Salary:", bumpedSalaries[3].getSalary());