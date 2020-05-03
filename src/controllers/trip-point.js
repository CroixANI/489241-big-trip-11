import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-point-edit.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";
import {isEscapeEvent} from "../utils/events.js";

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

export default class PointController {
  constructor(containerElement) {
    this._containerElement = containerElement;
  }

  render(tripPoint) {
    renderTripPoint(this._containerElement, tripPoint);
  }
}
