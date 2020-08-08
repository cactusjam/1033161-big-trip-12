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
import {dates} from "./mock/const.js";

const CARD_COUNT = 5;

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

render(tripEvents, createTripDaysTemplate(), `beforeend`);
const daysList = tripEvents.querySelector(`.trip-days`);

const mockedCards = new Array(dates.length).fill().map((elem, index) => {
  return generateCards(CARD_COUNT, index);
});

for (let i = 0; i < dates.length; i++) {
  render(daysList, createTripDayTemplate(i), `beforeend`);
  const daysItem = daysList.querySelector(`.js-days__item${i}`);
  render(daysItem, createTripEventsTemplate(i), `beforeend`);

  const eventsList = daysItem.querySelector(`.js-events__list${i}`);
  // const cards = generateCards(CARD_COUNT, i);
  const cards = mockedCards[i];

  cards.forEach((card) => {
    render(eventsList, createTripEventTemplate(card), `beforeend`);
    // render(eventsList, createEventEditTemplate(card), `beforeend`);
  });

  const rollupButton = document.querySelectorAll(`.event__rollup-btn`);

  rollupButton.forEach(function (item) {
    item.addEventListener(`click`, function (rollupEvent) {
      console.log('rollupEvent', rollupEvent);
      console.log('rollupEvent.target', rollupEvent.target);
      console.log('rollupEvent.parentElement', rollupEvent.parentElement);

      render(eventsList, createEventEditTemplate(rollupEvent), `beforeend`);
    });
  });

}
