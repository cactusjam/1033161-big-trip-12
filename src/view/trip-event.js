import {getTimeFormat, formatDuration, getFirstUpperCase} from "../utils/date.js";
import {createElement} from "../utils/dom.js";
import {getPreposition} from "../mock/data.js";

const createTripEventTemplate = (point) => {
  const {type, destination, services, price, startDate, endDate, duration} = point;
  const formattedDuration = formatDuration(duration);
  const id = type.toLowerCase();
  const typeName = getFirstUpperCase(type);
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${id}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeName} ${getPreposition(type)} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate.toISOString()}">${getTimeFormat(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate.toISOString()}">${getTimeFormat(endDate)}</time>
          </p>
          <p class="event__duration">${formattedDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${services.map((offer) =>`
          <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>
          `).join(``)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripEvent {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripEventTemplate(this._point);
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
