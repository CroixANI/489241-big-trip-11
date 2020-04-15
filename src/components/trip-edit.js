import constants from "../data/constants.js";

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

const createTripEditFormTemplate = (point = null) => {
  const isEditMode = point !== null;
  const currentPointType = isEditMode ? point.type : constants.transferPointTypes[0];
  const currentDestinationLabel = constants.getActivityLabel(currentPointType);
  const currentCity = isEditMode ? point.city : ``;
  const currentPrice = isEditMode ? point.price : 0;

  const editButtonsTemplate = createEditButtonsTemplate(false);

  const allTransferPointTypesTemplate = constants.transferPointTypes.map((pointType) => {
    return createEventTypeItemTemplate(pointType, currentPointType === pointType);
  }).join(`\n`);

  const allActivityPointTypesTemplate = constants.activityPointTypes.map((pointType) => {
    return createEventTypeItemTemplate(pointType, currentPointType === pointType);
  }).join(`\n`);

  const allCitiesOptionsTemplate = constants.cities.map((city) => {
    return (`<option value="${city}"></option>`);
  }).join(`\n`);

  const allOffersTemplate = constants.offers.map((offer) => {
    let isChecked = isEditMode ? point.offers.find((item) => item.type === offer.type) !== undefined : false;
    return createOfferTemplate(offer.type, offer.name, offer.price, isChecked);
  }).join(`\n`);

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${currentPointType.toLowerCase()}.png" alt="Event type icon">
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${currentPrice === 0 ? `` : currentPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isEditMode ? `Delete` : `Cancel`}</button>

        ${isEditMode ? editButtonsTemplate : ``}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${allOffersTemplate}
          </div>
        </section>
      </section>
    </form>`
  );
};

export default createTripEditFormTemplate;
