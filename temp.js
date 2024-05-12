const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");
let completed = false; // Flag to track completed state

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("newItem");
  const task = taskInput.value.trim();

  if (task) {
    const newListItem = document.createElement("li");
    newListItem.className = "task-item";
    newListItem.innerHTML = `
      <span>${task}</span> 
      <div>
        <span class="done-task" onclick="toggleTaskCompletion(this.parentNode.parentNode)">
          <i class="fas fa-check"></i>
        </span>
        <span class="delete" onclick="deleteItem(this.parentNode.parentNode)">
          <i class="fas fa-trash"></i>
        </span>
      </div>
    `;
    taskList.appendChild(newListItem);

    taskInput.value = "";
  }
}

// Function to toggle task completion (handles moving and returning)
function toggleTaskCompletion(taskItem) {
  taskItem.classList.toggle('completed');
  taskItem.querySelector('.done-task').classList.toggle('return');

  if (taskItem.classList.contains('completed')) {
    completedList.appendChild(taskItem);
  } else {
    taskList.appendChild(taskItem);
  }

  updateCompletedList();
}

// Function to update the completed tasks list dynamically (using filter)
function updateCompletedList() {
  const completedTasks = document.querySelectorAll('.completed');
  completedList.innerHTML = `<h2>Completed Tasks (${completedTasks.length})</h2>`;
  completedList.appendChild(...completedTasks);
}

// Function to delete a task
function deleteItem(listItem) {
  listItem.remove();
}
