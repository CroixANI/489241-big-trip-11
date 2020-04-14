const createTripInfoTemplate = (title = `Amsterdam &mdash; Chamonix &mdash; Geneva`, period = `Mar 18&nbsp;&mdash;&nbsp;22`) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${period}</p>
    </div>`
  );
};

export default createTripInfoTemplate;

