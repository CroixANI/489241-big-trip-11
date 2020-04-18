import TripDetailsComponent from "./components/trip-details.js";
import MenuComponent from "./components/menu.js";
import TripFilterComponent from "./components/trip-filter.js";
import TripSortComponent from "./components/trip-sort.js";
import TripComponent from "./components/trip.js";
import backend from "./data/backend.js";
import createTrip from "./data/trip.js";

const sitePageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = sitePageHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`main .trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderAll = () => {
  const trip = createTrip(backend.getPoints());

  render(tripMainElement, new TripDetailsComponent(trip).getTemplate(), `afterbegin`);
  render(tripControlsElement, new MenuComponent().getTemplate(), `beforeend`);
  render(tripControlsElement, new TripFilterComponent().getTemplate(), `beforeend`);
  render(tripEventsElement, new TripSortComponent().getTemplate(), `beforeend`);

  trip.days[0].points[0].isEditMode = true;
  render(tripEventsElement, new TripComponent(trip).getTemplate(), `beforeend`);
};

renderAll();
