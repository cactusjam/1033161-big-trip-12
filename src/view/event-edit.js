import {convertDate} from "../utils/date.js";
import {getTypeParticle, getFirstUpperCase} from "../utils/utils.js";
import {TRANSFER_TYPES, ACTIVITY_TYPES} from "../constants.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_DESTINATION = {
  name: ``,
  description: ``,
  photos: []
};

const ButtonName = {
  CANCEL: `Cancel`,
  DELETE: `Delete`,
};

const createRadioTemplate = (cardType, legendTypes, pointId) => {
  return (
    legendTypes.map((legendType, legendIndex) => {
      return (`<div class="event__type-item">
        <input id="event-type-${legendType}-${pointId}-${legendIndex}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${legendType}" ${cardType === legendType ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${legendType}" for="event-type-${legendType}-${pointId}-${legendIndex}">${getFirstUpperCase(legendType)}</label>
      </div>`);
    }).join(``)
  );
};

const createDestinationTemplate = (destinations, pointType, destination, pointId) => {
  const typeName = getFirstUpperCase(pointType);
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${pointId}">
        ${typeName} ${getTypeParticle(pointType)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${pointId}">
      <datalist id="destination-list-${pointId}">
      ${destinations.map(({name}) => `<option value="${name}"></option>`).join(``)}
      </datalist>
    </div>`
  );
};

const createResetButtonTemplate = (isNewEvent) => {
  return (
    `<button class="event__reset-btn" type="reset">
      ${isNewEvent ? ButtonName.CANCEL : ButtonName.DELETE}
    </button>`
  );
};

const createEventEditTemplate = (pointData, destinations, isNewEvent) => {
  const {id, type, startDate, endDate, price, isFavorite, isActivated, destination, services} = pointData;
  return (
    `<form class="trip-events__item event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${createRadioTemplate(type, TRANSFER_TYPES, id)}
              </fieldset>
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${createRadioTemplate(type, ACTIVITY_TYPES)}
              </fieldset>
            </div>
          </div>
          ${createDestinationTemplate(destinations, type, destination, id)}
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertDate(startDate)}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertDate(endDate)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${createResetButtonTemplate(isNewEvent)}
          ${!isNewEvent ? `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
          <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
      : ``}
        </header>
        <section class="event__details">
        ${services.length > 0 ?
          `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
              ${services.map((offer) =>`
                <div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" value="${offer.type} name="event-offer-${offer.type}" ${isActivated ? `checked` : ``}>
                  <label class="event__offer-label" for="event-offer-${offer.type}-1">
                    <span class="event__offer-title">${offer.title}</span>
                    +
                    €&nbsp;<span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>
                `).join(``)}
              </div>
            </section>` : ``
        }
          ${destination.name.length > 0 ? `
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            ${destination.photos.length > 0 ? `
            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${destination.photos.map((photo) => `
                <img class="event__photo" src="${photo}" alt="Event photo">
              `).join(``)}
              </div>
            </div>` : ``}
          </section>` : ``}
        </section>
      </form>`
  );
};

export default class EventEdit extends SmartView {
  constructor(point, destinations = BLANK_DESTINATION, isNewEvent = false) {
    super();
    this._data = EventEdit.parsePointToData(point);
    this._destinations = destinations;
    this._isNewEvent = isNewEvent;
    this._datepicker = null;
    this._endDatePicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._rollDownButtonClickHandler = this._rollDownButtonClickHandler.bind(this);
    this._favoriteCheckboxClickHandler = this._favoriteCheckboxClickHandler.bind(this);
    this._typeListChangeHandler = this._typeListChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();
    if (this._datepicker !== null) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
    if (this._endDatePicker !== null) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }
  }

  _setDatepicker() {
    if (this._datepicker !== null) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
    if (this._endDatePicker !== null) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }
    this._startDatePicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          'enableTime': true,
          'time_24hr': true,
          'dateFormat': `d/m/y H:i`,
          'defaultDate': this._data.startDate || new Date(),
          'maxDate': this._data.endDate,
          'onChange': this._startDateChangeHandler
        }
    );
    this._endDatePicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          'enableTime': true,
          'time_24hr': true,
          'dateFormat': `d/m/y H:i`,
          'defaultDate': this._data.endDate || new Date(),
          'minDate': this._data.starDate,
          'onChange': this._endDateChangeHandler
        }
    );
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      startDate: userDate
    }, true);
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      endDate: userDate
    }, true);
  }

  reset(point) {
    this.updateData(
        EventEdit.parsePointToData(point, this._destinations)
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._destinations, this._isNewEvent);
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
        {
          [evt.target.value]: evt.target.checked
        }, true,
        {
          isActivated: !this._data.isActivated
        }, true
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToPoint(this._data));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.formReset(EventEdit.parseDataToPoint(this._data));
  }

  _rollDownButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback._rollDownButtonClick();
  }

  _favoriteCheckboxClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);

    this._callback.favoriteClick(this._data.isFavorite);
  }

  _typeListChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const destination = this._destinations.find((item) => item.name === evt.target.value);

    if (destination && evt.target.value !== this._data.destination.name) {
      this.updateData({
        destination
      });
      return;
    }
    evt.target.value = this._data.destination.name;
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.valueAsNumber,
    }, true);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormDeleteHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().addEventListener(`reset`, this._formDeleteClickHandler);
  }

  setRollDownButtonClickHandler(callback) {
    this._callback._rollDownButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollDownButtonClickHandler);
  }

  _setOffersChangeHandlers() {
    const offerCheckbox = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    offerCheckbox.forEach((offer) => {
      offer.addEventListener(`change`, this._offerChangeHandler);
    });
  }

  setFavoriteChangeHandler(callback) {
    this._callback.favoriteClick = callback;
  }

  _setInnerHandlers() {
    const element = this.getElement();

    if (!this._isNewEvent) {
      element.querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteCheckboxClickHandler);
    }

    element.querySelector(`.event__type-list`).addEventListener(`change`, this._typeListChangeHandler);
    element.querySelector(`.event__field-group--destination`).addEventListener(`change`, this._destinationChangeHandler);
    element.querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
    this._setOffersChangeHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeleteHandler(this._callback.formReset);
    this.setRollDownButtonClickHandler(this._callback._rollDownButtonClick);
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point
    );
  }

  static parseDataToPoint(pointData) {
    return Object.assign(
        {},
        pointData
    );
  }
}

