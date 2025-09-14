import { useState } from 'react';
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Divider from "@mui/joy/Divider";
import { BsRecordCircle } from "react-icons/bs";
import { GoCopy } from "react-icons/go";
import { CgClose } from "react-icons/cg";
import { BiUndo } from "react-icons/bi";
import { FaArrowUp, FaArrowLeft, FaArrowRight, FaLongArrowAltDown } from "react-icons/fa";
import { TbArrowsUp, TbArrowsDown } from "react-icons/tb";
import { RiSwap3Fill } from "react-icons/ri";
import { executeInstruction, OPERATION_MAP } from '../../utils/stackOperations';

const InstructionsTab = ({ 
  ops, 
  instructions, 
  setInstructions, 
  setSnackBarMessage, 
  setSnackBarStatus 
}) => {
  const [isRecording, setIsRecording] = useState(true);

  const setInst = (inst) => {
    setInstructions(inst.split("\n"));
  };

  const undo = () => {
    if (instructions.length > 0) {
      executeInstruction(ops, instructions[instructions.length - 1], true);
      instructions.pop();
    }
  };

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    if (text) {
      setInstructions(text.split("\n"));
    }
    setSnackBarMessage("Done");
    setSnackBarStatus(true);
  };

  const clearInstructions = () => {
    setInstructions([]);
  };

  return (
    <div className="flex flex-col gap-2">
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
            pb <FaArrowRight />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.ra(isRecording)}
          >
            ra <FaArrowUp />
          </Button>
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.rb(isRecording)}
          >
            rb <FaArrowUp />
          </Button>
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.rr(isRecording)}
          >
            rr <TbArrowsUp />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.rra(isRecording)}
          >
            rra <FaLongArrowAltDown />
          </Button>
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.rrb(isRecording)}
          >
            rrb <FaLongArrowAltDown />
          </Button>
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.rrr(isRecording)}
          >
            rrr <TbArrowsDown />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.sa(isRecording)}
          >
            sa <RiSwap3Fill />
          </Button>
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.sb(isRecording)}
          >
            sb <RiSwap3Fill />
          </Button>
          <Button
            variant="outlined"
            className="flex"
            onClick={() => ops.ss(isRecording)}
          >
            ss <RiSwap3Fill />
          </Button>
        </div>
      </div>

      <Divider />

      <div className="flex gap-2">
        <Button
          onClick={pasteFromClipboard}
          startDecorator={<GoCopy />}
          sx={{ "--Button-gap": "8px" }}
        >
          Paste
        </Button>
        <Button
          sx={{ "--Button-gap": "8px" }}
          startDecorator={<CgClose />}
          onClick={clearInstructions}
        >
          Clear
        </Button>
        <Button
          sx={{ "--Button-gap": "8px" }}
          startDecorator={<BiUndo />}
          onClick={undo}
        >
          Undo
        </Button>
      </div>

      <div>{instructions.length}</div>

      <Textarea
        minRows={10}
        maxRows={10}
        placeholder="Paste your instructions here"
        value={instructions.join("\n")}
        onChange={(e) => setInst(e.target.value)}
        style={{
          border: "1px solid black",
          padding: "10px",
          minHeight: "50px",
        }}
      />
    </div>
  );
};

export default InstructionsTab;
