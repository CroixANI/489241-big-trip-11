import AbstractComponent from "./abstract-component.js";

export const MENU_ITEMS = {
  TABLE: `Table`,
  STATS: `Stats`
};

const MENU_ITEM_SELECTOR = `.trip-tabs__btn`;
const TABLE_MENU_ITEM_SELECTOR = `.trip-tabs__btn:first-child`;
const ACTIVE_MENU_ITEM_CLASS_NAME = `trip-tabs__btn--active`;
const PAGE_BODY_CONTAINER_SELECTOR = `.page-body__page-main .page-body__container`;
const LINE_CLASS_NAME = `page-body__container-line`;

const createTripTabsTemplate = (currentTab) => {
  const allTabsTemplate = Object.keys(MENU_ITEMS).map((key) => {
    return (`<a class="trip-tabs__btn ${currentTab === MENU_ITEMS[key] ? ACTIVE_MENU_ITEM_CLASS_NAME : ``}" data-menu-item="${MENU_ITEMS[key]}" href="#">${MENU_ITEMS[key]}</a>`);
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

    this._currentTab = MENU_ITEMS.TABLE;
  }

  getTemplate() {
    return createTripTabsTemplate(this._currentTab);
  }

  setOnMenuChangedHandler(onMenuChanged) {
    this.getElement()
      .querySelectorAll(MENU_ITEM_SELECTOR)
      .forEach((input) => {
        input.addEventListener(`click`, (evt) => {
          const menuItem = evt.target.dataset.menuItem;
          if (this._currentTab === menuItem) {
            return;
          }

          this.getElement()
            .querySelectorAll(MENU_ITEM_SELECTOR)
            .forEach((menuElement) => {
              menuElement.classList.remove(ACTIVE_MENU_ITEM_CLASS_NAME);
            });
          evt.target.classList.add(ACTIVE_MENU_ITEM_CLASS_NAME);

          document
            .querySelector(PAGE_BODY_CONTAINER_SELECTOR)
            .classList.toggle(LINE_CLASS_NAME);

          this._currentTab = menuItem;

          onMenuChanged(this._currentTab);
        });
      });
  }

  navigateToTable() {
    this.getElement()
      .querySelector(TABLE_MENU_ITEM_SELECTOR)
      .click();
  }
}
