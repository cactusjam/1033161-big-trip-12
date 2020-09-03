import EventEditView from "../view/event-edit.js";
import TripEventView from "../view/trip-event.js";
import {render, replace, remove} from "../utils/dom.js";
import {isEscapeEvent} from "../utils/dom-event.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};
export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
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
    this._handleResetPointEdit = this._handleResetPointEdit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
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
    this._pointEditComponent.setFormResetHandler(this._handleResetPointEdit);
    this._pointEditComponent.setRollupButtonClickHandler(this._handleResetPointEdit);
    this._pointEditComponent.setFavoriteChangeHandler(this._handleFavoriteClick);


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent);
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
  }

  _replaceFormToEvent() {
    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleEscKeyDown(evt) {
    if (isEscapeEvent(evt)) {
      this._pointEditComponent.reset(this._point);
      this._replaceFormToEvent();
    }
  }

  _handleRollupPoint() {
    this._replaceEventToForm();
    document.addEventListener(`keydown`, this._handleEscKeyDown);
  }

  _handleRollupPointEdit() {
    this._replaceFormToEvent();
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
  }

  _handleSubmitPointEdit(editedPoint) {
    this._changeData(editedPoint);
    this._replaceFormToEvent();
  }

  _handleResetPointEdit() {
    this._replaceFormToEvent();
  }

  _handleFavoriteClick() {
    this._changeData(
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
