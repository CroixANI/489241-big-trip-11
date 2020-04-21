import backend from "./data/backend.js";
import MenuComponent from "./components/menu.js";
import TripDetailsComponent from "./components/trip-details.js";
import TripFilterComponent from "./components/trip-filter.js";
import TripDetails from "./data/trip-details.js";
import TripController from "./controllers/trip.js";
import constants from "./data/constants.js";
import dateFormat from "./utils/date-format.js";
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

const compareStartDate = (firstPoint, secondPoint) => {
  return dateFormat.getDateNumberForGrouping(firstPoint.start) - dateFormat.getDateNumberForGrouping(secondPoint.start);
};

const renderAll = () => {
  const points = backend.getPoints();
  const orderedPoints = points.sort(compareStartDate);
  const tripDetails = new TripDetails(orderedPoints);

  render(tripMainElement, new TripDetailsComponent(tripDetails), constants.RENDER_POSITIONS.AFTER_BEGIN);
  render(tripViewHeaderElement, new MenuComponent(), constants.RENDER_POSITIONS.AFTER_END);
  render(tripFilterHeaderElement, new TripFilterComponent(), constants.RENDER_POSITIONS.AFTER_END);
  new TripController(tripEventsElement).render(orderedPoints);
};

renderAll();
