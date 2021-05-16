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
  "2021-10-04": {
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
  "2021-10-05": {
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
  "2021-10-06": {
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
  "2021-10-07": {
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
  "2021-10-08": {
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
  "2021-10-09": {
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
  "2021-10-10": {
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
  "2021-10-11": {
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
  "2021-10-12": {
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
  "2021-10-13": {
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
  "2021-10-14": {
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
