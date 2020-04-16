import createTripRouteDayGroupTemplate from "./trip-routes-day.js";
import dateFormat from "../utils/date-format";

const createTripRoutesContainerTemplate = (points) => {
  let groups = new Map();
  points.forEach((point) => {
    const startDateString = dateFormat.formatDateToGroupingString(point.start);
    if (groups.has(startDateString) === false) {
      groups.set(startDateString, []);
    }

    let pointsInDay = groups.get(startDateString);
    pointsInDay.push(point);
  });

  let orderedKeys = Array.from(groups.keys()).sort().reverse();
  let daysTemplates = [];
  orderedKeys.forEach((key) => {
    daysTemplates.push(createTripRouteDayGroupTemplate(groups.get(key)));
  });

  return (
    `<ul class="trip-days">
      ${daysTemplates.join(`\n`)}
    </ul>`
  );
};

export default createTripRoutesContainerTemplate;
