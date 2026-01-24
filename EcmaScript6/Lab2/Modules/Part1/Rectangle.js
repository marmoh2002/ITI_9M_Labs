import Shape from "../Shape.js";

export default class Rectangle extends Shape {
    #width;
    #height;
    static count = 0;

    constructor(color, width, height) {
        super(color);
        this.Width = width;
        this.Height = height;
        Rectangle.count++;
    }

    set Width(val) {
        if (val <= 0) {
            console.log("Validation Error: Width must be positive");
            return;
        }
        this.#width = val;
    }

    get Width() { return this.#width; }

    set Height(val) {
        if (val <= 0) {
            console.log("Validation Error: Height must be positive");
            return;
        }
        this.#height = val;
    }
    get Height() { return this.#height; }

    calcArea() {
        return this.#width * this.#height;
    }

    calcPerimeter() {
        return 2 * (this.#width + this.#height);
    }

    toString() {
        return `[Rectangle] Color: ${this.Color}, Area: ${this.calcArea()}, Perimeter: ${this.calcPerimeter()}`;
    }

    static getCount() {
        return Rectangle.count;
    }
}