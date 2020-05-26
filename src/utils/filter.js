import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";

const compareStartDate = (firstPoint, secondPoint) => {
  return dateFormat.getDateNumberForGrouping(firstPoint.start) - dateFormat.getDateNumberForGrouping(secondPoint.start);
};

const filterPastTripPoints = (tripPoints) => {
  const now = new Date();
  return tripPoints.filter((point) => point.start < now);
};

const filterFutureTripPoints = (tripPoints) => {
  const now = new Date();
  return tripPoints.filter((point) => point.start > now);
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

export const sortPoints = (tripPoints) => tripPoints.sort(compareStartDate);
