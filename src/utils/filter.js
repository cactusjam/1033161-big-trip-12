import {FilterType} from "../constants";
import moment from "moment";

export const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => {
    return moment(point.startDate).isAfter(new Date(), `day`);
  }),
  [FilterType.PAST]: (points) => points.filter((point) => {
    return moment(point.startDate).isBefore(new Date(), `day`);
  }),
  [FilterType.EVERYTHING]: (points) => points.slice()
};
