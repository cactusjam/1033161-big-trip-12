import TripControlsView from "./view/trip-controls.js";
import TripInfoView from "./view/trip-info.js";
import EventAddButtonView from "./view/event-add-button.js";
import {render, RenderPosition} from "./utils/dom.js";
import {generateCards} from "./mock/card.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsPresenter from "./presenter/statistics.js";
import {destinations} from "./mock/destinations.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {TabItem, UpdateType, FilterType} from "./constants";

const CARD_COUNT = 20;
const tripCards = generateCards(CARD_COUNT);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
pointsModel.setPoints(tripCards);
pointsModel.setDestinations(destinations);

const siteMainBlock = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const switchMenu = tripControls.querySelector(`.js-switch`);
const filterMenu = tripControls.querySelector(`.js-filter`);

const tripEventButtonComponent = new EventAddButtonView();

const newPointFormCloseCallback = () => {
  tripEventButtonComponent.setMenuItem(true);
};

const newPointFormOpenedHandler = () => {
  tripEventButtonComponent.setMenuItem(false);
};

const tripComponent = new TripPresenter(siteMainBlock, pointsModel, filterModel, newPointFormCloseCallback);
const filterComponent = new FilterPresenter(filterMenu, pointsModel, filterModel);
const statisticsComponent = new StatisticsPresenter(siteMainBlock, pointsModel);

const tripControlsComponent = new TripControlsView();
render(switchMenu, tripControlsComponent, RenderPosition.AFTER_END);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfoView(), RenderPosition.AFTER_BEGIN);

render(tripMain, tripEventButtonComponent);

const handleSiteMenuClick = (tabItem) => {
  switch (tabItem) {
    case TabItem.TABLE:
      tripComponent.init();
      statisticsComponent.destroy();
      break;
    case TabItem.STATISTICS:
      tripComponent.destroy();
      statisticsComponent.init();
      break;
    case TabItem.NEW_POINT:
      statisticsComponent.destroy();
      tripComponent.destroy();
      filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripComponent.init();
      tripComponent.createPoint(newPointFormOpenedHandler);
      tripControlsComponent.setMenuItem(TabItem.TABLE);
      break;
  }
};

tripControlsComponent.setMenuItemClickHandler(handleSiteMenuClick);

// const handleTripEventButtonClick = () => {
//   tripComponent.createPoint();
// };

tripEventButtonComponent.setMenuItemClickHandler(handleSiteMenuClick);
// tripEventButtonComponent.setMenuItemClickHandler(handleTripEventButtonClick);

filterComponent.init();
tripComponent.init();
statisticsComponent.init();
