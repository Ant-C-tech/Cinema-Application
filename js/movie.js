"use strict";

const movie = {
  title: "Vivarium",
  trailer: {
    "trailer src": "./video/trailer.mp4", //1920x1080
    "trailer poster": "./img/video-poster.jpg", //1920x1080
  },

  "poster section": {
    "main description": `On their search for the perfect home, Gemma \(Imogen Poots\) and Tom
        \(Jesse Eisenberg\) visit a new house in a labyrinthine suburban
        neighbourhood. When they attempt to leave, each road mysteriously takes
        them back to where they started, leading them on a mind-bending trip,
        trapped in a surreal nightmare.`,
    "IMBd rating": "5.8",
    "IMBd link": "https://www.imdb.com/title/tt8368406/",
    premiere: "2021-03-01",
    duration: "1h 39m",
    poster: {
      "poster src": "./img/poster.jpg", //750x1000
      "poster alt": "vivarium poster",
    },
  },

  "read more content": {
    text: {
      Directed: "Lorcan Finnegan",
      Produced: "John McDonnell, Brendan McCarthy",
      Screenplay: "Garret Shanley",
      Story: "Garret Shanley, Lorcan Finnegan",
      Starring: "Imogen Poots, Jesse Eisenberg",
      Music: "Kristian Eidnes Andersen",
      Cinematography: "MacGregor",
      Edited: "Tony Cranstoun",
      "Production companies":
        "XYZ Films, Fantastic Films, Frakas Productions, PingPong Film, VOO, BeTV",
      Distributed: "Vertigo Releasing",
      "Release date": "18 May 2019 (Cannes), 27 March 2020 (Ireland)",
      "Running time": "97 minutes",
      Country: "Ireland, Denmark, Belgium",
      Language: "English",
      "Box office": "$427,399",
    },
    poster: {
      "poster src": "./img/secondary-poster.jpg", //750x1125
      "poster alt": "vivarium poster",
    },
  },

  ticket: {
    "barcode src": "./img/bar-code.svg",
    "background src": "./img/poster-bg.jpg",
  },
};

export default movie;
