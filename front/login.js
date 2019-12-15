import { saveTokenToStorage, logout } from "./user-localStorage.js";
import { loadTasks } from "./tasks.js";
import { moveToTaskPage, movetoSingupPage } from "./helperFunction.js";

const urlAuth = "https://to-do-coders.herokuapp.com/api/auth";

let formLogout = document.getElementById("formLogout");
formLogout.addEventListener("click", logout);

const singup = document.getElementById("to_singup");
singup.addEventListener("click", movetoSingupPage);

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
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(user)
    });
    if (response.status == 200) {
      moveToTaskPage()
      let authResponse = await response.json();
      saveTokenToStorage(authResponse.token);
      loadTasks();
    } else {
      document.getElementById("message").innerText =
        "Incorrect email or password";
    }
  }
}




