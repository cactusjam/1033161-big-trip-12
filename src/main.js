import TripControlsView from "./view/trip-controls.js";
import TripInfoView from "./view/trip-info.js";
import EventAddButtonView from "./view/event-add-button.js";
import {render, RenderPosition} from "./utils/dom.js";
import {generateCards} from "./mock/card.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {destinations} from "./mock/destinations.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";

const CARD_COUNT = 20;
const tripCards = generateCards(CARD_COUNT);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripCards);
pointsModel.setDestinations(destinations);
const filterModel = new FilterModel();

const siteMainBlock = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const switchMenu = tripControls.querySelector(`.js-switch`);
const filterMenu = tripControls.querySelector(`.js-filter`);
const tripPresenter = new TripPresenter(siteMainBlock, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterMenu, pointsModel, filterModel);
render(switchMenu, new TripControlsView(), RenderPosition.AFTER_END);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfoView(), RenderPosition.AFTER_BEGIN);
const tripEventButtonComponent = new EventAddButtonView();
render(tripMain, tripEventButtonComponent);

filterPresenter.init();
tripPresenter.init();

const handleTripEventButtonClick = () => {
  tripPresenter.createPoint();
};

tripEventButtonComponent.setClickHandler(handleTripEventButtonClick);
