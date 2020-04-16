import createTripRoutePointTemplate from "./trip-routes-day-point.js";
import dateFormat from "../utils/date-format.js";

const createTripRouteDayGroupTemplate = (points) => {
  const day = points[0].start;
  const pointsTemplate = points.map((point) => {
    return createTripRoutePointTemplate(point);
  });

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${points.length}</span>
        <time class="day__date" datetime="${dateFormat.formatDateToIso(day)}">${dateFormat.formatDate(day)}</time>
      </div>

      <ul class="trip-events__list">
        ${pointsTemplate}
      </ul>
    </li>`
  );
};

export default createTripRouteDayGroupTemplate;
