var signUpPage = document;
var userNameInput = signUpPage.querySelector("#user-name");
var userEmailInput = signUpPage.querySelector("#user-email");
var userPasswordInput = signUpPage.querySelector("#user-password");
var SignUPButton = signUpPage.querySelector("#signupButton");
var emailError = signUpPage.querySelector("#emailExistsError");
var validationError = signUpPage.querySelector("#validationError");
var signUpSuccessMsg = signUpPage.querySelector("#signUpSuccess");
var localStorageKey = "usersInfo";
var usersList = getLocalStorage() ? getLocalStorage() : [];

SignUPButton.addEventListener("click", function (e) {
  e.preventDefault();
  var userInfo = {
    name: userNameInput.value,
    email: userEmailInput.value,
    password: userPasswordInput.value,
  };
  if (checkValidations()) {
    if (!checkEmailExists(userInfo.email)) {
      emailError.classList.replace("d-block", "d-none");
      usersList.push(userInfo);
      setLocalStorage();
      clearInputs();
      signUpSuccessMsg.classList.replace("d-none", "d-block");
    } else {
      signUpSuccessMsg.classList.replace("d-block", "d-none");
      emailError.classList.replace("d-none", "d-block");
    }
  }
});

function setLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(usersList));
}
function getLocalStorage() {
  return JSON.parse(localStorage.getItem(localStorageKey));
}
function clearInputs() {
  userNameInput.value = "";
  userEmailInput.value = "";
  userPasswordInput.value = "";
}

function checkEmailExists(userEmail) {
  isEmailExist = false;
  for (let index = 0; index < usersList.length; index++) {
    if (userEmail === usersList[index].email) {
      isEmailExist = true;
    }
  }
  return isEmailExist;
}

function checkValidations() {
  if (
    userEmailInput.value === "" ||
    userEmailInput.value === "" ||
    userPasswordInput.value === ""
  ) {
    validationError.classList.replace("d-none", "d-block");
    return false;
  } else {
    validationError.classList.replace("d-block", "d-none");
    return true;
  }
}
