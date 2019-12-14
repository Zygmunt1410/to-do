const urlUser = "https://to-do-coders.herokuapp.com/api/users";

document.getElementById("submit-button").addEventListener("click", submitForm);

async function submitForm(e) {
  user = document.getElementById("usernamesignup");
  mail = document.getElementById("emailsignup");
  pass = document.getElementById("passwordsignup");

  if (
    user.validity.valid &&
    mail.validity.valid &&
    pass.validity.valid &&
    pass.validationMessage == ""
  ) {
    e.preventDefault();

    let user = {};
    name = document.getElementById("usernamesignup").value;
    email = document.getElementById("emailsignup").value;
    password = document.getElementById("passwordsignup").value;

    user.name = name;
    user.email = email;
    user.password = password;

    const response = await fetch(urlUser, {
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
    console.log(response.body);

    let registerPage = document.getElementById("register_container");
    registerPage.classList.add("hidden");
    let login = document.getElementById("login_container");
    login.classList.remove("hidden");
  } else {
    //document.getElementById("message").innerText = "Incorrect email or password"
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
login.addEventListener("click", toLogin);

function toLogin() {
  let registerPage = document.getElementById("register_container");
  let loginPage = document.getElementById("login_container");
  loginPage.classList.remove("hidden");
  registerPage.classList.add("hidden");
}
