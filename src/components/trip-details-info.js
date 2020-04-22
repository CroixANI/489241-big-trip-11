import AbstractComponent from "./abstract-component.js";

const createTripInfoTemplate = (tripDetails) => {

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${tripDetails.title}</h1>

      <p class="trip-info__dates">${tripDetails.period}</p>
    </div>`
  );
};

export default class TripInfoComponent extends AbstractComponent {
  constructor(tripDetails) {
    super();

    this._tripDetails = tripDetails;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripDetails);
  }
}


