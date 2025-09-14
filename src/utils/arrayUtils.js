/**
 * Utility functions for array manipulation and number generation
 */

/**
 * Generates an array of unique random numbers within a specified range
 * @param {number} count - Number of random numbers to generate
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number[]} Array of unique random numbers
 */
export const generateRandomNumbers = (count, min, max) => {
  const randomNumbers = new Set();
  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return Array.from(randomNumbers);
};

/**
 * Generates unique random numbers using Fisher-Yates shuffle algorithm
 * More efficient for generating many numbers from a smaller range
 * @param {number} count - Number of random numbers to generate
 * @param {number} max - Maximum value for the range (1 to max)
 * @returns {number[]} Array of unique random numbers
 */
export const generateUniqueRandomNumbers = (count, max) => {
  const numbers = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.slice(0, count);
};

/**
 * Converts an array to a space-separated string
 * @param {number[]} arr - Array to convert
 * @returns {string} Space-separated string
 */
export const convertArrayToText = (arr) => {
  return arr.join(' ');
};

/**
 * Parses a string of numbers into an array, removing duplicates and invalid values
 * @param {string} numbersString - String containing space-separated numbers
 * @returns {number[]} Array of unique valid numbers
 */
export const parseNumbersString = (numbersString) => {
  return numbersString
    .split(" ")
    .map((el) => parseInt(el))
    .filter((el) => !isNaN(el))
    .filter((el, i, self) => self.indexOf(el) === i); // Remove duplicates
};

/**
 * Indexes elements by their sorted position
 * @param {number[]} elements - Array of numbers to index
 * @returns {Object[]} Array of objects with num and index properties
 */
export const indexElements = (elements) => {
  const sortedArr = [...elements].sort((a, b) => a - b);
  return elements.map(el => ({
    num: el,
    index: sortedArr.indexOf(el)
  }));
};

/**
 * Generates all permutations of an array
 * @param {any[]} arr - Array to permute
 * @returns {any[][]} Array of all permutations
 */
export const getPermutations = (arr) => {
  const result = [];
  
  function permute(current, remaining) {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    
    for (let i = 0; i < remaining.length; i++) {
      permute(
        [...current, remaining[i]], 
        remaining.slice(0, i).concat(remaining.slice(i + 1))
      );
    }
  }
  
  permute([], arr);
  return result;
};
