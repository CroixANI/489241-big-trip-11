import random from "./random.js";

const MAX_SENTENCES = 5;
const MIN_SENTENCES = 1;
const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export default () => {
  const numberOfSentences = random.random(MIN_SENTENCES, MAX_SENTENCES);
  const sentences = LOREM_TEXT.split(`.`);
  let randomSentences = [];

  for (let i = 0; i < numberOfSentences; i++) {
    randomSentences.push(random.getRandomArrayItem(sentences));
  }

  return randomSentences.join(` `);
};
