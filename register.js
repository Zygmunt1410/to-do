const urlUser = "http://localhost:4000/api/users";

document.getElementById("submit-button").addEventListener("click", submitForm);

async function submitForm(e) {

  user = document.getElementById("usernamesignup")
  mail = document.getElementById("emailsignup")
  pass = document.getElementById("passwordsignup")

  if (user.validity.valid && mail.validity.valid && pass.validity.valid && pass.validationMessage == '') {
    e.preventDefault();

    let user = {};
    name = document.getElementById("usernamesignup").value;
    email = document.getElementById("emailsignup").value;
    password = document.getElementById("passwordsignup").value;

    user.name = name;
    user.email = email;
    user.password = password;

    const response = await fetch(urlUser, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(user) // body data type must match "Content-Type" header

    });
    let registerPage = document.getElementById("register_container")
    let taskPage = document.getElementById("tasks")
    registerPage.classList.add("hidden")
    taskPage.classList.remove("hidden")

  } else {
    //alert("Adding user failed");
  }
}

var password = document.getElementById("passwordsignup")
var confirm_password = document.getElementById("passwordsignup_confirm");

function validatePassword() {
  if (password.value != confirm_password.value) {
    password.setCustomValidity("Passwords Don't Match");
  } else {
    password.setCustomValidity('');
  }
}
password.onkeyup = validatePassword;
confirm_password.onkeyup = validatePassword;