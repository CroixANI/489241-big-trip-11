import TripCostComponent from "./trip-details-cost.js";
import TripInfoComponent from "./trip-details-info.js";
import AbstractComponent from "./abstract-component.js";

const createTripDetailsTemplate = (tripDetails) => {
  const tripInfoTemplate = new TripInfoComponent(tripDetails).getTemplate();
  const tripCostTemplate = new TripCostComponent(tripDetails).getTemplate();
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripInfoTemplate}

      ${tripCostTemplate}
    </section>`
  );
};

export default class TripDetailsComponent extends AbstractComponent {
  constructor(tripDetails) {
    super();

    this._tripDetails = tripDetails;
  }

  getTemplate() {
    return createTripDetailsTemplate(this._tripDetails);
  }
}
