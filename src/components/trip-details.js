import TripCostComponent from "./trip-details-cost.js";
import TripInfoComponent from "./trip-details-info.js";
import {createElement} from "../utils/render.js";

const createTripDetailsTemplate = (tripDetails) => {
  let tripInfoTemplate = new TripInfoComponent(tripDetails).getTemplate();
  let tripCostTemplate = new TripCostComponent(tripDetails).getTemplate();
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripInfoTemplate}

      ${tripCostTemplate}
    </section>`
  );
};

export default class TripDetailsComponent {
  constructor(tripDetails) {
    this._tripDetails = tripDetails;
    this._element = null;
  }

  getTemplate() {
    return createTripDetailsTemplate(this._tripDetails);
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
