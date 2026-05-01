document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SELECTION OF ELEMENTS ---
  const registerForm = document.querySelector("#create-user");
  const passwordInput = document.querySelector("#password");
  const toggleButton = document.querySelector("#toggle-password");

  // Forgot Password Modal Elements
  const forgotLink = document.querySelector(".forgot-password a");
  const forgotModal = document.getElementById("forgotPasswordModal");
  const verifyModal = document.getElementById("verifyModal");
  const newPasswordModal = document.getElementById("newPasswordModal");
  const closeButtons = document.querySelectorAll(".forgot-close-modal");

  // Modal Navigation
  const backToEmail = document.querySelector("#back-email");
  const backToVerify = document.querySelector("#back-verify");

  // --- 2. PASSWORD TOGGLE LOGIC ---
  if (toggleButton && passwordInput) {
    toggleButton.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggleButton.textContent = isPassword ? "Hide" : "Show";
    });
  }

  // --- 3. REGISTRATION FORM SUBMIT ---
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Submit triggered! Sending data to PHP...");

      const formData = new FormData(registerForm);

      try {
        const response = await fetch("../../backend/api/auth/register.php", {
          method: "POST",
          body: formData,
        });

        // Get raw text first to catch PHP errors
        const rawText = await response.text();
        console.log("Server Response:", rawText);

        // Try to parse as JSON
        const result = JSON.parse(rawText);

        if (result.status === "success") {
          alert("Salamat! " + result.message);
          window.location.href = "index.html";
        } else {
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error("System Error:", error);
        alert(
          "The server sent back an invalid response. Check the Console (F12) to see the PHP error.",
        );
      }
    });
  }

  // --- 4. MODAL LOGIC (Safety checked for Login Page) ---
  function openSpecificModal(targetModal) {
    if (!targetModal) return;
    [forgotModal, verifyModal, newPasswordModal].forEach((m) =>
      m?.classList.remove("active"),
    );
    targetModal.classList.add("active");
  }

  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      openSpecificModal(forgotModal);
    });
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest(".modal-overlay")?.classList.remove("active");
    });
  });

  if (backToEmail)
    backToEmail.addEventListener("click", () => openSpecificModal(forgotModal));
  if (backToVerify)
    backToVerify.addEventListener("click", () =>
      openSpecificModal(verifyModal),
    );

  // Close on overlay click
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
    }
  });
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      try {
        const response = await fetch("../../backend/api/auth/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        // Inside the login form submit event in auth.js
        if (result.status === "success") {
          // Store the full name as a single string
          const fullName = `${result.data.user.first_name} ${result.data.user.last_name}`;
          localStorage.setItem("userName", fullName);

          window.location.href = "dashboard.html";
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Check the console for details.");
      }
    });
  }
});
