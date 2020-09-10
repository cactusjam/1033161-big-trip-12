import EventEditView from "../view/event-edit.js";
import {render, remove, RenderPosition} from "../utils/dom.js";
import {UserAction, UpdateType} from "../constants.js";
import {isEscapeEvent} from "../utils/dom-event.js";
import {getRandomInteger} from "../mock/utils.js";

const createEmptyPoint = () => ({
  id: getRandomInteger(1, 4000),
  type: `taxi`,
  destination: {
    name: ``,
    photos: [],
    description: ``
  },
  startDate: new Date(),
  endDate: new Date(),
  services: [],
  isFavorite: false,
  isActivated: false,
  price: 0,
});

export default class NewPointPresenter {
  constructor(pointListContainer, changeData) {
    this._container = pointListContainer;
    this._changeData = changeData;

    this._destinations = null;
    this._point = null;
    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleDeletePointEdit = this._handleDeletePointEdit.bind(this);
    this._handleDeletePointEdit = this._handleDeletePointEdit.bind(this);
    this._handleEscKeyDown = this._escKeyDownHandler.bind(this);
    this._handleSubmitPointEdit = this._handleSubmitPointEdit.bind(this);
  }

  init(destinations) {
    this._point = createEmptyPoint();
    this._destinations = destinations;
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new EventEditView(this._point, this._destinations, {isAddMode: true});
    this._pointEditComponent.setRollupButtonClickHandler(this._handleDeletePointEdit);
    this._pointEditComponent.setFormSubmitHandler(this._handleSubmitPointEdit);
    this._pointEditComponent.setFormDeleteHandler(this._handleDeletePointEdit);

    const sortTripElement = this._container.querySelector(`.trip-sort`);

    if (sortTripElement) {
      render(sortTripElement, this._pointEditComponent, RenderPosition.AFTER_END);
    } else {
      render(this._tripContainer, this._pointEditComponent, RenderPosition.AFTER_BEGIN);
    }

    document.addEventListener(`keydown`, this._handleEscKeyDown);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._handleEscKeyDown);
  }

  _handleSubmitPointEdit(editedPoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        editedPoint
    );
    this.destroy();
  }

  _handleDeletePointEdit() {
    this.destroy();
  }

  _handleDeletePointEdit() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
