import dateFormat from "../utils/date-format.js";
import createTripDay from "./trip-day.js";

const compareStartDate = (firstPoint, secondPoint) => {
  return dateFormat.getDateNumberForGrouping(firstPoint.start) - dateFormat.getDateNumberForGrouping(secondPoint.start);
};

const createTrip = (points) => {
  let groupedByDay = points.sort(compareStartDate).reduce((total, point) => {
    const groupingNumber = dateFormat.getDateNumberForGrouping(point.start);

    if (!total) {
      total = new Map();
    }

    if (total.has(groupingNumber) === false) {
      total.set(groupingNumber, []);
    }

    let pointsInDay = total.get(groupingNumber);
    pointsInDay.push(point);

    return total;
  }, new Map());

  let result = {
    days: []
  };

  let dayIndex = 1;
  for (let pointsArray of groupedByDay.values()) {
    result.days.push(createTripDay(dayIndex, pointsArray));
    dayIndex++;
  }

  return result;
};

export default createTrip;
