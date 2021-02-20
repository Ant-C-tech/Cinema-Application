"use strict";

import movie from "./movie.js";

const body = document.querySelector("body");
const main = document.querySelector("main");
// const choosingSeatSection = document.querySelector("#choosingSeat");

// const readMoreAboutMovieButton = document.querySelector("#btnReadMore");
// const buyTicketButton = document.querySelector("#buyTicket");


const order = {
  "hall type": "",
  date: "",
  time: "",
  seats: "",
  barcode: "",
  ticketNumber: "",
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
  const minBarcode = 1000000000;
  const maxBarcode = 9999999999;
  const ticketFirstPartNumberMin = 10;
  const ticketFirstPartNumberMax = 99;
  const ticketSecondPartNumberMin = 100;
  const ticketSecondPartNumberMax = 999;
  const ticketThirdPartNumberLength = 6;

  const chosenNumbers = document.querySelectorAll("#hall input:checked");

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomCharNumberString = (length) => {
    return Math.random().toString(36).substr(2, length).toUpperCase();
  };

  const getChosenAttributes = (attributeID) => {
    const chosenAttribute = document.querySelector(
      `${attributeID} input:checked`
    ).defaultValue;
    return chosenAttribute;
  };

  const getChosenSeats = () => {
    return Array.from(chosenNumbers).map((seat) => seat.defaultValue);
  };

  const createBarcodeNumber = () => {
    const barcodeNumber = [];

    Array.from(chosenNumbers).forEach(() =>
      barcodeNumber.push(getRandomInteger(minBarcode, maxBarcode))
    );

    return barcodeNumber;
  };

  const createTicketNumber = () => {
    const ticketNumber = [];

    Array.from(chosenNumbers).forEach(() =>
      ticketNumber.push(
        `${getRandomInteger(
          ticketFirstPartNumberMin,
          ticketFirstPartNumberMax
        )}-${getRandomInteger(
          ticketSecondPartNumberMin,
          ticketSecondPartNumberMax
        )}-${getRandomCharNumberString(ticketThirdPartNumberLength)}`
      )
    );

    return ticketNumber;
  };

  order["hall type"] = getChosenAttributes("#hallType");
  order["date"] = new Date(getChosenAttributes("#movieDate"));
  order["time"] = getChosenAttributes("#movieTime");
  order["seats"] = getChosenSeats();
  order["barcode"] = createBarcodeNumber();
  order["ticketNumber"] = createTicketNumber();
};

const cleanUserOrderObject = () => {
  order["hall type"] = "";
  order["date"] = "";
  order["time"] = "";
  order["seats"] = "";
  order["barcode"] = "";
  order["ticketNumber"] = "";
};

// =================================================================

const changeContent = (targetElement, content) => {
  targetElement.addEventListener("transitionend", () => {
    targetElement.innerHTML = content;
    removeClassFromElement(targetElement, "opacityHide");
  });
  addClassToElement(targetElement, "opacityHide");
};

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

const trailerContent =  `
      <video id="trailer"
      preload="auto"
      autoplay
      muted
      loop
      poster="${movie["trailer"]["trailer poster"]}"
      class="trailer"
    >
      <source id="trailerSource" src="${movie["trailer"]["trailer src"]}" type="video/mp4" />
    </video>
  `;

