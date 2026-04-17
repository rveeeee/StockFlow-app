const passwordInput = document.querySelector("#password");
const toggleButton = document.querySelector("#toggle-password");

toggleButton.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "Show";
  }
});
const modal = document.getElementById("forgotPasswordModal");
const forgotLink = document.querySelector(".forgot-password a");
const closeButtons = document.querySelectorAll(".forgot-close-modal");

// Open modal
forgotLink.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("active");
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const modal = this.closest(".modal-overlay");
    modal.classList.remove("active");
  });
});

// Close if user clicks the dark background
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

const firstStep = document.querySelector(".first-step");
const secondStep = document.querySelector(".second-step");
const thirdStep = document.querySelector(".third-step");
const forgotModal = document.getElementById("forgotPasswordModal");
const verifyModal = document.getElementById("verifyModal");
const setModal = document.getElementById("setModal");

// FIRST MODAL
firstStep.addEventListener("click", function () {
  forgotModal.classList.add("active");
});
// SECOND MODAL
secondStep.addEventListener("click", function () {
  forgotModal.classList.remove("active"); // hide first
  verifyModal.classList.add("active"); // show second
});
