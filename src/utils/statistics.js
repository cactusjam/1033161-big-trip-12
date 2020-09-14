import {ActionIcon, ACTIVITY_TYPES} from "../constants.js";

const getPointByTypePrice = (points) => {
  const obj = {};
  points.forEach(({type, price}) => {
    if (obj[type]) {
      obj[ActionIcon[type]] += price;
    } else {
      obj[ActionIcon[type]] = price;
    }
  });

  return obj;
};

const getTravelTypeByRepeats = (points) => {
  const obj = {};

  points
    .filter(({type}) => !ACTIVITY_TYPES.includes(type))
    .forEach(({type}) => {
      if (obj[ActionIcon[type]]) {
        obj[ActionIcon[type]]++;
      } else {
        obj[ActionIcon[type]] = 1;
      }
    });

  return obj;
};


export {getPointByTypePrice, getTravelTypeByRepeats};
