import {createItems, dateFormat, timeFormat, formatDiff} from "../utils/utils.js";

const getEventOffer = (offer) => {
  return (
    `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createTripEventTemplate = (points) => {
  const {type, city, services, price, startDate, endDate} = points;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.name} to ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFormat(startDate)}">${timeFormat(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime=""${dateFormat(endDate)}">${timeFormat(endDate)}</time>
          </p>
          <p class="event__duration">${formatDiff(startDate, endDate)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${services.length > 0 ? createItems(services, getEventOffer) : ``}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export {createTripEventTemplate};
