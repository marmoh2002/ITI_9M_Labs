// Part 1: TodoList Object
const todoList = {
    tasks: [],

    addTask(task) {
        this.tasks.push(task);
        console.log(`Task "${task}" added successfully!`);
    },

    removeTask(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
            console.log(`Task "${task}" removed successfully!`);
        } else {
            console.log(`Task "${task}" not found!`);
        }
    },

    listTasks() {
        if (this.tasks.length === 0) {
            console.log("No tasks in the list.");
        } else {
            console.log("Tasks:");
            this.tasks.forEach(task => console.log(task));
        }
    }
};

todoList.addTask("Buy groceries");
todoList.addTask("Walk the dog");
todoList.addTask("Finish homework");
todoList.listTasks();
todoList.removeTask("Walk the dog");
todoList.listTasks();

console.log("\n");

// Part 2: User Profile Object
const user = {
    name: "Jana Hussein",
    age: 30,
    address: {
        street: "123 abo eer St",
        city: "alexandria"
    },

    getFullAddress() {
        return `${this.address.street}, ${this.address.city}`;
    }
};

console.log(`Name: ${user.name}`);
console.log(`Age: ${user.age}`);
console.log(`Full Address: ${user.getFullAddress()}`);

console.log("\n");

function createUser(name, age, street, city) {
    return {
        name: name,
        age: age,
        address: {
            street: street,
            city: city
        },
        // Define the method once here
        getFullAddress() {
            return `${this.address.street}, ${this.address.city}`;
        }
    };
}

const users = [
    createUser("Ahmed Ali", 28, "14 farid St", "Cairo"),
    createUser("Walid Samir", 35, "21 Khaled St", "Alexandria"),
    createUser("Lobna Youssef", 42, "54 Nile St", "Fayoum")
];

console.log("=== Users Array Demo ===");
users.forEach((user, index) => {
    console.log(`User ${index + 1}:`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Age: ${user.age}`);
    console.log(`  Address: ${user.getFullAddress()}`);
});
