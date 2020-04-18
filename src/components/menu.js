import {createElement} from "../utils/render.js";

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

export default class MenuComponent {
  constructor() {
    this._currentTab = AVAILABLE_TABS[0];
    this._element = null;
  }

  getTemplate() {
    return createTripTabsTemplate(this._currentTab);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
