import AbstractComponent from "./abstract-component.js";
import constants from "../data/constants.js";

const TRIP_FILTER_SELECTOR = `.trip-filters__filter-input`;
const DISABLED_FILTER_MENU_CLASS_NAME = `trip-filters__filter--disable`;

const createTripFilterTemplate = (key, isChecked = false) => {
  const type = key.toLocaleLowerCase();
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? `checked` : ``} data-filter-type="${constants.FilterType[key]}">
      <label class="trip-filters__filter-label" for="filter-${type}">${key}</label>
    </div>`
  );
};

const createTripFiltersTemplate = (currentFilterType = ``) => {
  const allFiltersTemplates = Object.keys(constants.FilterType).map((key) => {
    return createTripFilterTemplate(key, constants.FilterType[key] === currentFilterType);
  }).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${allFiltersTemplates}
      
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class TripFilterComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentFilter = constants.FilterType.EVERYTHING;
  }

  getTemplate() {
    return createTripFiltersTemplate(this._currentFilter);
  }

  setOnFilterChangedHandler(onFilterChanged) {
    this.getElement()
      .querySelectorAll(TRIP_FILTER_SELECTOR)
      .forEach((input) => {
        input.addEventListener(`change`, (evt) => {
          const filterType = evt.target.dataset.filterType;

          if (this._currentFilter === filterType) {
            return;
          }

          this._currentFilter = filterType;

          onFilterChanged(this._currentFilter);
        });
      });
  }

  disableFilter(filterType, disable) {
    const filterMenuElement = this.getElement()
      .querySelector(`#filter-${filterType.toLowerCase()}`);

    if (filterMenuElement) {
      if (disable) {
        filterMenuElement.classList.add(DISABLED_FILTER_MENU_CLASS_NAME);
      } else {
        filterMenuElement.classList.remove(DISABLED_FILTER_MENU_CLASS_NAME);
      }
    }
  }
}

