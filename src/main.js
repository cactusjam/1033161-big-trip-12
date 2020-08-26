import TripControlsView from "./view/trip-controls.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripEventButtonView from "./view/trip-event-button.js";
// import SortView from "./view/sort.js";
// import TripDaysView from "./view/trip-days.js";
// import TripDayView from "./view/trip-day.js";
// import TripEventsView from "./view/trip-events.js";
// import TripEventView from "./view/trip-event.js";
// import EventEditView from "./view/event-edit.js";
// import EventMessageView from "./view/event-message.js";
import HiddenCaptionView from "./view/hidden-caption.js";
import {render, RenderPosition} from "./utils/dom.js";
import {BlockTitle} from "./constants.js";
// import {escEventHandler} from "./utils/dom-event.js";
import {generateCards} from "./mock/card.js";
import {filterNames} from "./mock/filter.js";
// import {destinations} from "./mock/destinations.js";
// import {groupCardsByDay} from "./utils/date.js";
import TripPresenter from "./presenter/trip.js";
// const CARD_COUNT = 20;
// const tripCards = generateCards(CARD_COUNT);

const CARD_COUNT = 20;
const tripCards = generateCards(CARD_COUNT);

const renderBlock = (container, title, generateTemplate) => {
  const hiddenCaptionComponent = new HiddenCaptionView(title);
  render(container, hiddenCaptionComponent);
  render(container, generateTemplate);
};

const siteMainElement = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(siteMainElement, renderBlock);

const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderBlock(tripControls, BlockTitle.SWITCH, new TripControlsView());
renderBlock(tripControls, BlockTitle.FILTER, new FilterView(filterNames));

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfoView(), RenderPosition.AFTER_BEGIN);
const tripEventButtonComponent = new TripEventButtonView();
render(tripMain, tripEventButtonComponent);

tripPresenter.init(tripCards);

// const tripEvents = document.querySelector(`.trip-events`);

// if (tripCards.length > 0) {
//   renderBlock(tripEvents, BlockTitle.TRIP_EVENTS, new SortView());

//   const tripDaysComponent = new TripDaysView();
//   const days = groupCardsByDay(tripCards);

//   Object.values(days).forEach((dayCards, counter) => {
//     const daysItem = new TripDayView(counter + 1, dayCards[0].startDate);
//     render(tripDaysComponent, daysItem);

//     const eventsList = new TripEventsView();
//     render(daysItem, eventsList);

//     const renderCardEvent = (card, eventList) => {
//       const eventEditComponent = new EventEditView(card, destinations);
//       const eventItemComponent = new TripEventView(card);

//       const replaceEventToForm = () => {
//         replace(eventEditComponent, eventItemComponent);
//       };

//       const replaceFormToEvent = () => {
//         replace(eventItemComponent, eventEditComponent);
//       };

//       const escKeyDownHandler = (evt) => {
//         if (escEventHandler(evt)) {
//           replaceFormToEvent();
//           document.removeEventListener(`keydown`, escKeyDownHandler);
//         }
//       };

//       eventItemComponent.setEditClickHandler(() => {
//         replaceEventToForm();
//         document.addEventListener(`keydown`, escKeyDownHandler);
//       });

//       eventEditComponent.setFormSubmitHandler(() => {
//         replaceFormToEvent();
//         document.removeEventListener(`keydown`, escKeyDownHandler);
//       });

//       eventEditComponent.setFormResetHandler(() => {
//         replaceFormToEvent();
//       });

//       eventEditComponent.setRollupButtonClickHandler(() => {
//         replaceFormToEvent();
//       });

//       render(eventList, eventItemComponent, RenderPosition.BEFORE_END);
//     };

//     dayCards.forEach((card) => {
//       renderCardEvent(card, eventsList);
//     });
//   });

//   render(tripEvents, tripDaysComponent);
// } else {
//   render(tripEvents, new EventMessageView(EventMessage.NO_EVENTS));
// }
