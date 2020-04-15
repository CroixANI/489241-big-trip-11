import filter from "../mocks/filter.js";

const createTripFilterTemplate = (type, name, isChecked = false) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`
  );
};

const createTripFiltersTemplate = (currentFilterType = ``) => {
  const allFiltersTemplates = filter.AVAILABLE_FILTERS.map((filterItem) => {
    return createTripFilterTemplate(filterItem.type, filterItem.name, filterItem.type === currentFilterType);
  }).join(`\n`);

  return (
    `<h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${allFiltersTemplates}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default createTripFiltersTemplate;

