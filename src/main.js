import {createTripControlsTemplate} from "./view/controls.js";

import {createFilterTemplate} from "./view/filter.js";

import {createTripInfoTemplate} from "./view/info.js";

import {createTripEventBtnTemplate} from "./view/event-btn.js";

import {createSortTemplate} from "./view/sort.js";

import {createTripDaysTemplate} from "./view/days.js";

import {createTripDayTemplate} from "./view/days-item.js";

import {createTripEventsTemplate} from "./view/events.js";

import {createTripEventTemplate} from "./view/event-item.js";

import {createEventEditTemplate} from "./view/event-edit.js";

import {renderBlock} from "./view/hidden-caption.js";

import {render} from "./utils/dom.js";

const CARD_COUNT = 3;

/* eslint-disable */
const EventMessage = {
  NO_EVENTS: `Click New Event to create your first point`,
  LOADING: `Loading...`,
};

const Title = {
  SWITCH: `Switch trip view`,
  FILTER: `Filter events`,
  TRIP_EVENTS: `Trip events`
};

const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderBlock(tripControls, Title.SWITCH, createTripControlsTemplate);
renderBlock(tripControls, Title.FILTER, createFilterTemplate);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createTripInfoTemplate(), `afterbegin`);
render(tripMain, createTripEventBtnTemplate(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);
renderBlock(tripEvents, Title.TRIP_EVENTS, createSortTemplate);
render(tripEvents, createEventEditTemplate(), `beforeend`);
render(tripEvents, createTripDaysTemplate(), `beforeend`);

const daysList = tripEvents.querySelector(`.trip-days`);
render(daysList, createTripDayTemplate(), `beforeend`);

const daysItem = daysList.querySelector(`.trip-days__item`);
render(daysItem, createTripEventsTemplate(), `beforeend`);
const eventsList = daysItem.querySelector(`.trip-events__list`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(eventsList, createTripEventTemplate(), `beforeend`);
}
