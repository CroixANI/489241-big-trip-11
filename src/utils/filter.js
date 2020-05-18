import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";

const compareStartDate = (firstPoint, secondPoint) => {
  return dateFormat.getDateNumberForGrouping(firstPoint.start) - dateFormat.getDateNumberForGrouping(secondPoint.start);
};

const filterPastTripPoints = (tripPoints) => {
  return tripPoints;
};

const filterFutureTripPoints = (tripPoints) => {
  return tripPoints;
};

export const filterPoints = (tripPoints, filterType) => {
  switch (filterType) {
    case constants.FilterType.PAST:
      return filterPastTripPoints(tripPoints);
    case constants.FilterType.FUTURE:
      return filterFutureTripPoints(tripPoints);
  }

  return tripPoints.sort(compareStartDate);
};
