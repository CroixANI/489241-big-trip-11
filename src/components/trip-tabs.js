import tabs from "../mocks/tabs.js";

const createTripTabsTemplate = (currentTab) => {
  const allTabsTemplate = tabs.AVAILABLE_TABS.map((tab) => {
    return (`<a class="trip-tabs__btn ${currentTab === tab ? `trip-tabs__btn--active` : ``}" href="#">${tab}</a>`);
  }).join(`\n`);
  return (
    `<h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${allTabsTemplate}
    </nav>`
  );
};

export default createTripTabsTemplate;

