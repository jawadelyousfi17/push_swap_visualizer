const getMoveIndex = (index, a) => {
  if (index >= a.length / 2) {
    return a.length - index;
  }
  return index;
};

const getTargetIndex = (item, b) => {
  if (item < Math.min(...b) || item > Math.max(...b)) {
    const index = b.indexOf(Math.max(...b));
    return index;
  }
  let closestNumber = NaN;
  let i = 0;
  for (i = 0; i < b.length && isNaN(closestNumber); i++) {
    if (b[i] < item) closestNumber = b[i];
  }
  for (; i < b.length; i++) {
    const e = b[i];
    if (e < item && Math.abs(e - item) < Math.abs(closestNumber - item)) {
      closestNumber = e;
    }
  }
  const index = b.indexOf(closestNumber);
  return index;
};

const getCheapestIndex = (a, b) => {
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

const bringToTop = (stack, index, stackName, ops) => {
  const inst = []
  if (index < stack.length / 2) {
    for (let i = 0; i < index; i++) {
      if (stackName == "a") inst.push('ra');
      if (stackName == "b") inst.push('rb');
    }
  } else {
    index = stack.length - index;
    for (let i = 0; i < index; i++) {
      if (stackName == "a") inst.push('rra');
      if (stackName == "b") inst.push('rrb');
    }
  }
  return inst;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getUnsortedindex = (b) => {
  for (let i = 0; i < b.length - 1; i++) {
    if (b[i] < b[i + 1]) return i + 1;
  }
  return -1;
};

const sortB = (b, ops) => {
  let insortedIndex = getUnsortedindex(b);
  if (insortedIndex == -1)
      return -1;
  bringToTop(b, insortedIndex, "b", ops);
};

let s = false;

const doInst = (ops, inst) => {
  if (inst === 'ra') ops.ra();
  if (inst === 'rb') ops.rb();
  if (inst === 'rra') ops.rra();
  if (inst === 'rrb') ops.rrb();
  if (inst === 'rr') ops.rr();
  if (inst === 'rrr') ops.rrr();
}

const createInstructions = (aInst, bInst) => {
  const sharedInst = []
  let min = Math.min(aInst.length, bInst.length);
  let i = 0;
  for ( ; i < min; i++) {
    if (aInst[i] === 'ra' && bInst[i] === 'rb')
      sharedInst.push('rr');
    if (aInst[i] === 'rra' && bInst === 'rrb')
      sharedInst.push('rrr')
  }
  const sharedlength = sharedInst.length;
  for (let i = sharedlength; i < aInst.length; i++) {
    sharedInst.push(aInst[i])
  }
  for (let i = sharedlength; i < bInst.length; i++) {
    sharedInst.push(bInst[i])
  }
  return sharedInst;
}

const solvePushSwap = async ({ ops }) => {
  let a = ops.a.map((el) => el.index);
  let b = ops.b.map((el) => el.index);
  let setA = ops.setA;
  let setB = ops.setB;
  
  if (a.length == 0 || s) {
    s = true;
    let e = sortB(b, ops)
    console.log(e);
    if (e  == -1) {
      if (b.length != 0) ops.pa();
    }
    return;
  }


  const cheapestMoveIndex = getCheapestIndex(a, b);
  const targetIndex = getTargetIndex(a[cheapestMoveIndex], b);
  const ainst = bringToTop(a, cheapestMoveIndex, "a", ops);
  const binst = bringToTop(b, targetIndex, "b", ops);
  let max = Math.min(binst.length, ainst.length);

  const sharedInst = createInstructions(ainst, binst);
  for (let i = 0; i < sharedInst.length; i++) {
    doInst(ops, sharedInst[i]);
  }
  console.log(sharedInst);
  ops.pb();


};

export default solvePushSwap;
