import {createElement} from "../utils/dom.js";

const createFilterTemplate = (filterNames) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterNames.map((name) => `
      <div class="trip-filters__filter">
        <input id="filter-${name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name.toLowerCase()}" checked>
        <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
      </div>
      `).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export default class Filter {
  constructor(filterNames) {
    this._filterNames = filterNames;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filterNames);
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
