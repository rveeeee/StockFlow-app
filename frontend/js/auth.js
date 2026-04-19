const passwordInput = document.querySelector("#password");
const toggleButton = document.querySelector("#toggle-password");
const forgotLink = document.querySelector(".forgot-password a");
const closeButtons = document.querySelectorAll(".forgot-close-modal");

const firstDots = document.querySelectorAll(".first-step");
const secondDots = document.querySelectorAll(".second-step");
const thirdDots = document.querySelectorAll(".third-step");

const forgotModal = document.getElementById("forgotPasswordModal");
const verifyModal = document.getElementById("verifyModal");
const newPasswordModal = document.getElementById("newPasswordModal");

const toggleNewPassword = document.querySelector("#toggle-password-new");
const newPasswordShow = document.querySelector("#modal-new-password");

const backToEmail = document.querySelector("#back-email");
const backToVerify = document.querySelector("#back-verify");
// Toggle password visibility
toggleButton.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "Show";
  }
});

// MASTER FUNCTION TO SWITCH MODALS
function openSpecificModal(targetModal) {
  forgotModal.classList.remove("active");
  verifyModal.classList.remove("active");
  newPasswordModal.classList.remove("active");
  targetModal.classList.add("active");
}

// Open forgot modal from login link
forgotLink.addEventListener("click", (e) => {
  e.preventDefault();
  openSpecificModal(forgotModal);
});

// Close buttons inside modals
closeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const modal = this.closest(".modal-overlay");
    modal.classList.remove("active");
  });
});

// Close when clicking dark overlay background
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("active");
  }
});

// Progress dot navigation
firstDots.forEach((dot) => {
  dot.addEventListener("click", () => openSpecificModal(forgotModal));
});

secondDots.forEach((dot) => {
  dot.addEventListener("click", () => openSpecificModal(verifyModal));
});

thirdDots.forEach((dot) => {
  dot.addEventListener("click", () => openSpecificModal(newPasswordModal));
});

backToEmail.addEventListener("click", function () {
  openSpecificModal(forgotModal);
});
backToVerify.addEventListener("click", function () {
  openSpecificModal(verifyModal);
});
toggleNewPassword.addEventListener("click", function () {
  if (newPasswordShow.type === "password") {
    newPasswordShow.type = "text";
    toggleNewPassword.textContent = "Hide";
  } else {
    newPasswordShow.type = "password";
    toggleNewPassword.textContent = "Show";
  }
});