const createSeatBookingScreen = () => {
  return `
      <section class="posterSection">
        <div class="textContent">
          <h2 id="movieTitle" class="textContent__title">Vivarium</h2>
          <p class="textContent__description">
            On their search for the perfect home, Gemma (Imogen Poots) and Tom
            (Jesse Eisenberg) visit a new house in a labyrinthine suburban
            neighbourhood. When they attempt to leave, each road mysteriously
            takes them back to where they started, leading them on a
            mind-bending trip, trapped in a surreal nightmare.
          </p>
          <a href="#" id="btnReadMore" class="btnReadMore">&#9660;</a>
        </div>

        <a
          class="badgeWrapper"
          href="https://www.imdb.com/title/tt8368406/"
          target="_blank"
        >
          <div class="badge badge-rating">
            <p>IMBd<br />5.8</p>
          </div>
        </a>

        <div class="badge badge-data">
          <p>
            From<br /><time datetime="2021-03-01">01 March</time><br />1h 39m
          </p>
        </div>

        <img
          class="posterSection__img"
          src="img/poster.jpg"
          alt="vivarium poster"
        />
      </section>

      <section class="controlSection">

        <section id="hallType" class="movieType">
          <label class="movieType__radio">
            <input
              class="movieType__radioInput visually-hidden"
              type="radio"
              name="movie-type"
              value="General"
            />

            <span class="movieType__radioText">General</span>
          </label>

          <label class="movieType__radio">
            <input
              class="movieType__radioInput visually-hidden"
              type="radio"
              name="movie-type"
              value="Digital-2D"
            />

            <span class="movieType__radioText">Digital 2D</span>
          </label>

          <label class="movieType__radio">
            <input
              class="movieType__radioInput visually-hidden"
              type="radio"
              name="movie-type"
              value="IMAX-3D"
            />
            <span class="movieType__radioText">IMAX 3D</span>
          </label>

          <label class="movieType__radio">
            <input
              class="movieType__radioInput visually-hidden"
              type="radio"
              name="movie-type"
              value="Cinema 4Dx"
              disabled
            />
            <span class="movieType__radioText">Cinema 4Dx</span>
          </label>
        </section>

        <section id="movieDate" class="movieDate">
          <p id="chosenDate" class="movieDate__currentTime">
            <time datetime="2021-03-02">We are waiting you</time>
          </p>

          <div class="flexRow">
            <a
            id="previousDayBtn"
              href="#"
              class="btnMovieDate"
              tabindex="0"
            >
              &#9668;
            </a>

            <div class="movieDate__slider">
              <div id="dateListWrapper" class="flexRow movieDate__dateListWrapper">
                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-01"
                  />
                  <span
                    class="movieDate__radioSupText movieDate__radioSupText-current"
                  >
                    Today
                  </span>
                  <time class="movieDate__radioText" datetime="2021-03-01"
                    >1</time
                  >
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-02"
                  />
                  <span class="movieDate__radioSupText">Tue</span>
                  <time class="movieDate__radioText" datetime="2021-03-02"
                    >2</time
                  >
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-03"
                  />
                  <span class="movieDate__radioSupText">Wed</span>
                  <time class="movieDate__radioText" datetime="2021-03-03"
                    >3</time
                  >
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-04"
                  />
                  <span class="movieDate__radioSupText">Thu</span>
                  <time class="movieDate__radioText" datetime="2021-03-04"
                    >4</time
                  >
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-05"
                    disabled
                  />
                  <span class="movieDate__radioSupText">Fri</span>
                  <time class="movieDate__radioText" datetime="2021-03-05">
                    5
                  </time>
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-06"
                  />
                  <span class="movieDate__radioSupText">Sat</span>
                  <time class="movieDate__radioText" datetime="2021-03-06">
                    6
                  </time>
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-07"
                  />
                  <span class="movieDate__radioSupText">Sun</span>
                  <time class="movieDate__radioText" datetime="2021-03-07">
                    7
                  </time>
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-08"
                  />
                  <span class="movieDate__radioSupText">Mon</span>
                  <time class="movieDate__radioText" datetime="2021-03-08">
                    8
                  </time>
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-09"
                  />
                  <span class="movieDate__radioSupText">Tue</span>
                  <time class="movieDate__radioText" datetime="2021-03-09">
                    9
                  </time>
                </label>

                <label class="movieDate__radio">
                  <input
                    class="movieDate__radioInput visually-hidden"
                    type="radio"
                    name="movie-date"
                    value="2021-03-10"
                  />
                  <span class="movieDate__radioSupText">Wed</span>
                  <time class="movieDate__radioText" datetime="2021-03-10">
                    10
                  </time>
                </label>
              </div>
            </div>

            <a id="nextDayBtn" href="#" class="btnMovieDate" tabindex="0"> &#9658;</a>
          </div>
        </section>

        <section id="movieTime" class="movieTime">
          <p class="movieTime__title">Time</p>

          <div class="flexRow flexRow-between">
            <label class="movieTime__radio">
              <input
                class="movieTime__radioInput visually-hidden"
                type="radio"
                name="movie-time"
                value="14:00"
              />
              <time class="movieTime__radioText" datetime="14:00">14:00</time>
            </label>

            <label class="movieTime__radio">
              <input
                class="movieTime__radioInput visually-hidden"
                type="radio"
                name="movie-time"
                value="17:00"
              />
              <time class="movieTime__radioText" datetime="17:00">17:00</time>
            </label>

            <label class="movieTime__radio">
              <input
                class="movieTime__radioInput visually-hidden"
                type="radio"
                name="movie-time"
                value="20:00"
              />
              <time class="movieTime__radioText" datetime="20:00">20:00</time>
            </label>

            <label class="movieTime__radio">
              <input
                class="movieTime__radioInput visually-hidden"
                type="radio"
                name="movie-time"
                value="23:00"
                disabled
              />
              <time class="movieTime__radioText" datetime="23:00">23:00</time>
            </label>
          </div>
        </section>

        <section id="hall" class="hall">
          <p class="hall__screen">Screen</p>

          <div class="hall__row">
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="1"
                disabled
              />
              <span class="seat__mask">1</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="2"
                disabled
              />
              <span class="seat__mask">2</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="3"
                disabled
              />
              <span class="seat__mask">3</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="4"
              />
              <span class="seat__mask">4</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="5"
              />
              <span class="seat__mask">5</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="6"
              />
              <span class="seat__mask">6</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="7"
                disabled
              />
              <span class="seat__mask">7</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="8"
                disabled
              />
              <span class="seat__mask">8</span>
            </label>
          </div>

          <div class="hall__row">
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="9"
              />
              <span class="seat__mask">9</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="10"
              />
              <span class="seat__mask">10</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="11"
                disabled
              />
              <span class="seat__mask">11</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="12"
                disabled
              />
              <span class="seat__mask">12</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="13"
              />
              <span class="seat__mask">13</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="14"
                disabled
              />
              <span class="seat__mask">14</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="15"
              />
              <span class="seat__mask">15</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="16"
              />
              <span class="seat__mask">16</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="17"
              />
              <span class="seat__mask">17</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="18"
                disabled
              />
              <span class="seat__mask">18</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="19"
              />
              <span class="seat__mask">19</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="20"
                disabled
              />
              <span class="seat__mask">20</span>
            </label>
          </div>

          <div class="hall__row">
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="21"
              />
              <span class="seat__mask">21</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="22"
              />
              <span class="seat__mask">22</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="23"
                disabled
              />
              <span class="seat__mask">23</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="24"
                disabled
              />
              <span class="seat__mask">24</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="25"
                disabled
              />
              <span class="seat__mask">25</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="26"
                disabled
              />
              <span class="seat__mask">26</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="27"
              />
              <span class="seat__mask">27</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="28"
              />
              <span class="seat__mask">28</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="29"
              />
              <span class="seat__mask">29</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="30"
                disabled
              />
              <span class="seat__mask">30</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="31"
                disabled
              />
              <span class="seat__mask">31</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="32"
              />
              <span class="seat__mask">32</span>
            </label>
          </div>

          <div class="hall__row">
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="33"
                disabled
              />
              <span class="seat__mask">33</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="34"
              />
              <span class="seat__mask">34</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="35"
                disabled
              />
              <span class="seat__mask">35</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="36"
                disabled
              />
              <span class="seat__mask">36</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="37"
              />
              <span class="seat__mask">37</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="38"
              />
              <span class="seat__mask">38</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="39"
                disabled
              />
              <span class="seat__mask">39</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="40"
                disabled
              />
              <span class="seat__mask">40</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="41"
                disabled
              />
              <span class="seat__mask">41</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="42"
              />
              <span class="seat__mask">42</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="43"
              />
              <span class="seat__mask">43</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="44"
              />
              <span class="seat__mask">44</span>
            </label>
          </div>

          <div class="hall__row">
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="45"
              />
              <span class="seat__mask">45</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="46"
              />
              <span class="seat__mask">46</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="47"
              />
              <span class="seat__mask">47</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="48"
                disabled
              />
              <span class="seat__mask">48</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="49"
                disabled
              />
              <span class="seat__mask">49</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="50"
                disabled
              />
              <span class="seat__mask">50</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="51"
                disabled
              />
              <span class="seat__mask">51</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="52"
              />
              <span class="seat__mask">52</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="53"
              />
              <span class="seat__mask">53</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="54"
              />
              <span class="seat__mask">54</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="55"
              />
              <span class="seat__mask">55</span>
            </label>
            <label class="seat">
              <input
                class="seat__input visually-hidden"
                type="checkbox"
                value="56"
                disabled
              />
              <span class="seat__mask">56</span>
            </label>
          </div>

        </section>

        <section class="hall__legend">
          <p class="hall__legendItem hall__legendItem-available">Available</p>
          <p class="hall__legendItem hall__legendItem-taken">Taken</p>
          <p class="hall__legendItem hall__legendItem-selection">
            Your selection
          </p>
          <a id="buyTicket" class="siteButton" href="#"
            ><img
              class="siteButton__img"
              src="img/shopping-cart.svg"
              alt="shopping cart"
          /></a>
        </section>
      </section>
  `;
}

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

