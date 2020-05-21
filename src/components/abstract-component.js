import {createElement} from "../utils/render.js";
import constants from "../data/constants.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate Abstract class, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    this.getElement().classList.remove(constants.VISUALLY_HIDDEN_CLASS);
  }

  hide() {
    this.getElement().classList.add(constants.VISUALLY_HIDDEN_CLASS);
  }
}
