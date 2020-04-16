import lorem from "../utils/lorem.js";

export default () => {
  return {
    description: lorem(),
    imagePath: `http://picsum.photos/248/152?r=${Math.random()}`
  };
};