const createTicket = (hall, date, time, seat, barcode, ticket) => {
  return `<article class="ticket">
          <div class="ticket__number ticket__number-top">
            <p class="ticket__numberTitle">
              TICKET NO: <span class="ticket__numberValue">${ticket}</span>
            </p>
          </div>
          <div class="ticket__body">
            <div class="ticket__bodyTopSection">
              <div class="ticket__bodyBarcode">
                <img
                  class="ticket__barcode"
                  src='../img/bar-code.svg'
                  alt="barcode of your ticket"
                />
                <p class="ticket__barcodeValue">${barcode}</p>
              </div>
              <div class="ticket__bodyImg" style="background-image:url(${
                movie["ticket"]["background src"]
              });">
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
                <p class="ticket__bodyMovieTitle">${movie['title']}</p>
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
              TICKET NO: <span class="ticket__numberValue">${ticket}</span>
            </p>
          </div>
        </article>`;
};

const createOrderListContent = () => {
  let content = "";
  order["seats"].forEach((seat, index) => {
    content += createTicket(
      order["hall type"],
      order["date"],
      order["time"],
      seat,
      order["barcode"][index],
      order["ticketNumber"][index]
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

  const nextDayButton = document.querySelector("#nextDayBtn");
  const previousDayButton = document.querySelector("#previousDayBtn");

  let sliderElementWidth = sliderElementsCollection[0].offsetWidth;
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
      event.preventDefault();
    } else if (target.getAttribute("id") === "previousDayBtn") {
      currentFirstElementIndex--;
      getSliderPosition();
      checkButtonsIsAvailable();
      event.preventDefault();
    } else if (target.classList.contains("movieDate__radioInput")) {
      const hintContent = new Date(target.defaultValue)
        .toDateString()
        .split(" ")
        .splice(0, 3)
        .join(" ");
      changeContent(hintElement, hintContent);
    }
  });

  window.addEventListener("resize", () => {
    sliderElementWidth = sliderElementsCollection[0].offsetWidth;
  });

  checkButtonsIsAvailable();
};

