import EventEditView from "../view/event-edit.js";
import TripEventView from "../view/trip-event.js";
import {render, replace, remove} from "../utils/dom.js";
import {isDatesEqual} from "../utils/date.js";
import {isEscapeEvent} from "../utils/dom-event.js";
import {UserAction, UpdateType} from "../constants.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};
export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._container = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._destinations = null;
    this._point = null;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._handleRollupPoint = this._handleRollupPoint.bind(this);
    this._handleRollupPointEdit = this._handleRollupPointEdit.bind(this);
    this._handleSubmitPointEdit = this._handleSubmitPointEdit.bind(this);
    this._handleDeletePointEdit = this._handleDeletePointEdit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point, destinations) {
    this._point = point;
    this._destinations = destinations;
    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;
    this._pointComponent = new TripEventView(point);
    this._pointEditComponent = new EventEditView(point, this._destinations);

    this._pointComponent.setRollupButtonClickHandler(this._handleRollupPoint);
    this._pointEditComponent.setFormSubmitHandler(this._handleSubmitPointEdit);
    this._pointEditComponent.setFormDeleteHandler(this._handleDeletePointEdit);
    this._pointEditComponent.setRollupButtonClickHandler(this._handleDeletePointEdit);
    this._pointEditComponent.setFavoriteChangeHandler(this._handleFavoriteClick);


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._container, this._pointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
    document.addEventListener(`keydown`, this._escapeKeydownHandler);
  }

  _replaceFormToEvent() {
    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToEvent();
    }
  }

  _handleRollupPoint() {
    this._replaceEventToForm();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleRollupPointEdit() {
    this._replaceFormToEvent();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleSubmitPointEdit(editedPoint) {
    const isPatchUpdate = isDatesEqual(this._point.startDate, editedPoint.startDate);

    this._changeData(
        UserAction.UPDATE_POINT,
        isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
        editedPoint
    );
    this._replaceFormToEvent();
  }

  _handleDeletePointEdit() {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        this._point
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }
}
