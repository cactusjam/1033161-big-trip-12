import TripControlsView from "./view/trip-controls.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripEventButtonView from "./view/trip-event-button.js";
import SortView from "./view/sort.js";
import TripDaysView from "./view/trip-days.js";
import TripDayView from "./view/trip-day.js";
import TripEventsView from "./view/trip-events.js";
import TripEventView from "./view/trip-event.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import HiddenCaptionView from "./view/hidden-caption.js";
import {render, createElement, RenderPosition} from "./utils/dom.js";
import {BlockTitle, KeyboardKey} from "./constants.js";
import {cards} from "./mock/card.js";
import {filterNames} from "./mock/filter.js";
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
const tripEventButton = new TripEventButtonView().getElement();
render(tripMain, tripEventButton);

const tripEvents = document.querySelector(`.trip-events`);
renderBlock(tripEvents, BlockTitle.TRIP_EVENTS, new SortView().getElement());

const tripDays = new TripDaysView().getElement();
render(tripEvents, tripDays);
const daysList = tripEvents.querySelector(`.trip-days`);

const days = groupCardsByDay(cards);

Object.entries(days).forEach(([_dayKey, dayCards], dayIndex) => {
  const daysItem = new TripDayView(dayIndex + 1, dayCards[0].startDate).getElement();
  render(daysList, daysItem);

  const eventsList = new TripEventsView().getElement();
  render(daysItem, eventsList);

  dayCards.forEach((card) => {
    const eventItem = new TripEventView(card).getElement();
    const eventEdit = createElement(createEventEditTemplate(card));

    render(eventsList, eventItem, RenderPosition.BEFORE_END);
    const onEscKeyDown = (evt) => {
      if (evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.IE_ESCAPE) {
        eventsList.replaceChild(eventItem, eventEdit);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const itemRollupButton = eventItem.querySelector(`.event__rollup-btn`);

    itemRollupButton.addEventListener(`click`, () => {
      eventsList.replaceChild(eventEdit, eventItem);

      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const editRollupButton = eventEdit.querySelector(`.event__rollup-btn`);

    editRollupButton.addEventListener(`click`, () => {
      eventsList.replaceChild(eventItem, eventEdit);

      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });
});
