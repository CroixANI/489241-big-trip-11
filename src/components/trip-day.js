
import AbstractComponent from "./abstract-component.js";
import dateFormat from "../utils/date-format.js";

const createTripRouteDayGroupTemplate = (index, date) => {
  const dateToDisplay = dateFormat.formatDate(date);
  const dateForMarkup = dateFormat.formatDateToIso(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${dateForMarkup}">${dateToDisplay}</time>
      </div>
    </li>`
  );
};

export default class TripDayComponent extends AbstractComponent {
  constructor(index, date) {
    super();

    this._index = index;
    this._date = date;
  }

  getTemplate() {
    return createTripRouteDayGroupTemplate(this._index, this._date);
  }
}

