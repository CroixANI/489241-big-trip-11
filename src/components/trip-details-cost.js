import AbstractComponent from "./abstract-component.js";

const createTripCostTemplate = (tripDetails) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripDetails.totalCost}</span>
    </p>`
  );
};

export default class TripCostComponent extends AbstractComponent {
  constructor(tripDetails) {
    super();

    this._tripDetails = tripDetails;
  }

  getTemplate() {
    return createTripCostTemplate(this._tripDetails);
  }
}

