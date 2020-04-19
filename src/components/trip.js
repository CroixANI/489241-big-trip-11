import {createElement} from "../utils/render.js";

const createTripContainerTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class TripComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getDaysContainerElement() {
    return this.getElement();
  }

  removeElement() {
    this._element = null;
  }
}

