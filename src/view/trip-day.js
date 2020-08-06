import {dateFormat, dayFormat} from "../utils/utils.js";
import {startDate} from "../mock/const.js";

const createTripDayTemplate = (dayIndex) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayIndex}</span>
        <time class="day__date" datetime="${dateFormat(startDate)}">${dayFormat(startDate)}</time>
      </div>
    </li>`
  );
};

export {createTripDayTemplate};
