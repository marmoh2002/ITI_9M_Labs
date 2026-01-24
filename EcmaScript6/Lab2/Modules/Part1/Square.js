import Rectangle from "./Rectangle.js";

export default class Square extends Rectangle {
    static count = 0;

    constructor(color, length) {
        super(color, length, length);
        Square.count++;
    }

    // Override not strictly necessary for calculation logic if using super, 
    // but explicit override requested by prompt.
    calcArea() {
        return super.calcArea();
    }

    calcPerimeter() {
        return super.calcPerimeter();
    }

    toString() {
        return `[Square] Color: ${this.Color}, Area: ${this.calcArea()}, Perimeter: ${this.calcPerimeter()}`;
    }

    static getCount() {
        return Square.count;
    }
}