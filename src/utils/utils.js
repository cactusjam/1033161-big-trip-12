import {TypeParticle, ACTIVITY_TYPES} from "../constants.js";

const getTypeParticle = (type) => ACTIVITY_TYPES.includes(type)
  ? TypeParticle.ACTIVITY
  : TypeParticle.TRANSFER;

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

export const sortEventsByPrice = (priceA, priceB) => {
  return priceB.price - priceA.price;
};

export const sortEventsByTime = (eventA, eventB) => {
  const durationA = new Date(eventA.endDate) - new Date(eventA.startDate);
  const durationB = new Date(eventB.endDate) - new Date(eventB.startDate);

  return durationB - durationA;
};

export {getTypeParticle, getFirstUpperCase};
