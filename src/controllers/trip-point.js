import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-point-edit.js";
import constants from "../data/constants.js";
import {render, replace, remove} from "../utils/render.js";

const ESC_KEY = `Escape`;

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
        this._editComponent.cancelChanges();
        this._hideEditForm();
      }
    });
    this._editComponent.setOnDeleteButtonClickedHandler(() => {
      this._onDataChange(this, tripPoint, null);
    });
    this._editComponent.setOnFormSubmittedHandler((evt) => {
      evt.preventDefault();
      this._editComponent.applyChanges();
      this._hideEditForm();
    });
    this._editComponent.setOnFavoriteButtonClickedHandler(() => {
      this._onDataChange(this, tripPoint, Object.assign({}, tripPoint, {
        isFavorite: !tripPoint.isFavorite,
      }));
    });

    if (mode === TripPointControllerMode.VIEW) {
      // Fix issue with old components after data changed
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
      // TODO: Is this case only for NEW or for EDIT as well?
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

      this._editComponent.cancelChanges();
      this._hideEditForm();
    }
  }
}
