// =========================== Dark Mode Toggle Button ===========================

// Function to apply the theme
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector("header").classList.add("dark-mode");
    document.getElementById("darkModeToggle").checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    document.querySelector("header").classList.remove("dark-mode");
    document.getElementById("darkModeToggle").checked = false;
  }
}

// Function to toggle dark mode
function toggleDarkMode() {
  if (document.body.classList.contains("dark-mode")) {
    applyTheme("light");
    localStorage.setItem("theme", "light");
  } else {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Check the saved theme from local storage or apply system default
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    // Apply saved theme
    applyTheme(savedTheme);
  } else {
    // Apply system preference if no theme is saved
    applyTheme(prefersDarkMode ? "dark" : "light");
  }
}

// Add event listener to the toggle button
document
  .getElementById("darkModeToggle")
  .addEventListener("change", toggleDarkMode);

// Listen for changes in system theme preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (!localStorage.getItem("theme")) {
      // Only apply system theme if no custom theme is saved
      applyTheme(event.matches ? "dark" : "light");
    }
  });

// Load the theme on page load
loadTheme();

// =========================== Age Updation ===========================

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

document.addEventListener("DOMContentLoaded", function () {
  const birthDate = "2001-02-10"; // Replace with your birth date
  const ageElement = document.getElementById("age");
  ageElement.innerHTML = calculateAge(birthDate);
});

// =========================== Windows Scroller ===========================

$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $("header").toggleClass("toggle");
  });

  $(window).on("scroll load", () => {
    $("#menu").removeClass("fa-times");
    $("header").removeClass("toggle");

    if ($(window).scrollTop() > 0) {
      $(".top").show();
    } else {
      $(".top").hide();
    }

    // Check if header is overlapping content
    var headerHeight = $("header").outerHeight();
    var mainOffset = $("main").offset();
    if (headerHeight > mainOffset) {
      $("header").css("z-index", "2");
      $("main").css("z-index", "1");
    } else {
      $("header").css("z-index", "1");
      $("main").css("z-index", "2");
    }
  });

  // Smooth Scrolling
  $('a[href*="#"]').on("click", (event) => {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });
});

// =========================== Text Typing ===========================

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 140 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 4;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 200;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");

    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

// =========================== Technologies Skills Bar ===========================

$(document).ready(function () {
  $(".progress-bar").each(function () {
    $(this)
      .find(".progress-content")
      .animate(
        {
          width: $(this).attr("data-percentage"),
        },
        2000
      );

    $(this)
      .find(".progress-number-mark")
      .animate(
        { left: $(this).attr("data-percentage") },
        {
          duration: 2000,
          step: function (now, fx) {
            var data = Math.round(now);
            $(this)
              .find(".percent")
              .html(data + "%");
          },
        }
      );
  });
});

// =========================== Scroll to Top ===========================

$(window).scroll(() => {
  if ($(this).scrollTop() >= 50) {
    $("#return-to-top").fadeIn(200);
  } else {
    $("#return-to-top").fadeOut(200);
  }
});

$("#return-to-top").click(() => {
  $("body,html").animate(
    {
      scrollTop: 0,
    },
    500
  );
});
