import TripPoint from "../data/trip-point.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import BackendCache from "../data/backend-cache.js";
import constants from "../data/constants.js";
import dateFormat from "../utils/date-format.js";
import flatpickr from "flatpickr";
import random from "../utils/random.js";

import 'flatpickr/dist/flatpickr.min.css';

const FORM_SELECTOR = `form`;
const EDIT_BUTTON_SELECTOR = `.event__rollup-btn`;
const DELETE_BUTTON_SELECTOR = `.event__reset-btn`;
const FAVORITE_BUTTON_SELECTOR = `.event__favorite-icon`;
const POINT_TYPE_SELECTOR = `.event__type-list`;
const POINT_DESTINATION_SELECTOR = `.event__input--destination`;
const START_DATE_SELECTOR = `#event-start-time-1`;
const END_DATE_SELECTOR = `#event-end-time-1`;
const CANCEL_BUTTON_SELECTOR = `.event__reset-btn`;

const EVENT_TYPE_DATA_NAME = `event-type`;
const EVENT_DESTINATION_DATA_NAME = `event-destination`;
const EVENT_START_TIME_DATA_NAME = `event-start-time`;
const EVENT_END_TIME_DATA_NAME = `event-end-time`;
const EVENT_PRICE_DATA_NAME = `event-price`;

const createEventTypeItemTemplate = (itemType, isChecked) => {
  const lowerCaseItemType = itemType.toLowerCase();
  return (
    `<div class="event__type-item">
      <input id="event-type-${lowerCaseItemType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${itemType}" ${isChecked ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${lowerCaseItemType}" for="event-type-${lowerCaseItemType}-1">${itemType}</label>
    </div>`
  );
};

const createOfferTemplate = (type, name, price, isChecked) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createEditButtonsTemplate = (isFavorite) => {
  return (`<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`);
};

