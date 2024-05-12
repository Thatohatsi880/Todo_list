let taskArray = []; // Array to store tasks
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");


// Event listener for task list
taskList.addEventListener('click', function(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('delete')) {
    deleteItem(clickedElement.parentNode.parentNode);
  } else if (clickedElement.classList.contains('done-task')) {
    toggleTaskCompletion(clickedElement.parentNode.parentNode);
  } else if (clickedElement.classList.contains('reply')) {
    const taskIndex = Array.from(taskList.children).indexOf(clickedElement.parentNode.parentNode);
    if (taskIndex !== -1) {
      replyTask(taskIndex);
    }
  }
});

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("newItem");
  const task = taskInput.value.trim();

  if (task) {
    taskArray.push(task);

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
        <span class="reply" onclick="replyTask(${taskArray.length - 1})">
          <i class="fas fa-reply"></i>
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

  const doneTaskIcon = taskItem.querySelector('.done-task i');
  doneTaskIcon.classList.toggle('fa-check');
  doneTaskIcon.classList.toggle('fa-undo');

  const deleteIcon = taskItem.querySelector('.delete i');
  deleteIcon.classList.toggle('fa-trash');
  deleteIcon.classList.toggle('fa-undo');

  const replyIcon = taskItem.querySelector('fa-undo');

  if (taskItem.classList.contains('completed')) {
    completedList.appendChild(taskItem);
    doneTaskIcon.style.display = "none";
    deleteIcon.style.display = "none";
  } else {
    taskList.appendChild(taskItem);
    replyIcon.style.display = "none";
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

// Function to move a completed task back to the task list
function replyTask(taskIndex) {
  const taskText = taskArray[taskIndex];
  taskArray.splice(taskIndex, 1); // Remove task from array
  const newListItem = document.createElement("li");
  newListItem.className = "task-item";
  newListItem.innerHTML = `
    <span>${taskText}</span> 
    <div>
      <span class="reply" onclick="replyTask(${taskArray.length})">
        <i class="fas fa-reply"></i>
      </span>
    </div>
  `;
  taskList.appendChild(newListItem);
  updateCompletedList();
}
