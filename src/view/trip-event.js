import {createItems, dateFormat, timeFormat} from "../utils/utils.js";

const getEventOffer = (offer) => {
  return (
    `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const formatDiff = (startDate, endDate) => {
  const durationMiliseconds = endDate - startDate;
  const days = Math.floor(durationMiliseconds / 1000 / 60 / 60 / 24);
  const hours = Math.floor(durationMiliseconds / 1000 / 60 / 60);
  const minutes = durationMiliseconds / 1000 / 60 % 60;

  let result = ``;
  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0) {
    result += `${hours}H `;
  }
  if (minutes > 0) {
    result += `${minutes}M`;
  }

  return result.trim();
};

const createTripEventTemplate = (points) => {
  const {type, city, services, price, startDate, endDate} = points;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${city}</h3>
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
