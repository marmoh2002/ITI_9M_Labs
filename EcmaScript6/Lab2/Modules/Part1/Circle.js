import Shape from "../Part1/Shape.js";

export default class Circle extends Shape {
    #radius;
    #x;
    #y;

    constructor(color, radius, x, y) {
        super(color);
        this.Radius = radius;
        this.X = x;
        this.Y = y;
    }

    set Radius(val) { this.#radius = val; }
    get Radius() { return this.#radius; }

    set X(val) { this.#x = val; }
    get X() { return this.#x; }

    set Y(val) { this.#y = val; }
    get Y() { return this.#y; }

    calcArea() {
        return Math.PI * Math.pow(this.#radius, 2);
    }
    calcPerimeter() {
        return 2 * Math.PI * this.#radius;
    }
    toString() {
        return `[Circle] Color: ${this.Color}, Radius: ${this.#radius}, Center: (${this.#x},${this.#y})`;
    }
}