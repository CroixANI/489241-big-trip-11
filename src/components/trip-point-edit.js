import constants from "../data/constants.js";
import backend from "../data/backend.js";
import dateFormat from "../utils/date-format.js";
import {createElement} from "../utils/render.js";

const createEventTypeItemTemplate = (itemType, isChecked) => {
  const lowerCaseItemType = itemType.toLowerCase();
  return (
    `<div class="event__type-item">
      <input id="event-type-${lowerCaseItemType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseItemType}" ${isChecked ? `checked` : ``}>
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

const createEditButtonsTemplate = (isFavorite = false) => {
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
  const allPhotosTemplate = destination.photos.map((photoUrl) => {
    return (`<img class="event__photo" src="${photoUrl}" alt="Event photo">`);
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

const createTripEditFormTemplate = (point = null) => {
  const currentPointType = point.isEditMode ? point.type : constants.TRANSFER_POINT_TYPES[0];
  const currentDestinationLabel = constants.getActivityLabel(currentPointType);
  const currentCity = point.isEditMode ? point.destination.city : ``;
  const currentPrice = point.isEditMode ? point.price : 0;
  const destinationDetailsTemplate = point.isEditMode ? `` : createDestinationDetailsTemplate(point.destination);
  const editButtonsTemplate = point.isEditMode ? createEditButtonsTemplate(point.isFavorite) : ``;

  const allTransferPointTypesTemplate = constants.TRANSFER_POINT_TYPES.map((pointType) => {
    return createEventTypeItemTemplate(pointType, currentPointType === pointType);
  }).join(`\n`);

  const allActivityPointTypesTemplate = constants.ACTIVITY_POINT_TYPES.map((pointType) => {
    return createEventTypeItemTemplate(pointType, currentPointType === pointType);
  }).join(`\n`);

  const allCitiesOptionsTemplate = backend.getDestinations().map((city) => {
    return (`<option value="${city}"></option>`);
  }).join(`\n`);

  const offers = backend.getOffers();
  const allOffersTemplate = offers.map((offer) => {
    const isChecked = point.isEditMode && point.offers.some((item) => item.type === offer.type);
    return createOfferTemplate(offer.type, offer.name, offer.price, isChecked);
  }).join(`\n`);

  const resetButtonTemplate = point.isEditMode ? `Delete` : `Cancel`;

  return (
    `${point.isEditMode ? `<li class="trip-events__item">` : ``}
    <form class="${point.isEditMode ? `` : `trip-events__item`} event event--edit" action="#" method="post">
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${currentPrice === 0 ? `` : currentPrice}">
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
    </form>
    ${point.isEditMode ? `</li>` : ``}`
  );
};

export default class TripPointEditComponent {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripEditFormTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
