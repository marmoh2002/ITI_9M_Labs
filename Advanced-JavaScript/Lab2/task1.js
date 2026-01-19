// ===========================
// part one:
// ===========================
console.log("--- PART ONE ---");

const person = {
  ID: 1,
  Name: "Empty"
};

const employee = Object.create(person);

// Using defineProperty for the Salary logic
Object.defineProperty(employee, 'Salary', {
  get: function() { return this._salary; },
  set: function(val) {
    // Logic: Set value + 20% bonus
    this._salary = val * 1.20; 
  },
  enumerable: true,
  configurable: true
});

const hrEmployee = Object.create(employee);
Object.defineProperty(hrEmployee, 'Location', {
  value: 'Cairo',
  writable: true, 
  enumerable: true
});

hrEmployee.ID = 100;       
hrEmployee.Name = "Alex";  
hrEmployee.Salary = 5000;  

console.log("HR Employee:", hrEmployee.Name, hrEmployee.Location);
console.log("Calculated Salary (5000 + 20%):", hrEmployee.Salary);
console.log("Is Person the prototype?", hrEmployee.__proto__.__proto__ === person);

