
import dateFormat from "../utils/date-format.js";
import {createElement} from "../utils/render.js";

const createTripRouteDayGroupTemplate = (index, date) => {
  const dateToDisplay = dateFormat.formatDate(date);
  const dateForMarkup = dateFormat.formatDateToIso(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${dateForMarkup}">${dateToDisplay}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class TripDayComponent {
  constructor(index, date) {
    this._index = index;
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createTripRouteDayGroupTemplate(this._index, this._date);
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

