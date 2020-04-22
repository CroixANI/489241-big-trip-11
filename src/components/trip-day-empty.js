import AbstractComponent from "./abstract-component.js";

const createTripRouteDayGroupTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info"></div>
      
      <ul class="trip-events__list">	
      </ul>
    </li>`
  );
};

export default class TripEmptyDayComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripRouteDayGroupTemplate();
  }
}
