
var tasks = [];          
var currentFilter = "all"; 

var taskInput = document.getElementById("taskInput");
var priorityInput = document.getElementById("priorityInput");
var categoryInput = document.getElementById("categoryInput");
var dueDateInput = document.getElementById("dueDateInput");
var addBtn = document.getElementById("addBtn");
var errorMsg = document.getElementById("errorMsg");

var searchInput = document.getElementById("searchInput");
var filterButtons = document.querySelectorAll(".filter-btn");

var listEl = document.getElementById("list");
var pendingCountEl = document.getElementById("pendingCount");
var completedCountEl = document.getElementById("completedCount");

var darkModeBtn = document.getElementById("darkModeBtn");



function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
  var stored = localStorage.getItem("todoTasks");
  if (stored) {
    tasks = JSON.parse(stored);
  }
}

function saveDarkMode(isDark) {
  localStorage.setItem("todoDarkMode", isDark ? "yes" : "no");
}

function loadDarkMode() {
  var value = localStorage.getItem("todoDarkMode");
  if (value === "yes") {
    document.body.classList.add("dark");
    darkModeBtn.textContent = "☀️";
  }
}




function render() {
  var searchText = searchInput.value.trim().toLowerCase();


  listEl.innerHTML = "";

  var pendingTotal = 0;
  var completedTotal = 0;

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    
    if (task.completed) {
      completedTotal++;
    } else {
      pendingTotal++;
    }


    if (currentFilter === "active" && task.completed) continue;
    if (currentFilter === "completed" && !task.completed) continue;


    if (searchText.length > 0 && task.text.toLowerCase().indexOf(searchText) === -1) {
      continue;
    }

    listEl.appendChild(buildTaskElement(task));
  }

  pendingCountEl.textContent = "Pending: " + pendingTotal;
  completedCountEl.textContent = "Completed: " + completedTotal;
}



function buildTaskElement(task) {
  var li = document.createElement("li");
  if (task.completed) {
    li.classList.add("l-through");
  }


  var textCont = document.createElement("span");
  textCont.className = "list-text";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function () {
    toggleComplete(task.id);
  });

  var details = document.createElement("span");
  details.className = "task-details";

  var textSpan = document.createElement("span");
  textSpan.textContent = task.text;

  var meta = document.createElement("span");
  meta.className = "task-meta";

  var priorityTag = document.createElement("span");
  priorityTag.className = "priority-" + task.priority;
  priorityTag.textContent = task.priority;
  meta.appendChild(priorityTag);

  if (task.category) {
    var catTag = document.createElement("span");
    catTag.textContent = "📁 " + task.category;
    meta.appendChild(catTag);
  }

  if (task.dueDate) {
    var dateTag = document.createElement("span");
    dateTag.textContent = "📅 " + task.dueDate;
    meta.appendChild(dateTag);
  }

  details.appendChild(textSpan);
  details.appendChild(meta);

  textCont.appendChild(checkbox);
  textCont.appendChild(details);

  // ---- Right side: edit + delete buttons ----
  var editBtn = document.createElement("button");
  editBtn.className = "icon-btn";
  editBtn.textContent = "✏️";
  editBtn.addEventListener("click", function () {
    editTask(task.id, textSpan);
  });

  var deleteBtn = document.createElement("button");
  deleteBtn.className = "icon-btn";
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", function () {
    deleteTask(task.id);
  });

  li.appendChild(textCont);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}



function addTask() {
  var text = taskInput.value.trim();

  if (text.length === 0) {
    errorMsg.textContent = "Task cannot be empty.";
    return;
  }
  if (text.length > 100) {
    errorMsg.textContent = "Task is too long (max 100 characters).";
    return;
  }
  errorMsg.textContent = "";

  var newTask = {
    id: Date.now(),                       // simple unique id
    text: text,
    category: categoryInput.value.trim(),
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  render();


  taskInput.value = "";
  categoryInput.value = "";
  dueDateInput.value = "";
  taskInput.focus();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  render();
}

function toggleComplete(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
    }
  }
  saveTasks();
  render();
}

function editTask(id, textSpanEl) {
  var task = null;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) task = tasks[i];
  }
  if (!task) return;

  
  var input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.style.width = "100%";

  textSpanEl.replaceWith(input);
  input.focus();

  function saveEdit() {
    var newText = input.value.trim();
    if (newText.length > 0) {
      task.text = newText;
      saveTasks();
    }
    render();
  }

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveEdit();
    }
  });
}


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

searchInput.addEventListener("input", render);

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    // Remove "active" class from every filter button
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    // Highlight the clicked button
    this.classList.add("active");
    currentFilter = this.getAttribute("data-filter");
    render();
  });
}

darkModeBtn.addEventListener("click", function () {
  var isDark = document.body.classList.toggle("dark");
  darkModeBtn.textContent = isDark ? "☀️" : "🌙";
  saveDarkMode(isDark);
});



loadDarkMode();
loadTasks();
render();