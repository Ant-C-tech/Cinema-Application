"use strict";

//Information about taken seats. Generating on server and getting after request.

// Emulate server work
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getArrayOfRandomIntWithRandomLength = () => {
    const arrayOfRandomInt = []
    for (let index = 0; index < getRandomIntInclusive(0,55); index++) {
        arrayOfRandomInt.push(getRandomIntInclusive(1,55))
    }
    return arrayOfRandomInt
}

// Result of server work
const takenSeatsState = {
  "2021-04-23": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-24": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-25": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-26": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-27": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-28": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-29": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-30": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-04-31": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-05-01": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
  "2021-05-02": {
    General: {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "Digital 2D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
    "IMAX 3D": {
      "14:00": getArrayOfRandomIntWithRandomLength(),
      "17:00": getArrayOfRandomIntWithRandomLength(),
      "20:00": getArrayOfRandomIntWithRandomLength(),
    },
  },
};

export default takenSeatsState;
