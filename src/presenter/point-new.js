import EventEditView from "../view/event-edit.js";
import {render, remove, RenderPosition} from "../utils/dom.js";
import {UserAction, UpdateType} from "../constants.js";
import {isEscapeEvent} from "../utils/dom-event.js";
import {getRandomInteger} from "../mock/utils.js";

const createEmptyPoint = () => ({
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
  constructor(changeData) {
    this._changeData = changeData;

    this._destinations = null;
    this._point = null;
    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleDeletePointEdit = this._handleDeletePointEdit.bind(this);
    this._handleDeletePointEdit = this._handleDeletePointEdit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSubmitPointEdit = this._handleSubmitPointEdit.bind(this);
  }

  init(container, destinations) {
    this._container = container;
    this._point = createEmptyPoint();
    this._destinations = destinations;
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new EventEditView(this._point, this._destinations, {isAddMode: true}, {isNewPoint: true});
    this._pointEditComponent.setRollupButtonClickHandler(this._handleDeletePointEdit);
    this._pointEditComponent.setFormSubmitHandler(this._handleSubmitPointEdit);
    this._pointEditComponent.setFormDeleteHandler(this._handleDeletePointEdit);

    render(this._container, this._pointEditComponent, RenderPosition.AFTER_END);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleSubmitPointEdit(editedPoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: getRandomInteger()}, editedPoint)
    );
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
