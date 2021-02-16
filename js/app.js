"use strict";

const body = document.querySelector("body");
const hall = document.querySelector("#hall");
const choosingSeatSection = document.querySelector("#choosingSeat");
const movieDescriptionSection = document.querySelector(
  "#movieDescriptionSection"
);
const confirmTicketSection = document.querySelector("#confirmTicket");
const orderListSection = document.querySelector("#orderListSection");

const readMoreAboutMovieButton = document.querySelector("#btnReadMore");
const buyTicketButton = document.querySelector("#buyTicket");

const movieTitle = document.querySelector("#movieTitle").innerHTML;

const descriptionContentFromThirdPartyAPI = [
  "Directed by Lorcan Finnegan",
  "Produced by John McDonnell, Brendan McCarthy",
  "Screenplay by Garret Shanley",
  "Story by Garret Shanley, Lorcan Finnegan",
  "Starring: Imogen Poots, Jesse Eisenberg",
  "Music by Kristian Eidnes Andersen",
  "Cinematography: MacGregor",
  "Edited by Tony Cranstoun",
  "Production companies: XYZ Films, Fantastic Films, Frakas Productions, PingPong Film, VOO, BeTV",
  "Distributed by Vertigo Releasing",
  "Release date: 18 May 2019 (Cannes), 27 March 2020 (Ireland)",
  "Running time: 97 minutes",
  "Country: Ireland, Denmark, Belgium",
  "Language: English",
  "Box office: $427,399",
];
// =================================================================

const addClassToElement = (element, className) => {
  element.classList.add(`${className}`);
};

const removeClassFromElement = (element, className) => {
  element.classList.remove(`${className}`);
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

const fillElementByContent = (element, content) => {
  element.innerHTML = content;
};

const renderOrderList = () => {
  fillElementByContent(orderListSection, "");

  let orderContent = "";

  getChosenSeats().forEach((ticket) => {
    orderContent += createTicket(ticket.defaultValue);
  });

  fillElementByContent(orderListSection, orderContent);
};
// =================================================================

readMoreAboutMovieButton.addEventListener("click", () => {
  const title = document.querySelector("#movieDescriptionSectionTitle");
  const contentSection = document.querySelector("#movieDescriptionSectionContent");

  let content = ''
  descriptionContentFromThirdPartyAPI.forEach((line) => {
    content += `<p class="movieDescription__element">${line}</p>`;
  });

  fillElementByContent(title, movieTitle);
  fillElementByContent(contentSection, content);

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

buyTicketButton.addEventListener("transitionend", (e) => e.stopPropagation());

buyTicketButton.addEventListener("click", () => {
  renderOrderList();
  showNextScreen(
    choosingSeatSection,
    "hideAnimationForNextScreenHorizontal",
    confirmTicketSection,
    "showAnimationForNextScreenHorizontal",
    changeVisualizationInOrderOverflowContent.bind(this, confirmTicketSection)
  );
});
