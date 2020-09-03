import SortView from "../view/sort.js";
import TripDaysView from "../view/trip-days.js";
import TripDayView from "../view/trip-day.js";
import TripEventsView from "../view/trip-events.js";
import EventMessageView from "../view/event-message.js";
import {render, RenderPosition, remove} from "../utils/dom.js";
import {groupCardsByDay} from "../utils/date.js";
import {sortEventsByTime, sortEventsByPrice, updateItem} from "../utils/utils.js";
import {destinations} from "../mock/destinations.js";
import {BlockTitle, EventMessage, SortType} from "../constants.js";
import PointPresenter from "./point.js";

export default class Trip {
  constructor(eventsContainer, renderBlock) {
    this._tripCards = [];
    this._destinations = [];
    this._pointPresenter = {};
    this._existTripDays = [];
    this._eventsContainer = eventsContainer;
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._renderBlock = renderBlock;
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._tripDaysComponent = new TripDaysView();
    this._eventMessageComponent = new EventMessageView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripCards) {
    this._tripCards = tripCards.slice();
    this._sourceTripCards = tripCards.slice();
    this._destinations = destinations;

    this._renderTrip();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripCards.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this._tripCards.sort(sortEventsByPrice);
        break;
      default:
        this._tripCards = this._sourceTripCards.slice();
    }

    this._currentSortType = sortType;
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

    this._sortEvents(sortType);
    this._clearEvents();
    this._renderTripEvents();
  }

  _renderSort() {
    this._renderBlock(this._eventsContainer, BlockTitle.TRIP_EVENTS, this._sortComponent);
    render(this._eventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTrip() {
    if (this._tripCards.length > 0) {
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

  _renderNoEvents() {
    render(this._eventsContainer, this._eventMessageComponent(EventMessage.NO_EVENTS));
  }

  _handleCardChange(updatedCard) {
    this._tripCards = updateItem(this._tripCards, updatedCard);
    this._sourceTripCards = updateItem(this._sourceTripCards, updatedCard);
    this._pointPresenter[updatedCard.id].init(updatedCard, this._destinations);
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

      this._renderCards(this._tripCards, tripEventsComponent);
    } else {
      const days = groupCardsByDay(this._tripCards);

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
    const pointPresenter = new PointPresenter(eventList, this._handleCardChange, this._handleModeChange);
    pointPresenter.init(card, this._destinations);
    this._pointPresenter[card.id] = pointPresenter;
  }
}
