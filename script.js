const toast = document.querySelector(".toast");
const form = document.querySelector("form");
const formGroups = document.querySelectorAll(".form-group");
const radioGroups = document.querySelectorAll(".query");

let formValid = true;
form.setAttribute("novalidate", "");

const changeRadioBg = () => {
  radioGroups.forEach((radioGroup) => {
    const radio = radioGroup.querySelector("input");
    if (radio.checked) {
      radioGroup.classList.add("radio-selected");
    } else {
      radioGroup.classList.remove("radio-selected");
    }
  });
};

const displayError = (formGroup, errorClass) => {
  const errMsg = formGroup.querySelector(errorClass);
  if (errMsg) {
    errMsg.classList.remove("hidden");
  }
};

const removeError = (formGroup) => {
  const errMsgs = formGroup.querySelectorAll(".error");
  errMsgs.forEach((errMsg) => {
    errMsg.classList.add("hidden");
  });
};

const validateGroup = (formGroup) => {
  const inputElement = formGroup.querySelector("input, textarea");
  const inputType = inputElement.type || "text";

  switch (inputType) {
    case "radio":
      let checked = false;
      const radioInputs = formGroup.querySelectorAll("input");
      radioInputs.forEach((input) => {
        if (input.checked) {
          checked = true;
        }
      });
      if (!checked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "checkbox":
      const checkInput = formGroup.querySelector("input");
      if (!checkInput.checked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "text":
      const textInput = formGroup.querySelector("input");
      if (textInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "textarea":
      const textareaInput = formGroup.querySelector("textarea");
      if (textareaInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "email":
      const emailInput = formGroup.querySelector("input");
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailInput.value.trim() === "") {
        displayError(formGroup, ".empty");
        formValid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        displayError(formGroup, ".valid");
        formValid = false;
      }
      break;

    default:
      break;
  }
};

const displayToast = () => {
  setTimeout(() => {
    toast.classList.remove("hidden");
  }, 10);
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("showToast") === "true") {
    displayToast();
    localStorage.removeItem("showToast");
  }
});

radioGroups.forEach((radioGroup) => {
  radioGroup.addEventListener("click", () => {
    const radioInput = radioGroup.querySelector("input");
    radioInput.checked = true;
    changeRadioBg();
    removeError(radioGroup.parentElement.parentElement);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValid = true;
  formGroups.forEach((formGroup) => {
    validateGroup(formGroup);
  });
  if (formValid) {
    localStorage.setItem("showToast", "true");
    form.submit();
  }
});

formGroups.forEach((formGroup) => {
  const inputs = formGroup.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      removeError(formGroup);
    });
    input.addEventListener("blur", () => {
      validateGroup(formGroup);
    });
  });
});

toast.addEventListener("click", () => {
  toast.classList.add("hidden");
});
