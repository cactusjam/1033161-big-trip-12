import SortView from "../view/sort.js";
import TripDaysView from "../view/trip-days.js";
import TripDayView from "../view/trip-day.js";
import TripEventsView from "../view/trip-events.js";
import EventMessageView from "../view/event-message.js";
import {render, RenderPosition, remove} from "../utils/dom.js";
import {groupCardsByDay} from "../utils/date.js";
import {sortEventsByTime, sortEventsByPrice} from "../utils/utils.js";
import {EventMessage, SortType} from "../constants.js";
import PointPresenter from "./point.js";

export default class Trip {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    // this._tripCards = [];
    // this._destinations = [];
    this._pointPresenter = {};
    this._existTripDays = [];
    this._eventsContainer = container;
    // this._handleCardChange = this._handleCardChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._tripDaysComponent = new TripDaysView();
    this._eventMessageComponent = new EventMessageView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderSort();
    this._renderTrip();
  }


  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortEventsByTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortEventsByPrice);
      // default:
      //   return this._pointsModel.getPoints();
    }
    return this._pointsModel.getPoints();
  }

  _getDestinations() {
    return this._pointsModel.getDestinations();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this.__currentSortType = sortType;
    this._rerenderTripEvents();
  }

  _renderSort() {
    render(this._eventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTrip() {
    const pointCount = this._getPoints().length;
    if (pointCount > 0) {
      this._renderTripEvents();
    } else {
      this._renderNoEvents();
    }
  }

  _renderTripEvents() {
    this._renderSort();
    this._renderEvents();
    render(this._eventsContainer, this._tripDaysComponent);
  }

  _rerenderTripEvents() {
    this._clearEvents();
    this._renderTripEvents();
  }

  _renderNoEvents() {
    render(this._eventsContainer, this._eventMessageComponent(EventMessage.NO_EVENTS));
  }

  // _handleCardChange(updatedCard, shouldRerender) {
  //   // this._tripCards = updateItemById(this._tripCards, updatedCard);
  //   // this._sourceTripCards = updateItemById(this._sourceTripCards, updatedCard);
  //   this._pointPresenter[updatedCard.id].init(updatedCard, this._getDestinations());
  //   if (shouldRerender) {
  //     this._rerenderTripEvents();
  //   }
  // }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearEvents() {
    Object
    .values(this._pointPresenter)
    .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._existTripDays.forEach(remove);
    this._existTripDays = [];
    remove(this._tripDaysComponent);
  }

  _renderEvents() {
    if (this._currentSortType !== SortType.DEFAULT) {
      const tripDayComponent = new TripDayView(0, new Date());
      render(this._tripDaysComponent, tripDayComponent);

      const tripEventsComponent = new TripEventsView();
      render(tripDayComponent, tripEventsComponent);

      this._renderCards(this._getPoints(), tripEventsComponent);
    } else {
      const days = groupCardsByDay(this._getPoints());

      Object.values(days).forEach((dayCards, counter) => {
        const tripDayComponent = new TripDayView(counter + 1, dayCards[0].startDate);
        render(this._tripDaysComponent, tripDayComponent);

        const tripEventsComponent = new TripEventsView();
        render(tripDayComponent, tripEventsComponent);

        this._renderCards(dayCards, tripEventsComponent);
      });
    }
  }

  _renderCards(cards, tripEventsComponent) {
    cards.forEach((item) => {
      this._renderCard(item, tripEventsComponent);
    });
  }

  _renderCard(card, eventList) {
    const pointPresenter = new PointPresenter(eventList, this._handleViewChange, this._handleModeChange);
    pointPresenter.init(card, this._getDestinations());
    this._pointPresenter[card.id] = pointPresenter;
  }
}
