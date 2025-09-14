/**
 * Algorithm utility functions for push_swap solver
 */

/**
 * Calculates the minimum number of moves to bring an element to the top of a stack
 * @param {number} index - Index of the element
 * @param {any[]} stack - The stack array
 * @returns {number} Minimum number of moves
 */
export const getMoveIndex = (index, stack) => {
  if (index >= stack.length / 2) {
    return stack.length - index;
  }
  return index;
};

/**
 * Finds the target position for an item in stack B
 * @param {number} item - The item to find position for
 * @param {number[]} b - Stack B (array of indices)
 * @returns {number} Target index in stack B
 */
export const getTargetIndex = (item, b) => {
  if (item < Math.min(...b) || item > Math.max(...b)) {
    const index = b.indexOf(Math.max(...b));
    return index;
  }
  
  let closestNumber = NaN;
  let i = 0;
  
  // Find the first number smaller than item
  for (i = 0; i < b.length && isNaN(closestNumber); i++) {
    if (b[i] < item) closestNumber = b[i];
  }
  
  // Find the closest smaller number
  for (; i < b.length; i++) {
    const e = b[i];
    if (e < item && Math.abs(e - item) < Math.abs(closestNumber - item)) {
      closestNumber = e;
    }
  }
  
  const index = b.indexOf(closestNumber);
  return index;
};

/**
 * Finds the cheapest element to move from stack A to stack B
 * @param {number[]} a - Stack A (array of indices)
 * @param {number[]} b - Stack B (array of indices)
 * @returns {number} Index of the cheapest element to move
 */
export const getCheapestIndex = (a, b) => {
  const cheapestMove = {
    index: 0,
    cost: getMoveIndex(getTargetIndex(a[0], b), b) + getMoveIndex(0, a),
  };
  
  for (let i = 1; i < a.length; i++) {
    const cost = getMoveIndex(getTargetIndex(a[i], b), b) + getMoveIndex(i, a);
    if (cost < cheapestMove.cost) {
      cheapestMove.index = i;
      cheapestMove.cost = cost;
    }
  }
  
  return cheapestMove.index;
};

/**
 * Generates instructions to bring an element to the top of a stack
 * @param {any[]} stack - The stack array
 * @param {number} index - Index of element to bring to top
 * @param {string} stackName - Name of the stack ("a" or "b")
 * @returns {string[]} Array of instructions
 */
export const bringToTop = (stack, index, stackName) => {
  const inst = [];
  
  if (index < stack.length / 2) {
    for (let i = 0; i < index; i++) {
      if (stackName === "a") inst.push('ra');
      if (stackName === "b") inst.push('rb');
    }
  } else {
    const moves = stack.length - index;
    for (let i = 0; i < moves; i++) {
      if (stackName === "a") inst.push('rra');
      if (stackName === "b") inst.push('rrb');
    }
  }
  
  return inst;
};

/**
 * Finds the index of the first unsorted element in stack B
 * @param {number[]} b - Stack B (array of indices)
 * @returns {number} Index of unsorted element, or -1 if sorted
 */
export const getUnsortedIndex = (b) => {
  for (let i = 0; i < b.length - 1; i++) {
    if (b[i] < b[i + 1]) return i + 1;
  }
  return -1;
};

/**
 * Utility function to create a delay
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after the delay
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
