import constants from "../data/constants.js";

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case constants.RENDER_POSITIONS.AFTER_BEGIN:
      container.prepend(element);
      break;
    case constants.RENDER_POSITIONS.BEFORE_END:
      container.append(element);
      break;
    case constants.RENDER_POSITIONS.AFTER_END:
      container.after(element);
      break;
  }
};

export default {
  createElement,
  render
};
