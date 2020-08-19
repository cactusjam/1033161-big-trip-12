import {createElement} from "../utils/dom.js";

const createHiddenCaptionTemplate = (title) => {
  return (
    `<h2 class="visually-hidden">${title}</h2>`
  );
};

export default class HiddenCaption {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createHiddenCaptionTemplate(this._title);
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
