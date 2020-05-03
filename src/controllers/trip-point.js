import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-point-edit.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";

const ESC_KEY = `Escape`;

export default class PointController {
  constructor(containerElement, onDataChange) {
    this._containerElement = containerElement;
    this._onDataChange = onDataChange;
    this._viewComponent = null;
    this._editComponent = null;

    this._onEscapeKeydown = this._onEscapeKeydown.bind(this);
  }

  render(tripPoint) {
    this._editComponent = new TripPointEditComponent(tripPoint);
    this._viewComponent = new TripPointComponent(tripPoint);

    this._viewComponent.addOnEditButtonClickEvent(() => {
      this._showEditForm();
    });
    this._editComponent.addOnCancelButtonClickEvent(() => {
      this._hideEditForm();
    });
    this._editComponent.addOnFormSubmitEvent((evt) => {
      evt.preventDefault();
      this._hideEditForm();
    });
    this._editComponent.addOnFavoriteButtonClickEvent((newPoint) => {
      this._onDataChange(tripPoint, newPoint);
    });

    render(this._containerElement, this._viewComponent, constants.RENDER_POSITIONS.BEFORE_END);
  }

  _hideEditForm() {
    replace(this._containerElement, this._viewComponent, this._editComponent);
    document.removeEventListener(`keydown`, this._onEscapeKeydown);
  }

  _showEditForm() {
    replace(this._containerElement, this._editComponent, this._viewComponent);
    document.addEventListener(`keydown`, this._onEscapeKeydown);
  }

  _onEscapeKeydown(evt) {
    if (evt.key === ESC_KEY) {
      this._hideEditForm();
    }
  }
}