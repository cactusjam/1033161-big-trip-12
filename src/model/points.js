import Observer from "../utils/observer.js";

export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getTasks() {
    return this._points;
  }
}
