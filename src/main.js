import createTripDetailsTemplate from "./components/trip-details.js";
import createTripTabsTemplate from "./components/trip-tabs.js";
import createTripFiltersTemplate from "./components/trip-list-filter.js";
import createTripSortTemplate from "./components/trip-list-sort.js";
import createTripEditFormTemplate from "./components/trip-edit.js";
import createTripRouteDayGroupTemplate from "./components/trip-routes-day.js";
import createTripRoutesContainerTemplate from "./components/trip-routes.js";
import createTripRoutePointTemplate from "./components/trip-routes-day-point.js";

const MAX_POINTS_TO_RENDER = 3;
const sitePageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = sitePageHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`main .trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createTripRoutePointsTemplate = () => {
  let points = [];
  for (let index = 0; index < MAX_POINTS_TO_RENDER; index++) {
    points.push(createTripRoutePointTemplate());
  }

  return points.join(` `);
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
