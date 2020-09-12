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

export default class PointNew {
  constructor(changeData) {
    this._changeData = changeData;

    this._destinations = null;
    this._attributes = null;
    this._component = null;

    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSubmitButtonClick = this._handleSubmitButtonClick.bind(this);
  }

  init(container, destinations) {
    this._container = container;
    this._attributes = createEmptyPoint();
    this._destinations = destinations;
    if (this._component !== null) {
      return;
    }

    this._component = new EventEditView(this._attributes, this._destinations, {isAddMode: true}, {isNewPoint: true});
    this._component.setRollupButtonClickHandler(this._handleDeleteButtonClick);
    this._component.setFormSubmitHandler(this._handleSubmitButtonClick);
    this._component.setFormDeleteHandler(this._handleDeleteButtonClick);

    render(this._container, this._component, RenderPosition.AFTER_END);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._component === null) {
      return;
    }

    remove(this._component);
    this._component = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleSubmitButtonClick(card) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: getRandomInteger()}, card)
    );
    this.destroy();
  }

  _handleDeleteButtonClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
