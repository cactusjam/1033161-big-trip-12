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
import {render, createElement} from "./utils/dom.js";
import {BlockTitle} from "./constants.js";
import {dates} from "./mock/dates.js";
import {filterNames} from "./mock/filter.js";

const KEYCODE_ESC = 27;

const renderBlock = (container, title, generateTemplate) => {
  const hiddenCaptionNode = createElement(createHiddenCaptionTemplate(title));
  render(container, hiddenCaptionNode, `beforeend`);
  render(container, createElement(generateTemplate), `beforeend`);
};

const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderBlock(tripControls, BlockTitle.SWITCH, createTripControlsTemplate());
renderBlock(tripControls, BlockTitle.FILTER, createFilterTemplate(filterNames));

const tripMain = document.querySelector(`.trip-main`);
const tripInfo = createElement(createTripInfoTemplate());
render(tripMain, tripInfo, `afterbegin`);
const tripEventButton = createElement(createTripEventButtonTemplate());
render(tripMain, tripEventButton, `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);
renderBlock(tripEvents, BlockTitle.TRIP_EVENTS, createSortTemplate());

const tripDays = createElement(createTripDaysTemplate());
render(tripEvents, tripDays, `beforeend`);
const daysList = tripEvents.querySelector(`.trip-days`);

dates.forEach((date) => {
  const daysItem = createElement(createTripDayTemplate(date));
  render(daysList, daysItem, `beforeend`);

  const eventsList = createElement(createTripEventsTemplate());
  render(daysItem, eventsList, `beforeend`);

  date.cards.forEach((card) => {
    const eventItem = createElement(createTripEventTemplate(card));
    const eventEdit = createElement(createEventEditTemplate(card));

    render(eventsList, eventItem, `beforeend`);

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KEYCODE_ESC) {
        eventsList.replaceChild(eventItem, eventEdit);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const itemRollupButton = eventItem.querySelector(`.event__rollup-btn`);

    itemRollupButton.addEventListener(`click`, () => {
      eventsList.replaceChild(eventEdit, eventItem);

      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const editRollupBtn = eventEdit.querySelector(`.event__rollup-btn`);

    editRollupBtn.addEventListener(`click`, () => {
      eventsList.replaceChild(eventItem, eventEdit);

      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });
});
