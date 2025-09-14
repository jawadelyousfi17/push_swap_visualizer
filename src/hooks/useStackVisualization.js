import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing stack visualization state and dimensions
 */
export const useStackVisualization = () => {
  const stackA = useRef(null);
  const [stackADim, setStackADim] = useState({ width: 0, height: 0 });
  const [elements, setElements] = useState([]);
  const [indexedElements, setIndexedElements] = useState([]);
  const [b, setB] = useState([]);
  const [styleE, setStyle] = useState('big bars + labels');
  const [classN, setClassN] = useState('stack-elements big-bars');
  const [showIndxes, setShowindexes] = useState(true);

  // Index elements for visualization
  const indexElements = (elements, setIndexedElements) => {
    const sortedArr = [...elements].sort((a, b) => a - b);
    setIndexedElements(elements.map(el => ({
      num: el,
      index: sortedArr.indexOf(el)
    })));
  };

  // Update class name based on style
  useEffect(() => {
    if (styleE.includes('small')) {
      setClassN('stack-elements small-bars');
    } else {
      setClassN('stack-elements big-bars');
    }
  }, [styleE]);

  // Set dimensions and index elements on mount and resize
  useEffect(() => {
    const setDims = () => {
      if (stackA.current) {
        setStackADim({
          width: stackA.current.offsetWidth,
          height: stackA.current.offsetHeight
        });
      }
    };
    
    indexElements(elements, setIndexedElements);
    setDims();
    window.addEventListener('resize', setDims);
    return () => window.removeEventListener('resize', setDims);
  }, [elements]);

  // Re-index elements when they change
  useEffect(() => {
    indexElements(elements, setIndexedElements);
  }, [elements]);

  return {
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
  };
};
