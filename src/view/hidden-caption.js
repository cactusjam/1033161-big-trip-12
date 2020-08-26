import AbstractView from "./abstract.js";

const createHiddenCaptionTemplate = (title) => {
  return (
    `<h2 class="visually-hidden">${title}</h2>`
  );
};

export default class HiddenCaption extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createHiddenCaptionTemplate(this._title);
  }
}
