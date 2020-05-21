import backend from "./data/backend.js";
import TripModel from "./models/trip.js";
import MenuComponent, {MENU_ITEMS} from "./components/menu.js";
import TripDetailsComponent from "./components/trip-details.js";
import TripStatisticsComponent from "./components/trip-statistics.js";
import TripDetails from "./data/trip-details.js";
import TripFilterController from "./controllers/trip-filter.js";
import TripController from "./controllers/trip.js";
import constants from "./data/constants.js";
import {render} from "./utils/render.js";

const PAGE_HEADER_SELECTOR = `.page-header`;
const MAIN_CONTAINER_SELECTOR = `.trip-main`;
const MENU_HEADER_SELECTOR = `.trip-controls .trip-view-header`;
const FILTER_HEADER_SELECTOR = `.trip-controls .trip-filter-header`;
const TRIP_CONTAINER_SELECTOR = `main .trip-events`;

const sitePageHeaderElement = document.querySelector(PAGE_HEADER_SELECTOR);
const tripMainElement = sitePageHeaderElement.querySelector(MAIN_CONTAINER_SELECTOR);
const tripViewHeaderElement = tripMainElement.querySelector(MENU_HEADER_SELECTOR);
const tripFilterHeaderElement = tripMainElement.querySelector(FILTER_HEADER_SELECTOR);
const tripEventsElement = document.querySelector(TRIP_CONTAINER_SELECTOR);

const renderAll = () => {
  const points = backend.getPoints();
  const tripModel = new TripModel(points);
  const tripDetails = new TripDetails(tripModel);
  const menuComponent = new MenuComponent();
  const tripStatisticsComponent = new TripStatisticsComponent();
  const tripController = new TripController(tripEventsElement, tripModel);

  menuComponent.setOnMenuChangedHandler((menuItem) => {
    if (menuItem === MENU_ITEMS.TABLE) {
      tripController.show();
      tripStatisticsComponent.hide();
    } else {
      tripController.hide();
      tripStatisticsComponent.show();
    }
  });

  render(tripMainElement, new TripDetailsComponent(tripDetails), constants.RENDER_POSITIONS.AFTER_BEGIN);
  render(tripViewHeaderElement, menuComponent, constants.RENDER_POSITIONS.AFTER_END);
  new TripFilterController(tripFilterHeaderElement, tripModel).render();
  tripController.render();
  render(tripEventsElement, tripStatisticsComponent, constants.RENDER_POSITIONS.AFTER_END);
  tripStatisticsComponent.hide();
};

renderAll();
