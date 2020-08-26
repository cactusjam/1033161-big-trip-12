import SortView from "../view/sort.js";
import TripDaysView from "../view/trip-days.js";
import TripDayView from "../view/trip-day.js";
import TripEventsView from "../view/trip-events.js";
import TripEventView from "../view/trip-event.js";
import EventEditView from "../view/event-edit.js";
import EventMessageView from "../view/event-message.js";
import {render, RenderPosition, replace} from "../utils/dom.js";
import {groupCardsByDay} from "../utils/date.js";
import {isEscapeEvent} from "../utils/dom-event.js";
import {destinations} from "../mock/destinations.js";
import {BlockTitle, EventMessage} from "../constants.js";

export default class Trip {
  constructor(eventsContainer, renderBlock) {
    this._tripCards = [];
    this._eventsContainer = eventsContainer;
    this._renderBlock = renderBlock;
    this._sortComponent = new SortView();
    this._tripDaysComponent = new TripDaysView();
    this._eventMessageComponent = new EventMessageView();
  }

  init(tripCards) {
    this._tripCards = tripCards.slice();
    this._renderTrip();
  }

  _renderTrip() {
    if (this._tripCards.length > 0) {
      this._renderTripEvents();
    } else {
      this._renderNoEvents();
    }
  }

  _renderTripEvents() {
    this._renderEvents();
    this._renderSort();
    render(this._eventsContainer, this._tripDaysComponent);
  }

  _renderSort() {
    this._renderBlock(this._eventsContainer, BlockTitle.TRIP_EVENTS, this._sortComponent);
    render(this._eventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoEvents() {
    render(this._eventsContainer, this._eventMessageComponent(EventMessage.NO_EVENTS));
  }

  _renderEvents() {
    const days = groupCardsByDay(this._tripCards);

    Object.values(days).forEach((dayCards, counter) => {
      const tripDayComponent = new TripDayView(counter + 1, dayCards[0].startDate);
      render(this._tripDaysComponent, tripDayComponent);

      const tripEventsComponent = new TripEventsView();
      render(tripDayComponent, tripEventsComponent);

      this._renderCards(dayCards, tripEventsComponent);
    });
  }

  _renderCards(cards, tripEventsComponent) {
    cards.forEach((item) => {
      this._renderCard(item, tripEventsComponent);
    });
  }

  _renderCard(card, eventList) {
    const tripEventComponent = new TripEventView(card);
    const eventEditComponent = new EventEditView(card, destinations);

    const replaceEventToForm = () => {
      replace(eventEditComponent, tripEventComponent);
    };

    const replaceFormToEvent = () => {
      replace(tripEventComponent, eventEditComponent);
    };

    const escKeyDownHandler = (evt) => {
      if (isEscapeEvent(evt)) {
        replaceFormToEvent();
      }
    };

    tripEventComponent.setRollupButtonClickHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, escKeyDownHandler);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    });

    eventEditComponent.setFormResetHandler(() => {
      replaceFormToEvent();
    });

    eventEditComponent.setRollupButtonClickHandler(() => {
      replaceFormToEvent();
    });

    render(eventList, tripEventComponent, RenderPosition.BEFORE_END);
  }
}
