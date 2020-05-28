import TripPoint from "../data/trip-point.js";
import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-point-edit.js";
import constants from "../data/constants.js";
import {render, replace, remove} from "../utils/render.js";

const ESC_KEY = `Escape`;
const SHAKE_ANIMATION_TIMEOUT = 600;

export const TripPointControllerMode = {
  VIEW: `view`,
  EDIT: `edit`,
  NEW: `new`
};

export default class TripPointController {
  constructor(containerElement, onDataChange, onViewChange) {
    this._containerElement = containerElement;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._viewComponent = null;
    this._editComponent = null;
    this._currentMode = TripPointControllerMode.VIEW;
    this._onEscapeKeydown = this._onEscapeKeydown.bind(this);
  }

  render(tripPoint, mode = TripPointControllerMode.VIEW) {
    this._currentMode = mode;
    const oldEditComponent = this._editComponent;
    const oldViewComponent = this._viewComponent;

    this._editComponent = new TripPointEditComponent(tripPoint);
    this._viewComponent = new TripPointComponent(tripPoint);

    this._viewComponent.setOnEditButtonClickedHandler(() => {
      this._showEditForm();
    });
    this._editComponent.setOnCancelButtonClickedHandler(() => {
      if (mode === TripPointControllerMode.NEW) {
        this._onDataChange(this, null, null);
      } else {
        this._editComponent.resetPoint();
        this._hideEditForm();
      }
    });
    this._editComponent.setOnDeleteButtonClickedHandler(() => {
      this._editComponent.disable();
      this._onDataChange(this, tripPoint, null);
      this._editComponent.enable();
    });
    this._editComponent.setOnFormSubmittedHandler((evt) => {
      evt.preventDefault();
      this._editComponent.disable();
      this._onDataChange(this, mode === TripPointControllerMode.NEW ? null : tripPoint, this._editComponent.getPoint());
      this._editComponent.enable();
    });
    this._editComponent.setOnFavoriteButtonClickedHandler(() => {
      const updatedTripPoint = TripPoint.clone(tripPoint);
      updatedTripPoint.isFavorite = !tripPoint.isFavorite;
      this._onDataChange(this, tripPoint, updatedTripPoint, true);
    });

    if (mode === TripPointControllerMode.VIEW || mode === TripPointControllerMode.EDIT) {
      if (oldEditComponent && oldViewComponent) {
        if (this._currentMode === TripPointControllerMode.EDIT) {
          replace(this._editComponent, oldEditComponent);
        } else {
          replace(this._viewComponent, oldViewComponent);
        }
      } else {
        render(this._containerElement, this._viewComponent, constants.RENDER_POSITIONS.BEFORE_END);
      }
    } else {
      render(this._containerElement, this._editComponent, constants.RENDER_POSITIONS.AFTER_BEGIN);
      document.addEventListener(`keydown`, this._onEscapeKeydown);
    }
  }

  destroy() {
    remove(this._editComponent);
    remove(this._viewComponent);
    document.removeEventListener(`keydown`, this._onEscapeKeydown);
  }

  setDefaultView() {
    if (this._currentMode === TripPointControllerMode.EDIT) {
      this._hideEditForm();
    } else if (this._currentMode === TripPointControllerMode.NEW) {
      this.destroy();
    }
  }

  shake() {
    this._editComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._editComponent.getElement().style.animation = ``;

      this._editComponent.enable();
      this._editComponent.setErrorStyle();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  getCurrentMode() {
    return this._currentMode;
  }

  _hideEditForm() {
    replace(this._viewComponent, this._editComponent);
    document.removeEventListener(`keydown`, this._onEscapeKeydown);
    this._currentMode = TripPointControllerMode.VIEW;
  }

  _showEditForm() {
    this._onViewChange();
    replace(this._editComponent, this._viewComponent);
    document.addEventListener(`keydown`, this._onEscapeKeydown);
    this._currentMode = TripPointControllerMode.EDIT;
  }

  _showAddNewForm() {
    this._onViewChange();
    replace(this._editComponent, this._viewComponent);
    document.addEventListener(`keydown`, this._onEscapeKeydown);
    this._currentMode = TripPointControllerMode.NEW;
  }

  _onEscapeKeydown(evt) {
    if (evt.key === ESC_KEY) {
      if (this._currentMode === TripPointControllerMode.NEW) {
        this._onDataChange(this, null, null);
      }

      this._editComponent.resetPoint();
      this._hideEditForm();
    }
  }
}
