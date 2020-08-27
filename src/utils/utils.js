import {TypeParticle, ACTIVITY_TYPES} from "../constants.js";

const getTypeParticle = (type) => ACTIVITY_TYPES.includes(type)
  ? TypeParticle.ACTIVITY
  : TypeParticle.TRANSFER;

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

// const sortCardsByTimeDown = (pointA, pointB) => pointB.startDate - pointA.startDate;

// const sortCardsByPriceDown = (pointA, pointB) => pointB.price - pointA.price;

// const getWeightForNullDate = (dateA, dateB) => {
//   if (dateA === null && dateB === null) {
//     return 0;
//   }

//   if (dateA === null) {
//     return 1;
//   }

//   if (dateB === null) {
//     return -1;
//   }

//   return null;
// };

// const sortUp = (pointA, pointB) => {
//   const weight = getWeightForNullDate(pointA.startDate, pointB.startDate);

//   if (weight !== null) {
//     return weight;
//   }

//   return pointA.startDate.getTime() - pointB.startDate.getTime();
// };

// const sortDown = (pointA, pointB) => {
//   const weight = getWeightForNullDate(pointA.startDate, pointB.startDate);

//   if (weight !== null) {
//     return weight;
//   }

//   return pointB.startDate.getTime() - pointA.startDate.getTime();
// };

export const sortEventsByPrice = (priceA, priceB) => {
  return priceB.price - priceA.price;
};

export const sortEventsByTime = (eventA, eventB) => {
  const durationA = new Date(eventA.endDate) - new Date(eventA.startDate);
  const durationB = new Date(eventB.endDate) - new Date(eventB.startDate);

  return durationB - durationA;
};

export {getTypeParticle, getFirstUpperCase};
