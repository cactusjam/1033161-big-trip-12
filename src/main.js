import TripControlsView from "./view/trip-controls.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import AddEventButtonView from "./view/add-event-button.js";
import {render, RenderPosition} from "./utils/dom.js";
import {generateCards} from "./mock/card.js";
import {filterNames} from "./mock/filter.js";
import TripPresenter from "./presenter/trip.js";
import {destinations} from "./mock/destinations.js";

const CARD_COUNT = 20;
const tripCards = generateCards(CARD_COUNT);

const siteMainElement = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const switchMenu = tripControls.querySelector(`.js-switch`);
const filterMenu = tripControls.querySelector(`.js-filter`);
const tripPresenter = new TripPresenter(siteMainElement);
render(switchMenu, new TripControlsView(), RenderPosition.AFTER_END);
render(filterMenu, new FilterView(filterNames), RenderPosition.AFTER_END);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfoView(), RenderPosition.AFTER_BEGIN);
const tripEventButtonComponent = new AddEventButtonView();
render(tripMain, tripEventButtonComponent);

tripPresenter.init(tripCards, destinations);
