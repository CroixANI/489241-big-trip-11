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

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const iterateAndSetReadOnly = (elements, disabled) => {
  for (const element of elements) {
    element.readOnly = disabled;
  }
};

export const toggleFormElements = (form, disabled) => {
  iterateAndSetReadOnly(form.getElementsByTagName(`input`), disabled);
  iterateAndSetReadOnly(form.getElementsByTagName(`select`), disabled);
  iterateAndSetReadOnly(form.getElementsByTagName(`textarea`), disabled);

  const buttons = document.getElementsByTagName(`button`);
  for (const button of buttons) {
    button.disabled = disabled;
  }
};

export default {
  createElement,
  replace,
  render,
  remove,
  toggleFormElements
};
