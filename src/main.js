import createTripDetailsTemplate from "./components/trip-details.js";
import createTripTabsTemplate from "./components/trip-tabs.js";
import createTripFiltersTemplate from "./components/trip-list-filter.js";
import createTripSortTemplate from "./components/trip-list-sort.js";
import createTripEditFormTemplate from "./components/trip-edit.js";
import createTripRouteDayGroupTemplate from "./components/trip-routes-day.js";
import createTripRoutesContainerTemplate from "./components/trip-routes.js";
import createTripRoutePointTemplate from "./components/trip-routes-day-point.js";
import pointMock from "./mocks/point.js";
import filterMock from "./mocks/filter.js";
import tabsMock from "./mocks/tabs.js";
import random from "./utils/random.js";

const sitePageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = sitePageHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`main .trip-events`);

const MIN_POINTS_MOCKS = 15;
const MAX_POINTS_MOCKS = 20;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const generateTripRoutePointsMocks = () => {
  const count = random.random(MIN_POINTS_MOCKS, MAX_POINTS_MOCKS);
  let result = [];

  for (let index = 0; index < count; index++) {
    result.push(pointMock());
  }

  return result;
};

const createTripRoutePointsTemplate = (points) => {
  return points.map((point) => {
    return createTripRoutePointTemplate(point);
  }).join(` `);
};

const renderAll = () => {
  let points = generateTripRoutePointsMocks();

  render(tripMainElement, createTripDetailsTemplate(), `afterbegin`);

  const randomTab = random.getRandomArrayItem(tabsMock.AVAILABLE_TABS);
  render(tripControlsElement, createTripTabsTemplate(randomTab), `beforeend`);

  const randomSelectedFilter = random.getRandomArrayItem(filterMock.AVAILABLE_FILTERS);
  render(tripControlsElement, createTripFiltersTemplate(randomSelectedFilter.type), `beforeend`);

  render(tripEventsElement, createTripSortTemplate(), `beforeend`);
  render(tripEventsElement, createTripEditFormTemplate(random.getRandomArrayItem(points)), `beforeend`);

  let pointsTemplate = createTripRoutePointsTemplate(points);
  let dayTemplate = createTripRouteDayGroupTemplate(pointsTemplate);
  let tripRoutesContainer = createTripRoutesContainerTemplate(dayTemplate);
  render(tripEventsElement, tripRoutesContainer, `beforeend`);
};

renderAll();
