let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

loadTasks();

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">x</button>
  `;

  taskList.appendChild(li);
  taskInput.value = "";

  saveTasks();
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}
// 🌙 Dark Mode Toggle
document.getElementById("toggleTheme").addEventListener("click", function () {
  document.body.classList.toggle("dark");

  // Optional: Save theme in localStorage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// 🌟 Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});
