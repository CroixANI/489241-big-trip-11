import TripPointComponent from "./trip-point.js";
import TripPointEditComponent from "./trip-point-edit.js";
import dateFormat from "../utils/date-format.js";
import createElement from "../utils/create-element.js";

const createTripRouteDayGroupTemplate = (tripDay) => {
  const dateToDisplay = dateFormat.formatDate(tripDay.date);
  const dateForMarkup = dateFormat.formatDateToIso(tripDay.date);
  const pointsTemplate = tripDay.points.map((point) => {
    if (point.isEditMode) {
      return new TripPointEditComponent(point).getTemplate();
    }
    return new TripPointComponent(point).getTemplate();
  }).join(`\n`);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${tripDay.index}</span>
        <time class="day__date" datetime="${dateForMarkup}">${dateToDisplay}</time>
      </div>

      <ul class="trip-events__list">
        ${pointsTemplate}
      </ul>
    </li>`
  );
};

export default class TripDayComponent {
  constructor(tripDay) {
    this._tripDay = tripDay;
    this._element = null;
  }

  getTemplate() {
    return createTripRouteDayGroupTemplate(this._tripDay);
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

