import AbstractComponent from "./abstract-component.js";

const createNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoPointsComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createNoPointsTemplate();
  }
}

