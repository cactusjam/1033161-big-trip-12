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
import {render, renderNodeElement, createNodeElement} from "./utils/dom.js";
import {BlockTitle} from "./constants.js";
import {generateCards} from "./mock/card.js";
import {dates} from "./mock/const.js";

const CARD_COUNT = 5;

const renderBlock = (container, title, generateTemplate) => {
  render(container, createHiddenCaptionTemplate(title), `beforeend`);
  render(container, generateTemplate, `beforeend`);
};

const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderBlock(tripControls, BlockTitle.SWITCH, createTripControlsTemplate());
renderBlock(tripControls, BlockTitle.FILTER, createFilterTemplate());

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createTripInfoTemplate(), `afterbegin`);
render(tripMain, createTripEventButtonTemplate(), `beforeend`);

const tripEvents = document.querySelector(`.trip-events`);
renderBlock(tripEvents, BlockTitle.TRIP_EVENTS, createSortTemplate());

render(tripEvents, createTripDaysTemplate(), `beforeend`);
const daysList = tripEvents.querySelector(`.trip-days`);

const mockedCards = new Array(dates.length).fill().map((_element, index) => {
  return generateCards(CARD_COUNT, index);
});

for (let i = 0; i < dates.length; i++) {
  render(daysList, createTripDayTemplate(i), `beforeend`);
  const daysItem = daysList.querySelector(`.js-days__item${i}`);
  render(daysItem, createTripEventsTemplate(i), `beforeend`);

  const eventsList = daysItem.querySelector(`.js-events__list${i}`);
  const eventList = daysItem.querySelector(`.trip-events__list`);
  const cards = mockedCards[i];

  cards.forEach((card) => {
    const eventItemElement = createNodeElement(createTripEventTemplate(card));
    const eventEditElement = createNodeElement(createEventEditTemplate(card));

    renderNodeElement(eventsList, eventItemElement, `beforeend`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        eventList.replaceChild(eventItemElement, eventEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const itemRollupBtn = eventItemElement.querySelector(`.event__rollup-btn`);

    itemRollupBtn.addEventListener(`click`, () => {
      eventList.replaceChild(eventEditElement, eventItemElement);

      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const editRollupBtn = eventEditElement.querySelector(`.event__rollup-btn`);

    editRollupBtn.addEventListener(`click`, () => {
      eventList.replaceChild(eventItemElement, eventEditElement);

      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });
}
