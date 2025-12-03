// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const yOffset = -80; // height of the nav
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      //Close the menu if it's open (for mobile)
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true,
        });
      }
    }
  });
});

// Sticky Navbar
const header = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Active Link on Scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150; // Navbar height
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Remove old states
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => input.classList.remove("is-invalid", "is-valid"));
    let isValid = true;

    // fullname
    const fullname = document.getElementById("fullname");
    if (fullname.value.trim().length < 3) {
      fullname.classList.add("is-invalid");
      isValid = false;
    } else {
      fullname.classList.add("is-valid");
    }

    // email
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("is-invalid");
      isValid = false;
    } else {
      email.classList.add("is-valid");
    }

    // phone
    const phone = document.getElementById("phone");
    const phonePattern = /^[0-9]{8,15}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phone.classList.add("is-invalid");
      isValid = false;
    } else {
      phone.classList.add("is-valid");
    }

    // terms checkbox
    const terms = document.getElementById("terms");
    if (!terms.checked) {
      terms.classList.add("is-invalid");
      isValid = false;
    } else {
      terms.classList.add("is-valid");
    }

    // select
    const select = document.getElementById("select-where");
    if (select.value === "") {
      select.classList.add("is-invalid");
      isValid = false;
    } else {
      select.classList.add("is-valid");
    }

    // رسالة النتيجة
    if (isValid) {
      message.textContent = "✅ Form submitted successfully!";
      message.classList.remove("text-danger");
      message.classList.add("text-success");
      form.reset();
      inputs.forEach((input) => input.classList.remove("is-valid"));
    } else {
      message.textContent = "⚠️ Please fill out all fields correctly.";
      message.classList.remove("text-success");
      message.classList.add("text-danger");
    }
  });
});
