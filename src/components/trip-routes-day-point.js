import constants from "../data/constants.js";
import dateFormat from "../utils/date-format.js";

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
  });
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
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${lowerCasePointType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${constants.getActivityLabel(point.type)} ${point.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFormat.toIsoString(point.start)}">${dateFormat.formatTime(point.start)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateFormat.toIsoString(point.end)}">${dateFormat.formatTime(point.end)}</time>
          </p>
          <p class="event__duration">30M</p>
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

export default createTripRoutePointTemplate;
