/**
 * Stack operations utility functions for push_swap algorithm
 */

/**
 * Operation mapping for reversing instructions
 */
export const OPERATION_MAP = {
  pa: "pb",
  pb: "pa",
  ra: "rra",
  rb: "rrb",
  rr: "rrr",
  rra: "ra",
  rrb: "rb",
  rrr: "rr",
  sa: "sa",
  sb: "sb",
  ss: "ss"
};

/**
 * Executes a stack operation
 * @param {Object} ops - Stack operations object
 * @param {string} instruction - Instruction to execute
 * @param {boolean} reverse - Whether to execute the reverse operation
 */
export const executeInstruction = (ops, instruction, reverse = false) => {
  const trimmedInstruction = instruction.trim();
  const operation = reverse
    ? OPERATION_MAP[trimmedInstruction]
    : trimmedInstruction;
    
  if (ops[operation]) {
    ops[operation](false);
  } else {
    console.error(`Invalid instruction: ${trimmedInstruction}`);
  }
};

/**
 * Creates optimized instructions by combining rotate operations
 * @param {string[]} aInst - Instructions for stack A
 * @param {string[]} bInst - Instructions for stack B
 * @returns {string[]} Combined and optimized instructions
 */
export const createOptimizedInstructions = (aInst, bInst) => {
  const sharedInst = [];
  const min = Math.min(aInst.length, bInst.length);
  let i = 0;
  
  // Combine matching rotate operations
  for (; i < min; i++) {
    if (aInst[i] === 'ra' && bInst[i] === 'rb') {
      sharedInst.push('rr');
    } else if (aInst[i] === 'rra' && bInst[i] === 'rrb') {
      sharedInst.push('rrr');
    } else {
      // If operations don't match, add them separately
      sharedInst.push(aInst[i]);
      if (i < bInst.length) sharedInst.push(bInst[i]);
    }
  }
  
  const sharedLength = i;
  
  // Add remaining instructions from both stacks
  for (let j = sharedLength; j < aInst.length; j++) {
    sharedInst.push(aInst[j]);
  }
  for (let j = sharedLength; j < bInst.length; j++) {
    sharedInst.push(bInst[j]);
  }
  
  return sharedInst;
};
