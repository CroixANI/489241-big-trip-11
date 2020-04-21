import constants from "../data/constants.js";

export const createElement = (component) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = component.getTemplate();

  return newElement.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case constants.RENDER_POSITIONS.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case constants.RENDER_POSITIONS.BEFORE_END:
      container.append(component.getElement());
      break;
    case constants.RENDER_POSITIONS.AFTER_END:
      container.after(component.getElement());
      break;
  }
};

export const replace = (parent, newComponent, oldComponent) => {
  parent.replaceChild(newComponent.getElement(), oldComponent.getElement());
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export default {
  createElement,
  replace,
  render,
  remove,
};
