import TripControlsView from "./view/trip-controls.js";
import FilterView from "./view/filter.js";
import TripInfoView from "./view/trip-info.js";
import AddEventButtonView from "./view/trip-event-button.js";
import HiddenCaptionView from "./view/hidden-caption.js";
import {render, RenderPosition} from "./utils/dom.js";
import {BlockTitle} from "./constants.js";
import {generateCards} from "./mock/card.js";
import {filterNames} from "./mock/filter.js";
import TripPresenter from "./presenter/trip.js";

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
const tripEventButtonComponent = new AddEventButtonView();
render(tripMain, tripEventButtonComponent);

tripPresenter.init(tripCards);
