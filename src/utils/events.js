const ESC_KEY = `Escape`;
const ENTER_KEY = `Enter`;

const handleKeyEvent = (evt, action, keyCode) => {
  if (evt.key === keyCode) {
    action();
  }
};

export const isEscapeEvent = (evt, action) => {
  handleKeyEvent(evt, action, ESC_KEY);
};

export const isEnterEvent = (evt, action) => {
  handleKeyEvent(evt, action, ENTER_KEY);
};

export default {
  isEscapeEvent,
  isEnterEvent
};
