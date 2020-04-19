import backend from "./data/backend.js";
import MenuComponent from "./components/menu.js";
import TripDetailsComponent from "./components/trip-details.js";
import TripFilterComponent from "./components/trip-filter.js";
import TripSortComponent from "./components/trip-sort.js";
import TripComponent from "./components/trip.js";
import TripDayComponent from "./components/trip-day.js";
import TripPointComponent from "./components/trip-point.js";
import TripPointEditComponent from "./components/trip-point-edit.js";
import TripDetails from "./data/trip-details.js";
import NoPointsComponent from "./components/no-points.js";
import constants from "./data/constants.js";
import dateFormat from "./utils/date-format.js";
import {render} from "./utils/render.js";

const PAGE_HEADER_SELECTOR = `.page-header`;
const MAIN_CONTAINER_SELECTOR = `.trip-main`;
const MENU_HEADER_SELECTOR = `.trip-controls .trip-view-header`;
const FILTER_HEADER_SELECTOR = `.trip-controls .trip-filter-header`;
const TRIP_CONTAINER_SELECTOR = `main .trip-events`;
const POINTS_CONTAINER_SELECTOR = `.trip-events__list`;

const sitePageHeaderElement = document.querySelector(PAGE_HEADER_SELECTOR);
const tripMainElement = sitePageHeaderElement.querySelector(MAIN_CONTAINER_SELECTOR);
const tripViewHeaderElement = tripMainElement.querySelector(MENU_HEADER_SELECTOR);
const tripFilterHeaderElement = tripMainElement.querySelector(FILTER_HEADER_SELECTOR);
const tripEventsElement = document.querySelector(TRIP_CONTAINER_SELECTOR);

const compareStartDate = (firstPoint, secondPoint) => {
  return dateFormat.getDateNumberForGrouping(firstPoint.start) - dateFormat.getDateNumberForGrouping(secondPoint.start);
};

const groupPointsByStartDate = (points) => {
  return points.sort(compareStartDate).reduce((total, point) => {
    const groupingNumber = dateFormat.getDateNumberForGrouping(point.start);

    if (!total) {
      total = new Map();
    }

    if (total.has(groupingNumber) === false) {
      total.set(groupingNumber, []);
    }

    let pointsInDay = total.get(groupingNumber);
    pointsInDay.push(point);

    return total;
  }, new Map());
};

const renderTripPoint = (container, point) => {
  const editComponent = new TripPointEditComponent(point);
  const viewComponent = new TripPointComponent(point);

  const onEditButtonClick = () => {
    container.replaceChild(editComponent.getElement(), viewComponent.getElement());
  };

  const hideEditForm = () => {
    container.replaceChild(viewComponent.getElement(), editComponent.getElement());
  };

  const onCancelButtonClick = () => {
    hideEditForm();
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    hideEditForm();
  };

  viewComponent.addOnEditButtonClickEvent(onEditButtonClick);

  editComponent.addOnCancelButtonClickEvent(onCancelButtonClick);
  editComponent.addOnFormSubmitEvent(onEditFormSubmit);

  render(container, viewComponent.getElement(), constants.RENDER_POSITIONS.BEFORE_END);
};

const renderTripDay = (container, dayIndex, orderedPoints) => {
  const tripDayComponent = new TripDayComponent(dayIndex, orderedPoints[0].start);
  const pointsContainer = tripDayComponent.getElement().querySelector(POINTS_CONTAINER_SELECTOR);

  for (let point of orderedPoints) {
    renderTripPoint(pointsContainer, point);
  }

  render(container, tripDayComponent.getElement(), constants.RENDER_POSITIONS.BEFORE_END);
};

const renderTrip = (groupedByDay) => {
  const tripComponent = new TripComponent();
  const daysContainer = tripComponent.getElement();

  let dayIndex = 1;
  for (let pointsArray of groupedByDay.values()) {
    renderTripDay(daysContainer, dayIndex, pointsArray);
    dayIndex++;
  }

  render(tripEventsElement, tripComponent.getElement(), constants.RENDER_POSITIONS.BEFORE_END);
};

const renderAll = () => {
  const points = backend.getPoints();
  const orderedPoints = points.sort(compareStartDate);
  const groupedByDay = groupPointsByStartDate(orderedPoints);
  const tripDetails = new TripDetails(orderedPoints);

  render(tripMainElement, new TripDetailsComponent(tripDetails).getElement(), constants.RENDER_POSITIONS.AFTER_BEGIN);
  render(tripViewHeaderElement, new MenuComponent().getElement(), constants.RENDER_POSITIONS.AFTER_END);
  render(tripFilterHeaderElement, new TripFilterComponent().getElement(), constants.RENDER_POSITIONS.AFTER_END);
  if (points.length === 0) {
    render(tripEventsElement, new NoPointsComponent().getElement(), constants.RENDER_POSITIONS.BEFORE_END);
  } else {
    render(tripEventsElement, new TripSortComponent().getElement(), constants.RENDER_POSITIONS.BEFORE_END);
    renderTrip(groupedByDay);
  }
};

renderAll();
