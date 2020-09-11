import AbstractView from "./abstract.js";

const createTripEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class AddEventButtonView extends AbstractView {
  constructor() {
    super();

    this._elementClickHandler = this._elementClickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventButtonTemplate();
  }

  _elementClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClick();
  }

  setClickHandler(callback) {
    this._callback.buttonClick = callback;

    this.getElement().addEventListener(`click`, this._elementClickHandler);
  }
}
