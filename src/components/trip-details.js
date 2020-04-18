import TripCostComponent from "./trip-details-cost.js";
import TripInfoComponent from "./trip-details-info.js";
import createElement from "../utils/create-element.js";

const createTripDetailsTemplate = (trip) => {
  let tripInfoTemplate = new TripInfoComponent(trip).getTemplate();
  let tripCostTemplate = new TripCostComponent(trip).getTemplate();
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripInfoTemplate}

      ${tripCostTemplate}
    </section>`
  );
};

export default class TripDetailsComponent {
  constructor(trip) {
    this._trip = trip;
    this._element = null;
  }

  getTemplate() {
    return createTripDetailsTemplate(this._trip);
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
