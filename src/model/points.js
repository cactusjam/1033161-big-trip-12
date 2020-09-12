import ObserverView from "../utils/observer.js";

const getPointIndex = (points, point) => points.findIndex((item) => item.id === point.id);
export default class Points extends ObserverView {
  constructor() {
    super();
    this._attributes = [];
    this._destinations = [];
  }

  setPoints(points) {
    this._attributes = points.slice();
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getPoints() {
    return this._attributes;
  }

  getDestinations() {
    return this._destinations;
  }

  update(updateType, update) {
    const index = getPointIndex(this._attributes, update);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._attributes = [
      ...this._attributes.slice(0, index),
      update,
      ...this._attributes.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  add(updateType, update) {
    this._attributes = [
      update,
      ...this._attributes
    ];

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = getPointIndex(this._attributes, update);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._attributes = [
      ...this._attributes.slice(0, index),
      ...this._attributes.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
