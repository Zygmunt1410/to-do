
function moveToTaskPage() {
    let registerPage = document.getElementById("register_container");
    let loginPage = document.getElementById("login_container");
    let taskPage = document.getElementById("tasks");
    loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");
    taskPage.classList.remove("hidden");
}

function movetoSingupPage() {
    document.getElementById("login_form").reset()
    let registerPage = document.getElementById("register_container");
    let loginPage = document.getElementById("login_container");
    loginPage.classList.add("hidden");
    registerPage.classList.remove("hidden");
}

function moveToLoginPage() {
    document.getElementById("register_form").reset()
    let registerPage = document.getElementById("register_container");
    let loginPage = document.getElementById("login_container");
    loginPage.classList.remove("hidden");
    registerPage.classList.add("hidden");
}

export { moveToTaskPage, movetoSingupPage, moveToLoginPage };