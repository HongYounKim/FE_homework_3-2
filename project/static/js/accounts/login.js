document.addEventListener("DOMContentLoaded", () => {
  const loginIdInput = document.getElementById("user-id");
  const loginPwInput = document.getElementById("user-pw");
  const loginBtn = document.getElementById("loginBtn");

  function checkLoginConditions() {
    const idFilled = loginIdInput.value.trim() !== "";
    const pwFilled = loginPwInput.value.trim() !== "";

    const allFilled = idFilled && pwFilled;

    if (allFilled) {
      loginBtn.disabled = false;
      loginBtn.classList.add("active");
    } else {
      loginBtn.disabled = true;
      loginBtn.classList.remove("active");
    }
  }

  loginIdInput.addEventListener("input", checkLoginConditions);
  loginPwInput.addEventListener("input", checkLoginConditions);
});
