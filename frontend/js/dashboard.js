document.addEventListener("DOMContentLoaded", () => {
  const displayName = document.getElementById("user-display-name");
  const savedName = localStorage.getItem("userName");

  if (savedName && displayName) {
    displayName.textContent = savedName;
  } else {
    // Optional: Redirect back to login if no name is found
    window.location.href = "index.html";
  }
});
