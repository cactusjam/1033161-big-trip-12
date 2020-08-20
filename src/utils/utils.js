import {Activity} from "../mock/data.js";

const getParticle = (type) => {
  return (type === Activity.CHECK_IN || type === Activity.SIGHTSEEING || type === Activity.RESTAURANT) ? ` in ` : ` to `;
};

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

export {getParticle, getFirstUpperCase};
