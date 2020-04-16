import createTripRouteDayGroupTemplate from "./trip-routes-day.js";
import dateFormat from "../utils/date-format";

const createTripRoutesContainerTemplate = (points) => {
  let groups = new Map();
  points.forEach((point) => {
    const groupingNumber = dateFormat.getDateNumberForGrouping(point.start);
    if (groups.has(groupingNumber) === false) {
      groups.set(groupingNumber, []);
    }

    let pointsInDay = groups.get(groupingNumber);
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
