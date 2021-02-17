"use strict";

import movie from "./movie.js";

const body = document.querySelector("body");
const hall = document.querySelector("#hall");
const choosingSeatSection = document.querySelector("#choosingSeat");

const confirmTicketSection = document.querySelector("#confirmTicket");
const orderListSection = document.querySelector("#orderListSection");

const readMoreAboutMovieButton = document.querySelector("#btnReadMore");
const buyTicketButton = document.querySelector("#buyTicket");

const movieTitle = document.querySelector("#movieTitle").innerHTML;

// =================================================================

const addIDToElement = (element, id) => {
  element.setAttribute("id", id);
};

const addClassToElement = (element, className) => {
  element.classList.add(`${className}`);
};

const removeClassFromElement = (element, className) => {
  element.classList.remove(`${className}`);
};

const createDOMElement = (elementType, content, className) => {
  return `<${elementType} class = "${className}">${content}</${elementType}>`;
};

const fillElementByContent = (element, content) => {
  element.innerHTML = content;
};

// const createModalElementContent = (contentSource, contentItemClass) => {
//   let content = "";
//   contentSource.forEach((line) => {
//     content += `<p class="${contentItemClass}">${line}</p>`;
//   });
//   return content;
// };

const getContentFromObject = (object, typeOfItem, className) => {
  let content = "";
  Object.keys(object).forEach((key) => {
    content += createDOMElement(
      typeOfItem,
      `${key} : ${object[key]}`,
      className
    );
  });
  return content;
};

const createControlElements = (buttonSet) => {
  let controlElements = "";
  buttonSet.forEach((button) => {
    controlElements += `<a id="${button[0]}" class="siteButton siteButton-text" href="#">${button[1]}</a>`;
  });
  return controlElements;
};

const createModalElement = (
  sectionID,
  sectionClass,
  sectionTitleClass,
  sectionTitleContent,
  contentWrapperClass,
  createContentFunction,
  createControlElementsFunction
) => {
  const content = `<h3 class="${sectionTitleClass}">${sectionTitleContent}</h3>
      <div class="${contentWrapperClass}">${createContentFunction()}</div>
      <div class="flexRow flexRow-center">${createControlElementsFunction()}</div>`;
  let modalElement = document.createElement("section");
  sectionClass.split(" ").forEach((className) => {
    addClassToElement(modalElement, className);
  });
  addIDToElement(modalElement, sectionID);
  fillElementByContent(modalElement, content);
  return modalElement;
};

const addModalElementToPage = (modalElement) => {
  body.appendChild(modalElement);
};

const showNextScreen = (
  currentElement,
  animationForCurrentElement,
  nextElement,
  animationForNextElement,
  callback
) => {
  currentElement.addEventListener(
    "animationend",
    () => {
      addClassToElement(currentElement, "d-none");
      removeClassFromElement(currentElement, animationForCurrentElement);

      removeClassFromElement(nextElement, "d-none");
      addClassToElement(nextElement, animationForNextElement);
    },
    { once: true }
  );
  nextElement.addEventListener(
    "animationend",
    () => {
      removeClassFromElement(nextElement, animationForNextElement);
      callback && callback();
    },
    { once: true }
  );
  addClassToElement(currentElement, animationForCurrentElement);
};

const changeVisualizationInOrderOverflowContent = (element) => {
  const getWindowHeight = document.documentElement.clientHeight;
  const getElementHeight = element.offsetHeight;

  if (getWindowHeight > getElementHeight) {
    removeClassFromElement(body, "h-auto");
  } else {
    addClassToElement(body, "h-auto");
  }
};

const getChosenSeats = () => {
  return hall.querySelectorAll("input:checked");
};

const getChosenAttributes = (attributeID) => {
  const chosenAttribute = document.querySelector(attributeID);
  return chosenAttribute.querySelector("input:checked").defaultValue;
};

