"use strict";

import movie from "./movie.js";

const body = document.querySelector("body");
const choosingSeatSection = document.querySelector("#choosingSeat");

const readMoreAboutMovieButton = document.querySelector("#btnReadMore");
const buyTicketButton = document.querySelector("#buyTicket");

const movieTitleContent = document.querySelector("#movieTitle").innerHTML;

const order = {
  "hall type": "",
  date: "",
  time: "",
  seats: "",
};

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

const addModalElementToPage = (modalElement) => {
  body.appendChild(modalElement);
};

const createDoomElementsFromObject = (object, typeOfItem, className) => {
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

const getDataForUserOrderObject = () => {
  const getChosenAttributes = (attributeID) => {
    const chosenAttribute = document.querySelector(
      `${attributeID} input:checked`
    ).defaultValue;
    return chosenAttribute;
  };

  const getChosenSeats = () => {
    return Array.from(document.querySelectorAll("#hall input:checked")).map(
      (seat) => seat.defaultValue
    );
  };

  order["hall type"] = getChosenAttributes("#hallType");
  order["date"] = new Date(getChosenAttributes("#movieDate"));
  order["time"] = getChosenAttributes("#movieTime");
  order["seats"] = getChosenSeats();
};

const cleanUserOrderObject = () => {
  order["hall type"] = "";
  order["date"] = "";
  order["time"] = "";
  order["seats"] = "";
};

// =================================================================

const changeContent = (targetElement, content) => {
  targetElement.addEventListener('transitionend', () => {
    targetElement.innerHTML = content
    removeClassFromElement(targetElement, "opacityHide");
  })
  addClassToElement(targetElement, "opacityHide");
}

const changeScreen = (
  currentElement,
  animationForCurrentElement,
  positionCurrentElement,
  nextElement,
  animationForNextElement,
  positionNextElement,
  callback
) => {
  currentElement.addEventListener(
    "animationend",
    () => {
      addClassToElement(currentElement, positionCurrentElement);
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
      removeClassFromElement(nextElement, positionNextElement);
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

// =================================================================

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
  modalElement.innerHTML = content;
  return modalElement;
};

const createReadMoreScreenContent = () => {
  return `
  <div class="movieDescription__textContent">
  ${createDoomElementsFromObject(
    movie["read more content"]["text"],
    "p",
    "movieDescription__element"
  )}
  </div>
  <div class="movieDescription__posterContent">
    <img class="movieDescription__poster" src="${
      movie["read more content"]["poster"]["poster src"]
    }" alt="${movie["read more content"]["poster"]["poster alt"]}"/>
  </div>
  `;
};

const createTicket = (hall, date, time, seat) => {
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
                <p class="ticket__bodyMovieTitle">${movieTitleContent}</p>
                <p class="ticket__bodyHallType">${hall}</p>
              </div>
              <div class="ticket__bodyMovieDate">
                <div class="badge badge-data badge-ticket">
                  <p>${date
                    .toDateString()
                    .split(" ")
                    .splice(0, 3)
                    .join(" ")}</p>
                  <p>${time}</p>
                </div>
              </div>
              <div class="ticket__bodyMovieSeat">
                <p class="ticket__bodyMovieSeatTitle">SEAT NO:</p>
                <p class="ticket__bodyMovieSeatNumber">${seat}</p>
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

const createOrderListContent = () => {
  let content = "";
  order["seats"].forEach((seat) => {
    content += createTicket(
      order["hall type"],
      order["date"],
      order["time"],
      seat
    );
  });
  return content;
};

// =================================================================
// =================================================================
// =================================================================

const dateSliderInit = () => {
  const sliderShowedLength = 5;
  const movieDateSection = document.querySelector("#movieDate");
  const hintElement = document.querySelector("#chosenDate");
  const dateListWrapper = document.querySelector("#dateListWrapper");
  const sliderElementsCollection = document.querySelectorAll(
    ".movieDate__radio"
  );
  const sliderElementWidth = sliderElementsCollection[0].offsetWidth;

  const nextDayButton = document.querySelector("#nextDayBtn");
  const previousDayButton = document.querySelector("#previousDayBtn");

  let currentFirstElementIndex = 0;
  dateListWrapper.style.left = 0;

  const getSliderPosition = () => {
    return (dateListWrapper.style.left =
      -(currentFirstElementIndex * sliderElementWidth) + "px");
  };

  const checkButtonsIsAvailable = () => {
    if (currentFirstElementIndex < 1) {
      addClassToElement(previousDayButton, "btnMovieDate-disabled");
      previousDayButton.setAttribute("tabindex", "-1");
    } else {
      removeClassFromElement(previousDayButton, "btnMovieDate-disabled");
      previousDayButton.setAttribute("tabindex", "0");
    }
    if (
      currentFirstElementIndex >
      sliderElementsCollection.length - sliderShowedLength - 1
    ) {
      addClassToElement(nextDayButton, "btnMovieDate-disabled");
      nextDayButton.setAttribute("tabindex", "-1");
    } else {
      removeClassFromElement(nextDayButton, "btnMovieDate-disabled");
      nextDayButton.setAttribute("tabindex", "0");
    }
  };

  movieDateSection.addEventListener("click", function ({ target }) {
    if (target.getAttribute("id") === "nextDayBtn") {
      currentFirstElementIndex++;
      getSliderPosition();
      checkButtonsIsAvailable();
    } else if (target.getAttribute("id") === "previousDayBtn") {
      currentFirstElementIndex--;
      getSliderPosition();
      checkButtonsIsAvailable();
    } else if (target.classList.contains("movieDate__radioInput")) {
      const hintContent = new Date(target.defaultValue)
        .toDateString()
        .split(" ")
        .splice(0, 3)
        .join(" ");
      changeContent(hintElement, hintContent);
    }
  });

  checkButtonsIsAvailable();
};

dateSliderInit();

readMoreAboutMovieButton.addEventListener("click", () => {
  const modalElement = createModalElement(
    "movieDescriptionSection",
    "movieDescription angle-90_vertical d-none",
    "movieDescription__title",
    movieTitleContent,
    "movieDescription__content",
    createReadMoreScreenContent,
    createControlElements.bind(this, [["backToMainPageFromReadMore", "Back"]])
  );
  addModalElementToPage(modalElement);

  const movieDescriptionSection = document.querySelector(
    "#movieDescriptionSection"
  );

  changeScreen(
    choosingSeatSection,
    "hideAnimationForNextScreenVertical",
    "angle90_vertical",
    movieDescriptionSection,
    "showAnimationForNextScreenVertical",
    "angle-90_vertical",
    changeVisualizationInOrderOverflowContent.bind(
      this,
      movieDescriptionSection
    )
  );

  const backButton = document.querySelector("#backToMainPageFromReadMore");

  backButton.addEventListener(
    "click",
    () => {
      changeScreen(
        movieDescriptionSection,
        "hideAnimationForPreviousScreenVertical",
        "angle-90_vertical",
        choosingSeatSection,
        "showAnimationForPreviousScreenVertical",
        "angle90_vertical",
        changeVisualizationInOrderOverflowContent.bind(
          this,
          choosingSeatSection
        )
      );
    },
    { once: true }
  );
});

buyTicketButton.addEventListener("transitionend", (e) => e.stopPropagation());

buyTicketButton.addEventListener("click", () => {
  getDataForUserOrderObject();

  const modalElement = createModalElement(
    "confirmTicket",
    "confirmTicket angle-90_horizontal d-none",
    "confirmTicket__title",
    "Your order:",
    "movieDescription__content",
    createOrderListContent,
    createControlElements.bind(this, [
      ["backToMainPageFromOrderList", "Cancel"],
      ["confirmOrder", "Take it"],
    ])
  );
  addModalElementToPage(modalElement);

  const confirmTicketSection = document.querySelector("#confirmTicket");

  changeScreen(
    choosingSeatSection,
    "hideAnimationForNextScreenHorizontal",
    "angle90_horizontal",
    confirmTicketSection,
    "showAnimationForNextScreenHorizontal",
    "angle-90_horizontal",
    changeVisualizationInOrderOverflowContent.bind(this, confirmTicketSection)
  );

  const cancelButton = document.querySelector("#backToMainPageFromOrderList");

  cancelButton.addEventListener(
    "click",
    () => {
      changeScreen(
        confirmTicketSection,
        "hideAnimationForPreviousScreenHorizontal",
        "angle-90_horizontal",
        choosingSeatSection,
        "showAnimationForPreviousScreenHorizontal",
        "angle90_horizontal",
        changeVisualizationInOrderOverflowContent.bind(
          this,
          choosingSeatSection
        )
      );
      cleanUserOrderObject();
    },
    { once: true }
  );
});
