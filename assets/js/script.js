var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

    var createTaskHandler = function(event) {

        event.preventDefault();
        
        var taskNameInput = document.querySelector("input[name='task-name']").value;
        var taskTypeInput = document.querySelector("select[name='task-type']").value;
        //Creates List Item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

        //Create divs to hold task info and add to list item
        var taskInfoEl = document.createElement("div");
        //Give it a class name for styling
        taskInfoEl.className = "task-info";
        //Add HTML content to div
        taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

        listItemEl.appendChild(taskInfoEl);

        //Add the entire task to the list
        tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);