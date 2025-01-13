

const arr = [20, 10, 5, 6, 8, 9, 7];

const sortedArr = [...arr].sort((a, b) => a - b);
const arr3 = arr.map(el => ({
    num: el,
    index: sortedArr.indexOf(el)
}));


console.log(arr3);
