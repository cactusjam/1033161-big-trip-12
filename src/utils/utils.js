import {TypeParticle, ACTIVITY_TYPES} from "../constants.js";

const getTypeParticle = (type) => ACTIVITY_TYPES.includes(type)
  ? TypeParticle.ACTIVITY
  : TypeParticle.TRANSFER;

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

export {getTypeParticle, getFirstUpperCase};
