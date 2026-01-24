export default class Car {
    #serial;
    #name;
    #speed;
    static count = 0;

    constructor(name, speed) {
        this.#serial = Math.floor(Math.random() * 100000);
        this.#name = name;
        this.#speed = speed;
        Car.count++;
    }

    get Speed() { return this.#speed; }
    set Speed(val) { this.#speed = val; }

    get Name() { return this.#name; }

    accelerate() {
        this.#speed += 10;
        console.log(`${this.#name} accelerated. New Speed: ${this.#speed} km/h`);
    }

    brake() {
        this.#speed -= 5;
        console.log(`${this.#name} braked. New Speed: ${this.#speed} km/h`);
    }

    static getCarStats() {
        console.log(`Total Cars Created: ${Car.count}`);
    }

    // Helper to print specific car serial since serial is private
    printDetails() {
        console.log(`Car: ${this.#name}, Serial: ${this.#serial}, Speed: ${this.#speed}`);
    }
}