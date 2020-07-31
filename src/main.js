import {createHiddenCaptionTemplate} from "./view/utils.js";

import {createSiteMenuTemplate} from "./view/menu.js";

import {createFilterTemplate} from "./view/filter.js";

import {createRouteTemplate} from "./view/trip-info.js";

import {createTripEventBtnTemplate} from "./view/event-edit.js";

import {createSortTemplate} from "./view/sort.js";

import {createTripDaysTemplate} from "./view/day.js";

import {createTripDayTemplate} from "./view/day.js";

import {createTripEventsTemplate} from "./view/event.js";

import {createTripEventTemplate} from "./view/event.js";

import {createEventEditTemplate} from "./view/event-edit.js";

import {render} from "./view/utils.js";

const CARD_COUNT = 3;

const tripControls = document.querySelector(`.trip-main__trip-controls`);
render(tripControls, createHiddenCaptionTemplate(`switch`), `beforeend`);
render(tripControls, createSiteMenuTemplate(), `beforeend`);
render(tripControls, createHiddenCaptionTemplate(`filter`), `beforeend`);
render(tripControls, createFilterTemplate(), `beforeend`);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createRouteTemplate(), `afterbegin`);
render(tripMain, createTripEventBtnTemplate(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSortTemplate(), `beforeend`);
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