const createMovieDescriptionScreenContent = () => {
  return `
  <div class="movieDescription__textContent">
  ${getContentFromObject(
    movie["readMoreText"],
    "p",
    "movieDescription__element"
  )}
  </div>
  <div class="movieDescription__posterContent">
    <img class="movieDescription__poster" src="${
      movie["readMorePoster"]["poster image"]
    }" alt="${movie["readMorePoster"]["poster alt"]}"/>
  </div>
  `;
};

const createTicket = (seatNumber) => {
  return `<article class="ticket">
          <div class="ticket__number ticket__number-top">
            <p class="ticket__numberTitle">
              TICKET NO: <span class="ticket__numberValue">01-02-356-79AB</span>
            </p>
          </div>
          <div class="ticket__body">
            <div class="ticket__bodyTopSection">
              <div class="ticket__bodyBarcode">
                <img
                  class="ticket__barcode"
                  src="./img/bar-code.svg"
                  alt="barcode of your ticket"
                />
                <p class="ticket__barcodeValue">654189416541</p>
              </div>
              <div class="ticket__bodyImg">
                <p class="ticket__bodySubTitle">ADMIT ONE</p>
                <h4 class="ticket__bodyTitle">CINEMA TICKET</h4>
              </div>
            </div>
            <div class="ticket__bodyBottomSection">
              <div class="ticket__bodyCinemaBrandBox">
                <img
                  class="ticket__cinemaBrand"
                  src="./img/clapperboard.svg"
                  alt="cinema theater brand label - clapperboard"
                />
              </div>
              <div class="ticket__bodyMovieData">
                <p class="ticket__bodyMovieTitle">${movieTitle}</p>
                <p class="ticket__bodyHallType">${getChosenAttributes(
                  "#hallType"
                )}</p>
              </div>
              <div class="ticket__bodyMovieDate">
                <div class="badge badge-data badge-ticket">
                  <p>Wed, 3</p>
                  <p>20:00</p>
                </div>
              </div>
              <div class="ticket__bodyMovieSeat">
                <p class="ticket__bodyMovieSeatTitle">SEAT NO:</p>
                <p class="ticket__bodyMovieSeatNumber">${seatNumber}</p>
              </div>
            </div>
          </div>
          <div class="ticket__number ticket__number-bottom">
            <p class="ticket__numberTitle">
              TICKET NO: <span class="ticket__numberValue">01-02-356-79AB</span>
            </p>
          </div>
        </article>`;
};

// const renderOrderList = () => {
//   fillElementByContent(orderListSection, "");

//   let orderContent = "";

//   getChosenSeats().forEach((ticket) => {
//     orderContent += createTicket(ticket.defaultValue);
//   });

//   fillElementByContent(orderListSection, orderContent);
// };
// =================================================================

readMoreAboutMovieButton.addEventListener("click", () => {

  const modalElement = createModalElement(
    "movieDescriptionSection",
    "movieDescription d-none",
    "movieDescription__title",
    movieTitle,
    "movieDescription__content",
    createMovieDescriptionScreenContent,
    createControlElements.bind(this, [["cancelTicketOrder", "Back"]])
  );
  addModalElementToPage(modalElement);

  const movieDescriptionSection = document.querySelector(
    "#movieDescriptionSection"
  );

  showNextScreen(
    choosingSeatSection,
    "hideAnimationForNextScreenVertical",
    movieDescriptionSection,
    "showAnimationForNextScreenVertical",
    changeVisualizationInOrderOverflowContent.bind(
      this,
      movieDescriptionSection
    )
  );
});

// buyTicketButton.addEventListener("transitionend", (e) => e.stopPropagation());

// buyTicketButton.addEventListener("click", () => {
//   renderOrderList();
//   showNextScreen(
//     choosingSeatSection,
//     "hideAnimationForNextScreenHorizontal",
//     confirmTicketSection,
//     "showAnimationForNextScreenHorizontal",
//     changeVisualizationInOrderOverflowContent.bind(this, confirmTicketSection)
//   );
// });
