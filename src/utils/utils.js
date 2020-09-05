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

const updateItemById = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {getTypeParticle, getFirstUpperCase, sortEventsByPrice, sortEventsByTime, updateItemById};
