import { 
  getMoveIndex, 
  getTargetIndex, 
  getCheapestIndex, 
  bringToTop, 
  wait, 
  getUnsortedIndex 
} from './algorithmUtils.js';
import { executeInstruction, createOptimizedInstructions } from './stackOperations.js';

const sortB = (b, ops) => {
  let insortedIndex = getUnsortedIndex(b);
  if (insortedIndex == -1)
      return -1;
  bringToTop(b, insortedIndex, "b", ops);
};

let s = false;

const doInst = (ops, inst) => {
  executeInstruction(ops, inst);
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

  const sharedInst = createOptimizedInstructions(ainst, binst);
  for (let i = 0; i < sharedInst.length; i++) {
    doInst(ops, sharedInst[i]);
  }
  console.log(sharedInst);
  ops.pb();


};

export default solvePushSwap;
