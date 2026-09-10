//FRONTEND script for DOM manipulation
// archives inside the public folder are accesible for the DOM (browser)

"use strict";

/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector("body");
const menuButton = document.querySelector("#menu-icon");

let headerBtnClicked = false;

menuButton.addEventListener("click", () => {
  body.style.transform = headerBtnClicked
    ? "translateX(0px)"
    : "translateX(300px)";

  headerBtnClicked = !headerBtnClicked;
});
