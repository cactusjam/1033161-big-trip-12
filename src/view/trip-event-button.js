import AbstractView from "./abstract.js";

const createTripEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class AddEventButton extends AbstractView {
  getTemplate() {
    return createTripEventButtonTemplate();
  }
}
