import AbstractComponent from "./abstract-component.js";

const AVAILABLE_TABS = [`Table`, `Stats`];

const createTripTabsTemplate = (currentTab) => {
  const allTabsTemplate = AVAILABLE_TABS.map((tab) => {
    return (`<a class="trip-tabs__btn ${currentTab === tab ? `trip-tabs__btn--active` : ``}" href="#">${tab}</a>`);
  }).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${allTabsTemplate}
    </nav>`
  );
};

export default class MenuComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentTab = AVAILABLE_TABS[0];
  }

  getTemplate() {
    return createTripTabsTemplate(this._currentTab);
  }
}
