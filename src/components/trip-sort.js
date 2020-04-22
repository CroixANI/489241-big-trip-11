import AbstractComponent from "./abstract-component.js";

const SORT_INPUT_SELECTOR = `.trip-sort__input`;
const SORT_INPUT_CHECKED_SELECTOR = `input:checked`;

const AVAILABLE_SORT = {
  EVENT: `Event`,
  TIME: `Time`,
  PRICE: `Price`
};

const createTripSortItemTemplate = (key, isChecked) => {
  const nameLowerCase = AVAILABLE_SORT[key].toLowerCase();
  return (
    `<div class="trip-sort__item  trip-sort__item--${nameLowerCase}">
      <input id="sort-${nameLowerCase}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${nameLowerCase}" ${isChecked ? `checked` : ``} data-sort-type="${key}">
      <label class="trip-sort__btn" for="sort-${nameLowerCase}">
        ${AVAILABLE_SORT[key]}
      </label>
    </div>`
  );
};

const createTripSortTemplate = (currentSort) => {
  const allSortItemsTemplate = Object.keys(AVAILABLE_SORT).map((key) => {
    return createTripSortItemTemplate(key, AVAILABLE_SORT[key] === currentSort);
  }).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${allSortItemsTemplate}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class TripSortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSort = AVAILABLE_SORT.EVENT;
  }

  getTemplate() {
    return createTripSortTemplate(this._currentSort);
  }

  getSortType() {
    const sortTypeKey = this.getElement().querySelector(SORT_INPUT_CHECKED_SELECTOR).dataset.sortType;
    return AVAILABLE_SORT[sortTypeKey];
  }

  setOnSortTypeChangedHandler(handler) {
    this.getElement()
      .querySelectorAll(SORT_INPUT_SELECTOR)
      .forEach((input) => {
        input.addEventListener(`click`, (evt) => {
          if (evt.target.tagName !== `INPUT`) {
            return;
          }

          const sortType = evt.target.dataset.sortType;

          if (this._currentSort === sortType) {
            return;
          }

          this._currentSort = sortType;

          handler(this._currentSort);
        });
      });
  }
}

