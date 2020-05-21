import backend from "./data/backend.js";
import TripModel from "./models/trip.js";
import MenuComponent from "./components/menu.js";
import TripDetailsComponent from "./components/trip-details.js";
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

  render(tripMainElement, new TripDetailsComponent(tripDetails), constants.RENDER_POSITIONS.AFTER_BEGIN);
  render(tripViewHeaderElement, new MenuComponent(), constants.RENDER_POSITIONS.AFTER_END);
  new TripFilterController(tripFilterHeaderElement, tripModel).render();
  new TripController(tripEventsElement, tripModel).render();
};

renderAll();
