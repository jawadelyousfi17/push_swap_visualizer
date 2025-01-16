const arr = [20, 10, 5, 6, 8, 9, 7];

const sortedArr = [...arr].sort((a, b) => a - b);
const arr3 = arr.map((el) => ({
  num: el,
  index: sortedArr.indexOf(el),
}));



const generateRandomNumbers = (count, min, max) => {
    const randomNumbers = new Set();
    while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.add(randomNumber);
    }
    return Array.from(randomNumbers);
};

function convertArrayToText(arr) {
    return arr.join(' ');
}