// dateSliderInit();

// readMoreAboutMovieButton.addEventListener("click", () => {
//   const modalElement = createModalElement(
//     "movieDescriptionSection",
//     "movieDescription angle-90_vertical d-none",
//     "movieDescription__title",
//     movie['title'],
//     "movieDescription__content",
//     createReadMoreScreenContent,
//     createControlElements.bind(this, [["backToMainPageFromReadMore", "Back"]])
//   );
//   addModalElementToPage(modalElement);

//   const movieDescriptionSection = document.querySelector(
//     "#movieDescriptionSection"
//   );

//   changeScreen(
//     choosingSeatSection,
//     "hideAnimationForNextScreenVertical",
//     "angle90_vertical",
//     movieDescriptionSection,
//     "showAnimationForNextScreenVertical",
//     "angle-90_vertical",
//     changeVisualizationInOrderOverflowContent.bind(
//       this,
//       movieDescriptionSection
//     )
//   );

//   const backButton = document.querySelector("#backToMainPageFromReadMore");

//   backButton.addEventListener(
//     "click",
//     () => {
//       changeScreen(
//         movieDescriptionSection,
//         "hideAnimationForPreviousScreenVertical",
//         "angle-90_vertical",
//         choosingSeatSection,
//         "showAnimationForPreviousScreenVertical",
//         "angle90_vertical",
//         changeVisualizationInOrderOverflowContent.bind(
//           this,
//           choosingSeatSection
//         )
//       );
//     },
//     { once: true }
//   );
// });

// buyTicketButton.addEventListener("transitionend", (e) => e.stopPropagation());

// buyTicketButton.addEventListener("click", () => {
//   getDataForUserOrderObject();

//   const modalElement = createModalElement(
//     "confirmTicket",
//     "confirmTicket angle-90_horizontal d-none",
//     "confirmTicket__title",
//     "Your order:",
//     "movieDescription__content",
//     createOrderListContent,
//     createControlElements.bind(this, [
//       ["backToMainPageFromOrderList", "Cancel"],
//       ["confirmOrder", "Take it"],
//     ])
//   );
//   addModalElementToPage(modalElement);

//   const confirmTicketSection = document.querySelector("#confirmTicket");

//   changeScreen(
//     choosingSeatSection,
//     "hideAnimationForNextScreenHorizontal",
//     "angle90_horizontal",
//     confirmTicketSection,
//     "showAnimationForNextScreenHorizontal",
//     "angle-90_horizontal",
//     changeVisualizationInOrderOverflowContent.bind(this, confirmTicketSection)
//   );

//   const cancelButton = document.querySelector("#backToMainPageFromOrderList");

//   cancelButton.addEventListener(
//     "click",
//     () => {
//       changeScreen(
//         confirmTicketSection,
//         "hideAnimationForPreviousScreenHorizontal",
//         "angle-90_horizontal",
//         choosingSeatSection,
//         "showAnimationForPreviousScreenHorizontal",
//         "angle90_horizontal",
//         changeVisualizationInOrderOverflowContent.bind(
//           this,
//           choosingSeatSection
//         )
//       );
//       cleanUserOrderObject();
//     },
//     { once: true }
//   );
// });

main.insertAdjacentHTML("beforebegin", trailerContent);
main.innerHTML = createSeatBookingScreen();
