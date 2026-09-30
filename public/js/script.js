"use strict";

const body = document.querySelector("body");
const menuButton = document.querySelector("#menu-icon");

let headerBtnClicked = false;

menuButton.addEventListener("click", () => {
  body.style.transform = headerBtnClicked
    ? "translateX(0px)"
    : "translateX(300px)";

  headerBtnClicked = !headerBtnClicked;
});
