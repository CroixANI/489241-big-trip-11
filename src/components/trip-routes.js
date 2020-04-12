export const createTripRoutesContainerTemplate = (child) => {
  return (
    `<ul class="trip-days">
      ${child}
    </ul>`
  );
};

export default createTripRoutesContainerTemplate;
