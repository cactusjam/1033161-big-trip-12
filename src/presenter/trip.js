import SortView from "./view/sort.js";
import TripDaysView from "./view/trip-days.js";
import TripDayView from "./view/trip-day.js";
import TripEventsView from "./view/trip-events.js";
import TripEventView from "./view/trip-event.js";
import EventEditView from "./view/event-edit.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._sortComponent = new SortView();
    this._tripDaysComponent = new TripDaysView();
    this._tripDayComponent = new TripDayView();
    this._tripEventsComponent = new TripEventsView();
    this._tripEventComponent = new TripEventView();
    this._eventEditComponent = new EventEditView();
  }

  _renderSort() {

  }

  _renderCard() {

  }

  _renderTripDays() {

  }

  _renderEventItems() {

  }
}
