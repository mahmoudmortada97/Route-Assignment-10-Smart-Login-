var signInPage = document;
var userEmailInput = signInPage.querySelector("#user-email");
var userPasswordInput = signInPage.querySelector("#user-password");
var logInButton = signInPage.querySelector("#loginBtn");
var validationError = signInPage.querySelector("#validationError");
var signInErrorMessage = signInPage.querySelector("#signInFailedError");
var localStorageKey = "usersInfo";

var usersList = getLocalStorage() ? getLocalStorage() : [];

logInButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (checkValidations()) {
    var currentUser = {
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };
    if (checkUserExists(currentUser)) {
      localStorage.setItem("currentUserName", currentUser.name);
      window.location.href = "../welcomePage.html";
    }
  }
});

//* Get all users Information
function getLocalStorage() {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

//* Check if ther user info in LocalStorage
function checkUserExists(currentUser) {
  isUserExists = false;
  for (let index = 0; index < usersList.length; index++) {
    if (
      currentUser.email === usersList[index].email &&
      currentUser.password === usersList[index].password
    ) {
      currentUser.name = usersList[index].name;
      isUserExists = true;
    }
  }
  if (isUserExists) {
    return true;
  } else {
    signInErrorMessage.classList.replace("d-none", "d-block");
    return false;
  }
}

//* All Inputs are required Message
function checkValidations() {
  if (userEmailInput.value === "" || userPasswordInput.value === "") {
    validationError.classList.replace("d-none", "d-block");
    return false;
  } else {
    validationError.classList.replace("d-block", "d-none");

    return true;
  }
}
