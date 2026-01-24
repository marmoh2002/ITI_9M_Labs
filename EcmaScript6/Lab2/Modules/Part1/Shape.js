export default class Shape {
    #color;

    constructor(color) {
        if (new.target === Shape) {
            throw new Error("Cannot instantiate Abstract Class Shape");
        }
        this.#color = color;
    }

    set Color(val) { this.#color = val; }
    get Color() { return this.#color; }

    printColor() {
        console.log(`Color: ${this.#color}`);
    }

    calcArea() { return 0; }
    calcPerimeter() { return 0; }
}