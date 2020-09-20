import ObserverView from "../utils/observer.js";

const getPointIndex = (points, point) => points.findIndex((item) => item.id === point.id);
export default class Points extends ObserverView {
  constructor() {
    super();
    this._attributes = [];
    this._destinations = [];
  }

  set(points) {
    this._attributes = points.slice();
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  get() {
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

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          destination: {
            name: point.destination.name,
            description: point.destination.description,
            photos: point.destination.pictures.map((picture) => ({
              href: picture.src,
              description: picture.description,
            }))
          },
          services: point.offers,
          startDate: new Date(point.date_from),
          endDate: new Date(point.date_to),
          isFavorite: Boolean(point.is_favorite),
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.offers;
    delete adaptedPoint.destination.pictures;

    return adaptedPoint;
  }

  static adaptPointToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "base_price": point.price,
          "date_from": point.startDate.toString(),
          "date_to": point.endDate.toString(),
          "is_favorite": point.isFavorite,
          "offers": point.services,
          "destination": {
            "name": point.destination.name,
            "description": point.destination.description,
            "pictures": point.destination.photos.map((photo) => ({
              "src": photo.href,
              "description": photo.description,
            }))
          }
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.startDate;
    delete adaptedPoint.endDate;
    delete adaptedPoint.destination.photos;

    return adaptedPoint;
  }
}
