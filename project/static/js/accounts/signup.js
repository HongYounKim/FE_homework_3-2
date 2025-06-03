const idInput = document.getElementById("user-id");
const pwInput = document.getElementById("user-pw");
const pwCheckInput = document.getElementById("user-pw-check");
const signupBtn = document.getElementById("reBtn");
const pwCheckFail = document.querySelector(".pwcheck-fail");

function isValidPassword(pw) {
  const lengthCheck = pw.length >= 8;
  const letterCheck = /[a-zA-Z]/.test(pw);
  const numberCheck = /[0-9]/.test(pw);
  const specialCheck = /[@!?_\-]/.test(pw);
  return lengthCheck && letterCheck && numberCheck && specialCheck;
}

function checkAllConditions() {
  const id = idInput.value.trim();
  const pw = pwInput.value;
  const pwCheck = pwCheckInput.value;

  const isIdFilled = id !== "";
  const isPwFilled = pw !== "";
  const isPwValid = isValidPassword(pw);
  const isPwMatch = pw === pwCheck;

  if (pwCheck !== "") {
    if (!isPwMatch) {
      pwCheckFail.style.display = "block";
    } else {
      pwCheckFail.style.display = "none";
    }
  } else {
    pwCheckFail.style.display = "none";
  }

  const allValid = isIdFilled && isPwFilled && isPwValid && isPwMatch;

  if (allValid) {
    signupBtn.disabled = false;
    signupBtn.classList.add("active");
  } else {
    signupBtn.disabled = true;
    signupBtn.classList.remove("active");
  }
}

idInput.addEventListener("input", checkAllConditions);
pwInput.addEventListener("input", checkAllConditions);
pwCheckInput.addEventListener("input", checkAllConditions);
