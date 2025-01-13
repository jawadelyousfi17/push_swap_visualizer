import { useEffect, useRef, useState } from 'react'

import '/src/output.css'
import Instructions from './comps/instructions/comp'
import Sop from './utils/stack'
import { StyledCardRoot } from '@mui/joy/Card/Card'
import { Button } from '@mui/joy'
import solvePushSwap from './utils/solve'



function App() {


  const stackA = useRef(null)
  const [stackADim, setStackADim] = useState({ width: 0, height: 0 })
  const [instructions, setInstructions] = useState([]);
  const [elements, setElements] = useState([1, 2, 3, 4, 50, 6, 7, 8, 9, 10]);
  const [indexedElements, setIndexedElements] = useState([{ num: 1, index: 0 }])
  const [b, setB] = useState([])
  const [styleE, setStyle] = useState('big bars + labels')
  const [classN, setClassN] = useState('stack-elements big-bars')
  const [showIndxes, setShowindexes] = useState(true)
  
  const stackOps = new Sop(indexedElements, b, setIndexedElements, setB, setInstructions);

  const indexElements = (elements, setIndexedElements) => {
    const sortedArr = [...elements].sort((a, b) => a - b);
    setIndexedElements(elements.map(el => ({
      num: el,
      index: sortedArr.indexOf(el)
    })));
  }
  useEffect(() => {
   if (styleE.includes('small')) {
      setClassN('stack-elements small-bars')
    } else {
      setClassN('stack-elements big-bars')
    }
  }, [styleE])

  useEffect(() => {
    const setDims = () => {
      setStackADim({
        width: stackA.current.offsetWidth,
        height: stackA.current.offsetHeight
      })
    }
    indexElements(elements, setIndexedElements)
    setDims()
    window.addEventListener('resize', setDims)
    return () => window.removeEventListener('resize', setDims)
  }, [])

  const solve = () => {
    solvePushSwap({ ops: stackOps });
  }


  useEffect(() => { indexElements(elements, setIndexedElements) }, [elements]) 
  useEffect(() => { console.log(indexedElements) }, [indexedElements])


  return (
    <div className='flex h-screen lg:w-2/3 mx-auto '>
      <div className='inst max-w-screen-sm'>
        <Instructions setShowindexes={setShowindexes} showIndxes={showIndxes}  setStyle={setStyle} ops={stackOps} setA={setElements} setB={setB} setInstructions={setInstructions}  instructions={instructions} ></Instructions>
      </div>
      <div className= {`bg-black flex-1 overflow-y-scroll rr `} ref={stackA}>
        {indexedElements.map((el, i) => <div key={i} style={{width : (stackADim.width - 20) / elements.length * (el.index + 1) ,
          backgroundColor: `hsl(${(elements.length - el.index) * 60 / elements.length}, 90%, 50%)`
        }} className={classN} > {styleE.includes('labels') && (showIndxes ? el.index : el.num)} </div>)}
      </div>
      <div className=' bg-black flex-1 overflow-y-scroll rr'>
      {b.map((el, i) => <div key={i} style={{width : (stackADim.width - 20) / elements.length * (el.index + 1) ,
          backgroundColor: `hsl(${(elements.length - el.index) * 60 / elements.length}, 100%, 50%)`
      }} className={classN}>{styleE.includes('labels') && (showIndxes ? el.index : el.num)}   </div>)}
      </div>
    </div>
  )
}

export default App
