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

export default {
  random,
  getRandomArray,
  getRandomArrayItem,
  randomDate
};
