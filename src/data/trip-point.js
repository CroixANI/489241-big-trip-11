const createTripPoint = (type, destination, offers, start, end, price, isFavorite) => {
  return {
    type,
    destination,
    offers,
    start,
    end,
    price,
    isFavorite,
    isEditMode: false
  };
};

export default createTripPoint;
