import Rectangle from "./Modules/Part1/Rectangle.js";
import Square from "./Modules/Part1/Square.js";
import Circle from "./Modules/Part1/Circle.js";
import Car from "./Modules/Part2/Car.js";
import EV from "./Modules/Part2/EV.js";

// --- Part One: Shapes ---
console.log("--- PART ONE: SHAPES ---");

let shapes = [
    new Rectangle("Red", 10, 20),
    new Square("Blue", 15),
    new Rectangle("Green", 5, 8)
];

shapes.forEach(shape => {
    console.log(shape.toString());
    shape.printColor();
});

let myCircle = new Circle("Yellow", 10, 5, 5);
console.log(myCircle.toString());

console.log(`Rectangles created: ${Rectangle.getCount()}`);
console.log(`Squares created: ${Square.getCount()}`);


// --- Part Two: Cars ---
console.log("\n--- PART TWO: CARS ---");

let car1 = new Car("BMW", 120);
let car2 = new Car("Mercedes", 95);

car1.accelerate();
car1.brake();

car2.accelerate();
car2.brake();
car2.brake();

Car.getCarStats();
car1.printDetails();


// --- Part Three: EV ---
console.log("\n--- PART THREE: ELECTRIC VEHICLES ---");

let tesla = new EV("Tesla", 120, 23);

tesla.chargeBattery(90);
tesla.accelerate(); // EV override
tesla.brake(); // Inherited from Car
tesla.accelerate();