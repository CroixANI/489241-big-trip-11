import createTripRoutePointTemplate from "./trip-routes-day-point.js";
import createTripEditFormTemplate from "./trip-edit.js";
import dateFormat from "../utils/date-format.js";

const createTripRouteDayGroupTemplate = (tripDay) => {
  const dateToDisplay = dateFormat.formatDate(tripDay.date);
  const dateForMarkup = dateFormat.formatDateToIso(tripDay.date);
  const pointsTemplate = tripDay.points.map((point) => {
    if (point.isEditMode) {
      return createTripEditFormTemplate(point);
    }
    return createTripRoutePointTemplate(point);
  });

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${tripDay.points.length}</span>
        <time class="day__date" datetime="${dateForMarkup}">${dateToDisplay}</time>
      </div>

      <ul class="trip-events__list">
        ${pointsTemplate}
      </ul>
    </li>`
  );
};

export default createTripRouteDayGroupTemplate;
