import {createTripControlsTemplate} from "./view/trip-controls.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripEventButtonTemplate} from "./view/trip-event-button.js";
import {createSortTemplate} from "./view/sort.js";
import {createTripDaysTemplate} from "./view/trip-days.js";
import {createTripDayTemplate} from "./view/trip-day.js";
import {createTripEventsTemplate} from "./view/trip-events.js";
import {createTripEventTemplate} from "./view/trip-event.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createHiddenCaptionTemplate} from "./view/hidden-caption.js";
import {render, createElement, RenderPosition} from "./utils/dom.js";
import {BlockTitle, KeyboardKey} from "./constants.js";
import {cards} from "./mock/card.js";
import {filterNames} from "./mock/filter.js";
import {groupCardsByDay} from "./utils/date.js";

const renderBlock = (container, title, generateTemplate) => {
  const hiddenCaptionNode = createElement(createHiddenCaptionTemplate(title));
  render(container, hiddenCaptionNode);
  render(container, createElement(generateTemplate));
};

const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderBlock(tripControls, BlockTitle.SWITCH, createTripControlsTemplate());
renderBlock(tripControls, BlockTitle.FILTER, createFilterTemplate(filterNames));

const tripMain = document.querySelector(`.trip-main`);
const tripInfo = createElement(createTripInfoTemplate());
render(tripMain, tripInfo, RenderPosition.AFTER_BEGIN);
const tripEventButton = createElement(createTripEventButtonTemplate());
render(tripMain, tripEventButton);

const tripEvents = document.querySelector(`.trip-events`);
renderBlock(tripEvents, BlockTitle.TRIP_EVENTS, createSortTemplate());

const tripDays = createElement(createTripDaysTemplate());
render(tripEvents, tripDays);
const daysList = tripEvents.querySelector(`.trip-days`);

const days = groupCardsByDay(cards);

Object.entries(days).forEach(([_dayKey, dayCards], dayIndex) => {
  const daysItem = createElement(createTripDayTemplate(dayIndex + 1, dayCards[0].startDate));
  render(daysList, daysItem);

  const eventsList = createElement(createTripEventsTemplate());
  render(daysItem, eventsList);

  dayCards.forEach((card) => {
    const eventItem = createElement(createTripEventTemplate(card));
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
