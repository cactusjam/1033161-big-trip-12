import {TypeParticle, ACTIVITY_TYPES} from "../constants.js";

const getTypeParticle = (type) => ACTIVITY_TYPES.includes(type)
  ? TypeParticle.ACTIVITY
  : TypeParticle.TRANSFER;

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

const sortEventsByPrice = (priceA, priceB) => {
  return priceB.price - priceA.price;
};

const sortEventsByTime = (eventA, eventB) => {
  const duration = (eventB.endDate - eventB.startDate) - (eventA.endDate - eventA.startDate);

  return duration;
};

const sortEventsByDate = (eventA, eventB) => {
  return eventA.startDate - eventB.startDate;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export {getTypeParticle, getFirstUpperCase, sortEventsByPrice, sortEventsByTime, sortEventsByDate, generateId};
