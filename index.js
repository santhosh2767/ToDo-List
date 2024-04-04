
const taskInput = document.getElementById("taskInput");
const completedTaskList = document.getElementById("completedTaskList");
const pendingTaskList = document.getElementById("pendingTaskList");
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = { text: taskText, status: 'pending' }; 
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function editTask(index) {
    const newTaskText = prompt("Edit the task:", tasks[index].text);

    if (newTaskText !== null) {
        tasks[index].text = newTaskText;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
}

function toggleTaskStatus(index) {
    tasks[index].status = tasks[index].status === 'pending' ? 'completed' : 'pending'; 

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function displayTasks() {
    completedTaskList.innerHTML = "";
    pendingTaskList.innerHTML = "";
    

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit'; 
        editIcon.addEventListener('click', () => editTask(index));

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash'; 
        deleteIcon.addEventListener('click', () => deleteTask(index));

        const statusIcon = document.createElement('i');
        statusIcon.className = task.status === 'pending' ? 'far fa-check-circle' : 'fas fa-check-circle'; 
        statusIcon.addEventListener('click', () => toggleTaskStatus(index));

        li.appendChild(editIcon);
        li.appendChild(deleteIcon);
        li.appendChild(statusIcon);

        if (task.status === 'completed') {
            completedTaskList.appendChild(li);
        } else {
            pendingTaskList.appendChild(li);
        }
    });
}

displayTasks();

