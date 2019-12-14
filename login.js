import { saveTokenToStorage, logout } from "./user-localStorage.js";
import { loadTasks } from "./tasks.js";
const urlAuth = "http://localhost:4000/api/auth";

let formLogout = document.getElementById("formLogout");
formLogout.addEventListener("click", logout);

document
  .getElementById("submit-button-login")
  .addEventListener("click", userLogin);

async function userLogin(e) {
  let mail = document.getElementById("emaillogin");
  let pass = document.getElementById("passwordlogin");

  if (mail.validity.valid && pass.validity.valid) {
    e.preventDefault();

    let user = {};
    let email = document.getElementById("emaillogin").value;
    let password = document.getElementById("passwordlogin").value;

    user.email = email;
    user.password = password;

    const response = await fetch(urlAuth, {
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
      body: JSON.stringify(user) // body data type must match "Content-Type" header
    });
    console.log(response);
    if (response.status == 200) {
      let registerPage = document.getElementById("register_container");
      let loginPage = document.getElementById("login_container");
      let taskPage = document.getElementById("tasks");
      loginPage.classList.add("hidden");
      registerPage.classList.add("hidden");
      taskPage.classList.remove("hidden");
      let authResponse = await response.json();
      saveTokenToStorage(authResponse.token);
      loadTasks();
    } else {
      document.getElementById("message").innerText =
        "Incorrect email or password";
    }
  }
}

const singup = document.getElementById("to_singup");
singup.addEventListener("click", toSingup);

function toSingup() {
  let registerPage = document.getElementById("register_container");
  let loginPage = document.getElementById("login_container");
  loginPage.classList.add("hidden");
  registerPage.classList.remove("hidden");
}
