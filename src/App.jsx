import { useEffect, useRef, useState } from 'react'

import '/src/output.css'
import Instructions from './comps/instructions/comp'
import Sop from './utils/stack'
import solvePushSwap from './utils/solve'
import { useColorScheme } from "@mui/joy/styles";


import Navbar from './comps/navbar'
import { CssBaseline, Divider, Sheet } from '@mui/joy'

function App() {
  const {mode, setMode}= useColorScheme()

  const stackA = useRef(null)
  const [stackADim, setStackADim] = useState({ width: 0, height: 0 })
  const [instructions, setInstructions] = useState([]);
  const [elements, setElements] = useState([]);
  const [indexedElements, setIndexedElements] = useState([])
  const [b, setB] = useState([])
  const [styleE, setStyle] = useState('big bars + labels')
  const [classN, setClassN] = useState('stack-elements big-bars')
  const [showIndxes, setShowindexes] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem('thm') || 'blue')
  const [clg, setClg] = useState(0)
  const stackOps = new Sop(indexedElements, b, setIndexedElements, setB, setInstructions);


  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode('dark');
    }
  }, []);


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
      localStorage.setItem("thm", theme)
      const th = {red :10, green : 120, blue : 220, rebecca : 270}
      setClg(th[theme])
    }, [theme])


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


  
  const handleTheme = (e, n) => {
    setTheme(n)
  }

  useEffect(() => { indexElements(elements, setIndexedElements) }, [elements]) 
  useEffect(() => { console.log(indexedElements) }, [indexedElements])


  return (
    <div className='flex flex-col'>
     <CssBaseline></CssBaseline>

<Navbar mode={mode} setMode={setMode} theme={theme} handleTheme={handleTheme}/>

<Divider></Divider>

       <div className='flex h-screen 2xl:w-2/3 mx-auto '>
      <div className='inst max-w-screen-sm'>
        <Instructions theme={theme} setTheme={setTheme} clg={clg} setClg={setClg} setShowindexes={setShowindexes} showIndxes={showIndxes}  setStyle={setStyle} ops={stackOps} setA={setElements} setB={setB} setInstructions={setInstructions}  instructions={instructions} ></Instructions>
      </div>
      <Sheet variant='outlined' className= {` flex-1 overflow-y-scroll rr`} ref={stackA}>
        {indexedElements.map((el, i) => <div key={i}  style={{width : (stackADim.width - 20) / elements.length * (el.index + 1) ,
 backgroundColor: `hsl(${clg}, 60%, ${(elements.length - el.index) * 50 / elements.length + 5}%)`

        }} className={classN} > {styleE.includes('labels') && (showIndxes ? el.index : el.num)} </div>)}
      </Sheet>

      <Sheet variant='outlined' className='  flex-1 overflow-y-scroll rr'>
      {b.map((el, i) => <div key={i} style={{width : (stackADim.width - 20) / elements.length * (el.index + 1) ,
 backgroundColor: `hsl(${clg}, 100%, ${(elements.length - el.index) * 50 / elements.length + 10}%)`
}} className={classN}>{styleE.includes('labels') && (showIndxes ? el.index : el.num)}   </div>)}
      </Sheet>
    </div>
      </div>
  )
}

export default App
