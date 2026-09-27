// ===== Mobile Navigation Menu =====

// Get the hamburger button and the menu list
var burger = document.getElementById("burger");
var navLinks = document.getElementById("navLinks");

// When the hamburger button is clicked, show or hide the menu
burger.onclick = function () {
  if (navLinks.className.indexOf("open") === -1) {
    // Menu is currently closed, so open it
    navLinks.className = navLinks.className + " open";
    burger.setAttribute("aria-expanded", "true");
  } else {
    // Menu is currently open, so close it
    navLinks.className = navLinks.className.replace(" open", "");
    burger.setAttribute("aria-expanded", "false");
  }
};

// Close the mobile menu when a link is clicked
var allNavLinkItems = navLinks.getElementsByTagName("a");
for (var i = 0; i < allNavLinkItems.length; i++) {
  allNavLinkItems[i].onclick = function () {
    navLinks.className = navLinks.className.replace(" open", "");
    burger.setAttribute("aria-expanded", "false");
  };
}


// ===== Contact Form Validation =====

var form = document.getElementById("contactForm");
var status = document.getElementById("formStatus");

// This function shows or hides the red error message for one field
function markField(fieldId, isValid) {
  var field = document.getElementById(fieldId);
  if (isValid) {
    field.className = "field"; // remove "invalid" if it was there
  } else {
    field.className = "field invalid";
  }
}

form.onsubmit = function (event) {
  // Stop the form from actually submitting/reloading the page
  event.preventDefault();

  // Get the values the user typed in, and remove extra spaces
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  // Check each field
  var isNameValid = name.length > 0;
  var isEmailValid = email.indexOf("@") > -1 && email.indexOf(".") > -1;
  var isMessageValid = message.length >= 10;

  // Show or hide error messages based on the checks above
  markField("nameField", isNameValid);
  markField("emailField", isEmailValid);
  markField("messageField", isMessageValid);

  // If everything is valid, "submit" the form
  if (isNameValid && isEmailValid && isMessageValid) {
    status.style.color = "#1F6F5C";
    status.textContent = "Thanks, " + name + " — your message has been sent.";
    form.reset();
  } else {
    status.style.color = "#c0392b";
    status.textContent = "Please fix the highlighted fields.";
  }
};