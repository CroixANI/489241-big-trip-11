import sort from "../mocks/sort.js";

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
  const allSortItemsTemplate = sort.AVAILABLE_SORT.map((sortItem) => {
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

export default createTripSortTemplate;
