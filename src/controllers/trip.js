import TripComponent from "../components/trip.js";
import TripDayComponent from "../components/trip-day.js";
import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-point-edit.js";
import NoPointsComponent from "../components/no-points.js";
import TripSortComponent from "../components/trip-sort.js";
import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";
import {isEscapeEvent} from "../utils/events.js";

const POINTS_CONTAINER_SELECTOR = `.trip-events__list`;

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

const renderTripDay = (container, dayIndex, orderedPoints) => {
  const tripDayComponent = new TripDayComponent(dayIndex, orderedPoints[0].start);
  const pointsContainer = tripDayComponent.getElement().querySelector(POINTS_CONTAINER_SELECTOR);

  for (let point of orderedPoints) {
    renderTripPoint(pointsContainer, point);
  }

  render(container, tripDayComponent, constants.RENDER_POSITIONS.BEFORE_END);
};

const renderTrip = (container, orderedPoints) => {
  const tripComponent = new TripComponent();
  const daysContainer = tripComponent.getElement();
  const groupedByDay = groupPointsByStartDate(orderedPoints);

  let dayIndex = 1;
  for (let pointsArray of groupedByDay.values()) {
    renderTripDay(daysContainer, dayIndex, pointsArray);
    dayIndex++;
  }

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
      this._sortComponent.setOnSortTypeChangedHandler((evt, sortType) => {
      });
      render(this._containerElement, this._sortComponent, constants.RENDER_POSITIONS.BEFORE_END);
      renderTrip(this._containerElement, orderedPoints);
    }
  }
}
