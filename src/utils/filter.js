import {FilterType} from "../constants";

const filterTypeToPoints = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points, currentDate) => points.filter((point) => point.startDate > currentDate),
  [FilterType.PAST]: (points, now) => points.filter(({startDate}) => startDate < now)
};

export {filterTypeToPoints};
