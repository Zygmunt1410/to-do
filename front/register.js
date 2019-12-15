import { moveToLoginPage } from "./helperFunction.js";

const urlUser = "https://to-do-coders.herokuapp.com/api/users";

document.getElementById("submit-button").addEventListener("click", submitForm);

async function submitForm(e) {
  let user = document.getElementById("usernamesignup");
  let mail = document.getElementById("emailsignup");
  let pass = document.getElementById("passwordsignup");

  if (
    user.validity.valid &&
    mail.validity.valid &&
    pass.validity.valid &&
    pass.validationMessage == ""
  ) {
    e.preventDefault();

    let user = {};
    let name = document.getElementById("usernamesignup").value;
    let email = document.getElementById("emailsignup").value;
    let password = document.getElementById("passwordsignup").value;

    user.name = name;
    user.email = email;
    user.password = password;

    const response = await fetch(urlUser, {
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
    moveToLoginPage()
  }
}

var password = document.getElementById("passwordsignup");
var confirm_password = document.getElementById("passwordsignup_confirm");

function validatePassword() {
  if (password.value != confirm_password.value) {
    password.setCustomValidity("Passwords Don't Match");
  } else {
    password.setCustomValidity("");
  }
}
password.onkeyup = validatePassword;
confirm_password.onkeyup = validatePassword;

const login = document.getElementById("to_login");
login.addEventListener("click", moveToLoginPage);
