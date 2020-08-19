import {createElement} from "../utils/dom.js";

const createTripDaysTemplate = () => {
  return (
    `<ul class="trip-days">
     </ul>`
  );
};

export default class TripDays {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createTripDaysTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
