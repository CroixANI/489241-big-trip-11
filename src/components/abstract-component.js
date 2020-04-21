export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate Abstract class, only concrete one.`);
    }

    this._element = null;
  }
  getTemplate() {}
  getElement() {}
  removeElement() {}
}
