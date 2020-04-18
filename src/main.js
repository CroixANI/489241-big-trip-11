import TripDetailsComponent from "./components/trip-details.js";
import MenuComponent from "./components/menu.js";
import TripFilterComponent from "./components/trip-filter.js";
import TripSortComponent from "./components/trip-sort.js";
import TripComponent from "./components/trip.js";
import backend from "./data/backend.js";
import createTrip from "./data/trip.js";
import constants from "./data/constants.js";
import {render} from "./utils/render.js";

const sitePageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = sitePageHeaderElement.querySelector(`.trip-main`);
const tripViewHeaderElement = tripMainElement.querySelector(`.trip-controls .trip-view-header`);
const tripFilterHeaderElement = tripMainElement.querySelector(`.trip-controls .trip-filter-header`);
const tripEventsElement = document.querySelector(`main .trip-events`);

const renderAll = () => {
  const trip = createTrip(backend.getPoints());

  render(tripMainElement, new TripDetailsComponent(trip).getElement(), constants.RENDER_POSITIONS.AFTERBEGIN);
  render(tripViewHeaderElement, new MenuComponent().getElement(), constants.RENDER_POSITIONS.AFTEREND);
  render(tripFilterHeaderElement, new TripFilterComponent().getElement(), constants.RENDER_POSITIONS.AFTEREND);
  render(tripEventsElement, new TripSortComponent().getElement(), constants.RENDER_POSITIONS.BEFOREEND);
  render(tripEventsElement, new TripComponent(trip).getElement(), constants.RENDER_POSITIONS.BEFOREEND);
};

renderAll();
