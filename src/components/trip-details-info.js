import {createElement} from "../utils/render.js";

const createTripInfoTemplate = (tripDetails) => {

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${tripDetails.title}</h1>

      <p class="trip-info__dates">${tripDetails.period}</p>
    </div>`
  );
};

export default class TripInfoComponent {
  constructor(tripDetails) {
    this._tripDetails = tripDetails;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripDetails);
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


