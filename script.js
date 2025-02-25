document.addEventListener("DOMContentLoaded", loadTasks);

function newElement() {
  var taskValue = document.getElementById("myInput").value;
  var timeValue = document.getElementById("myTime").value;

  if (taskValue === '') {
    alert("You must write a task!");
  } else if (timeValue === '') {
    alert("You must select a time for the task!");
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskObj = { text: taskValue, time: timeValue, checked: false };
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    document.getElementById("myInput").value = '';
    document.getElementById("myTime").value = '';
  }
}

function renderTasks() {
  let taskList = document.getElementById("myUL");
  taskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    var li = document.createElement("li");
    li.innerHTML = `${task.text} | ${task.time}`;
    
    if (task.checked) {
      li.classList.add("checked");
    }

    li.onclick = function() {
      toggleTask(index);
    };

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function(event) {
      event.stopPropagation();
      removeTask(index);
    };

    taskList.appendChild(li);
  });
}

function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].checked = !tasks[index].checked;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function loadTasks() {
  renderTasks();
}