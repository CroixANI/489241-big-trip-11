const createFilter = (name) => {
  return {type: name.toLowerCase(), name};
};

const AVAILABLE_FILTERS = [createFilter(`Everything`), createFilter(`Future`), createFilter(`Past`)];

export default {
  AVAILABLE_FILTERS
};
