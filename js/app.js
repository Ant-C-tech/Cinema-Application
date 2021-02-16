"use strict";

const body = document.querySelector("body");
const choosingSeatSection = document.querySelector("#choosingSeat");
const confirmTicketSection = document.querySelector("#confirmTicket");
const orderContainer = document.querySelector("#order");

const buyTicketButton = document.querySelector("#buyTicket");

const movieTitle = document.querySelector("#movieTitle");

const addClassToElement = (element, className) => {
  element.classList.add(`${className}`);
};

const removeClassFromElement = (element, className) => {
  element.classList.remove(`${className}`);
};

const showNextScreen = (currentElement, nextElement, callback) => {
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
      callback && callback();
    },
    { once: true }
  );
  addClassToElement(currentElement, "hideAnimationForNextScreen");
};

const changeVisualizationAfterConfirmTicketSectionOverflow = () => {
  const getWindowHeight = document.documentElement.clientHeight;
  const getConfirmTicketSectionHeight = confirmTicketSection.offsetHeight;

  if (getWindowHeight > getConfirmTicketSectionHeight) {
    removeClassFromElement(body, "h-auto");
  } else {
    addClassToElement(body, "h-auto");
  }
};

const fillTicketWithData = () => {};

buyTicketButton.addEventListener("transitionend", (e) => e.stopPropagation());

buyTicketButton.addEventListener("click", () => {
  showNextScreen(
    choosingSeatSection,
    confirmTicketSection,
    changeVisualizationAfterConfirmTicketSectionOverflow
  );
});

//Если высота модального окна больше высоты боди - делать боди height:auto;
