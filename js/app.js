"use strict";

const buyTicketButton = document.querySelector("#buyTicket");
const choosingSeatSection = document.querySelector("#choosingSeat");
const confirmTicketSection = document.querySelector("#confirmTicket");
const movieTitle = document.querySelector("#movieTitle");

const addClassToElement = (element, className) => {
  element.classList.add(`${className}`);
};

const removeClassFromElement = (element, className) => {
  element.classList.remove(`${className}`);
};

const showNextScreen = (currentElement, nextElement) => {
  currentElement.addEventListener(
    "animationend",
    () => {
      addClassToElement(currentElement, "d-none");
      removeClassFromElement(currentElement, "hideAnimationForNextScreen");

      removeClassFromElement(nextElement, "d-none");
      addClassToElement(nextElement, "showAnimationForNextScreen");
    },
    { once: true }
  );
    nextElement.addEventListener(
      "animationend",
      () => {
        removeClassFromElement(nextElement, "showAnimationForNextScreen");
      },
      { once: true }
    );
  addClassToElement(currentElement, "hideAnimationForNextScreen");
};

const fillTicketWithData = () => {

}


buyTicketButton.addEventListener("transitionend", (e) => e.stopPropagation());

buyTicketButton.addEventListener("click", () => {
  showNextScreen(choosingSeatSection, confirmTicketSection);
})
