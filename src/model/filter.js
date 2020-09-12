import ObserverView from './../utils/observer';
import {FilterType} from './../constants';

export default class Filter extends ObserverView {
  constructor() {
    super();
    this._current = FilterType.EVERYTHING;
  }

  set(updateType, filter) {
    this._current = filter;
    this._notify(updateType, filter);
  }

  get() {
    return this._current;
  }
}
