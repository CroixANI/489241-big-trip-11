import AbstractComponent from "./abstract-component.js";

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
}

