import AbstractView from "./abstract.js";
import {FilterType} from "../constants";

const FILTERS = Object.values(FilterType);

const createFiltersTemplate = (filterType) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTERS.map((filter) => `
      <div class="trip-filters__filter">
        <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === filterType ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
      </div>
      `).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export default class Filters extends AbstractView {
  constructor(currentType) {
    super();
    this._currentType = currentType;
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._currentType);
  }

  setTypeChangeHandler(callback) {
    this._callback.typeChange = callback;
    this.getElement().addEventListener(`change`, this._typeChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typeChange(evt.target.value);
  }
}
