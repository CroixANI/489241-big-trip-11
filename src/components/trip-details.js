import createTripCostTemplate from "./trip-details-cost.js";
import createTripInfoTemplate from "./trip-details-info.js";

const createTripDetailsTemplate = () => {
  let tripInfoTemplate = createTripInfoTemplate();
  let tripCostTemplate = createTripCostTemplate();
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripInfoTemplate}

      ${tripCostTemplate}
    </section>`
  );
};

export default createTripDetailsTemplate;
