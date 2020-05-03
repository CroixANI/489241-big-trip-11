import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();

    if (new.target === AbstractSmartComponent) {
      throw new Error(`Can't instantiate Abstract class, only concrete one.`);
    }
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: ${this.recoveryListeners.name}`);
  }

  reRender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
