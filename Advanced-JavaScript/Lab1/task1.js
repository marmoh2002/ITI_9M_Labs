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
    createUser("Lobna Youssef", 42, "54 Nile St", "Fayoum"),
    createUser("Sara Hossam", 20, "7 Tahrir St", "Giza"),
    createUser("Mona Adel", 25, "88 Saad St", "Aswan"),
    createUser("Omar Nabil", 30, "33 Salah St", "Luxor"),
    createUser("Bahaa Fathy", 27, "12 Abbas St", "Mansoura"),
    createUser("Dina Magdy", 22, "45 Gamal St", "Ismailia")
];

console.log("=== Users Array Demo ===");
users.forEach((user, index) => {
    console.log(`User ${index + 1}:`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Age: ${user.age}`);
    console.log(`  Address: ${user.getFullAddress()}`);
});


// 1. FILTER: Users older than 24
const olderThan24 = users.filter(user => user.age > 24);

console.log("\n--- Filtered Results (Age > 24) ---");
olderThan24.forEach(user => {
    console.log(`${user.name} is ${user.age} years old.`);
});


// 2. SORT: By Name (Alphabetical)
const sortedByName = [...users].sort((a, b) => a.name.localeCompare(b.name));

console.log("\n--- Sorted by Name (A-Z) ---");
sortedByName.forEach(user => {
    console.log(`${user.name}`);
});


// 3. SORT: By Age (Ascending)
const sortedByAge = [...users].sort((a, b) => a.age - b.age);

console.log("\n--- Sorted by Age (Youngest to Oldest) ---");
sortedByAge.forEach(user => {
    console.log(`${user.name}: ${user.age}`);
});

