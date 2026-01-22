document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll(".navbar");

      navLinks.forEach((link) => {
        if (currentPath.includes(link.getAttribute("href"))) {
          link.classList.add("active");
        }
      });

      const darkModeBtn = document.getElementById("dark-mode-toggle");
      const body = document.body;

      if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if (darkModeBtn) darkModeBtn.innerText = "☀️";
      }

      if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
          body.classList.toggle("dark-mode");
          if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkModeBtn.innerText = "☀️";
          } else {
            localStorage.setItem("theme", "light");
            darkModeBtn.innerText = "🌙";
          }
        });
      }
    })
    .catch((error) => console.error("Navbar veya Dark Mode hatası:", error));
});
