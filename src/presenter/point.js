import EventEditView from "../view/event-edit.js";
import TripEventView from "../view/trip-event.js";
import {render, RenderPosition, replace} from "../utils/dom.js";

export default class Point {
  constructor(eventList) {
    this._eventList = eventList;
    this._point = null;
    this._pointView = null;
    this._pointEditComponent = null;
    this._rollupPointHandler = this._rollupPointHandler.bind(this);
    this._rollupPointEditHandler = this._rollupPointEditHandler.bind(this);
    this._submitPointEditHandler = this._submitPointEditHandler.bind(this);
    this._resetPointEditHandler = this._resetPointEditHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._renderEvents = this._renderEvents.bind(this);
  }

  init(point, destinations) {
    this._point = point;
    this._destinations = destinations;
    this._pointComponent = new TripEventView(point);
    this._pointEditComponent = new EventEditView(point, this._destinations);
    this._pointComponent.setRollupButtonClickHandler(this._rollupPointHandler);
    this._pointEditComponent.setFormSubmitHandler(this._submitPointEditHandler);
    this._pointEditComponent.setFormResetHandler(this._resetPointEditHandler);
    this._pointEditComponent.setRollupButtonClickHandler(this._resetPointEditHandler);

    this._renderEvents();
  }

  _replaceEventToForm() {
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceFormToEvent() {
    replace(this._pointComponent, this._pointEditComponent);
  }

  _escKeyDownHandler(evt) {
    if (this._isEscapeEvent(evt)) {
      this._replaceFormToEvent();
    }
  }

  _rollupPointHandler() {
    this._replaceEventToForm();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _rollupPointEditHandler() {
    this._replaceFormToEvent();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _submitPointEditHandler() {
    this._rollupPointEditHandler();
  }

  _resetPointEditHandler() {
    this._replaceFormToEvent();
  }

  _renderEvents() {
    render(this._eventList, this._pointComponent, RenderPosition.BEFORE_END);
  }
}
