import {getMonthFormat} from "../utils/date.js";
import moment from "moment";

const LIMIT_ROUTE_CITY = 3;

const getRoute = (points) => {
  const count = points.length;
  if (count === 0) {
    return ``;
  }

  if (count <= LIMIT_ROUTE_CITY) {
    return points.map((point) => point.destination.name).join(` — `);
  }

  return `${points[0].destination.name} — ... — ${points[count - 1].destination.name}`;
};

const getTripDateDuration = (points) => {
  if (!points.length) {
    return ``;
  }

  const startDate = points[0].startDate;
  const endDate = points[points.length - 1].endDate;

  const endString = startDate.getMonth() === endDate.getMonth()
    ? moment(endDate).format(`DD`)
    : moment(endDate).format(`DD MMM`);

  return `${getMonthFormat(startDate)}&nbsp;&mdash;&nbsp;${endString}`;
};

const getTotalTripCost = (points) => {
  let totalTripCost = 0;

  for (const point of points) {
    totalTripCost += point.price;

    if (point.services) {
      for (const services of point.services) {
        totalTripCost += services.price;
      }
    }
  }

  return totalTripCost;
};

export {getRoute, getTripDateDuration, getTotalTripCost};

