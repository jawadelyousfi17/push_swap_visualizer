import { useState } from 'react'

import '/src/output.css'
import Instructions from './comps/instructions/comp'
import Sop from './utils/stack'
import { useTheme } from './hooks/useTheme'
import { useStackVisualization } from './hooks/useStackVisualization'

import { Analytics } from "@vercel/analytics/react"

import Navbar from './comps/navbar'
import { CssBaseline, Divider, Sheet } from '@mui/joy'

function App() {
  const { mode, setMode, theme, clg, handleTheme } = useTheme()
  const {
    stackA,
    stackADim,
    elements,
    setElements,
    indexedElements,
    setIndexedElements,
    b,
    setB,
    styleE,
    setStyle,
    classN,
    showIndxes,
    setShowindexes
  } = useStackVisualization()
  
  const [instructions, setInstructions] = useState([]);
  const stackOps = new Sop(indexedElements, b, setIndexedElements, setB, setInstructions);


  return (
    <div className='flex flex-col'>
      <Analytics/>
      <CssBaseline></CssBaseline>

      <Navbar mode={mode} setMode={setMode} theme={theme} handleTheme={handleTheme} />

      <Divider></Divider>

      <div className='flex h-screen 2xl:w-2/3 mx-auto '>
        <div className='inst max-w-screen-sm'>
          <Instructions 
            theme={theme} 
            clg={clg} 
            setShowindexes={setShowindexes} 
            showIndxes={showIndxes} 
            setStyle={setStyle} 
            styleE={styleE}
            ops={stackOps} 
            setA={setElements} 
            setB={setB} 
            setInstructions={setInstructions} 
            instructions={instructions} 
          />
        </div>
        <Sheet variant='outlined' className={` flex-1 overflow-y-scroll rr`} ref={stackA}>
          {indexedElements.map((el, i) => <div key={i} style={{
            width: (stackADim.width - 20) / elements.length * (el.index + 1),
            backgroundColor: theme !== 'default' ? `hsl(${clg + (elements.length - el.index) * 25 / elements.length}, 90%, ${(elements.length - el.index) * 75 / elements.length + 15}%)` : `hsl(${(elements.length - el.index) * 60 / elements.length}, 100%, 50%)`

          }} className={classN} > {styleE.includes('labels') && (showIndxes ? el.index : el.num)} </div>)}
        </Sheet>

        <Sheet variant='outlined' className='  flex-1 overflow-y-scroll rr'>
          {b.map((el, i) => <div key={i} style={{
            width: (stackADim.width - 20) / elements.length * (el.index + 1),
            backgroundColor: theme !== 'default' ? `hsl(${clg}, 90%, ${(elements.length - el.index) * 50 / elements.length + 5}%)` : `hsl(${(elements.length - el.index) * 60 / elements.length}, 100%, 50%)`
          }} className={classN}>{styleE.includes('labels') && (showIndxes ? el.index : el.num)}   </div>)}
        </Sheet>
      </div>
    </div>
  )
}

export default App
