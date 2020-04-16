import createTripCostTemplate from "./trip-details-cost.js";
import createTripInfoTemplate from "./trip-details-info.js";

const createTripDetailsTemplate = (trip) => {
  let tripInfoTemplate = createTripInfoTemplate(trip);
  let tripCostTemplate = createTripCostTemplate(trip);
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripInfoTemplate}

      ${tripCostTemplate}
    </section>`
  );
};

export default createTripDetailsTemplate;
