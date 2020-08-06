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
import {render} from "./utils/dom.js";
import {BlockTitle} from "./view/general-constants.js";
import {generateCards} from "./mock/card.js";

const CARD_COUNT = 20;
const DATE_COUNT = 3;

const cards = generateCards(CARD_COUNT);

const renderBlock = (container, title, generateTemplate) => {
  render(container, createHiddenCaptionTemplate(title), `beforeend`);
  render(container, generateTemplate(), `beforeend`);
};

const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderBlock(tripControls, BlockTitle.SWITCH, createTripControlsTemplate);
renderBlock(tripControls, BlockTitle.FILTER, createFilterTemplate);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createTripInfoTemplate(), `afterbegin`);
render(tripMain, createTripEventButtonTemplate(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);
renderBlock(tripEvents, BlockTitle.TRIP_EVENTS, createSortTemplate);
render(tripEvents, createEventEditTemplate(), `beforeend`);
render(tripEvents, createTripDaysTemplate(), `beforeend`);

const daysList = tripEvents.querySelector(`.trip-days`);

for (let i = 1; i <= DATE_COUNT; i++) {
  render(daysList, createTripDayTemplate(i), `beforeend`);
}

const daysItem = daysList.querySelector(`.trip-days__item`);
render(daysItem, createTripEventsTemplate(), `beforeend`);
const eventsList = daysItem.querySelector(`.trip-events__list`);

cards.forEach((card) => {
  render(eventsList, createTripEventTemplate(card), `beforeend`);
});
