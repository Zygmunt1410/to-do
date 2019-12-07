const url = "http://localhost:4000/api/tasks";

const form1 = document.getElementById("add-task-form1");
const inputTask1 = document.getElementById("input-task1");
document.getElementById("btn-add-task1").addEventListener("click", addTask);

let tasks = [];

function addTask(e) {
  if (inputTask1.validity.valid) {
    //let task = document.getElementById("input-task").value;
    console.log(e.target.value);
    tasks.push(inputTask1.value);
    let ul1 = document.getElementById("list1");
    let li1 = document.createElement("li");
    li1.className = "list-group-item";
    li1.innerHTML = `${inputTask1.value} <span class="badge badge-danger">X</span><span class="badge badge-warning">In Progress</span>
    <span class="badge badge-success">Done</span>`;
    li1.setAttribute("id", "task");
    ul1.appendChild(li1);
    // alert(li.id);
    inputTask1.value = "";
    e.preventDefault();
  }
}

console.log(tasks);
