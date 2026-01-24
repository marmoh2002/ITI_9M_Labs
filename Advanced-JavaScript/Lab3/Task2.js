// Part 2: Car Class
function Car(_name, _speed) {
    this.name = _name;
    this.speed = _speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.name} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.name} going at ${this.speed} km/h`);
};

// Part 3: Electric Car (EV)
function EV(_name, _speed, _charge) {
    Car.call(this, _name, _speed);
    this.charge = _charge;
}

// Inherit from Car
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

// Override Accelerate
EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.name} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
};

// --- Testing Part 2 & 3 ---

// Car Testing
console.log("--- Car Test ---");
const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.brake();
mercedes.accelerate();

// EV Testing
console.log("--- EV Test ---");
const tesla = new EV("Tesla", 120, 23);

console.log("Initial state:", tesla);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake(); // Inherited from Car