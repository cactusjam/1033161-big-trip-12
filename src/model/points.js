import Observer from "../utils/observer.js";

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
}
