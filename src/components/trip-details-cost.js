import {createElement} from "../utils/render.js";

const createTripCostTemplate = (tripDetails) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripDetails.totalCost}</span>
    </p>`
  );
};

export default class TripCostComponent {
  constructor(tripDetails) {
    this._tripDetails = tripDetails;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._tripDetails);
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

