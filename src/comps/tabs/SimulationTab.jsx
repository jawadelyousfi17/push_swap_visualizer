import { useState, useRef, useEffect } from 'react';
import Button from "@mui/joy/Button";
import Slider from "@mui/joy/Slider";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import { executeInstruction } from '../../utils/stackOperations';
import { validateSortingCompletion } from '../../utils/stackValidator';

const SimulationTab = ({ 
  instructions, 
  setInstructions, 
  ops, 
  setA, 
  setB, 
  numbers,
  setSnackBarMessage, 
  setSnackBarStatus 
}) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [showInstructions, setShowInstructions] = useState(true);
  const [sortingResult, setSortingResult] = useState(null);
  const intervalRef = useRef(null);
  const instructionRefs = useRef([]);

  const marks = [
    { value: 0, label: "0ms" },
    { value: 20, label: "200ms" },
    { value: 50, label: "500ms" },
    { value: 100, label: "1s" },
  ];

  useEffect(() => {
    if (instructionRefs.current[index]) {
      instructionRefs.current[index].scrollIntoView({
        block: "end"
      });
    }
  }, [index]);

  const setNumbers = () => {
    setA(
      numbers
        .split(" ")
        .map((el) => parseInt(el))
        .filter((el) => !isNaN(el))
        .filter((el, i, self) => self.indexOf(el) === i)
    );
    setB([]);
  };

  const next = () => {
    if (instructions[0] === "END") {
      instructions.shift();
    }
    if (index < instructions.length - 1) {
      executeInstruction(ops, instructions[index]);
      setIndex(index + 1);
    }
    if (instructions[instructions.length - 1] !== "END") {
      setInstructions([...instructions, "END"]);
    }
  };

  const prev = () => {
    if (instructions[0] === "END") {
      instructions.shift();
    }
    if (index > 0) {
      executeInstruction(ops, instructions[index - 1], true);
      setIndex(index - 1);
    }
  };

  const checkSortingStatus = () => {
    const validation = validateSortingCompletion(ops.a, ops.b);
    setSortingResult(validation);
    setSnackBarMessage(validation.message);
    setSnackBarStatus(true);
  };

  const play = () => {
    let i = index;
    if (instructions.length === 0) {
      setSnackBarStatus(true);
      setSnackBarMessage("No instructions to play");
      return;
    }
    if (instructions[instructions.length - 1] !== "END") {
      setInstructions([...instructions, "END"]);
    }
    setIsPlaying(true);
    setSortingResult(null); // Clear previous result
    
    if (speed === 0) {
      for (i = index; i < instructions.length - 1; i++) {
        executeInstruction(ops, instructions[i]);
        setIndex(i + 1);
      }
      setIsPlaying(false);
      checkSortingStatus(); // Check sorting after completion
      return;
    }
    
    intervalRef.current = setInterval(() => {
      if (i < instructions.length - 1) {
        executeInstruction(ops, instructions[i]);
        setIndex(i + 1);
        i++;
      } else {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        checkSortingStatus(); // Check sorting after completion
      }
    }, speed);
  };

  const stop = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
    if (isPlaying) {
      stop();
      play();
    }
  };

  const reload = () => {
    setIndex(0);
    stop();
    setSortingResult(null); // Clear sorting result
    setNumbers();
  };

  return (
    <div className="flex flex-col gap-4">
      <Box className="p-4" sx={{ width: 300 }}>
        Speed
        <Slider
          aria-label="Always visible"
          defaultValue={speed}
          step={1}
          onChange={handleSpeedChange}
          marks={marks}
          valueLabelDisplay="auto"
        />
      </Box>
      
      <div className="flex gap-2 justify-start">
        <Button
          disabled={isPlaying || index === instructions.length - 1}
          onClick={play}
        >
          Play
        </Button>
        <Button disabled={!isPlaying} onClick={stop}>
          Pause
        </Button>
        <Button onClick={prev}>Prev</Button>
        <Button onClick={next}>Next</Button>
        <Button onClick={reload}>
          Reload
        </Button>
        <Button onClick={checkSortingStatus} variant="outlined">
          Check Sorting
        </Button>
      </div>
      
      {sortingResult && (
        <Alert 
          color={sortingResult.success ? "success" : "danger"}
          variant="soft"
        >
          <div>
            <strong>{sortingResult.message}</strong>
            <br />
            <small>{sortingResult.details}</small>
          </div>
        </Alert>
      )}
      
      {showInstructions && (
        <div
          className="mt-4 editable-div h-80 flex flex-wrap justify-start items-start gap-2 gap-y-2"
          style={{ overflowY: "auto" }}
        >
          {instructions.map((ins, i) => (
            <div
              key={i}
              ref={(el) => (instructionRefs.current[i] = el)}
              className={`w-full h-6 ${i === index ? "active" : ""}`}
            >
              {ins}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimulationTab;
