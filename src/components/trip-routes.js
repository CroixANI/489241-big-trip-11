import createTripRouteDayGroupTemplate from "./trip-routes-day.js";

const createTripRoutesContainerTemplate = (trip) => {
  let daysTemplates = [];
  for (let tripDay of trip.days) {
    daysTemplates.push(createTripRouteDayGroupTemplate(tripDay));
  }

  return (
    `<ul class="trip-days">
      ${daysTemplates.join(`\n`)}
    </ul>`
  );
};

export default createTripRoutesContainerTemplate;
