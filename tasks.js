const url = "http://localhost:4000/api/tasks";

const form = document.getElementById("add-task-form");
const inputTask = document.getElementById("input-task");
document.getElementById("btn-add-task").addEventListener("click", addTask);

let tasks = [];

function addTask(e) {
  if (inputTask.validity.valid) {
    //let task = document.getElementById("input-task").value;
    // console.log(e.current.value);
    tasks.push(inputTask.value);
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = inputTask.value;
    li.setAttribute("id", "task");
    ul.appendChild(li);
    // alert(li.id);
    inputTask.value = "";
    e.preventDefault();
  }
}

console.log(tasks);
