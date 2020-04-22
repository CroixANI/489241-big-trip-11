import AbstractComponent from "./abstract-component.js";

const AVAILABLE_FILTERS = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

const createTripFilterTemplate = (type, name, isChecked = false) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`
  );
};

const createTripFiltersTemplate = (currentFilterType = ``) => {
  const allFiltersTemplates = Object.keys(AVAILABLE_FILTERS).map((filter) => {
    return createTripFilterTemplate(filter.toLocaleLowerCase(), filter, filter === currentFilterType);
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

    this._currentFilter = AVAILABLE_FILTERS.EVERYTHING;
  }

  getTemplate() {
    return createTripFiltersTemplate(this._currentFilter);
  }
}

