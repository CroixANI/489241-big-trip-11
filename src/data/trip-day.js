const createTripDay = (index, points) => {
  return {
    index,
    date: points[0].start,
    points
  };
};

export default createTripDay;
