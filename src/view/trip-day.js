import {getDayFormat} from "../utils/date.js";
import {createElement} from "../utils/dom.js";

const createTripDayTemplate = (counter, startDate) => {
  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${counter + 1}</span>
        <time class="day__date" datetime="${startDate.toISOString()}">${getDayFormat(startDate)}</time>
      </div>
    </li>`
  );
};

export default class TripDay {
  constructor(counter, startDate) {
    this._counter = counter;
    this._startDate = startDate;
    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._counter, this._startDate);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
