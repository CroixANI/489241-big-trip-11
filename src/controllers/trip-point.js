import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-point-edit.js";
import constants from "../data/constants.js";
import {render, replace, remove} from "../utils/render.js";

const ESC_KEY = `Escape`;

export default class TripPointController {
  constructor(containerElement, onDataChange, onViewChange) {
    this._containerElement = containerElement;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._viewComponent = null;
    this._editComponent = null;
    this._isEditMode = false;
    this._onEscapeKeydown = this._onEscapeKeydown.bind(this);
  }

  render(tripPoint) {
    const oldEditComponent = this._editComponent;
    const oldViewComponent = this._viewComponent;

    this._editComponent = new TripPointEditComponent(tripPoint);
    this._viewComponent = new TripPointComponent(tripPoint);

    this._viewComponent.addOnEditButtonClickEvent(() => {
      this._showEditForm();
    });
    this._editComponent.addOnCancelButtonClickEvent(() => {
      this._editComponent.cancelChanges();
      this._hideEditForm();
    });
    this._editComponent.addOnFormSubmitEvent((evt) => {
      evt.preventDefault();
      this._editComponent.applyChanges();
      this._hideEditForm();
    });
    this._editComponent.addOnFavoriteButtonClickEvent(() => {
      this._onDataChange(this, tripPoint, Object.assign({}, tripPoint, {
        isFavorite: !tripPoint.isFavorite,
      }));
    });

    // Fix issue with old components after data changed
    if (oldEditComponent && oldViewComponent) {
      if (this._isEditMode) {
        replace(this._editComponent, oldEditComponent);
      } else {
        replace(this._viewComponent, oldViewComponent);
      }
    } else {
      render(this._containerElement, this._viewComponent, constants.RENDER_POSITIONS.BEFORE_END);
    }
  }

  destroy() {
    remove(this._editComponent);
    remove(this._viewComponent);
    document.removeEventListener(`keydown`, this._onEscapeKeydown);
  }

  setDefaultView() {
    if (this._isEditMode) {
      this._hideEditForm();
    }
  }

  _hideEditForm() {
    replace(this._viewComponent, this._editComponent);
    document.removeEventListener(`keydown`, this._onEscapeKeydown);
    this._isEditMode = false;
  }

  _showEditForm() {
    this._onViewChange();
    replace(this._editComponent, this._viewComponent);
    document.addEventListener(`keydown`, this._onEscapeKeydown);
    this._isEditMode = true;
  }

  _onEscapeKeydown(evt) {
    if (evt.key === ESC_KEY) {
      this._editComponent.cancelChanges();
      this._hideEditForm();
    }
  }
}
