import AbstractView from "./abstract.js";
import {FilterType} from "../constants";

const FILTERS = Object.values(FilterType);

const createFilterTemplate = (filterName) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTERS.map((filter) => `
      <div class="trip-filters__filter">
        <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === filterName ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
      </div>
      `).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export default class Filter extends AbstractView {
  constructor(filterName) {
    super();
    this._currentFilter = filterName;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
