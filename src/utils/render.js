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

// for more details see here https://www.qodo.co.uk/blog/javascript-enabling-and-disabling-form-field-elements/
export const toggleFormElements = (form, disabled) => {
  const inputs = form.getElementsByTagName(`input`);
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].readOnly = disabled;
  }
  const selects = document.getElementsByTagName(`select`);
  for (let i = 0; i < selects.length; i++) {
    selects[i].readOnly = disabled;
  }
  const textareas = document.getElementsByTagName(`textarea`);
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].readOnly = disabled;
  }
  const buttons = document.getElementsByTagName(`button`);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = disabled;
  }
};

export default {
  createElement,
  replace,
  render,
  remove,
  toggleFormElements
};
