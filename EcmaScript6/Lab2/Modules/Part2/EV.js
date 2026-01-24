import Car from "./Car.js";

export default class EV extends Car {
    #charge;

    constructor(name, speed, charge) {
        super(name, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        console.log(`Battery charged to ${this.#charge}%`);
    }

    accelerate() {
        this.Speed += 20;
        this.#charge -= 1;
        console.log(`${this.Name} going at ${this.Speed} km/h, with a charge of ${this.#charge}%`);
    }
}