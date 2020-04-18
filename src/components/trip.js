import TripDayComponent from "./trip-day.js";
import {createElement} from "../utils/render.js";

const createTripContainerTemplate = (trip) => {
  let daysTemplates = [];
  for (let tripDay of trip.days) {
    daysTemplates.push(new TripDayComponent(tripDay).getTemplate());
  }

  return (
    `<ul class="trip-days">
      ${daysTemplates.join(`\n`)}
    </ul>`
  );
};

export default class TripComponent {
  constructor(trip) {
    this._trip = trip;
    this._element = null;
  }

  getTemplate() {
    return createTripContainerTemplate(this._trip);
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

