import Observer from "../utils/observer.js";

const getPointIndex = (points, point) => points.findIndex((item) => item.id === point.id);
export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
    this._destinations = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getPoints() {
    return this._points;
  }

  getDestinations() {
    return this._destinations;
  }

  updatePoint(updateType, update) {
    const index = getPointIndex(this._points, update);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = getPointIndex(this._points, update);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
