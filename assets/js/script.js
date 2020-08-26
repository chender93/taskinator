var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

    var taskFormHandler = function(event) {
        event.preventDefault();
        var taskNameInput = document.querySelector("input[name='task-name']").value;
        var taskTypeInput = document.querySelector("select[name='task-type']").value;
        
        //Check if input values are empty strings
        if (!taskNameInput || !taskTypeInput) {
            alert("You need to fill out the task form!");
            return false;
        }
        
        //Resets the form after submitting
        formEl.reset();

        var isEdit = formEl.hasAttribute("data-task-id");
        
        //Package up data as an object
        var taskDataObj = {
            name:taskNameInput,
            type: taskTypeInput,
        };

        // Has data attribute, so get task id and call function to complete edit process
        if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
        } 
        // No data attribute, so create object as normal and pass to createTaskEl function
        else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
  
    createTaskEl(taskDataObj);
  }
     };

    var completeEditTask = function(taskName, taskType, taskId) {
        // find the matching task list item
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        // set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        alert("Task Updated!"); 

        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
    }



    var createTaskEl = function(taskDataObj) {
        //Creates List Item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

        //Add task id as a custom attribute
        listItemEl.setAttribute("data-task-id" , taskIdCounter);

        //Create divs to hold task info and add to list item
        var taskInfoEl = document.createElement("div");
        //Give it a class name for styling
        taskInfoEl.className = "task-info";
        //Add HTML content to div
        taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        //Add the entire task to the list
        listItemEl.appendChild(taskInfoEl);
        
        var taskActionsEl = createTaskActions(taskIdCounter);
        listItemEl.appendChild(taskActionsEl);
        
        tasksToDoEl.appendChild(listItemEl);

        //Increases task counter for next unique id
        taskIdCounter++;
        
    };

    var createTaskActions = function(taskId) {
        var actionContainerEl = document.createElement("div");
        actionContainerEl.className = "task-actions";
        //Creates edit button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = "Edit";
        editButtonEl.className = "btn edit-btn";
        editButtonEl.setAttribute("data-task-id", taskId);

        actionContainerEl.appendChild(editButtonEl);

        //Creates delete button
        var deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Delete";
        deleteButtonEl.className = "btn delete-btn";
        deleteButtonEl.setAttribute("data-task-id", taskId);

        actionContainerEl.appendChild(deleteButtonEl);

        var statusSelectEl = document.createElement("select");
        statusSelectEl.className = "select-status";
        statusSelectEl.setAttribute("name", "status-change");
        statusSelectEl.setAttribute("data-task-id", taskId);

        var statusChoices = ["To Do", "In Progress", "Completed"];

        for (var i=0; i < statusChoices.length; i++) {
            //Create Option Element
            var statusOptionEl = document.createElement("option");
            statusOptionEl.textContent = statusChoices[i];

            //Appen to Select
            statusSelectEl.appendChild(statusOptionEl);
        }
        actionContainerEl.appendChild(statusSelectEl);

        return actionContainerEl;
    };

var taskButtonHandler = function(event) {
    //Get target element from event
    var targetEl = event.target;

    //When edit button is clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //When delete button is clicked
    if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};


formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);