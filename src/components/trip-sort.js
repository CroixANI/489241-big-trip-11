import createElement from "../utils/create-element.js";

const AVAILABLE_SORT = [`Event`, `Time`, `Price`];

const createTripSortItemTemplate = (name, isChecked) => {
  const nameLowerCase = name.toLowerCase();
  return (
    `<div class="trip-sort__item  trip-sort__item--${nameLowerCase}">
      <input id="sort-${nameLowerCase}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${nameLowerCase}" ${isChecked ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${nameLowerCase}">
        ${name}
      </label>
    </div>`
  );
};

const createTripSortTemplate = (currentSort) => {
  const allSortItemsTemplate = AVAILABLE_SORT.map((sortItem) => {
    return createTripSortItemTemplate(sortItem, sortItem === currentSort);
  }).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${allSortItemsTemplate}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class TripSortComponent {
  constructor() {
    this._currentSort = AVAILABLE_SORT[0];
    this._element = null;
  }

  getTemplate() {
    return createTripSortTemplate(this._currentSort);
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

