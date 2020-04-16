import createTripDetailsTemplate from "./components/trip-details.js";
import createTripTabsTemplate from "./components/trip-tabs.js";
import createTripFiltersTemplate from "./components/trip-list-filter.js";
import createTripSortTemplate from "./components/trip-list-sort.js";
import createTripRoutesContainerTemplate from "./components/trip-routes.js";
import backend from "./data/backend.js";
import createTrip from "./data/trip.js";
import filterMock from "./mocks/filter.js";
import tabsMock from "./mocks/tabs.js";
import random from "./utils/random.js";

const sitePageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = sitePageHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`main .trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderAll = () => {
  const trip = createTrip(backend.getPoints());

  render(tripMainElement, createTripDetailsTemplate(trip), `afterbegin`);

  const randomTab = random.getRandomArrayItem(tabsMock.AVAILABLE_TABS);
  render(tripControlsElement, createTripTabsTemplate(randomTab), `beforeend`);

  const randomSelectedFilter = random.getRandomArrayItem(filterMock.AVAILABLE_FILTERS);
  render(tripControlsElement, createTripFiltersTemplate(randomSelectedFilter.type), `beforeend`);

  render(tripEventsElement, createTripSortTemplate(), `beforeend`);

  trip.days[0].points[0].isEditMode = true;
  render(tripEventsElement, createTripRoutesContainerTemplate(trip), `beforeend`);
};

renderAll();
