const countMoneyStatistics = (points) => {
  return {
    labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `RIDE`],
    data: [400, 300, 200, 160, 100]
  };
};

const countTransportStatistics = (points) => {
  return {
    labels: [`FLY`, `DRIVE`, `RIDE`],
    data: [4, 2, 1]
  };
};

const countTimeStatistics = (points) => {
  return {
    labels: [`HOTEL`, `TO AIRPORT`, `TO GENEVA`, `TO CHAMONIX`],
    data: [72, 1, 3, 2]
  };
};

export default {
  countMoneyStatistics,
  countTransportStatistics,
  countTimeStatistics
};
