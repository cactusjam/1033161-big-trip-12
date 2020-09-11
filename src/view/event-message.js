import AbstractView from "./abstract.js";

const createEventMessageTemplate = (message) => {
  return (
    `<p class="trip-events__msg">${message}</p>`
  );
};

export default class EventMessageView extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return createEventMessageTemplate(this._message);
  }
}
