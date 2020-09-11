import AbstractView from "./abstract.js";

const createTripEventsTemplate = () => {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
};

export default class TripEventsView extends AbstractView {
  getTemplate() {
    return createTripEventsTemplate();
  }
}
