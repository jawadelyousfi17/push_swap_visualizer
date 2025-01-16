import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import * as React from "react";

import { FaArrowUp } from "react-icons/fa6";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoSwapVertical } from "react-icons/io5";
import { TbArrowsUp } from "react-icons/tb";
import { RiSwap3Fill } from "react-icons/ri";
import { GoCopy } from "react-icons/go";
import { FiArrowDown } from "react-icons/fi";
import { BiUndo } from "react-icons/bi";
import { TbArrowsDown } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { BsRecordCircle } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import Textarea from "@mui/joy/Textarea";
import Slider from "@mui/joy/Slider";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Switch from "@mui/joy/Switch";
import Snackbar from "@mui/joy/Snackbar";
import Divider from "@mui/joy/Divider";

import solvePushSwap from '../../utils/solve'
import Benchmark from "../benchmark";

const Instructions = ({
  ops,
  setA,
  setB,
  instructions,
  setInstructions,
  setStyle,
  showIndxes,
  setShowindexes,
}) => {
  const [numbers, setNumbers] = useState("");
  const editableDivRef = useRef(null);
  const [index, setIndex] = useState(0);
  const instructionRefs = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const [isStop, setIsStop] = useState(false);
  const [showDash, setShowDash] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const intervalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("big bars");
  const [value, setValue] = React.useState("big bars + labels");
  const [checked, setChecked] = React.useState(showIndxes);
  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const intervalRef1 = useRef(null);

  const getIcon = (inst) => {
    if (inst === "ra" || inst === "rb") return <FaArrowUp></FaArrowUp>;
    if (inst === "rra" || inst === "rrb")
      return <FaLongArrowAltDown></FaLongArrowAltDown>;
    if (inst === "sa" || inst === "sb" || inst == "ss") return <RiSwap3Fill />;
    if (inst == "rr") return <TbArrowsUp />;
    if (inst == "rrr") return <TbArrowsDown />;
    if (inst == "pb") return <FaArrowRight />;
    if (inst == "pb") return <FaArrowLeft />;
  };

  const heySolveMe =  () => {
      solvePushSwap({ ops });
  }


  useEffect(() => {
    if (snackBarStatus) {
      setTimeout(() => {
        setSnackBarStatus(false);
      }, 3000);
    }
  }, [snackBarStatus]);

  useEffect(() => {
    if (instructionRefs.current[index]) {
      instructionRefs.current[index].scrollIntoView({
        // behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);
  useEffect(() => {
    if (isStop) {
      clearInterval(intervalRef.current);
    }
  }, [isStop]);
  useEffect(() => {
    setShowindexes(checked);
  }, [checked]);

  const setThis = () => {
    setA(
      numbers
        .split(" ")
        .map((el) => parseInt(el))
        .filter((el) => !isNaN(el))
        .filter((el, i, self) => self.indexOf(el) === i)
    );
    setB([]);
  };

  const setInst = (inst) => {
    setInstructions(inst.split("\n"));
  };

  const doInst = (instruction, reverse = false) => {
    const operationMap = {
      pa: "pb",
      pb: "pa",
      ra: "rra",
      rb: "rrb",
      rr: "rrr",
      rra: "ra",
      rrb: "rb",
      rrr: "rr",
      sa: "sa",
      sb: "sb",
    };
    const trimmedInstruction = instruction.trim();
    const operation = reverse
      ? operationMap[trimmedInstruction]
      : trimmedInstruction;
    if (ops[operation]) {
      ops[operation](false);
    } else {
      console.error(`Invalid instruction: ${trimmedInstruction}`);
    }
  };
  const undo = () => {
    if (instructions.length > 0)
      doInst(instructions[instructions.length - 1], true);
    instructions.pop();
  };

  const rand = () => {
    const generateUniqueRandomNumbers = (count, max) => {
      const numbers = Array.from({ length: max }, (_, i) => i + 1);
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      return numbers.slice(0, count);
    };

    const uniqueNumbers = generateUniqueRandomNumbers(InputValue, 50000);
    setNumbers(uniqueNumbers.join(" "));
  };

  const next = () => {
    if (instructions[0] === "END") {
      instructions.shift();
    }
    if (index < instructions.length - 1) {
      doInst(instructions[index]);
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
      doInst(instructions[index - 1], true);
      setIndex(index - 1);
    }
  };

  const play = () => {
    let i = index;
    if (instructions.length === 0) {
      setSnackBarStatus(true);
      setSnackBarMessage("No instructions to play");
    }
    if (instructions[instructions.length - 1] !== "END") {
      setInstructions([...instructions, "END"]);
    }
    setIsPlaying(true);
    if (speed === 0)
      for (i = index; i < instructions.length - 1; i++) {
        doInst(instructions[i]);
        setIndex(i + 1);
      }
    intervalRef.current = setInterval(() => {
      if (i < instructions.length - 1) {
        doInst(instructions[i]);
        setIndex(i + 1);
        i++;
      } else {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
      }
    }, speed);
  };

  const stop = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const marks = [
    {
      value: 0,
      label: "0ms",
    },
    {
      value: 20,
      label: "200ms",
    },
    {
      value: 50,
      label: "500ms",
    },
    {
      value: 100,
      label: "1s",
    },
  ];

  const handleChange = (event, newValue) => {
    setSpeed(newValue);
    if (isPlaying) {
      stop();
      play();
    }
  };

  const handleelect = (e, n) => {
    setSelectedValue(n);
    setStyle(n);
  };

  return (
    <div className="flex flex-col p-4 gap-2 min-w-1/4">
      {/* Alert */}
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarStatus}
        >
          {snackBarMessage}
        </Snackbar>
      </Box>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Generate numbers</Tab>
          <Tab>instructions</Tab>
          <Tab>Simulation</Tab>
          <Tab>Preference</Tab>
          <Tab>Benchmark</Tab>
        </TabList>
        <TabPanel value={0}>
          {/* TAB 1 HERE */}
          <div className="flex gap-2 flex-col">
            <div className="flex flex-col gap-2">
              <b>PUSH SWAP VIZUALISER</b>
              <h4>Generate random numbers</h4>
              <Input
                value={InputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="number"
                placeholder="How many numbers ?"
              />

              <div className="flex gap-2">
                <Button variant="soft" onClick={rand}>
                  Random
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <b>Numbers</b>
              <Input
                type="text"
                placeholder="Numbers"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              ></Input>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "./push_swap " + numbers + " | pbcopy "
                    );
                    setSnackBarMessage("Copied to clipboard");
                    setSnackBarStatus(true);
                  }}
                  startDecorator={<GoCopy />}
                  sx={{
                    "--Button-gap": "8px",
                  }}
                >
                  Copy{" "}
                </Button>
                <Button onClick={setThis}>Set numbers</Button>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={1}>
          <div className="flex flex-col gap-2">
        {/* <Button variant="outlined" id="myButton" color="neutral" onClick={() => heySolveMe()}>solve</Button> */}
            <Button
              variant={isRecording ? "solid" : "soft"}
              color="danger"
              startDecorator={<BsRecordCircle />}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? "Stop recording" : "Start recording"}
            </Button>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.pa(isRecording)}
                >
                  pa <FaArrowLeft />
                </Button>
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.pb(isRecording)}
                >
                  pb <FaArrowRight />{" "}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.ra(isRecording)}
                >
                  ra <FaArrowUp />{" "}
                </Button>
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.rb(isRecording)}
                >
                  rb <FaArrowUp />{" "}
                </Button>
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.rr(isRecording)}
                >
                  rr <TbArrowsUp />
                </Button>{" "}
                <br />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.rra(isRecording)}
                >
                  rra <FaLongArrowAltDown />{" "}
                </Button>
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.rrb(isRecording)}
                >
                  rrb <FaLongArrowAltDown />{" "}
                </Button>
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.rrr(isRecording)}
                >
                  rrr <TbArrowsDown />{" "}
                </Button>{" "}
                <br />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.sa(isRecording)}
                >
                  sa <RiSwap3Fill />{" "}
                </Button>
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.sb(isRecording)}
                >
                  sb <RiSwap3Fill />{" "}
                </Button>
                <Button
                  variant="outlined"
                  className="flex"
                  onClick={() => ops.ss(isRecording)}
                >
                  ss <RiSwap3Fill />{" "}
                </Button>
              </div>
            </div>
            <Divider />
            <div className="flex gap-2">
              {" "}
              <Button
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setInstructions(text.split("\n"));
                  }
                  setSnackBarMessage("Done");
                  setSnackBarStatus(true);
                }}
                startDecorator={<GoCopy />}
                sx={{
                  "--Button-gap": "8px",
                }}
              >
                Past{" "}
              </Button>
              <Button
                sx={{
                  "--Button-gap": "8px",
                }}
                startDecorator={<CgClose />}
                onClick={() => setInstructions([])}
              >
                Clear
              </Button>
              <Button
                sx={{
                  "--Button-gap": "8px",
                }}
                startDecorator={<BiUndo />}
                onClick={() => undo()}
              >
                undo
              </Button>
            </div>

                {instructions.length}

            <Textarea
              minRows={10}
              maxRows={20}
              placeholder="Past your instructions here"
              ref={editableDivRef}
              contentEditable="true"
              value={instructions.join("\n")}
              onChange={(e) => setInst(e.target.value)}
              className="editable-div"
              style={{
                border: "1px solid black",
                padding: "10px",
                minHeight: "50px",
              }}
            ></Textarea>
          </div>
        </TabPanel>
        <TabPanel value={2}>
          <Box className="p-4" sx={{ width: 300 }}>
            Speed
            <Slider
              aria-label="Always visible"
              defaultValue={speed}
              step={1}
              onChange={(e, n) => handleChange(e, n)}
              marks={marks}
              valueLabelDisplay="auto"
            />
          </Box>
          <div className="flex gap-2 justify-start">
            <Button
              disabled={isPlaying || index == instructions.length - 1}
              onClick={() => play()}
            >
              play
            </Button>
            <Button disabled={!isPlaying} onClick={() => stop()}>
              pause
            </Button>
            <Button onClick={prev}>prev</Button>
            <Button onClick={next}>next</Button>
            <Button
              onClick={() => {
                setIndex(0);
                stop();
                setThis();
              }}
            >
              reload
            </Button>
          </div>
          {showInstructions && (
            <div
              className="mt-4 editable-div flex flex-wrap justify-start items-start gap-2 gap-y-2"
              style={{ overflowY: "auto" }}
            >
              {instructions.map((ins, i) => (
                <div
                  key={i}
                  ref={(el) => (instructionRefs.current[i] = el)}
                  className={`w-full h-6 ${i == index ? "active" : ""}`}
                >
                  {ins}
                </div>
              ))}
            </div>
          )}
        </TabPanel>
        <TabPanel value={3}>
          <div className="flex flex-col gap-4 justify-start">
            <ToggleButtonGroup
              size={value || undefined}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                setStyle(newValue);
              }}
            >
              <Button value="small bars">small</Button>
              <Button value="big bars">big</Button>
              <Button value="big bars + labels">big + labels</Button>
            </ToggleButtonGroup>
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-4">
                Show indexed labels
                <Switch
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                />
              </div>
              <div className="flex justify-start items-center gap-4">
                Show instructions (May slow down the simulation in some cases)
                <Switch
                  checked={showInstructions}
                  onChange={(event) =>
                    setShowInstructions(event.target.checked)
                  }
                />
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={4}>
          <Benchmark setSnackBarStatus={setSnackBarStatus} setSnackBarMessage={setSnackBarMessage}  ></Benchmark>
        </TabPanel>
      </Tabs>
    </div>
  );
};

Instructions.propTypes = {
  ops: PropTypes.shape({
    pa: PropTypes.func.isRequired,
    pb: PropTypes.func.isRequired,
    ra: PropTypes.func.isRequired,
    rb: PropTypes.func.isRequired,
    rr: PropTypes.func.isRequired,
    rra: PropTypes.func.isRequired,
    rrb: PropTypes.func.isRequired,
    rrr: PropTypes.func.isRequired,
    sa: PropTypes.func.isRequired,
    sb: PropTypes.func.isRequired,
  }).isRequired,
  setA: PropTypes.func.isRequired,
  setB: PropTypes.func.isRequired,
  instructions: PropTypes.array.isRequired,
  setInstructions: PropTypes.func.isRequired,
};

export default Instructions;
