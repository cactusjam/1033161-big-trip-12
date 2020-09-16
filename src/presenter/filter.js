import FilterView from '../view/filters';
import {render, replace, remove, RenderPosition} from "../utils/dom.js";
import {UpdateType, FilterType} from "../constants.js";
import {filter} from "../utils/filter.js";

export default class Filter {
  constructor(container, tripModel, model) {
    this._container = container;
    this._tripModel = tripModel;
    this._model = model;
    this._current = null;

    this._component = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._model.addObserver(this._handleModelEvent);
    this._tripModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._current = this._model.get();
    const prevComponent = this._component;
    const points = this._tripModel.get();
    const currentFilters = {
      [FilterType.EVERYTHING]: points.length !== 0,
      [FilterType.FUTURE]: filter[FilterType.FUTURE](points).length !== 0,
      [FilterType.PAST]: filter[FilterType.PAST](points).length !== 0,
    };

    this._component = new FilterView(this._current, currentFilters);
    this._component.setTypeChangeHandler(this._handleTypeChange);

    if (prevComponent === null) {
      render(this._container, this._component, RenderPosition.AFTER_END);
      return;
    }

    replace(this._component, prevComponent);
    remove(prevComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleTypeChange(type) {
    if (this._current === type) {
      return;
    }

    this._model.set(UpdateType.MINOR, type);
  }

  _getFilters() {
    const points = this._tripModel.get();

    return Object.entries(filter)
    .map(([key, value]) => ({[key]: value(points).length}))
    .reduce((result, element) => Object.assign(result, element), {});
  }
}
