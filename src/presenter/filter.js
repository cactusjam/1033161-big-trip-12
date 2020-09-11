import FilterView from './../view/filter';
import {render, replace, remove, RenderPosition} from "../utils/dom.js";
import {UpdateType} from "../constants.js";
import {filter} from "../utils/filter.js";

export default class FilterPresenter {
  constructor(filterContainer, tripModel, filterModel) {
    this._filterContainer = filterContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._tripModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTER_END);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MINOR, filterType);
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();

    return Object.entries(filter)
    .map(([key, value]) => ({[key]: value(points).length}))
    .reduce((result, element) => Object.assign(result, element), {});
  }
}
