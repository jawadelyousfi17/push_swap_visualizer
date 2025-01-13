

const getTargetIndex = (item, b) => {
    if (item < Math.min(...b) || item > Math.max(...b)) {
        const index = b.indexOf(Math.max(...b));
        return index >= b.length / 2 ? b.length - index : index;
    }

    let closestNumber = b[0];
    for (let i = 1; i < b.length; i++) {
        const e = b[i];
        if (e < item && Math.abs(e - item) < Math.abs(closestNumber - item)) {
            closestNumber = e;
        }
    }
    const index = b.indexOf(closestNumber) ;
    return index >= b.length / 2 ? -index + b.length : index;
}
const solvePushSwap = ({ ops }) => {
    let a = ops.a.map(el => el.index);
    let b = ops.b.map(el => el.index);
    let setA = ops.setA;
    let setB = ops.setB;


    let cheapestNumber = a[0];
    for (let i = 1; i < a.length; i++) {
        const e = a[i];
        const index = i >= a.length / 2 ? -i + a.length : i;
        if (getTargetIndex(e, b) + index < getTargetIndex(cheapestNumber, b) + (a.indexOf(cheapestNumber) >= a.length / 2 ? -a.indexOf(cheapestNumber) + a.length : a.indexOf(cheapestNumber))) {
            cheapestNumber = e;
        }
    }


    console.log(cheapestNumber);

}

export default solvePushSwap;