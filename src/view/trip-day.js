import {dateFormat, dayFormat} from "../utils/utils.js";
import {dates} from "../mock/const.js";

const createTripDayTemplate = (dayIndex) => {
  const startDate = dates[dayIndex].startDate;
  return (
    `<li class="trip-days__item js-days__item${dayIndex} day">
      <div class="day__info">
        <span class="day__counter">${dayIndex + 1}</span>
        <time class="day__date" datetime="${dateFormat(startDate)}">${dayFormat(startDate)}</time>
      </div>
    </li>`
  );
};

export {createTripDayTemplate};
