import AbstractComponent from "./abstract-component.js";

const ADD_NEW_BUTTON_SELECTOR = `.trip-main__event-add-btn`;

const createTripContainerTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class TripComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripContainerTemplate();
  }

  setOnNewButtonClickedHandler(handler) {
    document.querySelector(ADD_NEW_BUTTON_SELECTOR)
      .addEventListener(`click`, handler);
  }
}

