import TripPoint from "../data/trip-point.js";
import TripComponent from "../components/trip.js";
import TripDayComponent from "../components/trip-day.js";
import TripEmptyDayComponent from "../components/trip-day-empty.js";
import TripPointController, {TripPointControllerMode} from "./trip-point.js";
import NoPointsComponent from "../components/no-points.js";
import TripSortComponent, {SortType} from "../components/trip-sort.js";
import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";

const POINTS_CONTAINER_SELECTOR = `.trip-events__list`;

const TripControllerMode = {
  DEFAULT: `default`,
  SORTING: `sorting`
};

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
    let tripDayComponent = new TripDayComponent(dayIndex, pointsArray[0].start);
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
  constructor(containerElement, tripModel) {
    this._containerElement = containerElement;
    this._tripModel = tripModel;
    this._sortComponent = new TripSortComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._tripComponent = new TripComponent();
    this._tripPointControllers = [];
    this._newTripPointController = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onNewButtonClicked = this._onNewButtonClicked.bind(this);
    this._onSortTypeChanged = this._onSortTypeChanged.bind(this);

    this._tripModel.setOnFilterChangedHandler(this._onFilterChange);
    this._sortComponent.setOnSortTypeChangedHandler(this._onSortTypeChanged);
    this._tripComponent.setOnNewButtonClickedHandler(this._onNewButtonClicked);
  }

  render() {
    const points = this._tripModel.getPoints();
    this._renderPoints(points, TripControllerMode.DEFAULT);
  }

  _renderPoints(points, mode) {
    if (points.length === 0) {
      render(this._containerElement, this._noPointsComponent, constants.RENDER_POSITIONS.BEFORE_END);
    } else {
      render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.BEFORE_END);
      if (mode === TripControllerMode.DEFAULT) {
        this._tripPointControllers = renderTripWithDays(this._containerElement, points, this._onDataChange, this._onViewChange);
      } else {
        this._tripPointControllers = renderTripWithSorting(this._containerElement, points);
      }
    }
  }

  _clear() {
    this._containerElement.innerHTML = ``;
    this._tripPointControllers.forEach((controller) => controller.destroy());
    this._tripPointControllers = [];
  }

  _reRender() {
    this._clear();
    this.render();
  }

  _onDataChange(tripPointController, oldPoint, newPoint) {
    if (newPoint === null && oldPoint !== null) {
      this._tripModel.removePoint(oldPoint.id);
      tripPointController.destroy();
      this._reRender();
    } if (oldPoint === null && newPoint !== null) {
      this._tripModel.addPoint(newPoint);
    } else if (oldPoint !== null && newPoint !== null) {
      const isSuccess = this._tripModel.updatePoint(oldPoint.id, newPoint);

      if (isSuccess) {
        tripPointController.render(newPoint);
      }
    } else {
      this._newTripPointController.destroy();
      this._newTripPointController = null;
    }
  }

  _onViewChange() {
    this._tripPointControllers.forEach((pointController) => pointController.setDefaultView());
    if (this._newTripPointController) {
      this._newTripPointController.destroy();
      this._newTripPointController = null;
    }
  }

  _onFilterChange() {
    this._reRender();
  }

  _onNewButtonClicked() {
    if (this._newTripPointController) {
      return;
    }

    this._resetState();
    this._reRender();
    this._newTripPointController = new TripPointController(this._containerElement, this._onDataChange, this._onViewChange);
    this._newTripPointController.render(new TripPoint(), TripPointControllerMode.NEW);
  }

  _onSortTypeChanged(sortType) {
    this._newTripPointController.destroy();
    this._newTripPointController = null;
    this._clear();
    const points = this._tripModel.getPoints();

    render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.BEFORE_END);
    if (sortType === SortType.EVENT) {
      this._renderPoints(points, TripControllerMode.DEFAULT);
    } else {
      const sortedPoints = points.slice().sort(comparePointsBySortType(sortType));
      this._renderPoints(sortedPoints, TripControllerMode.SORTING);
    }
  }

  _resetState() {
    this._tripModel.resetState();
    const oldSortComponent = this._sortComponent;

    this._sortComponent = new TripSortComponent();
    this._sortComponent.setOnSortTypeChangedHandler(this._onSortTypeChanged);
    replace(this._sortComponent, oldSortComponent);
  }
}
