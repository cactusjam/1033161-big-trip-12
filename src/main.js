import TripControlsView from "./view/trip-controls.js";
// import TripInfoView from "./view/trip-info.js";
import EventAddButtonView from "./view/event-add-button.js";
import {render, RenderPosition} from "./utils/dom.js";
// import {generateCards} from "./mock/card.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import InfoPresenter from "./presenter/info.js";
import StatisticsPresenter from "./presenter/statistics.js";
// import {destinations} from "./mock/destinations.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import Api from "./api/api.js";
import {TabItem, UpdateType, FilterType} from "./constants";

// const CARD_COUNT = 20;
const ApiConfig = {
  AUTHORIZATION: `Basic 5656vbvhsdskH`,
  END_POINT: `https://12.ecmascript.pages.academy/big-trip`
};

// const tripCards = generateCards(CARD_COUNT);
const api = new Api(ApiConfig.END_POINT, ApiConfig.AUTHORIZATION);
const filterModel = new FilterModel();
const pointsModel = new PointsModel();
// pointsModel.set(tripCards);
// pointsModel.setDestinations(destinations);

const tripMain = document.querySelector(`.trip-main`);
const siteMainBlock = document.querySelector(`.trip-events`);
const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
const switchMenu = tripControls.querySelector(`.js-switch`);
const filterMenu = tripControls.querySelector(`.js-filter`);

const tripEventButtonComponent = new EventAddButtonView();

const newPointFormCloseCallback = () => {
  tripEventButtonComponent.setDisabled(false);
};

const newPointFormOpenedHandler = () => {
  tripEventButtonComponent.setDisabled(true);
};

const tripComponent = new TripPresenter(siteMainBlock, pointsModel, filterModel, api, newPointFormCloseCallback);
const filterComponent = new FilterPresenter(filterMenu, pointsModel, filterModel);
const statisticsComponent = new StatisticsPresenter(siteMainBlock, pointsModel);
const infoComponent = new InfoPresenter(tripMain, pointsModel, filterModel);

const tripControlsComponent = new TripControlsView();

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
      tripEventButtonComponent.setDisabled(false);
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

infoComponent.init();
filterComponent.init();
tripComponent.init();

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getPoints()
])
  .then((values) => {
    const [destinations, offers, points] = values;

    pointsModel.setDestinations(destinations);
    pointsModel.setOffers(offers);
    pointsModel.set(UpdateType.INIT, points);
    render(switchMenu, tripControlsComponent, RenderPosition.AFTER_END);
    tripControlsComponent.setMenuItemClickHandler(handleSiteMenuClick);
    tripEventButtonComponent.setMenuItemClickHandler(handleSiteMenuClick);
  })
  .catch((err) => {
    console.log('errr', err);
    pointsModel.set(UpdateType.INIT, []);
  });
