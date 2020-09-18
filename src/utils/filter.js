import {FilterType} from "../constants";

const filterTypeToPoints = {
  [FilterType.EVERYTHING]: (points, _currentDate) => points.slice(),
  [FilterType.FUTURE]: (points, currentDate) => points.filter((point) => point.startDate > currentDate),
  [FilterType.PAST]: (points, currentDate) => points.filter((point) => point.starDate <= currentDate)
};

export {filterTypeToPoints};
