const createTripDay = (points) => {
  return {
    date: points[0].start,
    points
  };
};

export default createTripDay;
