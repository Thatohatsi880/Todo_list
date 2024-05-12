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
    taskArray.push({ text: task, completed: false });

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
  const taskIndex = Array.from(taskList.children).indexOf(taskItem);
  const doneTaskIcon = taskItem.querySelector('.done-task i');
  
  const deleteIcon = taskItem.querySelector('.delete i');

  if (!taskArray[taskIndex].completed) {
    taskArray[taskIndex].completed = true;
    console.log("Task index:", taskIndex);
    taskItem.classList.add('completed');
    completedList.appendChild(taskItem);
    doneTaskIcon.classList.remove('fa-check');
    doneTaskIcon.classList.add('fa-undo');
    doneTaskIcon.style.display = "none";
    deleteIcon.style.display = "none";


    const replyIcon = document.createElement("span");
    replyIcon.className = "reply";
    replyIcon.innerHTML = `<i class="fas fa-reply"></i>`;
    replyIcon.addEventListener('click', function() {
      replyTask(taskIndex);
    });
    taskItem.querySelector('div').appendChild(replyIcon);
  } else {
    taskArray[taskIndex].completed = false;
    taskItem.classList.remove('completed');
    taskList.appendChild(taskItem);
    doneTaskIcon.classList.remove('fa-undo');
    doneTaskIcon.classList.add('fa-check');
    const replyIcon = taskItem.querySelector('.reply');
    if (replyIcon) {
      replyIcon.remove();
    }
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
  const taskItem = taskList.children[taskIndex];
  const taskText = taskArray[taskIndex].text;
  taskArray.splice(taskIndex, 1); // Remove task from array
  const newListItem = document.createElement("li");
  newListItem.className = "task-item";
  newListItem.innerHTML = `
    <span>${taskText}</span> 
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
  updateCompletedList();
}
