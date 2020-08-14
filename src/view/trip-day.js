import {getDayFormat} from "../utils/utils.js";

const createTripDayTemplate = (counter, startDate) => {
  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${startDate.toISOString()}">${getDayFormat(startDate)}</time>
      </div>
    </li>`
  );
};

export {createTripDayTemplate};
