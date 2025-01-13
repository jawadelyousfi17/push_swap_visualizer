import { useEffect, useRef, useState } from 'react'

import '/src/output.css'
import Instructions from './comps/instructions/comp'
import Sop from './utils/stack'
import { StyledCardRoot } from '@mui/joy/Card/Card'
import { Button } from '@mui/joy'
import solvePushSwap from './utils/solve'
import Link from '@mui/joy/Link';
import { IoIosBug } from "react-icons/io";
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';



import { IoLogoGithub } from "react-icons/io";


function App() {


  const stackA = useRef(null)
  const [stackADim, setStackADim] = useState({ width: 0, height: 0 })
  const [instructions, setInstructions] = useState([]);
  const [elements, setElements] = useState([]);
  const [indexedElements, setIndexedElements] = useState([])
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
    <div className='flex flex-col  gap-4'>
      <div className='flex h-16 w-auto justify-center items-center gap-4' >
      <Typography level="h2" sx={{ fontSize: 'xl', mb: 0.5 }}>
    Push swap visualizer
  </Typography>
        <Button onClick={() => window.location = "https://github.com/jawadelyousfi17/push_swap_visualizer"} color='neutral' variant='outlined' startDecorator={<IoLogoGithub/> }>Github</Button>
        <Button onClick={() => window.location = "https://github.com/jawadelyousfi17/push_swap_visualizer/issues"} color='neutral' variant='outlined' startDecorator={<IoIosBug/> }>Report bugs</Button>
      <Divider/>
      </div>
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
      
      </div>
   
  )
}

export default App
