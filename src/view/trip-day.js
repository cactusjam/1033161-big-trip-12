import {getDayFormat} from "../utils/date.js";
import AbstractView from "./abstract.js";

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

export default class TripDay extends AbstractView {
  constructor(counter, startDate) {
    super();
    this._counter = counter;
    this._startDate = startDate;
  }

  getTemplate() {
    return createTripDayTemplate(this._counter, this._startDate);
  }
}
