const ESC_KEY = `Escape`;

const handleKeyEvent = (evt, action, keyCode) => {
  if (evt.key === keyCode) {
    action(evt);
  }
};

export const isEscapeEvent = (evt, action) => {
  handleKeyEvent(evt, action, ESC_KEY);
};

export default {
  isEscapeEvent
};
