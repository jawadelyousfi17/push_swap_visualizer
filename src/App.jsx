'use client'

import { useState, useEffect, useCallback } from 'react'
import { Toast } from './comps/ui/Controls'

import Sop from './utils/stack'
import { isStackASorted } from './utils/stackValidator'
import { useTheme } from './hooks/useTheme'
import { useStackVisualization } from './hooks/useStackVisualization'

import TopBar from './comps/TopBar'
import Sidebar, { parseNumbers } from './comps/Sidebar'
import Workbench from './comps/Workbench'
import StackPanel from './comps/StackPanel'
import Seo from './comps/seo'
import FeedbackPopup from './comps/FeedbackPopup'

function App() {
  const { theme, setTheme, clg } = useTheme()
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
    setShowindexes,
  } = useStackVisualization()

  const [numbers, setNumbers] = useState('')
  const [instructions, setInstructions] = useState([])
  const [toast, setToast] = useState('')
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false)
  const stackOps = new Sop(indexedElements, b, setIndexedElements, setB, setInstructions)

  const notify = useCallback((message) => setToast(message), [])
  const clearToast = useCallback(() => setToast(''), [])

  const applyNumbers = (text) => {
    setElements(parseNumbers(text))
    setB([])
  }

  // Feedback popup: show after 1 minute unless dismissed for good
  useEffect(() => {
    if (localStorage.getItem('psv_feedback_dismissed')) return
    const timer = setTimeout(() => setShowFeedbackPopup(true), 60000)
    return () => clearTimeout(timer)
  }, [])

  const total = elements.length
  const sorted = total > 0 && b.length === 0 && isStackASorted(indexedElements)
  const instructionCount = instructions.filter((i) => i.trim() && i !== 'END').length

  return (
    <div className="min-h-screen bg-frame">
      <div className="flex flex-col lg:h-screen">
        <TopBar />

        <main className="grid min-h-0 flex-1 gap-px bg-line max-lg:grid-cols-1 lg:grid-cols-[288px_minmax(380px,440px)_1fr]">
          <Sidebar
            total={total}
            sizeA={indexedElements.length}
            sizeB={b.length}
            instructionCount={instructionCount}
            sorted={sorted}
            numbers={numbers}
            setNumbers={setNumbers}
            applyNumbers={applyNumbers}
            styleE={styleE}
            setStyle={setStyle}
            showIndxes={showIndxes}
            setShowindexes={setShowindexes}
            theme={theme}
            setTheme={setTheme}
            notify={notify}
          />

          <div className="flex min-h-0 flex-col max-lg:order-3 max-lg:h-[640px]">
            <Workbench
              ops={stackOps}
              instructions={instructions}
              setInstructions={setInstructions}
              resetStacks={() => applyNumbers(numbers)}
              total={total}
              notify={notify}
            />
          </div>

          <div className="flex min-h-0 flex-col max-lg:order-2 max-lg:h-[60vh]">
            <StackPanel
              stackRef={stackA}
              width={stackADim.width}
              a={indexedElements}
              b={b}
              total={total}
              classN={classN}
              styleE={styleE}
              showIndxes={showIndxes}
              theme={theme}
              clg={clg}
            />
          </div>
        </main>
      </div>

      <Seo />

      <Toast message={toast} onDone={clearToast} />

      <FeedbackPopup
        open={showFeedbackPopup}
        onClose={() => setShowFeedbackPopup(false)}
        onDontShowAgain={() => {
          localStorage.setItem('psv_feedback_dismissed', 'true')
          setShowFeedbackPopup(false)
        }}
      />
    </div>
  )
}

export default App
