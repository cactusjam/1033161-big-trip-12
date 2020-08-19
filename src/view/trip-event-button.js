import {createElement} from "../utils/dom.js";

const createTripEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class TripEventButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventButtonTemplate();
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
