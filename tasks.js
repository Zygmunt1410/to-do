const url = "http://localhost:4000/api/tasks";

const form1 = document.getElementById("add-task-form1");
const inputTask1 = document.getElementById("input-task1");
document.getElementById("btn-add-task1").addEventListener("click", addTask);

// na wejście na stronę:
// 1. pobranie tasków z bazy - GET TASKS
// 2. Pobrane taski są użyte do stworzenia listu ul z taskami, które już istnieją
// tak samo jak przy dodawaniu nowego taska
// 3. Obsługa dodawania nowego taska - POST TASKS na guziku 'Add Task'. Po udanym callu do
// API, pobranie znowu GET TASKS i wyświetlenie tasków tak jak w 2.

load();

async function load() {
  let tasks = await getTasks();
  drawTasks(tasks);
}

function addTask(e) {
  if (inputTask1.validity.valid) {
    console.log(e.target.value);
    //tasks.push(inputTask1.value);
    // let ul1 = document.getElementById("list1");
    let li1 = document.createElement("li");
    li1.className = "list-group-item";
    li1.innerHTML = `${inputTask1.value} <span class="badge badge-danger">X</span><span class="badge badge-warning">In Progress</span>
    <span class="badge badge-success">Done</span>`;
    li1.setAttribute("id", "task");
    form1.appendChild(li1);
    // alert(li.id);
    var newTask = {
      content: inputTask1.value,
      state: "new"
    };

    sendTaskToApi(task);
    inputTask1.value = "";

    e.preventDefault();
  }
}

async function sendTaskToApi(task) {
  console.log("Wysyłam task");

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(task) // body data type must match "Content-Type" header
  });

  console.log(response);
}

async function getTasks() {
  console.log("Pobieram taski");

  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer"
  });

  return response.json();
}

function drawTasks(tasks) {
  let ul1 = document.getElementById("list1");
  ul1.innerText = "";
  tasks.forEach(task => {
    let li1 = document.createElement("li");
    li1.className = "list-group-item";

    let deleteSpan = document.createElement("span");
    deleteSpan.setAttribute("class", "badge badge-danger");
    deleteSpan.innerText = "X";
    deleteSpan.addEventListener("click", deleteTask);

    let inProgressSpan = document.createElement("span");
    inProgressSpan.setAttribute("class", "badge badge-warning");
    inProgressSpan.innerText = "In Progress";
    inProgressSpan.addEventListener("click", moveToInProgressTask);

    let doneSpan = document.createElement("span");
    doneSpan.setAttribute("class", "badge badge-success");
    doneSpan.innerText = "Done";
    doneSpan.addEventListener("click", moveToDoneTask);

    li1.innerHTML = task.content + " ";
    li1.appendChild(deleteSpan);
    li1.appendChild(inProgressSpan);
    li1.appendChild(doneSpan);
    li1.setAttribute("id", task._id);
    ul1.appendChild(li1);
  });
}

// async function deleteTask(e) {
//   console.log("usuwam taska");
//   let taskId = e.target.parentElement.getAttribute("id");

//   const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
//     method: "DELETE", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json"
//     },
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer"
//   });

//   return response.json();
// }

function deleteTask(e) {
  let taskId = e.target.parentElement.getAttribute("id");
}

function moveToInProgressTask(e) {
  let taskId = e.target.parentElement.getAttribute("id");
}

function moveToDoneTask(e) {
  let taskId = e.target.parentElement.getAttribute("id");
}
