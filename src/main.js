import TripControlsView from "./view/trip-controls.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripEventButtonView from "./view/trip-event-button.js";
import SortView from "./view/sort.js";
import TripDaysView from "./view/trip-days.js";
import TripDayView from "./view/trip-day.js";
import TripEventsView from "./view/trip-events.js";
import TripEventView from "./view/trip-event.js";
import EventEditView from "./view/event-edit.js";
import EventMessageView from "./view/event-message.js";
import HiddenCaptionView from "./view/hidden-caption.js";
import {render, RenderPosition} from "./utils/dom.js";
import {BlockTitle, EventMessage} from "./constants.js";
import {isEscapeEvent} from "./utils/dom-event.js";
import {cards} from "./mock/card.js";
import {filterNames} from "./mock/filter.js";
import {destinations} from "./mock/destinations.js";
import {groupCardsByDay} from "./utils/date.js";

const renderBlock = (container, title, generateTemplate) => {
  const hiddenCaptionComponent = new HiddenCaptionView(title);
  render(container, hiddenCaptionComponent.getElement());
  render(container, generateTemplate);
};

const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderBlock(tripControls, BlockTitle.SWITCH, new TripControlsView().getElement());
renderBlock(tripControls, BlockTitle.FILTER, new FilterView(filterNames).getElement());

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfoView().getElement(), RenderPosition.AFTER_BEGIN);
const tripEventButtonComponent = new TripEventButtonView();
render(tripMain, tripEventButtonComponent.getElement());

const tripEvents = document.querySelector(`.trip-events`);

if (cards.length > 0) {
  renderBlock(tripEvents, BlockTitle.TRIP_EVENTS, new SortView().getElement());

  const tripDaysComponent = new TripDaysView();
  const days = groupCardsByDay(cards);

  Object.values(days).forEach((dayCards, counter) => {
    const daysItem = new TripDayView(counter + 1, dayCards[0].startDate);
    render(tripDaysComponent.getElement(), daysItem.getElement());

    const eventsList = new TripEventsView().getElement();
    render(daysItem.getElement(), eventsList);

    const renderCardEvent = (card, eventList) => {
      const eventEditComponent = new EventEditView(card, destinations);
      const eventItemComponent = new TripEventView(card);

      const replaceEventToForm = () => {
        eventsList.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
      };

      const replaceFormToEvent = () => {
        eventsList.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
      };

      const onEscKeyDown = (evt) => {
        if (isEscapeEvent(evt)) {
          replaceFormToEvent();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      eventItemComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        replaceEventToForm();
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      render(eventList, eventItemComponent.getElement(), RenderPosition.BEFORE_END);
    };

    dayCards.forEach((card) => {
      renderCardEvent(card, eventsList);
    });
  });

  render(tripEvents, tripDaysComponent.getElement());
} else {
  render(tripEvents, new EventMessageView(EventMessage.NO_EVENTS).getElement());
}
