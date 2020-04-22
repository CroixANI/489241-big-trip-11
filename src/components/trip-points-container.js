import AbstractComponent from "./abstract-component.js";

const createTripDaysContainerTemplate = () => {
  return (
    `<ul class="trip-events__list">
      </ul>`
  );
};

export default class TripPointsContainer extends AbstractComponent {
  constructor(index, date) {
    super();

    this._index = index;
    this._date = date;
  }

  getTemplate() {
    return createTripDaysContainerTemplate();
  }
}
