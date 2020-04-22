import TripComponent from "../components/trip.js";
import TripDayComponent from "../components/trip-day.js";
import TripEmptyDayComponent from "../components/trip-day-empty.js";
import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-point-edit.js";
import NoPointsComponent from "../components/no-points.js";
import TripSortComponent, {SortType} from "../components/trip-sort.js";
import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";
import {isEscapeEvent} from "../utils/events.js";

const POINTS_CONTAINER_SELECTOR = `.trip-events__list`;

const comparePointsBySortType = (sortType) => {
  return function comparePoints(firstPoint, secondPoint) {
    switch (sortType) {
      case SortType.TIME:
        const firstPointTotalMilliseconds = firstPoint.end - firstPoint.start;
        const secondPointTotalMilliseconds = secondPoint.end - secondPoint.start;
        return firstPointTotalMilliseconds - secondPointTotalMilliseconds;
      case SortType.PRICE:
        return firstPoint.price - secondPoint.price;
    }

    return dateFormat.getDateNumberForGrouping(firstPoint.start) - dateFormat.getDateNumberForGrouping(secondPoint.start);
  };
};

const groupPointsByStartDate = (orderedPoints) => {
  return orderedPoints.reduce((total, point) => {
    const groupingNumber = dateFormat.getDateNumberForGrouping(point.start);

    if (!total.has(groupingNumber)) {
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
    replace(container, editComponent, viewComponent);
  };

  const hideEditForm = () => {
    replace(container, viewComponent, editComponent);
  };

  const onCancelButtonClick = () => {
    hideEditForm();
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    hideEditForm();
  };

  const onEscapeKeydown = (evt) => {
    isEscapeEvent(evt, hideEditForm);
  };

  viewComponent.addOnEditButtonClickEvent(onEditButtonClick);

  editComponent.addOnCancelButtonClickEvent(onCancelButtonClick);
  editComponent.addOnFormSubmitEvent(onEditFormSubmit);
  document.addEventListener(`keydown`, onEscapeKeydown);

  render(container, viewComponent, constants.RENDER_POSITIONS.BEFORE_END);
};

const renderTripDay = (container, tripDayComponent, orderedPoints) => {
  const pointsContainer = tripDayComponent.getElement().querySelector(POINTS_CONTAINER_SELECTOR);

  for (let point of orderedPoints) {
    renderTripPoint(pointsContainer, point);
  }

  render(container, tripDayComponent, constants.RENDER_POSITIONS.BEFORE_END);
};

const renderTripWithDays = (container, orderedPoints) => {
  const tripComponent = new TripComponent();
  const daysContainer = tripComponent.getElement();
  const groupedByDay = groupPointsByStartDate(orderedPoints);

  let dayIndex = 1;
  for (let pointsArray of groupedByDay.values()) {
    let tripDayComponent = new TripDayComponent(dayIndex, orderedPoints[0].start);
    renderTripDay(daysContainer, tripDayComponent, pointsArray);
    dayIndex++;
  }

  render(container, tripComponent, constants.RENDER_POSITIONS.BEFORE_END);
};

const renderTripWithSorting = (container, sortedPoints) => {
  const tripComponent = new TripComponent();
  const tripDayComponent = new TripEmptyDayComponent();
  const daysContainer = tripComponent.getElement();

  renderTripDay(daysContainer, tripDayComponent, sortedPoints);

  render(container, tripComponent, constants.RENDER_POSITIONS.BEFORE_END);
};

export default class TripController {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._sortComponent = new TripSortComponent();
  }

  render(orderedPoints) {
    if (orderedPoints.length === 0) {
      render(this._containerElement, new NoPointsComponent(), constants.RENDER_POSITIONS.BEFORE_END);
    } else {
      this._sortComponent.setOnSortTypeChangedHandler((sortType) => {
        this._containerElement.innerHTML = ``;
        render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.BEFORE_END);
        if (sortType === SortType.EVENT) {
          renderTripWithDays(this._containerElement, orderedPoints);
        } else {
          const sortedPoints = orderedPoints.slice().sort(comparePointsBySortType(sortType));
          renderTripWithSorting(this._containerElement, sortedPoints);
        }
      });
      render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.BEFORE_END);
      renderTripWithDays(this._containerElement, orderedPoints);
    }
  }
}
