import {createElement} from "../utils/render.js";

const createTripCostTemplate = (trip) => {
  const totalCost = trip.days.reduce((total, tripDay) => {
    return total + tripDay.points.reduce((totalInDay, tripPoint) => {
      return totalInDay + tripPoint.price;
    }, 0);
  }, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};

export default class TripCostComponent {
  constructor(trip) {
    this._trip = trip;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._trip);
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

