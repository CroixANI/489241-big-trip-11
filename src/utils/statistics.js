import dateFormat from "../utils/date-format.js";
import constants from "../data/constants.js";

const countPoints = (points, pointCounter) => {
  const labels = [];
  const data = [];

  for (const point of points) {
    let index = labels.indexOf(point.type);
    if (index === -1) {
      labels.push(point.type);
      data.push(0);
      index = labels.length - 1;
    }

    data[index] += pointCounter(point);
  }

  return {
    labels,
    data
  };
};

const countMoneyStatistics = (points) => {
  return countPoints(points, (point) => point.price);
};

const countTransportStatistics = (points) => {
  const transportPoints = points.filter((point) => constants.TRANSFER_POINT_TYPES.indexOf(point.type) >= 0);
  return countPoints(transportPoints, (_) => 1);
};

const countTimeStatistics = (points) => {
  return countPoints(points, (point) => dateFormat.getDurationInHours(point.start, point.end));
};

export default {
  countMoneyStatistics,
  countTransportStatistics,
  countTimeStatistics
};