const createDestinationDetailsTemplate = (destination) => {
  const allPhotosTemplate = destination.photos.map((photo) => {
    return (`<img class="event__photo" src="${photo.url}" alt="${photo.title}">`);
  }).join(`\n`);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${allPhotosTemplate}
        </div>
      </div>
    </section>`
  );
};

const createTripEditFormTemplate = (point) => {
  const isEditMode = !point.isNew;
  const currentPointType = !isEditMode && !point.type ? constants.TRANSFER_POINT_TYPES[0] : point.type;
  const currentDestinationLabel = constants.getActivityLabel(currentPointType);
  const currentCity = !isEditMode && !point.destination.city ? `` : point.destination.city;
  const currentPrice = !isEditMode && !point.price ? 0 : point.price;
  const destinationDetailsTemplate = isEditMode ? `` : createDestinationDetailsTemplate(point.destination);
  const editButtonsTemplate = isEditMode ? createEditButtonsTemplate(point.isFavorite) : ``;

  const allTransferPointTypesTemplate = constants.TRANSFER_POINT_TYPES.map((pointType) => {
    return createEventTypeItemTemplate(pointType, currentPointType === pointType);
  }).join(`\n`);

  const allActivityPointTypesTemplate = constants.ACTIVITY_POINT_TYPES.map((pointType) => {
    return createEventTypeItemTemplate(pointType, currentPointType === pointType);
  }).join(`\n`);

  const allCitiesOptionsTemplate = BackendCache.getDestinations().map((city) => {
    return (`<option value="${city}"></option>`);
  }).join(`\n`);

  const offers = BackendCache.getOffersByPointType(point.type);
  const allOffersTemplate = offers.map((offer) => {
    const isChecked = isEditMode && point.offers.some((item) => item.type === offer.type);
    return createOfferTemplate(offer.type, offer.name, offer.price, isChecked);
  }).join(`\n`);

  const resetButtonTemplate = isEditMode ? `Delete` : `Cancel`;

  const formTemplate =
  `<form class="${isEditMode ? `` : `trip-events__item`} event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${currentPointType.toLowerCase()}.png" alt="${currentPointType}">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            ${allTransferPointTypesTemplate}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            ${allActivityPointTypesTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${currentDestinationLabel}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentCity}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${allCitiesOptionsTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFormat.formatDateToInputValue(point.start)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateFormat.formatDateToInputValue(point.end)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${currentPrice === 0 ? `` : currentPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${resetButtonTemplate}</button>

      ${editButtonsTemplate}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${allOffersTemplate}
        </div>
      </section>

      ${destinationDetailsTemplate}
    </section>
  </form>`;

  return isEditMode ? `<li class="trip-events__item">${formTemplate}</li>` : formTemplate;
};

const parseFormData = (formData, id, isFavorite) => {
  const type = formData.get(EVENT_TYPE_DATA_NAME);
  const destinationName = formData.get(EVENT_DESTINATION_DATA_NAME);
  const start = dateFormat.parseDate(formData.get(EVENT_START_TIME_DATA_NAME));
  const end = dateFormat.parseDate(formData.get(EVENT_END_TIME_DATA_NAME));
  const price = Number(formData.get(EVENT_PRICE_DATA_NAME));
  const allOffers = BackendCache.getOffersByPointType(type);
  const offers = allOffers.filter((offer) => formData.get(`event-offer-${offer.type}`) === `on`);
  const destination = BackendCache.getDestinationDetails(destinationName);

  const result = new TripPoint(id, type, destination, offers, start, end, price, isFavorite);

  return result;
};

export default class TripPointEditComponent extends AbstractSmartComponent {
  constructor(point) {
    super();

    this._originalPoint = point;
    this._point = Object.assign({}, point);

    this._onPointTypeChanged = this._onPointTypeChanged.bind(this);
    this._onPointDestinationChanged = this._onPointDestinationChanged.bind(this);

    this._subscribeEvents();

    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;

    this._setupFlatpickr();
  }

  getPoint() {
    const form = this._point.isNew ? this.getElement() : this.getElement().querySelector(FORM_SELECTOR);
    const formData = new FormData(form);

    return parseFormData(formData, this._point.id, this._point.isFavorite);
  }

  reRender() {
    super.reRender();

    this._setupFlatpickr();
  }

  getTemplate() {
    return createTripEditFormTemplate(this._point);
  }

  recoveryListeners() {
    this.setOnCancelButtonClickedHandler(this._onCancelButtonClick);
    this.setOnDeleteButtonClickedHandler(this._onDeleteButtonClick);
    this.setOnFormSubmittedHandler(this._onEditFormSubmit);
    this.setOnFavoriteButtonClickedHandler(this._onFavoriteButtonClick);
    this._subscribeEvents();
  }

  setOnCancelButtonClickedHandler(onCancelButtonClick) {
    this._onCancelButtonClick = onCancelButtonClick;
    this.getElement()
      .querySelector(this._point.isNew ? CANCEL_BUTTON_SELECTOR : EDIT_BUTTON_SELECTOR)
      .addEventListener(`click`, this._onCancelButtonClick);
  }

  setOnDeleteButtonClickedHandler(onDeleteButtonClick) {
    if (this._point.isNew) {
      return;
    }

    this._onDeleteButtonClick = onDeleteButtonClick;
    this.getElement()
      .querySelector(DELETE_BUTTON_SELECTOR)
      .addEventListener(`click`, this._onDeleteButtonClick);
  }

  setOnFormSubmittedHandler(onEditFormSubmit) {
    this._onEditFormSubmit = onEditFormSubmit;
    if (this._point.isNew) {
      this.getElement()
        .addEventListener(`submit`, this._onEditFormSubmit);
    } else {
      this.getElement()
        .querySelector(FORM_SELECTOR)
        .addEventListener(`submit`, this._onEditFormSubmit);
    }
  }

  setOnFavoriteButtonClickedHandler(onFavoriteButtonClick) {
    if (this._point.isNew) {
      return;
    }

    this._onFavoriteButtonClick = onFavoriteButtonClick;
    this.getElement()
      .querySelector(FAVORITE_BUTTON_SELECTOR)
      .addEventListener(`click`, this._onFavoriteButtonClick);
  }

  resetPoint() {
    this._point = Object.assign({}, this._originalPoint);
    this.reRender();
  }

  _subscribeEvents() {
    const element = this.getElement();

    element.querySelector(POINT_TYPE_SELECTOR)
      .addEventListener(`change`, this._onPointTypeChanged);

    element.querySelector(POINT_DESTINATION_SELECTOR)
      .addEventListener(`change`, this._onPointDestinationChanged);
  }

  _onPointTypeChanged(evt) {
    this._point.type = evt.target.value;
    this._point.offers = BackendCache.getOffersByPointType(this._point.type);

    this.reRender();
  }

  _onPointDestinationChanged(evt) {
    this._point.destination = BackendCache.getDestinationDetails(evt.target.value);

    this.reRender();
  }

  _setupFlatpickr() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }

    const element = this.getElement();
    const options = {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      minDate: this._point.start,
      enableTime: true
    };

    this._flatpickrStartDate = flatpickr(element.querySelector(START_DATE_SELECTOR), Object.assign({}, options, {defaultDate: this._point.start}));
    this._flatpickrEndDate = flatpickr(element.querySelector(END_DATE_SELECTOR), Object.assign({}, options, {defaultDate: this._point.end}));
  }
}
