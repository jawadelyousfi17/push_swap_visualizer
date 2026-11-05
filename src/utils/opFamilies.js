// Visual grouping of push_swap operations, colored with the console's status palette
export const OP_FAMILIES = {
  push: { label: 'Push', color: 'var(--op-push)', ops: ['pa', 'pb'] },
  swap: { label: 'Swap', color: 'var(--op-swap)', ops: ['sa', 'sb', 'ss'] },
  rotate: { label: 'Rotate', color: 'var(--op-rot)', ops: ['ra', 'rb', 'rr'] },
  reverse: { label: 'Reverse rotate', color: 'var(--op-rrot)', ops: ['rra', 'rrb', 'rrr'] },
};

export const familyOf = (op) => {
  const name = (op || '').trim();
  return Object.values(OP_FAMILIES).find((f) => f.ops.includes(name)) || null;
};

/**
 * Stack sizes after each instruction, derived from counts only
 * (push moves one element, everything else keeps sizes).
 */
export const stackSizesAfter = (instructions, total) => {
  let a = total;
  let b = 0;
  return instructions.map((raw) => {
    const op = (raw || '').trim();
    if (op === 'pb' && a > 0) { a--; b++; }
    else if (op === 'pa' && b > 0) { a++; b--; }
    return [a, b];
  });
};
