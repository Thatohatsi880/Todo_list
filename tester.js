let taskArray = []; // Array to store tasks
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");
let taskCountHeading; // Variable to store the task count heading
let completedTaskCountHeading; // Variable to store the completed task count heading

// Function to update the task count heading
function updateTaskCount() {
  if (!taskCountHeading) {
    taskCountHeading = document.createElement("h3");
    taskCountHeading.id = "taskCount";
    taskList.before(taskCountHeading);
  }
  taskCountHeading.textContent = `Tasks (${taskArray.length})`;
}

// Function to update the completed tasks count heading
function updateCompletedTaskCount() {
  const completedTasks = document.querySelectorAll('.completed');
  if (!completedTaskCountHeading && completedTasks.length > 0) {
    completedTaskCountHeading = document.createElement("h3");
    completedTaskCountHeading.textContent = "Completed Tasks (0)";
    completedList.before(completedTaskCountHeading);
  }
  if (completedTaskCountHeading) {
    completedTaskCountHeading.textContent = `Completed Tasks (${completedTasks.length})`;
  }
}

// Event listener for task list
taskList.addEventListener('click', function(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('delete')) {
    deleteItem(clickedElement.parentNode.parentNode);
  } else if (clickedElement.classList.contains('done-task')) {
    toggleTaskCompletion(clickedElement.parentNode.parentNode);
  } else if (clickedElement.classList.contains('reply')) {
    replyTask(clickedElement.parentNode.parentNode);
  }
});

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("newItem");
  const task = taskInput.value.trim();

  if (task) {
    const taskIndex = taskArray.length;
    taskArray.push({ text: task, completed: false });

    const newListItem = document.createElement("li");
    newListItem.className = "task-item";
    newListItem.setAttribute('data-index', taskIndex);
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

    // Update task count heading
    updateTaskCount();
  }
}

// Function to toggle task completion (handles moving and returning)
function toggleTaskCompletion(taskItem) {
  const taskIndex = taskItem.getAttribute('data-index');
  
  // Check if taskIndex is valid
  if (taskIndex === null || taskIndex < 0 || taskIndex >= taskArray.length) {
    console.error("Invalid task index:", taskIndex);
    return;
  }

  const doneTaskIcon = taskItem.querySelector('.done-task i');
  const taskText = taskArray[taskIndex].text;

  // If the task is not completed, mark it as completed
  if (!taskArray[taskIndex].completed) {
    taskArray[taskIndex].completed = true;
    taskItem.classList.add('completed');
    completedList.appendChild(taskItem);
    doneTaskIcon.classList.remove('fa-check');
    doneTaskIcon.classList.add('fa-undo');

    // Add reply icon
    // const replyIcon = document.createElement("span");
    // replyIcon.className = "reply";
    // replyIcon.innerHTML = `<i class="fas fa-undo"></i>`;
    // taskItem.querySelector('div').appendChild(replyIcon);
  } else {
    // If the task is completed, remove the completed status and move it back to the task list
    taskArray[taskIndex].completed = false;
    taskItem.classList.remove('completed');
    taskList.appendChild(taskItem);
    doneTaskIcon.classList.remove('fa-undo');
    doneTaskIcon.classList.add('fa-check');

    // Remove reply icon if exists
    const replyIcon = taskItem.querySelector('.reply');
    if (replyIcon) {
      replyIcon.remove();
    }
  }

  // Update completed task count heading
  updateCompletedTaskCount();
}

// Function to move a completed task back to the task list
function replyTask(taskItem) {
  const taskIndex = taskItem.getAttribute('data-index');
  taskArray[taskIndex].completed = false;
  taskItem.classList.remove('completed');
  taskList.appendChild(taskItem);

  // Remove reply icon
  const replyIcon = taskItem.querySelector('.reply');
  if (replyIcon) {
    replyIcon.remove();
  }

  // Update task count heading
  updateTaskCount();
}

// Function to delete a task
// Function to delete a task
function deleteItem(taskItem) {
  const taskIndex = taskItem.getAttribute('data-index');
  taskItem.remove();
  taskArray.splice(taskIndex, 1);

  // Update task count heading
  updateTaskCount();

  // Check if there are no tasks remaining
  if (taskArray.length === 0) {
    // Remove task count heading
    if (taskCountHeading) {
      taskCountHeading.remove();
      taskCountHeading = null; // Reset taskCountHeading variable
    }

    // Remove completed task count heading
    if (completedTaskCountHeading) {
      completedTaskCountHeading.remove();
      completedTaskCountHeading = null; // Reset completedTaskCountHeading variable
    }

    function clearList() {
    // Clear task list
    taskList.innerHTML = '';
    // Clear completed tasks list
    completedList.innerHTML = '';
    // Clear task array
    taskArray = [];
    // Update task count heading
    updateTaskCount();
    // Update completed task count heading
    updateCompletedTaskCount();

    // Check if there are no tasks remaining
    if (taskArray.length === 0) {
        // Remove task count heading
        if (taskCountHeading) {
            taskCountHeading.remove();
            taskCountHeading = null; // Reset taskCountHeading variable
        }
    }

    // Check if there are no completed tasks remaining
    if (completedList.children.length === 0) {
        // Remove completed task count heading
        if (completedTaskCountHeading) {
            completedTaskCountHeading.remove();
            completedTaskCountHeading = null; // Reset completedTaskCountHeading variable
        }
    }
}

  
  }
}
