// 1. Abstract Shape Class
function Shape(_color) {
    // Abstract Class Check
    if (this.constructor.name === "Shape") {
        throw new Error("This is an Abstract Class");
    }
    this.color = _color;
}

Shape.prototype.printColor = function () {
    console.log(`Color: ${this.color}`);
};

Shape.prototype.calcArea = function () {
    return 0;
};

Shape.prototype.calcPerimeter = function () {
    return 0;
};

// 2. Rect Class
function Rect(_color, _width, _height) {
    Shape.call(this, _color);
    this.width = _width;
    this.height = _height;
    Rect.count++;
}

// Inheritance
Rect.prototype = Object.create(Shape.prototype);
Rect.prototype.constructor = Rect;
Rect.prototype.printColor = function () {
    console.log(`Rect Color: ${this.color}`);
};

// Static Members
Rect.count = 0;
Rect.getCount = function () {
    return Rect.count;
};

// Overrides
Rect.prototype.calcArea = function () {
    return this.width * this.height;
};

Rect.prototype.calcPerimeter = function () {
    return 2 * (this.width + this.height);
};

Rect.prototype.toString = function () {
    return `Rect [Color: ${this.color}, Area: ${this.calcArea()}, Perimeter: ${this.calcPerimeter()}]`;
};

// 3. Square Class
function Square(_color, _side) {
    Rect.call(this, _color, _side, _side);
    Square.count++;
}

// Inheritance from Rect
Square.prototype = Object.create(Rect.prototype);
Square.prototype.constructor = Square;
Square.prototype.printColor = function () {
    console.log(`Square Color: ${this.color}`);
};

// Static Members
Square.count = 0;
Square.getCount = function () {
    return Square.count;
};

// Overrides
Square.prototype.calcArea = function () {
    return this.width * this.width;
};

Square.prototype.calcPerimeter = function () {
    return 4 * this.width;
};

Square.prototype.toString = function () {
    return `Square [Color: ${this.color}, Area: ${this.calcArea()}, Perimeter: ${this.calcPerimeter()}]`;
};

// --- Testing Part 1 ---
const shapes = [
    new Rect("Red", 10, 20),
    new Square("Blue", 5),
    new Rect("Green", 5, 6)
];

shapes.forEach(s => {
    console.log(s.toString());
    s.printColor();
});

console.log(`Rect Objects created: ${Rect.getCount()}`);
console.log(`Square Objects created: ${Square.getCount()}`);