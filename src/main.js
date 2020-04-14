import createTripDetailsTemplate from "./components/trip-details.js";
import createTripTabsTemplate from "./components/trip-tabs.js";
import createTripFiltersTemplate from "./components/trip-list-filter.js";
import createTripSortTemplate from "./components/trip-list-sort.js";
import createTripEditFormTemplate from "./components/trip-edit.js";
import createTripRouteDayGroupTemplate from "./components/trip-routes-day.js";
import createTripRoutesContainerTemplate from "./components/trip-routes.js";
import createTripRoutePointTemplate from "./components/trip-routes-day-point.js";
import pointMock from "./data/point-mock.js";
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

const createTripRoutePointsTemplate = () => {
  return generateTripRoutePointsMocks().map((point) => {
    return createTripRoutePointTemplate(point);
  }).join(` `);
};

const renderAll = () => {
  render(tripMainElement, createTripDetailsTemplate(), `afterbegin`);

  render(tripControlsElement, createTripTabsTemplate(), `beforeend`);
  render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);

  render(tripEventsElement, createTripSortTemplate(), `beforeend`);
  render(tripEventsElement, createTripEditFormTemplate(), `beforeend`);

  let pointsTemplate = createTripRoutePointsTemplate();
  let dayTemplate = createTripRouteDayGroupTemplate(pointsTemplate);
  let tripRoutesContainer = createTripRoutesContainerTemplate(dayTemplate);
  render(tripEventsElement, tripRoutesContainer, `beforeend`);
};

renderAll();
