let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");
let taskCounter = document.getElementById("taskCounter"); // ✅ Task Counter reference

loadTasks();
updateTaskCounter(); // ✅ Update count on page load

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
  updateTaskCounter(); // ✅ Update count after adding
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
  updateTaskCounter(); // ✅ Update count after marking complete/incomplete
}

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
  updateTaskCounter(); // ✅ Update count after deleting
}

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}

function updateTaskCounter() {
  const total = taskList.querySelectorAll("li").length;
  const completed = taskList.querySelectorAll("li.completed").length;
  const pending = total - completed;
  taskCounter.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
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
  updateTaskCounter(); // ✅ Update counter when tasks + theme load
});
