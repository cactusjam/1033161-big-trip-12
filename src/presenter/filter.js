import FilterView from './../view/filter';
import {render, replace, remove} from "../utils/dom.js";
import {UpdateType} from "../constants.js";

export default class Filter {
  constructor(filterContainer, tripModel, filterModel) {
    this._filterContainer = filterContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._currentFilter = null;

    this._filterView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._tripModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const prevFilter = this._filterView;

    this._filterView = new FilterView(this._currentFilter);
    this._filterView.setTypeChangeHandler(this._handleTypeChange);

    if (prevFilter === null) {
      render(this._filterContainer, this._filterView);
      return;
    }

    replace(this._filterView, prevFilter);
    remove(prevFilter);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MINOR, filterType);
  }
}
