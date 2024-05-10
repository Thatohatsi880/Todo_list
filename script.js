function addTask() {
    var taskInput = document.getElementById("newItem");
     var taskList = document.getElementById("taskList");
    
    console.log(taskInput.value);
    // console.log(typeOftaskList);
    if (taskInput.value !== "") {
        var task = document.createElement("li");
        task.className = "task-item";
        task.innerHTML = `
           <span>${taskInput.value}</span> 
           <div>
           <span class="check-btn"><i class="fas fa-check"></i></span>
           <span class="delete-btn"><i class="fas fa-trash"></i></span>
           </div>
        `;
        taskList.appendChild(task);
        taskInput.value = "";

        var deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(function(btn) {
            btn.addEventListener("click", function() {
                this.parentElement.remove();
            });
        });

        var checkBtns = document.querySelectorAll(".check-btn");
        checkBtns.forEach(function(btn) {
            btn.addEventListener("click", function() {
                this.parentElement.classList.toggle("completed");
            });
        });

        var taskCount =document.getElementById("taskCount");
        taskCount.innerHTML = `Tasks - ${taskList}`
    }
};