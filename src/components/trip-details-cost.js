const createTripCostTemplate = (trip) => {
  const totalCost = trip.days.reduce((total, tripDay) => {
    return total + tripDay.points.reduce((totalInDay, tripPoint) => {
      return totalInDay + tripPoint.price;
    }, 0);
  }, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};

export default createTripCostTemplate;
