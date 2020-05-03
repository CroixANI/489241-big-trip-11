import TripComponent from "../components/trip.js";
import TripDayComponent from "../components/trip-day.js";
import TripEmptyDayComponent from "../components/trip-day-empty.js";
import TripPointController from "./trip-point.js";
import NoPointsComponent from "../components/no-points.js";
import TripSortComponent, {SortType} from "../components/trip-sort.js";
import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";
import {render} from "../utils/render.js";

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

const renderTripPoints = (container, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const tripPointController = new TripPointController(container, onDataChange, onViewChange);

    tripPointController.render(point);
    return tripPointController;
  });
};

const renderTripDay = (container, tripDayComponent, orderedPoints, onDataChange, onViewChange) => {
  const pointsContainer = tripDayComponent.getElement().querySelector(POINTS_CONTAINER_SELECTOR);
  const tripPointControllers = renderTripPoints(pointsContainer, orderedPoints, onDataChange, onViewChange);

  render(container, tripDayComponent, constants.RENDER_POSITIONS.BEFORE_END);

  return tripPointControllers;
};

const renderTripWithDays = (container, orderedPoints, onDataChange, onViewChange) => {
  const tripComponent = new TripComponent();
  const daysContainer = tripComponent.getElement();
  const groupedByDay = groupPointsByStartDate(orderedPoints);
  let tripPointControllers = [];

  let dayIndex = 1;
  for (let pointsArray of groupedByDay.values()) {
    let tripDayComponent = new TripDayComponent(dayIndex, orderedPoints[0].start);
    const controllers = renderTripDay(daysContainer, tripDayComponent, pointsArray, onDataChange, onViewChange);
    tripPointControllers = tripPointControllers.concat(controllers);
    dayIndex++;
  }

  render(container, tripComponent, constants.RENDER_POSITIONS.BEFORE_END);

  return tripPointControllers;
};

const renderTripWithSorting = (container, sortedPoints) => {
  const tripComponent = new TripComponent();
  const tripDayComponent = new TripEmptyDayComponent();
  const daysContainer = tripComponent.getElement();

  const controllers = renderTripDay(daysContainer, tripDayComponent, sortedPoints);

  render(container, tripComponent, constants.RENDER_POSITIONS.BEFORE_END);

  return controllers;
};

export default class TripController {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._sortComponent = new TripSortComponent();
    this._orderedPoints = [];
    this._tripPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(orderedPoints) {
    this._orderedPoints = orderedPoints;
    if (this._orderedPoints.length === 0) {
      render(this._containerElement, new NoPointsComponent(), constants.RENDER_POSITIONS.BEFORE_END);
    } else {
      this._sortComponent.setOnSortTypeChangedHandler((sortType) => {
        this._containerElement.innerHTML = ``;
        render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.BEFORE_END);
        if (sortType === SortType.EVENT) {
          this._tripPointControllers = renderTripWithDays(this._containerElement, this._orderedPoints, this._onDataChange, this._onViewChange);
        } else {
          const sortedPoints = this._orderedPoints.slice().sort(comparePointsBySortType(sortType));
          this._tripPointControllers = renderTripWithSorting(this._containerElement, sortedPoints, this._onDataChange, this._onViewChange);
        }
      });
      render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.BEFORE_END);
      this._tripPointControllers = renderTripWithDays(this._containerElement, this._orderedPoints, this._onDataChange, this._onViewChange);
    }
  }

  _onDataChange(tripPointController, oldPoint, newPoint) {
    const index = this._orderedPoints.findIndex((point) => point === oldPoint);

    if (index === -1) {
      return;
    }

    this._orderedPoints = [].concat(this._orderedPoints.slice(0, index), newPoint, this._orderedPoints.slice(index + 1));

    tripPointController.render(this._orderedPoints[index]);
  }

  _onViewChange() {
    this._tripPointControllers.forEach((pointController) => pointController.setDefaultView());
  }
}
