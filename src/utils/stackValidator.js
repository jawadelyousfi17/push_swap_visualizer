/**
 * Stack validation utilities for push_swap algorithm
 */

/**
 * Checks if stack A is sorted in ascending order
 * @param {Object[]} stackA - Array of stack elements with num and index properties
 * @returns {boolean} True if sorted, false otherwise
 */
export const isStackASorted = (stackA) => {
  if (stackA.length <= 1) return true;
  
  for (let i = 0; i < stackA.length - 1; i++) {
    if (stackA[i].index > stackA[i + 1].index) {
      return false;
    }
  }
  return true;
};

/**
 * Checks if stack B is empty (which it should be after successful sorting)
 * @param {Object[]} stackB - Array of stack B elements
 * @returns {boolean} True if empty, false otherwise
 */
export const isStackBEmpty = (stackB) => {
  return stackB.length === 0;
};

/**
 * Validates if the push_swap algorithm completed successfully
 * @param {Object[]} stackA - Array of stack A elements
 * @param {Object[]} stackB - Array of stack B elements
 * @returns {Object} Validation result with success status and message
 */
export const validateSortingCompletion = (stackA, stackB) => {
  const isASorted = isStackASorted(stackA);
  const isBEmpty = isStackBEmpty(stackB);
  
  if (isASorted && isBEmpty) {
    return {
      success: true,
      message: "✅ Success! Stack A is sorted and Stack B is empty.",
      details: `Sorted ${stackA.length} elements successfully.`
    };
  } else if (!isASorted && isBEmpty) {
    return {
      success: false,
      message: "❌ Failed! Stack A is not properly sorted.",
      details: "Stack B is empty but Stack A contains unsorted elements."
    };
  } else if (isASorted && !isBEmpty) {
    return {
      success: false,
      message: "❌ Incomplete! Stack A is sorted but Stack B is not empty.",
      details: `Stack B still contains ${stackB.length} elements.`
    };
  } else {
    return {
      success: false,
      message: "❌ Failed! Stack A is not sorted and Stack B is not empty.",
      details: `Stack A is unsorted and Stack B contains ${stackB.length} elements.`
    };
  }
};

/**
 * Gets the current sorting status for display
 * @param {Object[]} stackA - Array of stack A elements
 * @param {Object[]} stackB - Array of stack B elements
 * @returns {string} Status message
 */
export const getSortingStatus = (stackA, stackB) => {
  const validation = validateSortingCompletion(stackA, stackB);
  return `${validation.message} ${validation.details}`;
};
