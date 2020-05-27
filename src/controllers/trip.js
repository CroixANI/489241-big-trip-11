import TripPoint from "../data/trip-point.js";
import TripComponent from "../components/trip.js";
import TripDayComponent from "../components/trip-day.js";
import TripEmptyDayComponent from "../components/trip-day-empty.js";
import TripPointController, {TripPointControllerMode} from "./trip-point.js";
import NoPointsComponent from "../components/no-points.js";
import LoadingComponent from "../components/loading.js";
import TripSortComponent, {SortType} from "../components/trip-sort.js";
import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";
import {render, remove, replace} from "../utils/render.js";

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

const renderTripWithDays = (container, tripComponent, orderedPoints, onDataChange, onViewChange) => {
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

const renderTripWithSorting = (container, tripComponent, sortedPoints, onDataChange, onViewChange) => {
  const tripDayComponent = new TripEmptyDayComponent();
  const daysContainer = tripComponent.getElement();

  const controllers = renderTripDay(daysContainer, tripDayComponent, sortedPoints, onDataChange, onViewChange);

  render(container, tripComponent, constants.RENDER_POSITIONS.BEFORE_END);

  return controllers;
};

export default class TripController {
  constructor(containerElement, tripModel, backend) {
    this._containerElement = containerElement;
    this._tripModel = tripModel;
    this._backend = backend;
    this._sortComponent = new TripSortComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._loadingComponent = new LoadingComponent();
    this._tripComponent = new TripComponent();
    this._tripPointControllers = [];
    this._newTripPointController = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChanged = this._onSortTypeChanged.bind(this);
    this._reRender = this._reRender.bind(this);

    this._tripModel.setOnFilterChangedHandler(this._onFilterChange);
    this._tripModel.setOnDataChangeHandler(this._reRender);
    this._sortComponent.setOnSortTypeChangedHandler(this._onSortTypeChanged);
  }

  render() {
    const points = this._tripModel.getPoints();
    if (!this._tripModel.isInitialized()) {
      render(this._containerElement, this._loadingComponent, constants.RENDER_POSITIONS.BEFORE_END);
    } else {
      this._renderPoints(points, TripControllerMode.DEFAULT);
    }
  }

  show() {
    this._containerElement.classList.remove(constants.VISUALLY_HIDDEN_CLASS);
  }

  hide() {
    this._resetState();
    this._containerElement.classList.add(constants.VISUALLY_HIDDEN_CLASS);
  }

  _renderPoints(points, mode) {
    if (points.length === 0) {
      render(this._containerElement, this._noPointsComponent, constants.RENDER_POSITIONS.BEFORE_END);
    } else {
      render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.AFTER_BEGIN);
      if (mode === TripControllerMode.DEFAULT) {
        this._tripPointControllers = renderTripWithDays(this._containerElement, this._tripComponent, points, this._onDataChange, this._onViewChange);
      } else {
        this._tripPointControllers = renderTripWithSorting(this._containerElement, this._tripComponent, points, this._onDataChange, this._onViewChange);
      }
    }
  }

  _clear() {
    this._containerElement.innerHTML = ``;
    this._tripPointControllers.forEach((controller) => controller.destroy());
    this._tripPointControllers = [];
    remove(this._tripComponent);
  }

  _reRender() {
    this._clear();
    this.render();
  }

  _onDataChange(tripPointController, oldPoint, newPoint) {
    if (newPoint === null && oldPoint !== null) {
      this._backend.deletePoint(oldPoint.id)
        .then(() => {
          const isSuccess = this._tripModel.removePoint(oldPoint.id);
          if (isSuccess) {
            tripPointController.destroy();
            this._reRender();
          }
        })
        .catch(() => {
          tripPointController.shake();
        });
    } if (oldPoint === null && newPoint !== null) {
      this._backend.createPoint(newPoint)
        .then((createdPoint) => {
          const isSuccess = this._tripModel.addPoint(createdPoint);

          if (isSuccess) {
            this._closeNewEventForm();
            this._reRender();
          }
        })
        .catch(() => {
          tripPointController.shake();
        });
    } else if (oldPoint !== null && newPoint !== null) {
      this._backend.updatePoint(oldPoint.id, newPoint)
        .then((updatedPoint) => {
          const isSuccess = this._tripModel.updatePoint(oldPoint.id, updatedPoint);

          if (isSuccess) {
            tripPointController.render(newPoint);
          }
        })
        .catch(() => {
          tripPointController.shake();
        });
    } else {
      this._closeNewEventForm();
    }
  }

  _onViewChange() {
    this._tripPointControllers.forEach((pointController) => pointController.setDefaultView());
    this._closeNewEventForm();
  }

  _onFilterChange() {
    this._reRender();
  }

  onNewButtonClicked() {
    if (this._newTripPointController) {
      return;
    }

    this._resetState();
    this._clear();
    this._newTripPointController = new TripPointController(this._containerElement, this._onDataChange, this._onViewChange);
    this._newTripPointController.render(new TripPoint(), TripPointControllerMode.NEW);
    this.render();
  }

  _onSortTypeChanged(sortType) {
    this._closeNewEventForm();

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

  _closeNewEventForm() {
    if (this._newTripPointController) {
      this._newTripPointController.destroy();
      this._newTripPointController = null;
    }
  }
}
