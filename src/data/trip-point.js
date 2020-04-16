const createTripPoint = (type, destination, offers, start, end, price) => {
  return {
    type,
    destination,
    offers,
    start,
    end,
    price,
    isEditMode: false
  };
};

export default createTripPoint;
