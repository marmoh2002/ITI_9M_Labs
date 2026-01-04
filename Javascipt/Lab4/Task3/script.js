// get the elements i need
let taskInput = document.getElementById('taskInput');
let addBtn = document.getElementById('addBtn');
let taskList = document.getElementById('taskList');

// add task when button is clicked
addBtn.addEventListener('click', function () {
    addTask();
});

// also add task when enter is pressed
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    let taskText = taskInput.value.trim();

    // dont add empty tasks (alert user)
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // create the list item
    let li = document.createElement('li');
    li.className = 'task-item';

    // build the html for the task
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="done-btn">Done</button>
        <button class="delete-btn">Delete</button>
    `;

    // get the buttons from the li we just made
    let doneBtn = li.querySelector('.done-btn');
    let deleteBtn = li.querySelector('.delete-btn');

    // done button toggles the completed state
    doneBtn.addEventListener('click', function () {
        li.classList.toggle('done');
    });

    // delete button removes the task
    deleteBtn.addEventListener('click', function () {
        li.remove();
    });

    // add to the list and clear input
    taskList.appendChild(li);
    taskInput.value = '';
}