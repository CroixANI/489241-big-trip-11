import constants from "../data/constants.js";
import dateFormat from "../utils/date-format.js";
import createElement from "../utils/create-element.js";

const MAX_OFFERS_TO_RENDER = 3;

const createTripRoutePointOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createTripRoutePointOffersTemplate = (point) => {
  if (point.offers.length === 0) {
    return ``;
  }

  const allOffersTemplate = point.offers.slice(0, MAX_OFFERS_TO_RENDER).map((offer) => {
    return createTripRoutePointOfferTemplate(offer);
  }).join(`\n`);

  return (
    `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${allOffersTemplate}
      </ul>`
  );
};

const createTripRoutePointTemplate = (point) => {
  const lowerCasePointType = point.type.toLowerCase();
  const offersTemplate = createTripRoutePointOffersTemplate(point);
  const duration = dateFormat.getFormattedDuration(point.start, point.end);
  const activityLabel = constants.getActivityLabel(point.type);
  const startDateToDisplay = dateFormat.formatTime(point.start);
  const startDateForMarkup = point.start.toISOString();
  const endDateToDisplay = dateFormat.formatTime(point.end);
  const endDateForMarkup = point.end.toISOString();

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${lowerCasePointType}.png" alt="${point.type}">
        </div>
        <h3 class="event__title">${activityLabel} ${point.destination.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateForMarkup}">${startDateToDisplay}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateForMarkup}">${endDateToDisplay}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
        </p>

        ${offersTemplate}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripPointComponent {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripRoutePointTemplate(this._point);
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
