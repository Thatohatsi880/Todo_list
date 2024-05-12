const taskArray = [];

function addTask() {
    var taskInput = document.getElementById("newItem");
    var taskList = document.getElementById("taskList");
   
    
    console.log(taskInput.value);
    //console.log(typeOftaskList);
    if (taskInput.value !== "") {
        taskArray.push(taskInput.value);
        console.log(taskArray);
        var task = document.createElement("li");
        task.className = "task-item";
        task.innerHTML = `
           <span>${taskInput.value}</span> 
           <div>
           <span class="scratch"><i class="fas fa-check "></i></span>
           <span class="delete"><i class="fas fa-trash "></i></span>
           <span class="reply"><i class="fas fa-reply "></i></span>
           </div>
        `;
        taskList.appendChild(task);
        const taskCount = document.getElementById("taskCount")
        taskCount.innerHTML = `Task - ${taskArray.length}`


        taskInput.value = "";

     // Add event listener to reply icons
    // Add event listener to delete icons
    const deleteIcons = document.querySelectorAll('.delete');
    deleteIcons.forEach(icon => {
      icon.addEventListener('click', deleteItem);
    });
    
    // Add event listener to scratch icons
    const scratchIcons = document.querySelectorAll('.scratch');
    scratchIcons.forEach(icon => {
      icon.addEventListener('click', scratchItem);
    });
    
    // Add event listener to reply icons
    const replyIcons = document.querySelectorAll('.reply');
    replyIcons.forEach(icon => {
      icon.addEventListener('click', replyItem);
    });
    
    function deleteItem() {
      const listItem = this.parentNode;
      listItem.remove();
    }
    
    function scratchItem() {
      const listItem = this.parentNode;
      listItem.style.textDecoration = 'line-through';
    }
    
    function replyItem() {
      const listItem = this.parentNode;
      listItem.style.textDecoration = 'none';
      document.getElementById('todo-list').appendChild(listItem);
    }}}