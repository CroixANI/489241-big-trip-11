const MAX_SENTENCES = 5;
const MIN_SENTENCES = 1;
const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayItem = (array) => {
  const index = random(0, array.length - 1);
  return array[index];
};

// took from here https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let swapIndex = random(0, i);
    let currentItem = array[i];
    array[i] = array[swapIndex];
    array[swapIndex] = currentItem;
  }

  return array;
};

const getRandomUniqueNumbers = (total) => {
  let numbers = [];

  for (let i = 0; i < total; i++) {
    numbers.push(i + 1);
  }

  return shuffleArray(numbers);
};

const getRandomArray = (initialArray, min, max) => {
  let result = [];
  let maxItems = max !== undefined ? random(min, max) : random(min, initialArray.length);
  const numbers = getRandomUniqueNumbers(maxItems);

  for (let i = 0; i < numbers.length; i++) {
    result.push(initialArray[numbers[i] - 1]);
  }

  return result;
};

// more details here https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
const randomDate = () => {
  let start = new Date(2020, 1, 1);
  let end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const lorem = () => {
  const numberOfSentences = random(MIN_SENTENCES, MAX_SENTENCES);
  const sentences = LOREM_TEXT.split(`.`);
  let randomSentences = [];

  for (let i = 0; i < numberOfSentences; i++) {
    randomSentences.push(getRandomArrayItem(sentences));
  }

  return randomSentences.join(` `);
};


export default {
  random,
  getRandomArray,
  getRandomArrayItem,
  randomDate,
  lorem
};
