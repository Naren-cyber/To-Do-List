document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    loadTasks();

    // Add task to the list
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);

        // Save tasks to local storage
        saveTasks();

        taskInput.value = "";
    });

    // Delete a task
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const taskItem = event.target.parentElement;
            taskList.removeChild(taskItem);

            // Save tasks to local storage
            saveTasks();
        }
    });

    // Create a new task item
    function createTaskItem(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete">Delete</button>
        `;
        return li;
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li span").forEach((task) => {
            tasks.push(task.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((taskText) => {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);
        });
    }
});
